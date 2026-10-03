import React from 'react';
import { CheckCircle2, Clock, ArrowRight, Layers, FileCheck } from 'lucide-react';
import { ProjectMilestone } from '../../types';

interface ProjectRoadmapProps {
  milestones: ProjectMilestone[];
  onToggleMilestone: (id: number) => void;
  onSelectTab: (tabId: string) => void;
}

export const ProjectRoadmap: React.FC<ProjectRoadmapProps> = ({
  milestones,
  onToggleMilestone,
  onSelectTab,
}) => {
  const completedCount = milestones.filter((m) => m.completed).length;
  const progressPercent = Math.round((completedCount / milestones.length) * 100);

  const getTabForCategory = (cat: string) => {
    switch (cat) {
      case 'cadrage': return 'cadrage';
      case 'creation': return 'catalog';
      case 'ecommerce': return 'ecommerce';
      case 'seo': return 'seo';
      case 'formation': return 'training';
      default: return 'cadrage';
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 shadow-xs space-y-6">
      {/* Roadmap Header & Progress */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-stone-200">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-amber-900 bg-amber-100/70 px-2.5 py-1 rounded-full">
            Feuille de Route & Suivi d'Avancement
          </span>
          <h2 className="text-2xl font-serif font-bold text-stone-900 mt-2">
            Les 5 Jalons Clés de votre Boutique Shopify
          </h2>
          <p className="text-xs text-stone-500 mt-1">
            Suivez en temps réel la réalisation des livrables de votre accompagnement TPE.
          </p>
        </div>

        {/* Global Progress Gauge */}
        <div className="sm:text-right">
          <div className="flex items-center sm:justify-end gap-2 text-stone-900 font-bold text-lg">
            <span className="font-mono tabular-nums">{progressPercent}%</span>
            <span className="text-xs text-stone-500 font-normal">réalisé ({completedCount}/{milestones.length} jalons)</span>
          </div>
          <div className="w-48 bg-stone-100 rounded-full h-2 mt-2 overflow-hidden border border-stone-200">
            <div
              className="bg-amber-600 h-full rounded-full transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* Milestones list */}
      <div className="space-y-4">
        {milestones.map((milestone) => (
          <div
            key={milestone.id}
            className={`p-5 rounded-xl border transition-all ${
              milestone.completed
                ? 'bg-stone-50/70 border-stone-200'
                : 'bg-white border-amber-200/80 shadow-xs'
            }`}
          >
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
              <div className="flex items-start gap-3">
                <button
                  onClick={() => onToggleMilestone(milestone.id)}
                  className={`mt-0.5 rounded-full p-0.5 transition-colors ${
                    milestone.completed
                      ? 'text-emerald-600 hover:text-emerald-700'
                      : 'text-stone-300 hover:text-stone-500'
                  }`}
                  title={milestone.completed ? 'Marquer comme non terminé' : 'Valider ce jalon'}
                >
                  <CheckCircle2 className="w-5 h-5" />
                </button>

                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-mono font-semibold text-amber-900 uppercase">
                      {milestone.phase}
                    </span>
                    <span aria-hidden="true" className="text-stone-300">·</span>
                    <span className="text-xs text-stone-500">
                      {milestone.completed ? 'Validé' : 'En cours'}
                    </span>
                  </div>
                  <h3 className="text-sm font-bold text-stone-900">
                    {milestone.title}
                  </h3>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    {milestone.description}
                  </p>
                </div>
              </div>

              {/* Action to jump to associated workspace tab */}
              <button
                onClick={() => onSelectTab(getTabForCategory(milestone.category))}
                className="self-end sm:self-center px-3 py-1.5 bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-semibold rounded-md transition-colors flex items-center gap-1.5 shrink-0"
              >
                <span>Accéder au module</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>

            {/* Deliverables checklist */}
            <div className="mt-4 pt-3 border-t border-stone-200/70 pl-8">
              <span className="text-[11px] font-semibold text-stone-500 uppercase tracking-wider block mb-1.5">
                Livrables associés :
              </span>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs text-stone-700">
                {milestone.deliverables.map((deliv, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <FileCheck className="w-3.5 h-3.5 text-amber-700 shrink-0" />
                    <span>{deliv}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
