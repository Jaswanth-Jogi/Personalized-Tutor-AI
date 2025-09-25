'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Award, Check, X } from 'lucide-react';
import { BadgeDialog } from './badge-dialog';

type Answer = {
  question: string;
  selected: string;
  correct: string;
  isCorrect: boolean;
};

type QuizResultsProps = {
  answers: Answer[];
};

export function QuizResults({ answers }: QuizResultsProps) {
  const [isClient, setIsClient] = useState(false);
  const [showBadge, setShowBadge] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const timer = setTimeout(() => setShowBadge(true), 500);
    return () => clearTimeout(timer);
  }, []);


  const correctAnswers = answers.filter((a) => a.isCorrect).length;
  const totalQuestions = answers.length;
  const score = Math.round((correctAnswers / totalQuestions) * 100);

  const getFeedback = () => {
    if (score === 100) return "Perfect Score! You're a true master!";
    if (score >= 80) return "Excellent work! You really know your stuff!";
    if (score >= 60) return "Great job! Keep up the amazing effort!";
    return "Good try! Every attempt is a step forward in learning!";
  };
  
  if (!isClient) return null;

  return (
    <>
      <Card className="w-full text-center">
        <CardHeader>
          <CardTitle className="text-3xl font-headline">Quiz Complete!</CardTitle>
          <p className="text-muted-foreground">{getFeedback()}</p>
        </CardHeader>
        <CardContent className="flex flex-col items-center gap-6">
          <div className="relative">
            <svg viewBox="0 0 36 36" className="w-40 h-40">
              <path
                className="text-gray-200 dark:text-gray-700"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                strokeWidth="3"
              />
              <path
                className="text-primary"
                strokeDasharray={`${score}, 100`}
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                strokeWidth="3"
                strokeLinecap="round"
                style={{ transition: 'stroke-dasharray 0.5s ease' }}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-4xl font-bold">{score}%</span>
                <span className="text-sm text-muted-foreground">{correctAnswers}/{totalQuestions} correct</span>
            </div>
          </div>
          
          <div className="flex gap-4">
            <Link href="/">
              <Button variant="outline" className="button-smash">Back to Dashboard</Button>
            </Link>
            <Button onClick={() => setShowBadge(true)} className="button-smash gap-2">
              <Award className="h-4 w-4" />
              View Badge
            </Button>
          </div>

        </CardContent>
      </Card>
      <BadgeDialog isOpen={showBadge} setIsOpen={setShowBadge} />
    </>
  );
}
