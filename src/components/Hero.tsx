import React, { useState } from 'react';
import { ArrowUpOutlined } from '@ant-design/icons';
import { AiDemoModal } from './AiDemoModal';

export const Hero: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [submittedPrompt, setSubmittedPrompt] = useState('');

  const handleCreate = () => {
    const text = prompt.trim();
    if (!text) return;
    setSubmittedPrompt(text);
    setIsModalOpen(true);
  };

  return (
    <section className="hero">
      <div className="container">
        <h1 className="hero-title">Создай опрос по научным методикам за 10 секунд</h1>

        <p className="hero-lead lead">
          <strong>ИИ подберёт методики, составит вопросы и подготовит анкету.</strong> Лимита
          на количество ответов — нет.
        </p>

        <form
          className="hero-form"
          onSubmit={(e) => {
            e.preventDefault();
            handleCreate();
          }}
        >
          <input
            className="hero-form__field"
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Например: почему клиенты уходят к конкурентам"
            aria-label="Тема или цель опроса"
          />
          <button
            type="submit"
            className="hero-form__send"
            disabled={!prompt.trim()}
            aria-label="Собрать опрос"
          >
            <ArrowUpOutlined />
          </button>
        </form>
      </div>

      <AiDemoModal
        isOpen={isModalOpen}
        initialPrompt={submittedPrompt}
        onClose={() => setIsModalOpen(false)}
      />
    </section>
  );
};
