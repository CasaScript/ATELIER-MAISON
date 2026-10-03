import React, { useState } from 'react';
import { BookOpen, CheckCircle, ChevronDown, Sparkles, ExternalLink, Lightbulb, PlayCircle } from 'lucide-react';
import { TRAINING_LESSONS } from '../../data/mockData';
import { TrainingLesson } from '../../types';

export const AdminTraining: React.FC = () => {
  const [activeLessonId, setActiveLessonId] = useState<string>(TRAINING_LESSONS[0].id);
  const [completedSteps, setCompletedSteps] = useState<Record<string, boolean>>({});

  const activeLesson = TRAINING_LESSONS.find((l) => l.id === activeLessonId) || TRAINING_LESSONS[0];

  const toggleStepCompleted = (key: string) => {
    setCompletedSteps((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <div className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 shadow-xs space-y-8">
      {/* Header */}
      <div className="max-w-3xl space-y-3 pb-6 border-b border-stone-200">
        <span className="text-xs font-semibold uppercase tracking-wider text-amber-900 bg-amber-100/70 px-2.5 py-1 rounded-full">
          Jalon 5 · Formation du Client & Autonomie
        </span>
        <h2 className="text-2xl font-serif font-bold text-stone-900">
          Guide Interactif de Prise en Main de l'Admin Shopify
        </h2>
        <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
          Notre engagement : vous rendre 100% autonome pour gérer votre catalogue au quotidien, expédier vos commandes sans stress et animer vos ventes promotionnelles.
        </p>
      </div>

      {/* Lesson Selector Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2 border-b border-stone-200">
        {TRAINING_LESSONS.map((lesson) => (
          <button
            key={lesson.id}
            onClick={() => setActiveLessonId(lesson.id)}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all whitespace-nowrap flex items-center gap-2 ${
              activeLessonId === lesson.id
                ? 'bg-stone-900 text-white shadow-xs'
                : 'bg-stone-100 text-stone-600 hover:text-stone-900 hover:bg-stone-200'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>{lesson.title}</span>
          </button>
        ))}
      </div>

      {/* Active Lesson Content */}
      <div className="space-y-6">
        <div className="p-5 bg-stone-50 rounded-xl border border-stone-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-[11px] font-mono text-amber-900 font-semibold uppercase">
              {activeLesson.duration}
            </span>
            <h3 className="text-base font-bold text-stone-900 mt-0.5">
              {activeLesson.title}
            </h3>
            <p className="text-xs text-stone-600 mt-1 leading-relaxed max-w-2xl">
              {activeLesson.summary}
            </p>
          </div>

          <div className="p-2.5 bg-white rounded-lg border border-stone-200 text-xs text-stone-700 shrink-0 font-mono">
            <strong>Chemin Shopify :</strong> {activeLesson.adminPath}
          </div>
        </div>

        {/* Steps interactive list */}
        <div className="space-y-4">
          <h4 className="text-xs font-bold text-stone-900 uppercase tracking-wider">
            Étapes de la leçon :
          </h4>

          {activeLesson.steps.map((step, idx) => {
            const stepKey = `${activeLesson.id}-${idx}`;
            const isDone = !!completedSteps[stepKey];

            return (
              <div
                key={idx}
                className={`p-5 rounded-xl border transition-all space-y-3 ${
                  isDone
                    ? 'bg-emerald-50/40 border-emerald-200'
                    : 'bg-white border-stone-200 shadow-xs'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <button
                      onClick={() => toggleStepCompleted(stepKey)}
                      className={`mt-0.5 rounded-full p-0.5 transition-colors ${
                        isDone ? 'text-emerald-600' : 'text-stone-300 hover:text-stone-500'
                      }`}
                      title={isDone ? 'Marquer comme non fait' : 'Valider cette étape'}
                    >
                      <CheckCircle className="w-5 h-5" />
                    </button>

                    <div>
                      <h5 className="text-xs font-bold text-stone-900">
                        Étape {idx + 1} : {step.title}
                      </h5>
                      <p className="text-xs text-stone-600 mt-1 leading-relaxed">
                        {step.instruction}
                      </p>
                    </div>
                  </div>

                  <span className="text-[11px] font-mono text-stone-400 shrink-0">
                    {isDone ? 'Complété' : 'À faire'}
                  </span>
                </div>

                {step.tip && (
                  <div className="ml-8 p-3 bg-amber-50/80 border border-amber-200/80 rounded-lg text-xs text-amber-950 flex items-start gap-2">
                    <Lightbulb className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                    <div className="space-y-0.5">
                      <strong className="block text-[11px] uppercase tracking-wide text-amber-900">Conseil d'expert pour la Tunisie :</strong>
                      <p className="text-[11px] leading-relaxed">{step.tip}</p>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
