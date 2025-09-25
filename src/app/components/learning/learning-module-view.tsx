import type { LearningModuleOutput } from '@/ai/flows/generate-learning-module';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { BookText, CheckCircle, ListChecks, Target, ArrowRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

type LearningModuleViewProps = {
  module: LearningModuleOutput;
  subject: string;
};

export function LearningModuleView({ module, subject }: LearningModuleViewProps) {
  const { learningContent, prerequisiteCheck } = module;
  const topic = learningContent.topic;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
      <Card className="lg:col-span-2 flex flex-col">
        <CardHeader>
          <div className="flex items-center gap-3">
            <BookText className="h-6 w-6 text-primary" />
            <CardTitle className="font-headline text-2xl">Your Learning Content</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="flex-grow">
          <div className="prose dark:prose-invert max-w-none text-base" dangerouslySetInnerHTML={{ __html: learningContent.content.replace(/\n/g, '<br />') }} />
        </CardContent>
        <CardFooter className="flex justify-end">
            <Link href={`/subjects/${encodeURIComponent(subject)}/${encodeURIComponent(topic)}/quiz`}>
                <Button className="button-smash group">
                    Take the Quiz
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
            </Link>
        </CardFooter>
      </Card>
      
      <Card className="sticky top-20">
        <CardHeader>
          <div className="flex items-center gap-3">
            <ListChecks className="h-6 w-6 text-primary" />
            <CardTitle className="font-headline text-2xl">Prerequisite Check</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2 flex items-center gap-2"><Target className="h-4 w-4"/> Required Foundations</h4>
              <p className="text-sm text-muted-foreground">{prerequisiteCheck.requiredFoundations}</p>
            </div>
            <div>
              <h4 className="font-semibold mb-2 flex items-center gap-2"><CheckCircle className="h-4 w-4"/> Completed Foundations</h4>
              <p className="text-sm text-muted-foreground">{prerequisiteCheck.completedFoundations}</p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Recommendation</h4>
              <p className="text-sm p-3 bg-primary/10 rounded-lg">{prerequisiteCheck.recommendation}</p>
            </div>
        </CardContent>
      </Card>
    </div>
  );
}
