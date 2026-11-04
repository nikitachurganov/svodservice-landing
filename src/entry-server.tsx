/**
 * Серверный вход для пререндера при сборке (scripts/prerender.mjs).
 * Отдаёт HTML лендинга и стили antd, чтобы поисковик видел текст страницы без выполнения JS.
 */
import { renderToString } from 'react-dom/server';
import { StyleProvider, createCache, extractStyle } from '@ant-design/cssinjs';
import App from './App';

export { FAQ_ITEMS } from './components/FaqSection';

export function render(): { html: string; styles: string } {
  const cache = createCache();
  const html = renderToString(
    <StyleProvider cache={cache}>
      <App />
    </StyleProvider>
  );
  return { html, styles: extractStyle(cache) };
}
