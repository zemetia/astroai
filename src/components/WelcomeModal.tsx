'use client';

import { useState } from 'react';
import { WELCOME_CONTENT } from '@/content/welcome';
import { Sparkles, ArrowRight, X, ChevronRight, Info } from 'lucide-react';

interface WelcomeModalProps {
  onClose: () => void;
  onStart: () => void;
}

export default function WelcomeModal({ onClose, onStart }: WelcomeModalProps) {
  const [currentSection, setCurrentSection] = useState(0);
  const content = WELCOME_CONTENT;

  const sections = [
    'intro',
    'comparison', 
    'analogy',
    'data',
    'creator',
    'usecases',
    'disclaimer'
  ] as const;

  const nextSection = () => {
    if (currentSection < sections.length - 1) {
      setCurrentSection(prev => prev + 1);
    }
  };

  const renderSection = () => {
    switch (sections[currentSection]) {
      case 'intro':
        return (
          <div className="text-center space-y-6">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-purple-500 to-blue-600 rounded-full mb-4">
              <Sparkles className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
              {content.headline}
            </h1>
            <p className="text-slate-300 text-lg leading-relaxed max-w-md mx-auto">
              {content.subheadline}
            </p>
            <div className="flex justify-center gap-2 mt-8">
              <span className="w-2 h-2 rounded-full bg-purple-500" />
              <span className="w-2 h-2 rounded-full bg-slate-600" />
              <span className="w-2 h-2 rounded-full bg-slate-600" />
              <span className="w-2 h-2 rounded-full bg-slate-600" />
              <span className="w-2 h-2 rounded-full bg-slate-600" />
              <span className="w-2 h-2 rounded-full bg-slate-600" />
              <span className="w-2 h-2 rounded-full bg-slate-600" />
            </div>
          </div>
        );

      case 'comparison':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white text-center">Perbandingan</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {content.comparison.map((item, i) => (
                <div 
                  key={i}
                  className={`p-5 rounded-xl border ${
                    item.highlight 
                      ? 'bg-gradient-to-br from-purple-900/50 to-blue-900/50 border-purple-500/50' 
                      : 'bg-slate-800/50 border-slate-700'
                  }`}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-2xl">{item.icon}</span>
                    <h3 className={`font-bold ${item.highlight ? 'text-purple-300' : 'text-slate-300'}`}>
                      {item.label}
                    </h3>
                  </div>
                  <ul className="space-y-2">
                    {item.points.map((point, j) => (
                      <li key={j} className="flex items-start gap-2 text-sm text-slate-400">
                        <span className={item.highlight ? 'text-purple-400' : 'text-slate-500'}>•</span>
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        );

      case 'analogy':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white text-center">{content.analogy.title}</h2>
            <div className="space-y-4">
              <div className="p-4 bg-slate-800/50 rounded-xl border-l-4 border-slate-600">
                <p className="text-slate-400 text-sm mb-2">Ramalan Tradisional</p>
                <p className="text-slate-300 whitespace-pre-line">{content.analogy.traditional}</p>
              </div>
              <div className="flex justify-center">
                <ChevronRight className="text-slate-600 rotate-90" />
              </div>
              <div className="p-4 bg-gradient-to-r from-purple-900/30 to-blue-900/30 rounded-xl border-l-4 border-purple-500">
                <p className="text-purple-400 text-sm mb-2">AstroAI</p>
                <p className="text-slate-200 whitespace-pre-line">{content.analogy.astroai}</p>
              </div>
            </div>
          </div>
        );

      case 'data':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white text-center">{content.whyAccurate.title}</h2>
            <p className="text-slate-400 text-center">{content.whyAccurate.description}</p>
            <div className="grid grid-cols-2 gap-3">
              {content.whyAccurate.layers.map((layer, i) => (
                <div key={i} className="p-4 bg-slate-800/50 rounded-xl text-center">
                  <div className="text-3xl mb-2">{layer.icon}</div>
                  <h4 className="font-medium text-white text-sm">{layer.label}</h4>
                  <p className="text-xs text-slate-400 mt-1">{layer.desc}</p>
                </div>
              ))}
            </div>
          </div>
        );

      case 'creator':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white text-center">{content.creator.title}</h2>
            <p className="text-slate-400 text-center">{content.creator.description}</p>
            <div className="flex flex-wrap justify-center gap-2">
              {content.creator.fields.map((field, i) => (
                <span 
                  key={i}
                  className="px-3 py-1.5 bg-slate-800 text-slate-300 rounded-full text-sm border border-slate-700"
                >
                  {field}
                </span>
              ))}
            </div>
            <p className="text-center text-slate-500 text-sm">
              Bukan dukun digital. Peneliti yang percaya data dan meaning bisa berdampingan.
            </p>
          </div>
        );

      case 'usecases':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white text-center">Gunakan Untuk</h2>
            <div className="grid grid-cols-1 gap-3">
              {content.useCases.map((useCase, i) => (
                <div key={i} className="flex items-center gap-4 p-4 bg-slate-800/50 rounded-xl">
                  <span className="text-2xl">{useCase.emoji}</span>
                  <div>
                    <h4 className="font-medium text-white">{useCase.title}</h4>
                    <p className="text-sm text-slate-400">{useCase.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'disclaimer':
        return (
          <div className="space-y-6">
            <div className="flex items-center gap-2 justify-center text-amber-400">
              <Info className="w-5 h-5" />
              <h2 className="text-xl font-bold">{content.disclaimer.title}</h2>
            </div>
            <div className="p-4 bg-amber-500/10 border border-amber-500/30 rounded-xl">
              <p className="text-slate-300 whitespace-pre-line text-sm leading-relaxed">
                {content.disclaimer.text}
              </p>
            </div>
            <div className="text-center">
              <p className="text-slate-400 italic">"{content.quote.text}"</p>
              <p className="text-slate-500 text-sm mt-1">{content.quote.translation}</p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-slate-900 rounded-2xl max-w-lg w-full max-h-[90vh] overflow-hidden border border-slate-800 shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-purple-400" />
            <span className="font-semibold text-white">AstroAI</span>
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-slate-800 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-slate-400" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[60vh]">
          {renderSection()}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-800 flex gap-3">
          {currentSection < sections.length - 1 ? (
            <>
              <button
                onClick={onClose}
                className="flex-1 py-3 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl font-medium transition-colors"
              >
                Lewati
              </button>
              <button
                onClick={nextSection}
                className="flex-1 py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-xl font-medium flex items-center justify-center gap-2 transition-colors"
              >
                Lanjut
                <ArrowRight className="w-4 h-4" />
              </button>
            </>
          ) : (
            <button
              onClick={onStart}
              className="w-full py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-xl font-medium flex items-center justify-center gap-2 transition-colors"
            >
              {content.cta.primary}
              <Sparkles className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Progress */}
        <div className="flex justify-center gap-1 pb-4">
          {sections.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentSection(i)}
              className={`w-2 h-2 rounded-full transition-colors ${
                i === currentSection ? 'bg-purple-500' : 'bg-slate-700'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
