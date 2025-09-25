import Link from 'next/link';
import { Suspense } from 'react';
import { generateLearningModule } from '@/ai/flows/generate-learning-module';
import { MOCK_USER } from '@/lib/constants';
import { LearningModuleView } from '@/app/components/learning/learning-module-view';
import { LoadingSpinner } from '@/app/components/ui/loading-spinner';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight } from 'lucide-react';

type LearningPageProps = {
  params: {
    subject: string;
    topic: string;
  };
};

export default function LearningPage({ params }: LearningPageProps) {
  const subject = decodeURIComponent(params.subject);
  const topic = decodeURIComponent(params.topic);

  return (
    <div className="flex flex-col gap-8">
      <div>
        <Link href={`/subjects/${encodeURIComponent(subject)}`} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-4">
            <Button variant="outline" size="sm" className="gap-1">
                <ArrowLeft className="h-4 w-4" />
                Back to Topics
            </Button>
        </Link>
        <p className="text-lg text-primary font-semibold">{subject}</p>
        <h1 className="text-4xl font-bold font-headline tracking-tight">{topic}</h1>
        <p className="text-muted-foreground mt-2 text-lg">
            Time to learn something new! Read through the material and get ready for a quiz.
        </p>
      </div>

      <Suspense fallback={<LoadingModule />}>
        <LearningModule topic={topic} />
      </Suspense>

      <div className="flex justify-center mt-8">
        <Link href={`/subjects/${encodeURIComponent(subject)}/${encodeURIComponent(topic)}/quiz`}>
          <Button size="lg" className="button-smash text-lg font-bold gap-2 group">
            Ready for a Quiz!
            <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
          </Button>
        </Link>
      </div>
    </div>
  );
}

async function LearningModule({ topic }: { topic: string }) {
  const moduleData = await generateLearningModule({ ...MOCK_USER, topic, pastPerformance: 'None' });
  return <LearningModuleView module={moduleData} />;
}

function LoadingModule() {
  return (
    <div className="flex flex-col items-center justify-center text-center gap-4 p-8 bg-card rounded-lg border min-h-[400px]">
        <LoadingSpinner className="h-12 w-12 text-primary" />
        <h3 className="text-xl font-semibold font-headline">Building Your Lesson...</h3>
        <p className="text-muted-foreground max-w-md">Our AI is putting together a personalized learning experience just for you. This might take a moment!</p>
    </div>
  )
}
