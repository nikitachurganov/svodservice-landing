import React from 'react';
import {
  SyncOutlined,
  ThunderboltOutlined,
  SafetyCertificateOutlined,
  MessageOutlined,
  FileExcelOutlined,
} from '@ant-design/icons';

const ITEMS = [
  { icon: <SyncOutlined />, title: 'Безлимит ответов', text: 'Опрос не закроется на сотом ответе ни на одном тарифе.' },
  { icon: <ThunderboltOutlined />, title: 'ИИ-сборка анкеты', text: 'Из описания задачи в готовую анкету за секунды.' },
  { icon: <SafetyCertificateOutlined />, title: 'Ловушки внимания', text: 'Боты и случайные клики не попадут в выборку.' },
  { icon: <MessageOutlined />, title: 'ИИ-анализ ответов', text: 'Темы, проценты и цитаты из открытых ответов.' },
  { icon: <FileExcelOutlined />, title: 'Экспорт в Excel и CSV', text: 'Сырые данные и графики в один клик.' },
];

export const Benefits: React.FC = () => (
  <section id="features" className="section">
    <div className="container">
      <div className="section-head">
        <div className="section-head__text section-head__text--wide">
          <h2 className="section-title section-title--one-line">Всё для исследования в одном месте</h2>
          <p className="lead">
            <strong>От первого вопроса до готовых выводов.</strong> Не нужно склеивать формы,
            таблицы и ручной разбор ответов.
          </p>
        </div>
      </div>

      <ul className="feature-grid">
        {ITEMS.map((item) => (
          <li key={item.title} className="feature-cell">
            <span className="feature-cell__icon" aria-hidden="true">
              {item.icon}
            </span>
            <h3>{item.title}</h3>
            <p>{item.text}</p>
          </li>
        ))}
      </ul>
    </div>
  </section>
);
