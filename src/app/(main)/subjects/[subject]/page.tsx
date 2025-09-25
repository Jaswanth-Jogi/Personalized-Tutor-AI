import { Suspense } from 'react';
import Link from 'next/link';
import { generateTopicList } from '@/ai/flows/generate-topic-list';
import { MOCK_USER } from '@/lib/constants';
import { TopicCard } from '@/app/components/topics/topic-card';
import { LoadingSpinner } from '@/app/components/ui/loading-spinner';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';

type TopicPageProps = {
  params: {
    subject: string;
  };
};

export default function TopicPage({ params }: TopicPageProps) {
  const subject = decodeURIComponent(params.subject);

  return (
    <div className="flex flex-col gap-8">
      <div>
        <Link href="/" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-4">
          <Button variant="outline" size="sm" className="gap-1">
            <ArrowLeft className="h-4 w-4" />
            Back to Subjects
          </Button>
        </Link>
        <h1 className="text-4xl font-bold font-headline tracking-tight">
          Topics for <span className="text-primary">{subject}</span>
        </h1>
        <p className="text-muted-foreground mt-2 text-lg">
          Here is your personalized learning path. Choose a topic to dive in!
        </p>
      </div>

      <Suspense fallback={<LoadingTopics />}>
        <TopicList subject={subject} />
      </Suspense>
    </div>
  );
}

async function TopicList({ subject }: { subject: string }) {
  const topicData = await generateTopicList({ ...MOCK_USER, subject });
  const topics = topicData.topics;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {topics.map((topic, index) => (
        <TopicCard key={topic} subject={subject} topic={topic} index={index} />
      ))}
    </div>
  );
}

function LoadingTopics() {
    return (
      <div className="flex flex-col items-center justify-center text-center gap-4 p-8 bg-card rounded-lg border">
          <LoadingSpinner className="h-12 w-12 text-primary" />
          <h3 className="text-xl font-semibold font-headline">Generating Your Learning Path...</h3>
          <p className="text-muted-foreground">Our AI is crafting the perfect topics for you. Hang tight!</p>
      </div>
    )
}
