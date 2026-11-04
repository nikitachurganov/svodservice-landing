import React from 'react';
import unlimitedAnswersImg from '../assets/unlimited-answers.svg';
import aiBuilderImg from '../assets/feature-ai-builder.svg';
import qualityImg from '../assets/feature-quality.svg';
import analysisImg from '../assets/feature-analysis.svg';
import exportImg from '../assets/feature-export.svg';

const ITEMS = [
  { image: unlimitedAnswersImg, title: 'Безлимит ответов', text: 'Даже на бесплатном тарифе можно проводить масштабные опросы.' },
  { image: aiBuilderImg, title: 'ИИ-конструктор анкет', text: 'Из описания задачи в готовую анкету за несколько секунд.' },
  {
    image: qualityImg,
    title: 'Проверка качества ответов',
    text: 'Ответы ботов и прохождения «наугад» можно исключить из анализа.',
  },
  {
    image: analysisImg,
    title: 'Продвинутый анализ ответов',
    text: 'Главные выводы по качественным данным, кросс-табуляция, корреляция, графики, а также ИИ-чат для анализа.',
  },
  {
    image: exportImg,
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
            <img className="feature-cell__media" src={item.image} alt="" aria-hidden="true" />
            <h3>{item.title}</h3>
            <p>{item.text}</p>
          </li>
        ))}
      </ul>
    </div>
  </section>
);
