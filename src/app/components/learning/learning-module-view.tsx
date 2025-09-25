import type { LearningModuleOutput } from '@/ai/flows/generate-learning-module';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BookText, CheckCircle, ListChecks, Target } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

type LearningModuleViewProps = {
  module: LearningModuleOutput;
};

export function LearningModuleView({ module }: LearningModuleViewProps) {
  const { learningContent, prerequisiteCheck } = module;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
      <Card className="lg:col-span-2">
        <CardHeader>
          <div className="flex items-center gap-3">
            <BookText className="h-6 w-6 text-primary" />
            <CardTitle className="font-headline text-2xl">Your Learning Content</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="prose dark:prose-invert max-w-none text-base" dangerouslySetInnerHTML={{ __html: learningContent.content.replace(/\n/g, '<br />') }} />
        </CardContent>
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
