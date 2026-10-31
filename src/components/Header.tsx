import React, { useState, useEffect } from 'react';
import { Button, Drawer } from 'antd';
import { MenuOutlined, CloseOutlined } from '@ant-design/icons';
import logoUrl from '../assets/logo.svg';

const NAV_ITEMS = [
  { id: 'features', label: 'Возможности' },
  { id: 'ai', label: 'ИИ' },
  { id: 'audiences', label: 'Для кого' },
  { id: 'pricing', label: 'Тарифы' },
  { id: 'faq', label: 'FAQ' },
];

export const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('');

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 100;
      const current = NAV_ITEMS.find((item) => {
        const el = document.getElementById(item.id);
        return el && scrollPos >= el.offsetTop && scrollPos < el.offsetTop + el.offsetHeight;
      });
      setActiveSection(current ? current.id : '');
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="app-header" role="banner">
      <div className="container app-header__container">
        <div className="app-header-brand">
          <a href="#" className="app-header-brand__link" aria-label="СВОД Опросы — на главную">
            <img src={logoUrl} alt="СВОД" className="app-header-brand__logo" />
            <span className="app-header-brand__name">Опросы</span>
          </a>
        </div>

        <nav className="app-nav" aria-label="Основная навигация">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={`app-nav__item ${activeSection === item.id ? 'active' : ''}`}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="app-header__actions">
          <Button type="primary" href="https://surveys.svodservice.ru/auth?mode=register">
            Начать бесплатно
          </Button>

          <Button
            type="text"
            icon={mobileMenuOpen ? <CloseOutlined /> : <MenuOutlined />}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="app-header__burger"
            aria-label={mobileMenuOpen ? 'Закрыть меню' : 'Открыть меню'}
          />
        </div>
      </div>

      {/* Мобильный Drawer на базе Ant Design */}
      <Drawer
        open={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        placement="right"
        title="Навигация"
        styles={{
          body: { display: 'flex', flexDirection: 'column', gap: 4, padding: '16px 20px' },
        }}
      >
        {NAV_ITEMS.map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            className="mobile-nav__link"
            onClick={() => setMobileMenuOpen(false)}
          >
            {item.label}
          </a>
        ))}
        <Button
          type="primary"
          size="large"
          block
          href="https://surveys.svodservice.ru/auth?mode=register"
          onClick={() => setMobileMenuOpen(false)}
          style={{ marginTop: 16 }}
        >
          Создать опрос бесплатно
        </Button>
      </Drawer>
    </header>
  );
};
