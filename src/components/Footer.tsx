import React from 'react';

const NAV = [
  ['Возможности', 'features'],
  ['ИИ', 'ai'],
  ['Для кого', 'audiences'],
  ['Тарифы', 'pricing'],
  ['FAQ', 'faq'],
];

const LEGAL = [
  ['Публичная оферта', 'offer'],
  ['Условия возврата', 'refund'],
  ['Политика конфиденциальности', 'privacy'],
  ['Пользовательское соглашение', 'terms'],
  ['Контакты и реквизиты', 'contacts'],
];

export const Footer: React.FC = () => (
  <footer className="site-footer">
    <div className="container">
      <div className="site-footer__top">
        <p className="site-footer__statement">
          <strong>СВОД Опросы — исследования без рутины.</strong> Анкета по научной методике,
          чистые данные и выводы с цитатами в одном сервисе.
        </p>
        <div className="site-footer__contacts">
          <a href="mailto:support@svodservice.ru">support@svodservice.ru</a>
          <a href="https://t.me/svodservice" target="_blank" rel="noopener noreferrer">
            Telegram
          </a>
          <span>Ежедневно 09:00–21:00 МСК</span>
        </div>
      </div>

      <nav className="site-footer__nav" aria-label="Разделы">
        {NAV.map(([label, id]) => (
          <a key={id} href={`#${id}`}>
            {label}
          </a>
        ))}
      </nav>

      <div className="site-footer__bottom">
        <span>© {new Date().getFullYear()} СВОД Опросы</span>
        <div className="site-footer__legal">
          {LEGAL.map(([label, id]) => (
            <a key={id} href={`https://surveys.svodservice.ru/legal#${id}`} target="_blank" rel="noopener noreferrer">
              {label}
            </a>
          ))}
        </div>
      </div>

      <p className="site-footer__requisites">
        Исполнитель: самозанятый Чурганов Никита Сергеевич, ИНН 253610208186.
      </p>

      <div className="site-footer__wordmark" aria-hidden="true">
        СВОД
      </div>
    </div>
  </footer>
);
