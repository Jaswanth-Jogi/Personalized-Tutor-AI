'use server';

/**
 * @fileOverview This file defines a Genkit flow for generating a list of learning topics for a given subject, child profile and grade level.
 *
 * - generateTopicList - A function that generates the topic list.
 * - GenerateTopicListInput - The input type for the generateTopicList function.
 * - GenerateTopicListOutput - The return type for the generateTopicList function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateTopicListInputSchema = z.object({
  childName: z.string().describe('The name of the child.'),
  age: z.number().describe('The age of the child.'),
  grade: z.string().describe('The grade of the child.'),
  subject: z.string().describe('The subject for which to generate topics.'),
  pastPerformance: z.string().optional().describe('A summary of the child\'s past performance in the subject.'),
});
export type GenerateTopicListInput = z.infer<typeof GenerateTopicListInputSchema>;

const GenerateTopicListOutputSchema = z.object({
  childName: z.string().describe('The name of the child.'),
  age: z.number().describe('The age of the child.'),
  grade: z.string().describe('The grade of the child.'),
  subject: z.string().describe('The subject for which the topics are generated.'),
  topics: z.array(z.string()).describe('A list of learning topics for the subject.'),
});
export type GenerateTopicListOutput = z.infer<typeof GenerateTopicListOutputSchema>;

export async function generateTopicList(input: GenerateTopicListInput): Promise<GenerateTopicListOutput> {
  return generateTopicListFlow(input);
}

const generateTopicListPrompt = ai.definePrompt({
  name: 'generateTopicListPrompt',
  input: {schema: GenerateTopicListInputSchema},
  output: {schema: GenerateTopicListOutputSchema},
  model: 'gemini-1.5-flash-latest',
  prompt: `Generate a logically ordered, curriculum-aligned topic list for the subject {{subject}} for a child named {{childName}}, age {{age}}, grade {{grade}}.
Use educational standards for this grade, going foundational to advanced.
If prior performance data exists (strengths, weaknesses, completed topics), adapt recommendations.
Output:
{
  "childName": "{{childName}}",
  "age": {{age}},
  "grade": "{{grade}}",
  "subject": "{{subject}}",
  "topics": [
    "[Topic 1]",
    "[Topic 2]",
    "[Topic 3]",
    "..."
  ]
}`,
});

const generateTopicListFlow = ai.defineFlow(
  {
    name: 'generateTopicListFlow',
    inputSchema: GenerateTopicListInputSchema,
    outputSchema: GenerateTopicListOutputSchema,
  },
  async input => {
    const {output} = await generateTopicListPrompt(input);
    return output!;
  }
);
