'use client';

import { useState, useEffect, type PropsWithChildren } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import type { LearningModuleOutput } from '@/ai/flows/generate-learning-module';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, ArrowRight, SkipForward } from 'lucide-react';
import { addSubjectTopic } from '@/lib/actions';

type PrerequisiteCheckProps = PropsWithChildren<{
  subject: string;
  prerequisiteData: LearningModuleOutput['prerequisiteCheck'];
}>;

export function PrerequisiteCheck({ subject, prerequisiteData, children }: PrerequisiteCheckProps) {
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Open the modal automatically on component mount
    setShowModal(true);
  }, []);

  const handleTopicClick = async (topic: string) => {
    // This assumes a new topic can be added this way.
    // In a real app, you might need a more robust system.
    await addSubjectTopic(subject, topic);
    router.push(`/subjects/${encodeURIComponent(subject)}/${encodeURIComponent(topic)}`);
  };

  return (
    <>
      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <div className="flex justify-center mb-4">
                <div className="bg-primary/10 p-3 rounded-full">
                    <AlertTriangle className="h-8 w-8 text-primary" />
                </div>
            </div>
            <DialogTitle className="text-center text-2xl font-headline">Heads up!</DialogTitle>
            <DialogDescription className="text-center">
              It looks like you might be missing some foundational knowledge for this topic.
            </DialogDescription>
          </DialogHeader>

          <div className="py-4 space-y-4">
            <p className="text-sm p-4 bg-background rounded-lg border">{prerequisiteData.recommendation}</p>

            <div className="space-y-2">
                <h4 className="font-semibold">We suggest you start with:</h4>
                <div className="flex flex-wrap gap-2">
                    {prerequisiteData.missingFoundations.map((topic) => (
                        <Button 
                            key={topic} 
                            variant="secondary"
                            className="button-smash"
                            onClick={() => handleTopicClick(topic)}
                        >
                            {topic}
                        </Button>
                    ))}
                </div>
            </div>
          </div>
          
          <DialogFooter className="sm:justify-between gap-2">
            <Button variant="ghost" onClick={() => setShowModal(false)} className="flex items-center gap-2">
              <SkipForward className="h-4 w-4" />
              Skip and Continue
            </Button>
            <Button
                className="button-smash group"
                onClick={() => handleTopicClick(prerequisiteData.missingFoundations[0])}
                disabled={prerequisiteData.missingFoundations.length === 0}
              >
                Go to First Recommendation
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* The original content is rendered but hidden until modal is closed */}
      {!showModal && children}
    </>
  );
}
