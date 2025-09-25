import { Suspense } from 'react';
import { getSubjects } from '@/lib/actions';
import { SubjectDashboard } from '@/app/components/subjects/subject-dashboard';
import { LoadingSpinner } from '@/app/components/ui/loading-spinner';
import { Card, CardContent } from '@/components/ui/card';

export default async function DashboardPage() {
  const initialSubjects = await getSubjects();

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-4xl font-bold font-headline tracking-tight">Your Subjects</h1>
        <p className="text-muted-foreground mt-2 text-lg">
          Select a subject to start your learning adventure or add a new one!
        </p>
      </div>
      <Suspense fallback={<LoadingSubjects />}>
        <SubjectDashboard initialSubjects={initialSubjects} />
      </Suspense>
    </div>
  );
}

function LoadingSubjects() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {[...Array(3)].map((_, i) => (
        <Card key={i} className="aspect-[4/3]">
          <CardContent className="flex items-center justify-center h-full">
            <LoadingSpinner />
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
