import React from 'react';
import {
  SyncOutlined,
  ThunderboltOutlined,
  SafetyCertificateOutlined,
  MessageOutlined,
  FileExcelOutlined,
} from '@ant-design/icons';

const ITEMS = [
  { icon: <SyncOutlined />, title: 'Безлимит ответов', text: 'Даже на бесплатном тарифе можно проводить масштабные опросы.' },
  { icon: <ThunderboltOutlined />, title: 'ИИ-конструктор анкет', text: 'Из описания задачи в готовую анкету за несколько секунд.' },
  {
    icon: <SafetyCertificateOutlined />,
    title: 'Проверка качества ответов',
    text: 'Ответы ботов и прохождения «наугад» можно исключить из анализа.',
  },
  {
    icon: <MessageOutlined />,
    title: 'Продвинутый анализ ответов',
    text: 'Главные выводы по качественным данным, кросс-табуляция, корреляция, графики, а также ИИ-чат для анализа.',
  },
  {
    icon: <FileExcelOutlined />,
    title: 'Экспорт в Excel, CSV и PDF',
    text: 'Сырые данные, графики и аналитический отчёт в один клик.',
  },
];

export const Benefits: React.FC = () => (
  <section id="features" className="section">
    <div className="container">
      <div className="section-head">
        <div className="section-head__text section-head__text--wide">
          <h2 className="section-title section-title--one-line">Всё для исследования в одном месте</h2>
          <p className="lead">
            <strong>От идеи исследования до готовых выводов.</strong>
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
