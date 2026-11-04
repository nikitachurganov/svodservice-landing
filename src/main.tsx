import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { initAnalytics } from './lib/analytics';

initAnalytics();

const rootEl = document.getElementById('root') as HTMLElement;
const app = (
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// В проде HTML уже пререндерен (scripts/prerender.mjs) — гидрируем его, в dev рендерим с нуля
if (rootEl.firstElementChild) {
  ReactDOM.hydrateRoot(rootEl, app);
} else {
  ReactDOM.createRoot(rootEl).render(app);
}
