import React from 'react';
import { EditOutlined, ThunderboltFilled, SafetyCertificateOutlined, BarChartOutlined } from '@ant-design/icons';

const Chip: React.FC<{ icon: React.ReactNode; dark?: boolean }> = ({ icon, dark }) => (
  <span className={`manifesto__chip ${dark ? 'manifesto__chip--dark' : ''}`} aria-hidden="true">
    {icon}
  </span>
);

export const Manifesto: React.FC = () => (
  <section className="section">
    <div className="container">
      {/* nowrap keeps each chip glued to its word and trailing punctuation */}
      <p className="manifesto__text">
        «Опишите <span className="nowrap">задачу <Chip icon={<EditOutlined />} />,</span> ИИ соберёт{' '}
        <span className="nowrap">анкету <Chip icon={<ThunderboltFilled />} dark />,</span> отсеет{' '}
        <span className="nowrap">ботов <Chip icon={<SafetyCertificateOutlined />} />,</span> а выводы будут{' '}
        <span className="nowrap">готовы <Chip icon={<BarChartOutlined />} /></span> раньше, чем остынет кофе.»
      </p>
    </div>
  </section>
);
