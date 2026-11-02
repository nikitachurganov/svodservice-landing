import React from 'react';
import { Button } from 'antd';
import { CheckCircleOutlined } from '@ant-design/icons';

const REGISTER = 'https://surveys.svodservice.ru/auth?mode=register';

const PLANS = [
  {
    name: 'Старт',
    price: '0 ₽',
    items: [
      'Безлимит опросов и ответов',
      '150 тыс. токенов ИИ-аналитика',
      'Базовые графики и таблицы',
      'Экспорт данных в Excel / CSV',
    ],
    cta: 'Начать бесплатно',
    href: REGISTER,
    featured: false,
  },
  {
    name: 'Исследование',
    price: '250 ₽',
    items: [
      'Безлимит опросов и ответов',
      '2 млн токенов ИИ-аналитика',
      'Все 16+ научных методик',
      'Методологический паспорт для ВКР',
      'Умный фильтр ботов и ловушки внимания',
    ],
    cta: 'Выбрать за 250 ₽',
    href: `${REGISTER}&plan=single`,
    featured: true,
  },
  {
    name: 'Исследователь',
    price: '600 ₽',
    items: [
      'Безлимит опросов и ответов',
      '6 млн токенов ИИ-аналитика ежемесячно',
      'Кросс-таблицы корреляций',
      'Собственный брендинг анкет',
      'Приоритетная поддержка 24/7',
    ],
    cta: 'Оформить подписку',
    href: `${REGISTER}&plan=pro`,
    featured: false,
  },
];

export const Pricing: React.FC = () => (
  <section id="pricing" className="section" aria-label="Тарифы">
    <div className="container">
      <ul className="price-table">
        {PLANS.map((p) => (
          <li key={p.name} className={`price-col ${p.featured ? 'price-col--featured' : ''}`}>
            <div className="price-col__head">
              <h3>{p.name}</h3>
              {p.featured && <span className="price-col__badge">Выбор специалистов</span>}
            </div>
            <b className="price-col__price">{p.price}</b>

            <ul className="price-col__list">
              {p.items.map((it) => (
                <li key={it}>
                  <CheckCircleOutlined />
                  <span>{it}</span>
                </li>
              ))}
            </ul>

            <Button block size="large" type={p.featured ? 'primary' : 'default'} href={p.href}>
              {p.cta}
            </Button>
          </li>
        ))}
      </ul>
    </div>
  </section>
);
