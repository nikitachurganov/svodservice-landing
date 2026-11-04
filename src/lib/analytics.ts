/**
 * Яндекс Метрика: счётчик и цели лендинга.
 * ID счётчика берётся из VITE_YM_ID на этапе сборки; без него аналитика отключена.
 */

type YmFn = ((id: number, method: string, ...args: unknown[]) => void) & {
  a?: unknown[][];
  l?: number;
};

declare global {
  interface Window {
    ym?: YmFn;
  }
}

const YM_ID = Number(import.meta.env.VITE_YM_ID);

export type GoalParams = Record<string, string | number | boolean>;

// Идентификаторы целей. Те же имена нужно создать в Метрике (тип «JavaScript-событие»)
export const GOALS = {
  register: 'register_click',
  telegram: 'telegram_click',
  email: 'email_click',
  demoSubmit: 'demo_submit',
  demoGenerated: 'demo_generated',
  demoError: 'demo_error',
  demoContinue: 'demo_continue',
} as const;

export function reachGoal(goal: string, params?: GoalParams): void {
  if (!YM_ID || !window.ym) return;
  window.ym(YM_ID, 'reachGoal', goal, params);
}

// Откуда на странице кликнули: шапка, плавающая кнопка, модалка демо или секция по id
const PLACES: Array<[selector: string, place: string]> = [
  ['.app-header', 'header'],
  ['.sticky-cta', 'sticky'],
  ['.site-footer', 'footer'],
  ['.ant-modal', 'demo_modal'],
];

function getPlace(el: Element): string {
  for (const [selector, place] of PLACES) {
    if (el.closest(selector)) return place;
  }
  return el.closest('section[id]')?.id ?? 'page';
}

function trackLinkClick(event: MouseEvent): void {
  const link = (event.target as Element | null)?.closest<HTMLAnchorElement>('a[href]');
  if (!link) return;

  const url = new URL(link.href, window.location.href);

  if (url.protocol === 'mailto:') {
    reachGoal(GOALS.email);
  } else if (url.hostname === 't.me') {
    reachGoal(GOALS.telegram, { place: getPlace(link) });
  } else if (url.hostname === 'surveys.svodservice.ru' && url.pathname === '/auth') {
    const plan = url.searchParams.get('plan');
    reachGoal(GOALS.register, { place: getPlace(link), ...(plan ? { plan } : {}) });
  }
}

export function initAnalytics(): void {
  if (!YM_ID || window.ym) return;

  const ym: YmFn = (...args) => {
    (ym.a = ym.a ?? []).push(args);
  };
  ym.l = Date.now();
  window.ym = ym;

  const script = document.createElement('script');
  script.async = true;
  script.src = `https://mc.yandex.ru/metrika/tag.js?id=${YM_ID}`;
  document.head.appendChild(script);

  ym(YM_ID, 'init', {
    clickmap: true,
    trackLinks: true,
    accurateTrackBounce: true,
    webvisor: true,
  });

  document.addEventListener('click', trackLinkClick);
}
