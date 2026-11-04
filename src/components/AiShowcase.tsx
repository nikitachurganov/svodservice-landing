import React, { useEffect, useRef, useState } from 'react';
import { Button, Segmented } from 'antd';
import { ArrowRightOutlined } from '@ant-design/icons';

type Mode = 'build' | 'analyze';

const STEPS: Mode[] = ['build', 'analyze'];

/* Each step plays its own phone animation from public/ */
const SCENARIOS: Record<Mode, { label: string; hint: string; demo: string; demoTitle: string }> = {
  build: {
    label: 'ИИ-сборка',
    hint: 'Опишите задачу одним сообщением — ИИ подберёт методику, соберёт анкету и подготовит ссылку, которой можно поделиться.',
    demo: '/ai-form-demo.html?embed=1',
    demoTitle: 'Анимация: ИИ собирает форму по описанию в чате',
  },
  analyze: {
    label: 'ИИ-анализ',
    hint: 'Спросите о результатах — ИИ сгруппирует ответы по темам и подтвердит каждый вывод цитатой.',
    demo: '/ai-analysis-demo.html?embed=1',
    demoTitle: 'Анимация: ИИ разбирает ответы опроса и показывает отчёт с темами и цитатами',
  },
};

const prefersReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export const AiShowcase: React.FC = () => {
  const [mode, setMode] = useState<Mode>('build');
  const stepRefs = useRef<Record<Mode, HTMLDivElement | null>>({ build: null, analyze: null });

  // The step crossing the middle of the screen drives the toggle and the description on the left
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) setMode((entry.target as HTMLElement).dataset.mode as Mode);
        }),
      { rootMargin: '-45% 0px -45% 0px' }
    );
    STEPS.forEach((step) => {
      const el = stepRefs.current[step];
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const goTo = (step: Mode) => {
    setMode(step);
    stepRefs.current[step]?.scrollIntoView({ behavior: prefersReducedMotion() ? 'auto' : 'smooth', block: 'center' });
  };

  return (
    <section id="ai" className="section">
      <div className="container ai-showcase">
        <div className="ai-showcase__intro">
          <h2 className="section-title">Соберём и разберём опрос любой сложности</h2>
          <p className="lead">
            Сначала ИИ собирает анкету с использованием научных методик, потом делает выводы
            по результатам исследования.
          </p>

          <Segmented<Mode>
            className="ai-showcase__modes"
            size="large"
            value={mode}
            onChange={goTo}
            options={STEPS.map((step) => ({ label: SCENARIOS[step].label, value: step }))}
          />
          {/* key restarts the fade-in each time the step changes */}
          <p key={mode} className="ai-showcase__mode-hint">
            {SCENARIOS[mode].hint}
          </p>

          <Button
            type="primary"
            size="large"
            href="https://surveys.svodservice.ru/auth?mode=register"
            icon={<ArrowRightOutlined />}
            iconPlacement="end"
          >
            Попробовать в сервисе
          </Button>
        </div>

        <div className="ai-showcase__steps">
          {STEPS.map((step) => (
            <div
              key={step}
              ref={(el) => {
                stepRefs.current[step] = el;
              }}
              data-mode={step}
              className={`ai-step ${mode === step ? 'is-active' : ''}`}
            >
              {/* On mobile the left column isn't sticky, so each step carries its own caption */}
              <p className="ai-step__hint">
                <strong>{SCENARIOS[step].label}</strong>
                {SCENARIOS[step].hint}
              </p>

              <div className="ai-showcase__phone">
                <iframe
                  src={SCENARIOS[step].demo}
                  title={SCENARIOS[step].demoTitle}
                  loading="lazy"
                  scrolling="no"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
