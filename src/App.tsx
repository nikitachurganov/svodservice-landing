import React from 'react';
import { Button, ConfigProvider } from 'antd';
import ruRU from 'antd/locale/ru_RU';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { WorkspaceDemo } from './components/WorkspaceDemo';
import { Benefits } from './components/Benefits';
import { AiShowcase } from './components/AiShowcase';
import { AudienceMetrics } from './components/AudienceMetrics';
import { Manifesto } from './components/Manifesto';
import { Pricing } from './components/Pricing';
import { FaqSection } from './components/FaqSection';
import { Footer } from './components/Footer';

export const App: React.FC = () => {
  return (
    <ConfigProvider
      locale={ruRU}
      theme={{
        token: {
          colorPrimary: '#c2410c',
          colorPrimaryHover: '#cf602d',
          colorPrimaryActive: '#9c2802',
          colorLink: '#c2410c',
          colorLinkHover: '#cf602d',
          fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
          borderRadius: 8,
          colorBgContainer: '#ffffff',
          colorBgLayout: '#ffffff',
          colorText: '#211d1a',
          colorTextSecondary: '#6f6862',
          colorBorder: '#d9d4ce',
          colorBorderSecondary: '#e4e0db',
        },
        components: {
          Button: {
            controlHeight: 40,
            controlHeightLG: 48,
            fontWeight: 600,
            primaryShadow: 'none',
            defaultShadow: 'none',
          },
          Input: {
            controlHeightLG: 48,
          },
          Modal: {
            borderRadiusLG: 14,
          },
          Segmented: {
            itemSelectedBg: '#ffffff',
            trackBg: '#f1efec',
          },
        },
      }}
    >
      <div className="landing-app">
        <Header />
        <main>
          {/* 1. Заголовок, описание и генератор опроса */}
          <Hero />

          {/* 2. Демо интерфейса: агенты работают в окне сервиса */}
          <WorkspaceDemo />

          {/* 3. Основные возможности */}
          <Benefits />

          {/* 4. ИИ-сборка и ИИ-анализ в диалоге */}
          <AiShowcase />

          {/* 5. Ценность для каждого сегмента ЦА */}
          <AudienceMetrics />

          {/* 6. Манифест */}
          <Manifesto />

          {/* 7. Тарифы */}
          <Pricing />

          <FaqSection />
        </main>

        {/* 8. Футер */}
        <Footer />

        {/* Плавающая мобильная кнопка */}
        <div className="sticky-cta">
          <Button type="primary" size="large" block href="https://surveys.svodservice.ru/auth?mode=register">
            Создать опрос бесплатно
          </Button>
        </div>
      </div>
    </ConfigProvider>
  );
};

export default App;
