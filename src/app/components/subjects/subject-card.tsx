import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import type { Subject } from '@/lib/definitions';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { ArrowRight } from 'lucide-react';

type SubjectCardProps = {
  subject: Subject;
};

export function SubjectCard({ subject }: SubjectCardProps) {
  const placeholder =
    PlaceHolderImages.find(p => p.id === `subject-${subject.name.toLowerCase()}`) ||
    PlaceHolderImages.find(p => p.id === 'subject-default');

  return (
    <Link href={`/subjects/${encodeURIComponent(subject.name)}`} className="group block">
      <Card className="overflow-hidden transition-all duration-300 ease-in-out glow-primary-hover hover:-translate-y-1">
        <CardContent className="p-0">
          <div className="relative aspect-[4/3] w-full">
            {placeholder && (
              <Image
                src={placeholder.imageUrl}
                alt={placeholder.description}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                data-ai-hint={placeholder.imageHint}
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
          </div>
          <div className="p-4">
            <h3 className="font-bold font-headline text-xl text-card-foreground absolute bottom-4 left-4 text-white flex items-center gap-2">
              {subject.name}
              <ArrowRight className="h-5 w-5 opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-1" />
            </h3>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
