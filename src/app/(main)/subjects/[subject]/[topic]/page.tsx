
import Link from 'next/link';
import { Suspense } from 'react';
import { generateLearningModule } from '@/ai/flows/generate-learning-module';
import { MOCK_USER } from '@/lib/constants';
import { LearningModuleView } from '@/app/components/learning/learning-module-view';
import { LoadingSpinner } from '@/app/components/ui/loading-spinner';
import { Button } from '@/components/ui/button';
import { ArrowLeft, AlertTriangle } from 'lucide-react';
import { PrerequisiteCheckWrapper } from '@/app/components/learning/prerequisite-check-wrapper';
import { Card } from '@/components/ui/card';

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
        <LearningModule subject={subject} topic={topic} />
      </Suspense>
    </div>
  );
}

async function LearningModule({ subject, topic }: { subject: string, topic: string }) {
  try {
    const moduleData = await generateLearningModule({ ...MOCK_USER, topic, pastPerformance: 'None' });
    
    const hasMissingFoundations = moduleData.prerequisiteCheck.missingFoundations && moduleData.prerequisiteCheck.missingFoundations.length > 0;

    return (
      <PrerequisiteCheckWrapper 
        subject={subject} 
        prerequisiteData={moduleData.prerequisiteCheck} 
        showModal={hasMissingFoundations}
      >
        <LearningModuleView module={moduleData} subject={subject} />
      </PrerequisiteCheckWrapper>
    )
  } catch (error) {
    console.error(error);
    return <ErrorCard />;
  }
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

function ErrorCard() {
    return (
        <Card className="flex flex-col items-center justify-center text-center gap-4 p-8 min-h-[400px] bg-destructive/10 border-destructive/20 text-destructive-foreground">
            <div className="bg-destructive/20 p-3 rounded-full">
                <AlertTriangle className="h-12 w-12 text-destructive" />
            </div>
            <h3 className="text-xl font-semibold font-headline">Something Went Wrong</h3>
            <p className="max-w-md">
                We couldn't generate your learning module. The AI model might be overloaded. Please try refreshing the page in a few moments.
            </p>
        </Card>
    );
}
