'use server';

/**
 * @fileOverview This file defines a Genkit flow for generating personalized learning content and prerequisite analysis for a given topic, tailored to a specific child's profile.
 *
 * - generateLearningModule - A function that takes child and topic information and returns a comprehensive learning module and prerequisite analysis.
 * - LearningModuleInput - The input type for the generateLearningModule function.
 * - LearningModuleOutput - The return type for the generateLearningModule function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const LearningModuleInputSchema = z.object({
  childName: z.string().describe("The child's name."),
  age: z.number().describe("The child's age."),
  grade: z.string().describe("The child's grade level."),
  topic: z.string().describe('The specific learning topic.'),
  pastPerformance: z
    .string()
    .optional()
    .describe("A summary of the child's past performance data."),
});
export type LearningModuleInput = z.infer<typeof LearningModuleInputSchema>;

const LearningModuleOutputSchema = z.object({
  learningContent: z.object({
    childName: z.string().describe("The child's name."),
    age: z.number().describe("The child's age."),
    grade: z.string().describe("The child's grade level."),
    topic: z.string().describe('The specific learning topic.'),
    content: z
      .string()
      .describe(
        'Personalized learning content with interactivity and a Did You Know? fact.'
      ),
  }),
  prerequisiteCheck: z.object({
    topic: z.string().describe('The specific learning topic.'),
    requiredFoundations: z.string().describe('List of prerequisites.'),
    completedFoundations: z.string().describe('List of completed prerequisites.'),
    missingFoundations: z.string().describe('List any missing prerequisites.'),
    recommendation: z
      .string()
      .describe('Customized recommendation based on prerequisite analysis.'),
  }),
});

export type LearningModuleOutput = z.infer<typeof LearningModuleOutputSchema>;

export async function generateLearningModule(
  input: LearningModuleInput
): Promise<LearningModuleOutput> {
  return generateLearningModuleFlow(input);
}

const learningModulePrompt = ai.definePrompt({
  name: 'learningModulePrompt',
  input: {schema: LearningModuleInputSchema},
  output: {schema: LearningModuleOutputSchema},
  model: 'googleai/gemini-1.5-flash-latest',
  prompt: `Generate a comprehensive learning module and prerequisite analysis report in JSON format for a child’s adaptive learning experience.
Child profile:
- Name: {{{childName}}}
- Age: {{{age}}}
- Grade: {{{grade}}}
Learning topic: {{{topic}}}
Past performance: {{{pastPerformance}}}
Instructions:
  1. Create engaging, personalized explanation/lesson content (interactive and positive).
  2. Include a ‘Did You Know?’ fun fact.
  3. Analyze prerequisites needed for this topic.
  4. Compare to past data, identify gaps, give tailored recommendation.
Output:
{
  'learningContent': {
    'childName': '{{{childName}}}',
    'age': {{{age}}},
    'grade': '{{{grade}}}',
    'topic': '{{{topic}}}',
    'content': '[Personalized content with interactivity and Did You Know]'
  },
  'prerequisiteCheck': {
    'topic': '{{{topic}}}',
    'requiredFoundations': '[List of prerequisites]',
    'completedFoundations': '[List of completed prerequisites]',
    'missingFoundations': '[List any missing prerequisites]',
    'recommendation': '[Customized recommendation]'
  }
}`,
});

const generateLearningModuleFlow = ai.defineFlow(
  {
    name: 'generateLearningModuleFlow',
    inputSchema: LearningModuleInputSchema,
    outputSchema: LearningModuleOutputSchema,
  },
  async input => {
    const {output} = await learningModulePrompt(input);
    return output!;
  }
);
