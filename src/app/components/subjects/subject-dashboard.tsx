'use client';

import type { Subject } from '@/lib/definitions';
import { SubjectCard } from './subject-card';
import { AddSubjectButton } from './add-subject-button';
import { AnimatePresence, motion } from 'framer-motion';

type SubjectDashboardProps = {
  initialSubjects: Subject[];
};

export function SubjectDashboard({ initialSubjects }: SubjectDashboardProps) {
  if (initialSubjects.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-muted-foreground/30 bg-card text-center p-12 min-h-[400px]">
        <div className="mb-4 text-6xl">🚀</div>
        <h2 className="text-2xl font-bold font-headline">Welcome to Your Learning Universe!</h2>
        <p className="text-muted-foreground mt-2 mb-6 max-w-sm">
          It looks a bit empty here. Add your first subject to start exploring and learning new things.
        </p>
        <AddSubjectButton />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      <AnimatePresence>
        {initialSubjects.map((subject, index) => (
          <motion.div
            key={subject.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
          >
            <SubjectCard subject={subject} />
          </motion.div>
        ))}
        <motion.div
            key="add-button"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: initialSubjects.length * 0.05 }}
          >
            <AddSubjectButton />
          </motion.div>
      </AnimatePresence>
    </div>
  );
}
