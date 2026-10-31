import React from 'react';
import { ReadOutlined, ExperimentOutlined, RiseOutlined, TeamOutlined } from '@ant-design/icons';

const METRICS = [
  {
    value: '10 сек',
    label: 'на анкету для диплома',
    text: 'ИИ соберёт анкету по ГОСТ со шкалами Лайкерта и паспортом исследования для второй главы.',
    icon: <ReadOutlined />,
    segment: 'Студенты и учёные',
  },
  {
    value: '5 мин',
    label: 'на разбор открытых ответов',
    text: 'ИИ сгруппирует боли из CustDev-интервью и подтвердит каждый вывод цитатой.',
    icon: <ExperimentOutlined />,
    segment: 'Продакты и стартапы',
  },
  {
    value: '0',
    label: 'лимитов на сбор ответов',
    text: 'NPS, CSAT и CES без блокировки опроса посреди кампании.',
    icon: <RiseOutlined />,
    segment: 'Маркетинг и CX',
  },
  {
    value: '−80%',
    label: 'времени на отчёт',
    text: 'Пульс-опросы и eNPS со смартфона без регистрации. Руководитель получает готовую выжимку.',
    icon: <TeamOutlined />,
    segment: 'HR и команды',
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
          <li key={m.segment} className="metric">
            <span className="metric__value">{m.value}</span>
            <span className="metric__label">{m.label}</span>
            <p className="metric__text">{m.text}</p>
            <div className="metric__who">
              <span className="metric__who-icon" aria-hidden="true">
                {m.icon}
              </span>
              {m.segment}
            </div>
          </li>
        ))}
      </ul>
    </div>
  </section>
);
