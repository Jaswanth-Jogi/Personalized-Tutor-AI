import { Rocket } from 'lucide-react';

export function Logo() {
  return (
    <div className="flex items-center gap-2">
      <Rocket className="h-7 w-7 text-primary" />
      <span className="font-bold text-2xl font-headline tracking-tighter text-gray-800 dark:text-white">
        LearnVerse
      </span>
    </div>
  );
}
