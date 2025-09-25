import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Award } from 'lucide-react';

const earnedBadges = [
  {
    id: 'badge-default',
    name: 'Topic Master',
    description: 'Mastered your first topic!',
  },
  {
    id: 'badge-math-whiz',
    name: 'Math Whiz',
    description: 'Completed 3 math topics.',
  },
  {
    id: 'badge-science-explorer',
    name: 'Science Explorer',
    description: 'Explored the wonders of science.',
  },
];

export default function BadgesPage() {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-4xl font-bold font-headline tracking-tight">Your Badge Collection</h1>
        <p className="text-muted-foreground mt-2 text-lg">
          Check out all the cool badges you've earned on your learning journey!
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {earnedBadges.map((badge) => {
          const placeholder = PlaceHolderImages.find((p) => p.id === badge.id);
          return (
            <Card key={badge.id} className="flex flex-col items-center justify-center text-center p-6 glow-primary-hover">
              {placeholder && (
                <Image
                  src={placeholder.imageUrl}
                  alt={placeholder.description}
                  width={120}
                  height={120}
                  className="rounded-full border-4 border-primary/50 shadow-lg mb-4"
                  data-ai-hint={placeholder.imageHint}
                />
              )}
              <CardHeader className="p-0">
                <CardTitle className="font-headline text-xl flex items-center gap-2">
                    <Award className="h-5 w-5 text-primary" />
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
