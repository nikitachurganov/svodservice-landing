/**
 * Пререндер лендинга после `vite build`: вставляет готовый HTML страницы, стили antd
 * и разметку schema.org в dist/index.html. Без этого поисковики получают пустой <div id="root">.
 */
import { readFile, writeFile, rm } from 'node:fs/promises';
import { pathToFileURL } from 'node:url';
import path from 'node:path';

const root = path.resolve(import.meta.dirname, '..');
const indexPath = path.join(root, 'dist', 'index.html');
const ssrDir = path.join(root, 'dist-ssr');

const SITE = 'https://svodservice.ru/';
const APP = 'https://surveys.svodservice.ru/';

const { render, FAQ_ITEMS } = await import(pathToFileURL(path.join(ssrDir, 'entry-server.js')).href);
const { html, styles } = render();

const offer = (name, price, description) => ({
  '@type': 'Offer',
  name,
  price,
  priceCurrency: 'RUB',
  description,
  url: SITE + '#pricing',
});

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': SITE + '#organization',
      name: 'СВОД Опросы',
      url: SITE,
      logo: SITE + 'logo-512.png',
      email: 'support@svodservice.ru',
      sameAs: ['https://t.me/svodservice'],
    },
    {
      '@type': 'WebSite',
      '@id': SITE + '#website',
      name: 'СВОД Опросы',
      url: SITE,
      inLanguage: 'ru-RU',
      publisher: { '@id': SITE + '#organization' },
    },
    {
      '@type': 'SoftwareApplication',
      name: 'СВОД Опросы',
      url: APP,
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'Web',
      inLanguage: 'ru-RU',
      description:
        'Конструктор опросов с ИИ: анкета по научной методике (CustDev, NPS, SUS, шкала Лайкерта) за 10 секунд, ИИ-анализ ответов с цитатами, без лимита на количество ответов.',
      publisher: { '@id': SITE + '#organization' },
      offers: [
        offer('Старт', '0', 'Безлимит опросов и ответов, 150 тыс. токенов ИИ-аналитика'),
        offer('Исследование', '250', 'Разовый доступ: 2 млн токенов ИИ, все научные методики'),
        offer('Исследователь', '600', 'Подписка на месяц: 6 млн токенов ИИ ежемесячно'),
      ],
    },
    {
      '@type': 'FAQPage',
      mainEntity: FAQ_ITEMS.map((item) => ({
        '@type': 'Question',
        name: item.label,
        acceptedAnswer: { '@type': 'Answer', text: item.children },
      })),
    },
  ],
};

const template = await readFile(indexPath, 'utf8');
if (!template.includes('<!--ssr-outlet-->') || !template.includes('<!--ssr-head-->')) {
  throw new Error('dist/index.html: нет маркеров <!--ssr-head--> / <!--ssr-outlet-->');
}

// '<' внутри JSON экранируется, чтобы текст не мог закрыть тег <script>
const ldScript = `<script type="application/ld+json">${JSON.stringify(jsonLd).replace(/</g, '\\u003c')}</script>`;

const out = template
  .replace('<!--ssr-head-->', `${styles}\n    ${ldScript}`)
  .replace('<!--ssr-outlet-->', html);

await writeFile(indexPath, out);
await rm(ssrDir, { recursive: true, force: true });
console.log(`prerender: dist/index.html, ${Math.round(out.length / 1024)} КБ`);
