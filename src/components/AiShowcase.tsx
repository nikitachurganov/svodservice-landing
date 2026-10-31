import React, { useEffect, useRef, useState } from 'react';
import { Button, Segmented } from 'antd';
import { ArrowRightOutlined, DownOutlined, UpOutlined, MessageOutlined } from '@ant-design/icons';
import { DEMO_AI_BUILD, DEMO_AI_ANALYZE, type DemoMessage, type DemoInsight } from '../data/landingData';

type Mode = 'build' | 'analyze';

const SCENARIOS: Record<Mode, { messages: DemoMessage[]; hint: string }> = {
  build: {
    messages: DEMO_AI_BUILD,
    hint: 'Опишите задачу — ИИ подберёт методику, составит вопросы и поправит их по вашей просьбе.',
  },
  analyze: {
    messages: DEMO_AI_ANALYZE,
    hint: 'Спросите о результатах — ИИ сгруппирует ответы по темам и подтвердит каждый вывод цитатой.',
  },
};

const REVEAL_STEP_MS = 900;

const pluralMessages = (n: number) => {
  const mod10 = n % 10;
  const mod100 = n % 100;
  if (mod10 === 1 && mod100 !== 11) return 'сообщение';
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14)) return 'сообщения';
  return 'сообщений';
};

const prefersReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const Insight: React.FC<{ insight: DemoInsight; defaultOpen: boolean }> = ({ insight, defaultOpen }) => {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <li className="chat-item">
      <div className="chat-item__row">
        <span>{insight.title}</span>
        <span className="chat-item__share">{insight.share}</span>
      </div>
      <button type="button" className="chat-item__toggle" aria-expanded={open} onClick={() => setOpen(!open)}>
        Цитата {open ? <UpOutlined style={{ fontSize: 10 }} /> : <DownOutlined style={{ fontSize: 10 }} />}
      </button>
      {open && <p className="chat-item__quote">{insight.quote}</p>}
    </li>
  );
};

const ChatMessage: React.FC<{ msg: DemoMessage }> = ({ msg }) => {
  const isAi = msg.role === 'ai';
  return (
    <div className={`chat-msg ${isAi ? 'chat-msg--ai' : ''}`}>
      <span className="chat-msg__avatar" aria-hidden="true">
        {isAi ? 'ИИ' : 'Вы'}
      </span>
      <div>
        <p className="chat-msg__who">
          <strong>{isAi ? 'СВОД ИИ' : 'Вы'}</strong>, {isAi ? 'методолог' : 'исследователь'}
        </p>
        <div className="chat-msg__bubble">
          <p>{msg.text}</p>

          {msg.questions && (
            <ul className="chat-msg__items">
              {msg.questions.map((q) => (
                <li key={q.text} className="chat-item">
                  <span className="chat-item__type">{q.type}</span>
                  {q.text}
                </li>
              ))}
            </ul>
          )}

          {msg.insights && (
            <ul className="chat-msg__items">
              {msg.insights.map((insight, idx) => (
                <Insight key={insight.title} insight={insight} defaultOpen={idx === 0} />
              ))}
            </ul>
          )}

          {msg.note && <p className="chat-msg__note">{msg.note}</p>}
        </div>
      </div>
    </div>
  );
};

export const AiShowcase: React.FC = () => {
  const [mode, setMode] = useState<Mode>('build');
  const [inView, setInView] = useState(false);
  const [shown, setShown] = useState(0);
  const panelRef = useRef<HTMLDivElement>(null);

  const { messages, hint } = SCENARIOS[mode];

  // Start the dialogue only once the panel scrolls into view
  useEffect(() => {
    const el = panelRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Reveal messages one by one; restart when the scenario changes
  useEffect(() => {
    if (!inView) return;
    if (prefersReducedMotion()) {
      setShown(messages.length);
      return;
    }
    setShown(0);
    const timers = messages.map((_, idx) => window.setTimeout(() => setShown(idx + 1), idx * REVEAL_STEP_MS));
    return () => timers.forEach((t) => window.clearTimeout(t));
  }, [inView, messages]);

  return (
    <section id="ai" className="section">
      <div className="container ai-showcase">
        <div className="ai-showcase__intro">
          <h2 className="section-title">ИИ, который собирает и разбирает опросы</h2>
          <p className="lead">
            <strong>Два режима в одном диалоге.</strong> Сначала ИИ собирает анкету по научной методике,
            потом находит выводы в ответах.
          </p>

          <Segmented<Mode>
            size="large"
            value={mode}
            onChange={setMode}
            options={[
              { label: 'ИИ-сборка', value: 'build' },
              { label: 'ИИ-анализ', value: 'analyze' },
            ]}
          />
          <p className="ai-showcase__mode-hint">{hint}</p>

          <Button
            type="primary"
            size="large"
            href="https://surveys.svodservice.ru/auth?mode=register"
            icon={<ArrowRightOutlined />}
            iconPlacement="end"
          >
            Попробовать в сервисе
          </Button>
          <p className="caption">Пример диалога. В сервисе ИИ работает с вашими данными.</p>
        </div>

        <div ref={panelRef} className="chat-panel grid-frame">
          <div className="chat-panel__head">
            <span>
              <MessageOutlined /> Диалог с ИИ
            </span>
            <span>
              {messages.length} {pluralMessages(messages.length)}
            </span>
          </div>
          <div className="chat-panel__body" aria-live="polite">
            {messages.slice(0, shown).map((msg, idx) => (
              <ChatMessage key={`${mode}-${idx}`} msg={msg} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
