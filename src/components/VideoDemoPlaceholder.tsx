import React, { useState } from 'react';
import { Modal, Typography, Button } from 'antd';
import { CaretRightOutlined, VideoCameraOutlined, ClockCircleOutlined } from '@ant-design/icons';

const { Title, Paragraph, Text } = Typography;

export const VideoDemoPlaceholder: React.FC = () => {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  return (
    <section id="demo" className="demo-section">
      <div className="container">
        <div className="video-demo-wrap grid-frame">
        {/* Каркас окна видеоплеера */}
        <div
          className="video-demo-frame"
          onClick={() => setIsVideoModalOpen(true)}
          role="button"
          tabIndex={0}
          aria-label="Запустить видео-демо сервиса"
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              setIsVideoModalOpen(true);
            }
          }}
        >
          {/* Верхняя панель окна браузера (Window Chrome) */}
          <div className="video-demo-topbar">
            <div className="video-demo-dots">
              <span className="dot dot--red"></span>
              <span className="dot dot--yellow"></span>
              <span className="dot dot--green"></span>
            </div>

            <div className="video-demo-url-pill">
              <VideoCameraOutlined style={{ marginRight: 6 }} />
              <span>surveys.svodservice.ru · Демо-обзор интерфейса</span>
            </div>

            <div className="video-demo-duration">
              <ClockCircleOutlined style={{ marginRight: 4 }} />
              <span>1:20</span>
            </div>
          </div>

          {/* Внутренняя область с превью интерфейса и центральной кнопкой Play */}
          <div className="video-demo-screen">
            {/* Стилизованный фоновый макет конструктора и ИИ-аналитики */}
            <div className="video-demo-bg-mockup">
              <div className="mockup-sidebar">
                <div className="mockup-line mockup-line--sm"></div>
                <div className="mockup-line mockup-line--md"></div>
                <div className="mockup-line mockup-line--lg"></div>
                <div className="mockup-box"></div>
              </div>
              <div className="mockup-main">
                <div className="mockup-header-bar">
                  <div className="mockup-title-bar"></div>
                  <div className="mockup-btn-bar"></div>
                </div>
                <div className="mockup-cards-row">
                  <div className="mockup-card"></div>
                  <div className="mockup-card"></div>
                </div>
                <div className="mockup-chart-box"></div>
              </div>
            </div>

            {/* Центральный оверлей с кнопкой Play */}
            <div className="video-demo-overlay">
              <div className="video-demo-play-btn">
                <CaretRightOutlined style={{ fontSize: 32, marginLeft: 4 }} />
              </div>

              <div style={{ textAlign: 'center', marginTop: 18 }}>
                <Title level={4} style={{ color: '#ffffff', margin: '0 0 6px', fontSize: 18, textShadow: '0 2px 8px rgba(0,0,0,0.4)' }}>
                  Посмотрите 1-минутное демо сервиса
                </Title>
                <Text style={{ color: 'rgba(255, 255, 255, 0.85)', fontSize: 14 }}>
                  Как ИИ подбирает методологию, составляет вопросы и находит инсайты в ответах
                </Text>
              </div>

            </div>
          </div>
        </div>
        </div>

        {/* Модальное окно при клике на видео-заглушку */}
        <Modal
          open={isVideoModalOpen}
          onCancel={() => setIsVideoModalOpen(false)}
          title="Видео-демо сервиса «СВОД Опросы»"
          centered
          footer={[
            <Button key="close" onClick={() => setIsVideoModalOpen(false)}>
              Закрыть
            </Button>,
            <Button
              key="start"
              type="primary"
              href="https://surveys.svodservice.ru/auth?mode=register"
            >
              Создать опрос в сервисе
            </Button>,
          ]}
        >
          <div style={{ padding: '20px 0', textAlign: 'center' }}>
            <div
              style={{
                width: 64,
                height: 64,
                borderRadius: '50%',
                background: 'var(--brand-50)',
                color: 'var(--brand-500)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 16px',
                fontSize: 28,
              }}
            >
              <VideoCameraOutlined />
            </div>

            <Title level={4} style={{ marginBottom: 8 }}>
              Видеоролик монтируется
            </Title>

            <Paragraph type="secondary" style={{ maxWidth: 440, margin: '0 auto 20px' }}>
              Финальный скринкаст с демонстрацией всех 16 методологий и работы ИИ-аналитика загружается на видеохостинг.
              Вы можете протестировать генерацию анкеты прямо сейчас в форме выше!
            </Paragraph>
          </div>
        </Modal>
      </div>
    </section>
  );
};
