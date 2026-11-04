import React, { useEffect, useRef, useState } from 'react';
import { EditOutlined, SafetyCertificateOutlined, BarChartOutlined } from '@ant-design/icons';

/* "AI sparkles": one large four-point star and two small ones, in the logo's gradient */
const SparklesIcon: React.FC = () => (
  <svg className="manifesto__sparkles" viewBox="0 0 24 24" fill="url(#manifesto-sparkles-fill)" aria-hidden="true">
    <defs>
      <linearGradient id="manifesto-sparkles-fill" x1="1" y1="0" x2="0" y2="0">
        <stop stopColor="#FD6A12" />
        <stop offset="1" stopColor="#FBA674" />
      </linearGradient>
    </defs>
    <path d="M10 4c.6 4.6 2.4 6.4 7 7-4.6.6-6.4 2.4-7 7-.6-4.6-2.4-6.4-7-7 4.6-.6 6.4-2.4 7-7z" />
    <path d="M18.5 1.5c.3 1.9 1.1 2.7 3 3-1.9.3-2.7 1.1-3 3-.3-1.9-1.1-2.7-3-3 1.9-.3 2.7-1.1 3-3z" />
    <path d="M19 15.5c.2 1.3.7 1.8 2 2-1.3.2-1.8.7-2 2-.2-1.3-.7-1.8-2-2 1.3-.2 1.8-.7 2-2z" />
  </svg>
);

type ChipToken = { word: string; icon: React.ReactNode; bare?: boolean; tail?: string };
type Token = string | ChipToken;

const TOKENS: Token[] = [
  '«Опишите',
  { word: 'задачу', icon: <EditOutlined />, tail: ',' },
  'ИИ',
  'соберёт',
  { word: 'анкету', icon: <SparklesIcon />, bare: true, tail: ',' },
  'отсеет',
  { word: 'ботов', icon: <SafetyCertificateOutlined />, tail: ',' },
  'а',
  'выводы',
  'будут',
  { word: 'готовы', icon: <BarChartOutlined /> },
  'раньше,',
  'чем',
  'остынет',
  'кофе.»',
];

const Chip: React.FC<{ icon: React.ReactNode; bare?: boolean }> = ({ icon, bare }) => (
  <span className={`manifesto__chip ${bare ? 'manifesto__chip--bare' : ''}`} aria-hidden="true">
    {icon}
  </span>
);

/* Words light up one by one: from the block's top at 85% of the viewport until its bottom reaches 55% */
const useLitCount = (ref: React.RefObject<HTMLElement | null>, total: number) => {
  const [lit, setLit] = useState(0);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setLit(total);
      return;
    }

    let frame = 0;
    const update = () => {
      frame = 0;
      const el = ref.current;
      if (!el) return;
      const vh = window.innerHeight;
      const { top, height } = el.getBoundingClientRect();
      const progress = (vh * 0.85 - top) / (height + vh * 0.3);
      setLit(Math.round(Math.min(Math.max(progress, 0), 1) * total));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [ref, total]);

  return lit;
};

export const Manifesto: React.FC = () => {
  const textRef = useRef<HTMLParagraphElement>(null);
  const lit = useLitCount(textRef, TOKENS.length);

  return (
    <section className="section">
      <div className="container">
        <p className="manifesto__text" ref={textRef}>
          {TOKENS.map((token, i) => {
            const cls = `manifesto__word ${i < lit ? 'is-lit' : ''}`;
            const space = i < TOKENS.length - 1 ? ' ' : '';
            if (typeof token === 'string') {
              return (
                <React.Fragment key={i}>
                  <span className={cls}>{token}</span>
                  {space}
                </React.Fragment>
              );
            }
            // nowrap keeps each chip glued to its word and trailing punctuation
            return (
              <React.Fragment key={i}>
                <span className={`${cls} nowrap`}>
                  {token.word} <Chip icon={token.icon} bare={token.bare} />
                  {token.tail}
                </span>
                {space}
              </React.Fragment>
            );
          })}
        </p>
      </div>
    </section>
  );
};
