'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import type { GenerateTopicQuizOutput } from '@/ai/flows/generate-topic-quiz';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';
import { ArrowRight, PartyPopper } from 'lucide-react';
import { saveQuizResult } from '@/lib/actions';
import { useToast } from '@/hooks/use-toast';
import { QuizResults } from './quiz-results';

type QuizViewProps = {
  quizData: GenerateTopicQuizOutput;
};

type Answer = {
  question: string;
  selected: string;
  correct: string;
  isCorrect: boolean;
};

export function QuizView({ quizData }: QuizViewProps) {
  const { quiz } = quizData;
  const allQuestions = [...quiz.questions, quiz.bonusQuestion];
  
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [isFinished, setIsFinished] = useState(false);
  const [isPending, startTransition] = useTransition();

  const router = useRouter();
  const { toast } = useToast();

  const currentQuestion = allQuestions[currentQuestionIndex];
  const progress = ((currentQuestionIndex) / allQuestions.length) * 100;

  const handleNext = () => {
    if (!selectedOption) return;

    const newAnswer: Answer = {
      question: currentQuestion.question,
      selected: selectedOption,
      correct: currentQuestion.answer,
      isCorrect: selectedOption === currentQuestion.answer,
    };
    const updatedAnswers = [...answers, newAnswer];
    setAnswers(updatedAnswers);
    setSelectedOption(null);

    if (currentQuestionIndex < allQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setIsFinished(true);
      startTransition(async () => {
        const result = await saveQuizResult({ topic: quiz.topic, answers: updatedAnswers });
        if (result.success) {
          toast({
            title: "Progress Saved!",
            description: "Your quiz results have been recorded.",
          });
        } else {
          toast({
            variant: "destructive",
            title: "Save Failed",
            description: "Could not save your quiz results.",
          });
        }
      });
    }
  };

  if (isFinished) {
    return <QuizResults answers={answers} />;
  }
  
  const isBonus = currentQuestionIndex === allQuestions.length - 1;

  return (
    <Card className="w-full">
      <CardHeader>
        <Progress value={progress} className="mb-4" />
        {isBonus && (
          <div className="font-bold text-primary flex items-center gap-2 animate-pulse">
            <PartyPopper className="h-5 w-5" />
            BONUS QUESTION
          </div>
        )}
        <CardTitle className="text-2xl font-headline">{currentQuestion.question}</CardTitle>
        <CardDescription>Select the correct answer below.</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {currentQuestion.options.map((option) => (
            <Button
              key={option}
              variant="outline"
              size="lg"
              className={cn(
                'h-auto py-4 text-base whitespace-normal justify-start text-left button-smash',
                selectedOption === option ? 'ring-2 ring-primary bg-primary/10' : ''
              )}
              onClick={() => setSelectedOption(option)}
            >
              {option}
            </Button>
          ))}
        </div>
        <div className="flex justify-end mt-4">
          <Button onClick={handleNext} disabled={!selectedOption} size="lg" className="button-smash gap-2 group">
            {currentQuestionIndex < allQuestions.length - 1 ? 'Next Question' : 'Finish Quiz'}
            <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
