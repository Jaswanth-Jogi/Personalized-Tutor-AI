import Link from 'next/link';
import { Suspense } from 'react';
import { MOCK_USER } from '@/lib/constants';
import { QuizView } from '@/app/components/quiz/quiz-view';
import { LoadingSpinner } from '@/app/components/ui/loading-spinner';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { getQuizForTopic } from '@/lib/actions';

type QuizPageProps = {
  params: {
    subject: string;
    topic: string;
  };
};

export default function QuizPage({ params }: QuizPageProps) {
  const subject = decodeURIComponent(params.subject);
  const topic = decodeURIComponent(params.topic);

  return (
    <div className="flex flex-col gap-8 max-w-4xl mx-auto">
      <div>
        <Link
          href={`/subjects/${encodeURIComponent(subject)}/${encodeURIComponent(topic)}`}
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-4"
        >
          <Button variant="outline" size="sm" className="gap-1">
            <ArrowLeft className="h-4 w-4" />
            Back to Lesson
          </Button>
        </Link>
        <h1 className="text-4xl font-bold font-headline tracking-tight">Quiz Time: <span className="text-primary">{topic}</span></h1>
        <p className="text-muted-foreground mt-2 text-lg">
          Let's see what you've learned. Do your best!
        </p>
      </div>

      <Suspense fallback={<LoadingQuiz />}>
        <QuizLoader topic={topic} />
      </Suspense>
    </div>
  );
}

async function QuizLoader({ topic }: { topic: string }) {
  const quizData = await getQuizForTopic(topic);
  if (!quizData) {
    return (
      <div className="text-center p-8 bg-card rounded-lg border">
        <h3 className="text-xl font-semibold">Could not load quiz</h3>
        <p className="text-muted-foreground">There was an error generating the quiz. Please try again later.</p>
      </div>
    );
  }
  return <QuizView quizData={quizData} />;
}


function LoadingQuiz() {
    return (
      <div className="flex flex-col items-center justify-center text-center gap-4 p-8 bg-card rounded-lg border min-h-[400px]">
          <LoadingSpinner className="h-12 w-12 text-primary" />
          <h3 className="text-xl font-semibold font-headline">Preparing Your Quiz...</h3>
          <p className="text-muted-foreground max-w-md">Our AI is creating some fun questions to test your knowledge. Get ready!</p>
      </div>
    )
}
