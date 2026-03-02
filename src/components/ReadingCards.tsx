import { PersonalContext } from '@/types/personal-context';

interface ReadingCardProps {
  title: string;
  content: string;
  type: 'identity' | 'career' | 'relationship' | 'strength' | 'challenge' | 'cultural' | 'relocation';
  confidence?: number;
  highlights?: string[];
}

export function ReadingCard({ title, content, type, confidence, highlights }: ReadingCardProps) {
  const typeColors = {
    identity: 'border-purple-500 bg-purple-500/10',
    career: 'border-blue-500 bg-blue-500/10',
    relationship: 'border-pink-500 bg-pink-500/10',
    strength: 'border-green-500 bg-green-500/10',
    challenge: 'border-orange-500 bg-orange-500/10',
    cultural: 'border-amber-500 bg-amber-500/10',
    relocation: 'border-cyan-500 bg-cyan-500/10',
  };

  const typeLabels = {
    identity: 'Core Identity',
    career: 'Career & Vocation',
    relationship: 'Relationships',
    strength: 'Strengths',
    challenge: 'Growth Areas',
    cultural: 'Cultural Alignment',
    relocation: 'Location & Place',
  };

  return (
    <div className={`rounded-xl border-l-4 ${typeColors[type]} bg-slate-800 p-5`}>
      <div className="flex items-start justify-between mb-3">
        <div>
          <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">
            {typeLabels[type]}
          </span>
          <h3 className="text-lg font-semibold text-white mt-1">{title}</h3>
        </div>
        {confidence !== undefined && (
          <div className="flex items-center gap-1 text-xs">
            <div 
              className={`w-2 h-2 rounded-full ${
                confidence >= 0.8 ? 'bg-green-400' : 
                confidence >= 0.6 ? 'bg-yellow-400' : 'bg-red-400'
              }`}
            />
            <span className="text-slate-400">{Math.round(confidence * 100)}% confidence</span>
          </div>
        )}
      </div>
      
      <p className="text-slate-300 leading-relaxed">{content}</p>
      
      {highlights && highlights.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {highlights.map((highlight, i) => (
            <span 
              key={i}
              className="px-2 py-1 bg-slate-700 text-slate-300 text-xs rounded-full"
            >
              {highlight}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

interface CulturalTensionCardProps {
  astrologicalTrait: string;
  culturalExpectation: string;
  tension: string;
  resolution: string;
}

export function CulturalTensionCard({ 
  astrologicalTrait, 
  culturalExpectation, 
  tension, 
  resolution 
}: CulturalTensionCardProps) {
  return (
    <div className="rounded-xl border border-amber-500/30 bg-amber-500/5 p-5">
      <h4 className="text-sm font-medium text-amber-400 uppercase tracking-wider mb-3">
        Cultural Dynamic
      </h4>
      
      <div className="space-y-3">
        <div className="flex items-start gap-3">
          <span className="text-purple-400 font-medium min-w-[100px]">Chart:</span>
          <span className="text-slate-300">{astrologicalTrait}</span>
        </div>
        <div className="flex items-start gap-3">
          <span className="text-amber-400 font-medium min-w-[100px]">Culture:</span>
          <span className="text-slate-300">{culturalExpectation}</span>
        </div>
        <div className="flex items-start gap-3">
          <span className="text-orange-400 font-medium min-w-[100px]">Tension:</span>
          <span className="text-slate-300">{tension}</span>
        </div>
        <div className="mt-4 p-3 bg-slate-800 rounded-lg">
          <span className="text-green-400 font-medium text-sm">Resolution: </span>
          <span className="text-slate-300 text-sm">{resolution}</span>
        </div>
      </div>
    </div>
  );
}

interface RelocationInsightCardProps {
  fromLocation: string;
  toLocation: string;
  astrologicalEffect: string;
  recommendation: string;
}

export function RelocationInsightCard({
  fromLocation,
  toLocation,
  astrologicalEffect,
  recommendation
}: RelocationInsightCardProps) {
  return (
    <div className="rounded-xl border border-cyan-500/30 bg-cyan-500/5 p-5">
      <h4 className="text-sm font-medium text-cyan-400 uppercase tracking-wider mb-3">
        Location Impact
      </h4>
      
      <div className="flex items-center gap-4 mb-4">
        <div className="text-center">
          <div className="text-slate-400 text-sm">From</div>
          <div className="text-white font-medium">{fromLocation}</div>
        </div>
        <div className="flex-1 h-px bg-slate-600 relative">
          <span className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 bg-slate-800 text-slate-400 text-xs px-1">
            →
          </span>
        </div>
        <div className="text-center">
          <div className="text-slate-400 text-sm">To</div>
          <div className="text-white font-medium">{toLocation}</div>
        </div>
      </div>
      
      <p className="text-slate-300 text-sm mb-3">{astrologicalEffect}</p>
      
      <div className="p-3 bg-slate-800 rounded-lg">
        <span className="text-cyan-400 font-medium text-sm">💡 </span>
        <span className="text-slate-300 text-sm">{recommendation}</span>
      </div>
    </div>
  );
}

interface ContextBadgeProps {
  context: PersonalContext;
}

export function ContextBadges({ context }: ContextBadgeProps) {
  const badges = [];
  
  if (context.ethnicity) {
    badges.push({ label: context.ethnicity, color: 'bg-purple-500/20 text-purple-300' });
  }
  if (context.religion) {
    badges.push({ label: context.religion, color: 'bg-blue-500/20 text-blue-300' });
  }
  if (context.nationality) {
    badges.push({ label: context.nationality, color: 'bg-green-500/20 text-green-300' });
  }
  if (context.currentLifeStage) {
    badges.push({ 
      label: context.currentLifeStage.replace('_', ' '), 
      color: 'bg-amber-500/20 text-amber-300' 
    });
  }
  if (context.relocationHistory.length > 0) {
    badges.push({ 
      label: `${context.relocationHistory.length}× relocated`, 
      color: 'bg-cyan-500/20 text-cyan-300' 
    });
  }
  
  return (
    <div className="flex flex-wrap gap-2">
      {badges.map((badge, i) => (
        <span 
          key={i}
          className={`px-2 py-1 rounded-full text-xs font-medium ${badge.color}`}
        >
          {badge.label}
        </span>
      ))}
    </div>
  );
}

export function ReadingSummaryCard({ 
  summary, 
  keyTakeaways,
  context 
}: { 
  summary: string; 
  keyTakeaways: string[];
  context?: PersonalContext;
}) {
  return (
    <div className="rounded-xl bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 p-6">
      {context && (
        <div className="mb-4">
          <ContextBadges context={context} />
        </div>
      )}
      
      <h2 className="text-xl font-bold text-white mb-3">Reading Summary</h2>
      <p className="text-slate-300 leading-relaxed mb-6">{summary}</p>
      
      {keyTakeaways.length > 0 && (
        <div>
          <h3 className="text-sm font-medium text-slate-400 uppercase tracking-wider mb-3">
            Key Takeaways
          </h3>
          <ul className="space-y-2">
            {keyTakeaways.map((takeaway, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="text-blue-400 mt-1">•</span>
                <span className="text-slate-300">{takeaway}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
