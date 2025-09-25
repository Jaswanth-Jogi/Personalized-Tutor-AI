'use server';

import { revalidatePath } from 'next/cache';
import { generateLearningModule } from '@/ai/flows/generate-learning-module';
import { generateTopicQuiz } from '@/ai/flows/generate-topic-quiz';
import { MOCK_USER } from './constants';
import type { Subject, QuizResult } from './definitions';

// In-memory store to simulate a database
let subjects: Subject[] = [
  { id: '1', name: 'Mathematics' },
  { id: '2', name: 'Science' },
  { id: '3', name: 'History' },
];

export async function getSubjects(): Promise<Subject[]> {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 500));
  return subjects;
}

export async function addSubject(
  name: string
): Promise<{ success: boolean; error?: string }> {
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  if (subjects.find(s => s.name.toLowerCase() === name.toLowerCase())) {
    return { success: false, error: 'This subject already exists.' };
  }

  const newSubject: Subject = {
    id: (subjects.length + 1).toString(),
    name,
  };
  subjects.push(newSubject);
  
  revalidatePath('/');
  return { success: true };
}


export async function getQuizForTopic(topic: string) {
  try {
    // We need learning content to generate a good quiz
    const moduleData = await generateLearningModule({ ...MOCK_USER, topic, pastPerformance: 'None' });
    const quizData = await generateTopicQuiz({
      ...MOCK_USER,
      topic,
      learningContent: moduleData.learningContent.content
    });
    return quizData;
  } catch (error) {
    console.error("Failed to generate quiz:", error);
    return null;
  }
}

export async function saveQuizResult(
  result: QuizResult
): Promise<{ success: boolean; error?: string }> {
  console.log('Saving quiz result (simulation):', result);
  // In a real app, you would save this to Firestore.
  await new Promise(resolve => setTimeout(resolve, 500));
  return { success: true };
}
