'use client';

interface ProgressBarProps {
  current: number;
  total: number;
  score: number;
}

export default function ProgressBar({ current, total, score }: ProgressBarProps) {
  const percentage = (current / total) * 100;

  return (
    <div className="w-full space-y-2">
      <div className="flex items-center justify-between text-sm font-medium">
        <span className="text-zinc-400">
          Citation {current}/{total}
        </span>
        <span className="text-emerald-500">
          {score} pts
        </span>
      </div>

      <div className="relative h-2 w-full overflow-hidden rounded-full bg-zinc-800">
        <div
          className="h-full bg-linear-to-r from-emerald-600 to-emerald-500 transition-all duration-500 ease-out"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
