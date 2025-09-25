import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import type { Subject } from '@/lib/definitions';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Progress } from '@/components/ui/progress';
import { Star } from 'lucide-react';

type SubjectCardProps = {
  subject: Subject;
};

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-1">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={`h-4 w-4 ${i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300 dark:text-gray-600'}`}
        />
      ))}
    </div>
  );
}

export function SubjectCard({ subject }: SubjectCardProps) {
  const placeholder =
    PlaceHolderImages.find(p => p.id === `subject-${subject.name.toLowerCase()}`) ||
    PlaceHolderImages.find(p => p.id === 'subject-default');

  return (
    <Link href={`/subjects/${encodeURIComponent(subject.name)}`} className="group block">
      <Card className="overflow-hidden transition-all duration-300 ease-in-out glow-primary-hover hover:-translate-y-1 h-full flex flex-col">
        <CardContent className="p-0 flex-grow flex flex-col">
          <div className="relative aspect-[16/10] w-full">
            {placeholder && (
              <Image
                src={placeholder.imageUrl}
                alt={placeholder.description}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                data-ai-hint={placeholder.imageHint}
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
            <h3 className="font-bold font-headline text-2xl text-white absolute bottom-3 left-4">
              {subject.name}
            </h3>
          </div>
          <div className="p-4 flex flex-col justify-between flex-grow bg-card">
              <div>
                  <div className="flex justify-between items-center mb-1">
                      <p className="text-xs font-semibold text-muted-foreground">PROGRESS</p>
                      <StarRating rating={subject.stars} />
                  </div>
                  <Progress value={subject.progress} className="h-2" />
              </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
