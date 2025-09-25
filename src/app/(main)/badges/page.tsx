'use client';

import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Award, ShieldQuestion } from 'lucide-react';
import { useState, useEffect } from 'react';

const availableBadges = [
  {
    id: 'badge-default',
    name: 'Topic Master',
    description: 'Master your first topic!',
  },
  {
    id: 'badge-math-whiz',
    name: 'Math Whiz',
    description: 'Complete 3 math topics.',
  },
  {
    id: 'badge-science-explorer',
    name: 'Science Explorer',
    description: 'Explore the wonders of science.',
  },
];

export default function BadgesPage() {
    const [earnedBadges, setEarnedBadges] = useState<{ id: string }[]>([]);
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
        const storedBadges = JSON.parse(localStorage.getItem('earnedBadges') || '[]');
        setEarnedBadges(storedBadges);
    }, []);

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-4xl font-bold font-headline tracking-tight">Your Badge Collection</h1>
        <p className="text-muted-foreground mt-2 text-lg">
          Here are all the badges you can earn. Keep learning to collect them all!
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {availableBadges.map((badge) => {
          const placeholder = PlaceHolderImages.find((p) => p.id === badge.id);
          const isEarned = isClient && earnedBadges.some(b => b.id === badge.id);
          return (
            <Card key={badge.id} className={`flex flex-col items-center justify-center text-center p-6 transition-all ${isEarned ? 'glow-primary-hover' : 'opacity-60'}`}>
              {placeholder ? (
                <Image
                  src={placeholder.imageUrl}
                  alt={placeholder.description}
                  width={120}
                  height={120}
                  className={`rounded-full border-4 shadow-lg mb-4 ${isEarned ? 'border-primary/50' : 'border-muted/20 grayscale'}`}
                  data-ai-hint={placeholder.imageHint}
                />
              ) : (
                <div className="w-[120px] h-[120px] rounded-full border-4 border-muted/20 bg-muted/10 flex items-center justify-center mb-4">
                  <ShieldQuestion className="h-12 w-12 text-muted-foreground" />
                </div>
              )}
              <CardHeader className="p-0">
                <CardTitle className="font-headline text-xl flex items-center gap-2">
                    <Award className={`h-5 w-5 ${isEarned ? 'text-primary' : 'text-muted-foreground'}`} />
                    {badge.name}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0 mt-2">
                <p className="text-sm text-muted-foreground">{badge.description}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
