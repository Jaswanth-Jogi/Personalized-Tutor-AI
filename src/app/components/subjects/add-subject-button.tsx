'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { PlusCircle } from 'lucide-react';
import { AddSubjectModal } from './add-subject-modal';

export function AddSubjectButton() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <Card
        className="h-full min-h-[150px] sm:aspect-[4/3] flex items-center justify-center border-2 border-dashed border-muted-foreground/30 hover:border-primary hover:bg-primary/5 transition-all duration-300 cursor-pointer glow-primary-hover group"
        onClick={() => setIsModalOpen(true)}
      >
        <CardContent className="p-0">
          <div className="flex flex-col items-center gap-2 text-muted-foreground group-hover:text-primary transition-colors duration-300">
            <PlusCircle className="h-10 w-10" />
            <span className="font-bold text-lg">Add Subject</span>
          </div>
        </CardContent>
      </Card>
      <AddSubjectModal isOpen={isModalOpen} setIsOpen={setIsModalOpen} />
    </>
  );
}
