'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { useEffect, useState } from 'react';
import { PartyPopper } from 'lucide-react';

type BadgeDialogProps = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
};

export function BadgeDialog({ isOpen, setIsOpen }: BadgeDialogProps) {
  const badgeImage = PlaceHolderImages.find(p => p.id === 'badge-default');
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setShowConfetti(true);
      const timer = setTimeout(() => setShowConfetti(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-md text-center overflow-hidden">
        {showConfetti && <Confetti />}
        <DialogHeader className="mt-8">
          <div className="mx-auto mb-4 bg-primary/10 p-3 rounded-full w-fit">
            <AwardIcon />
          </div>
          <DialogTitle className="text-2xl font-headline">Badge Unlocked!</DialogTitle>
          <DialogDescription>
            You've mastered this topic and earned a new badge for your collection.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col items-center gap-4 py-4">
            {badgeImage && (
              <Image
                src={badgeImage.imageUrl}
                alt={badgeImage.description}
                width={150}
                height={150}
                className="rounded-full border-4 border-primary shadow-lg"
                data-ai-hint={badgeImage.imageHint}
              />
            )}
            <p className="font-bold text-lg">Topic Master</p>
        </div>
        <Button onClick={() => setIsOpen(false)} className="w-full button-smash">
            Awesome!
        </Button>
      </DialogContent>
    </Dialog>
  );
}

function AwardIcon() {
    return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="48"
          height="48"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-primary"
        >
          <circle cx="12" cy="8" r="6" />
          <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" />
        </svg>
    )
}

const Confetti = () => (
  <div className="absolute inset-0 pointer-events-none">
    {[...Array(50)].map((_, i) => (
      <div
        key={i}
        className="absolute w-2 h-2 rounded-full"
        style={{
          left: `${Math.random() * 100}%`,
          animation: `confetti-fall ${Math.random() * 3 + 2}s linear ${Math.random() * 2}s infinite`,
          backgroundColor: ['#FF9933', '#FFC700', '#333333', '#FFFFFF'][Math.floor(Math.random() * 4)],
        }}
      />
    ))}
    <style jsx>{`
      @keyframes confetti-fall {
        0% { transform: translateY(-10vh) rotate(0deg); opacity: 1; }
        100% { transform: translateY(110vh) rotate(720deg); opacity: 0; }
      }
    `}</style>
  </div>
);
