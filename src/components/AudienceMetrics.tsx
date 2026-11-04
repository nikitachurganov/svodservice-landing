import React from 'react';

const METRICS = [
  {
    value: '< 10 сек',
    label: 'на анкету любой сложности',
    text: 'ИИ соберёт анкету по ГОСТ со шкалами Лайкерта и паспортом исследования для второй главы.',
  },
  {
    value: '5 мин',
    label: 'на анализ качественных данных',
    text: 'ИИ сгруппирует боли из CustDev-интервью и подтвердит каждый вывод цитатой.',
  },
  {
    value: '∞',
    label: 'ответов, лимитов нет',
    text: 'NPS, CSAT и CES без блокировки опроса посреди кампании.',
  },
  {
    value: '−80%',
    label: 'времени на создание отчёта',
    text: 'Пульс-опросы и eNPS со смартфона без регистрации. Руководитель получает готовую выжимку.',
  },
];

export const AudienceMetrics: React.FC = () => (
  <section id="audiences" className="section">
    <div className="container">
      <div className="section-head">
        <div className="section-head__text section-head__text--wide">
          <h2 className="section-title section-title--one-line">Что получает каждая команда</h2>
          <p className="lead">
            <strong>Четыре сценария, четыре результата.</strong> Сколько времени и ограничений
            убирает СВОД в типичной задаче.
          </p>
        </div>
      </div>

      <ul className="metrics-row">
        {METRICS.map((m) => (
          <li key={m.value} className="metric">
            <span className="metric__value">{m.value}</span>
            <span className="metric__label">{m.label}</span>
            <p className="metric__text">{m.text}</p>
          </li>
        ))}
      </ul>
    </div>
  </section>
);
