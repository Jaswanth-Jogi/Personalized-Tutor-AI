'use client';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen } from 'lucide-react';
import { motion } from 'framer-motion';

const icons = [<BookOpen key="book" />]; // Add more icons for variety

type TopicCardProps = {
  subject: string;
  topic: string;
  index: number;
};

export function TopicCard({ subject, topic, index }: TopicCardProps) {
  const icon = icons[index % icons.length];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.4, delay: index * 0.07, ease: 'easeOut' }}
    >
      <Link href={`/subjects/${encodeURIComponent(subject)}/${encodeURIComponent(topic)}`} className="group block h-full">
        <Card className="h-full flex flex-col justify-between p-6 text-center border-2 border-transparent hover:border-primary hover:-translate-y-1 transition-all duration-300 ease-in-out glow-primary-hover">
          <div className="flex flex-col items-center gap-4">
            <div className="p-4 bg-primary/10 rounded-full text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
              {icon}
            </div>
            <CardTitle className="font-headline text-lg">{topic}</CardTitle>
          </div>
        </Card>
      </Link>
    </motion.div>
  );
}
