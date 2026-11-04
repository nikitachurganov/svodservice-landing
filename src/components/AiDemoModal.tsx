import React, { useState, useEffect } from 'react';
import { Modal, Button, Spin, Alert, Tag } from 'antd';
import {
  ArrowRightOutlined,
  LockOutlined,
  SafetyCertificateOutlined,
  CheckCircleFilled,
} from '@ant-design/icons';
import {
  generateSurveyApi,
  getContinueUrl,
  type SurveyDraft,
  type SurveyQuestion,
} from '../lib/surveyApi';
import { GOALS, reachGoal } from '../lib/analytics';

interface AiDemoModalProps {
  isOpen: boolean;
  initialPrompt: string;
  onClose: () => void;
}

// Questions shown in full; the next few are blurred behind the lock
const VISIBLE_COUNT = 4;
const BLURRED_COUNT = 2;

const QuestionCard: React.FC<{ q: SurveyQuestion }> = ({ q }) => (
  <li className="question-card">
    <div className="question-card__top">
      <span className="question-card__num">{q.number}</span>
      <span className="question-card__type">{q.typeLabel}</span>
    </div>
    <p className="question-card__text">{q.text}</p>

    {(q.type === 'likert_scale_5' || q.type === 'scale_0_10') && (
      <div>
        <div className="scale-preview__pills">
          {(q.type === 'likert_scale_5' ? [1, 2, 3, 4, 5] : [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]).map((v) => (
            <span key={v} className={`scale-pill ${q.type === 'scale_0_10' ? 'scale-pill--sm' : ''}`}>
              {v}
            </span>
          ))}
        </div>
        {q.scaleLabels && (
          <div className="scale-preview__labels">
            <span>{q.scaleLabels.min}</span>
            <span>{q.scaleLabels.max}</span>
          </div>
        )}
      </div>
    )}

    {q.type === 'attention_check' && (
      <p className="attention-note">
        <SafetyCertificateOutlined />
        Ловушка внимания: отсеивает невнимательных респондентов
      </p>
    )}

    {(q.type === 'single_choice' || q.type === 'multiple_choice' || q.type === 'attention_check') && q.options && (
      <ul className="choice-list">
        {q.options.map((opt) => (
          <li key={opt} className="choice-item">
            <span className={`choice-circle ${q.type === 'multiple_choice' ? 'choice-circle--sq' : ''}`} />
            {opt}
          </li>
        ))}
      </ul>
    )}

    {q.type === 'open_text' && <div className="open-text-preview">Поле для развёрнутого ответа</div>}
  </li>
);

export const AiDemoModal: React.FC<AiDemoModalProps> = ({ isOpen, initialPrompt, onClose }) => {
  const [survey, setSurvey] = useState<SurveyDraft | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Generate the survey every time the modal opens with a new prompt
  useEffect(() => {
    if (!isOpen || !initialPrompt.trim()) return;

    let isMounted = true;
    setLoading(true);
    setError(null);
    setSurvey(null);

    generateSurveyApi(initialPrompt)
      .then((data) => {
        if (!isMounted) return;
        reachGoal(GOALS.demoGenerated, { source: data.from_service ? 'service' : 'template' });
        setSurvey(data);
        setLoading(false);
      })
      .catch((err: Error) => {
        if (!isMounted) return;
        reachGoal(GOALS.demoError);
        setLoading(false);
        setError(err.message || 'Ошибка генерации. Попробуйте ещё раз.');
      });

    return () => {
      isMounted = false;
    };
  }, [isOpen, initialPrompt]);

  const handleProceedToService = () => {
    if (!survey) return;
    reachGoal(GOALS.demoContinue);
    window.location.href = getContinueUrl(survey);
  };

  const visible = survey ? survey.questions.slice(0, VISIBLE_COUNT) : [];
  const blurred = survey ? survey.questions.slice(VISIBLE_COUNT, VISIBLE_COUNT + BLURRED_COUNT) : [];
  const hiddenCount = survey ? Math.max(0, survey.total_questions - VISIBLE_COUNT) : 0;

  return (
    <Modal
      open={isOpen}
      onCancel={onClose}
      footer={
        survey && (
          <div className="survey-modal__foot">
            <p>Черновик сохранится. В сервисе можно отредактировать вопросы и получить ссылку для ответов.</p>
            <Button
              type="primary"
              size="large"
              onClick={handleProceedToService}
              icon={<ArrowRightOutlined />}
              iconPlacement="end"
            >
              Продолжить в сервисе
            </Button>
          </div>
        )
      }
      width={720}
      centered
      destroyOnHidden
      title="Черновик опроса"
      styles={{ body: { maxHeight: '72vh', overflowY: 'auto', paddingRight: 4 } }}
    >
      {loading && (
        <div className="survey-modal__loading">
          <Spin size="large" />
          <span>Подбираем методику и составляем вопросы…</span>
        </div>
      )}

      {error && (
        <Alert
          type="warning"
          showIcon
          message={error}
          action={
            <Button size="small" type="primary" href="https://surveys.svodservice.ru/auth?mode=register">
              Перейти в сервис
            </Button>
          }
        />
      )}

      {survey && (
        <>
          <div className="survey-modal__head">
            <div className="survey-modal__meta">
              <Tag style={{ margin: 0 }}>{survey.methodology}</Tag>
              <span>
                <CheckCircleFilled style={{ color: 'var(--app-success)', marginRight: 6 }} />
                {survey.total_questions} вопросов
              </span>
            </div>
            <h2 className="survey-modal__title">{survey.title}</h2>
          </div>

          <ul className="survey-modal__list">
            {visible.map((q) => (
              <QuestionCard key={q.id} q={q} />
            ))}
          </ul>

          {hiddenCount > 0 && (
            <div className="survey-locked">
              <ul className="survey-locked__blur" aria-hidden="true">
                {blurred.map((q) => (
                  <QuestionCard key={q.id} q={q} />
                ))}
              </ul>
              <div className="survey-locked__overlay">
                <span className="survey-locked__icon">
                  <LockOutlined />
                </span>
                <strong>+ ещё {hiddenCount} вопросов</strong>
                <span>Полная анкета уже готова, переходи в сервис, чтобы посмотреть</span>
              </div>
            </div>
          )}
        </>
      )}
    </Modal>
  );
};
