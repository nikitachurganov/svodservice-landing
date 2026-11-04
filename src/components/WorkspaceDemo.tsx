import React, { useEffect, useRef, useState } from 'react';

const DEMO_SRC = '/workspace-demo.html?embed=1';

export const WorkspaceDemo: React.FC = () => {
  const frameRef = useRef<HTMLIFrameElement>(null);
  // The demo scales its window to the iframe width and reports the height it needs
  const [height, setHeight] = useState<number>();

  useEffect(() => {
    const onMessage = (e: MessageEvent) => {
      if (e.source !== frameRef.current?.contentWindow) return;
      if (e.data?.type === 'svod-workspace-demo' && typeof e.data.height === 'number') setHeight(e.data.height);
    };
    window.addEventListener('message', onMessage);
    return () => window.removeEventListener('message', onMessage);
  }, []);

  return (
    <section id="demo" className="demo-section">
      <div className="container">
        <div className="workspace-demo">
          <iframe
            ref={frameRef}
            src={DEMO_SRC}
            title="СВОД за работой: сбор ответов, проверка качества и ИИ-аналитик"
            loading="lazy"
            scrolling="no"
            style={height ? { height } : undefined}
          />
        </div>
      </div>
    </section>
  );
};
