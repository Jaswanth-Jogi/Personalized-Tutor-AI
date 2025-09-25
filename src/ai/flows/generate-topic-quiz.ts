'use server';

/**
 * @fileOverview Generates a personalized quiz based on the learning content, tailored to the child’s profile and current topic.
 *
 * - generateTopicQuiz - A function that generates a personalized quiz.
 * - GenerateTopicQuizInput - The input type for the generateTopicQuiz function.
 * - GenerateTopicQuizOutput - The return type for the generateTopicQuiz function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateTopicQuizInputSchema = z.object({
  childName: z.string().describe("The child's name."),
  age: z.number().describe("The child's age."),
  grade: z.string().describe("The child's grade."),
  topic: z.string().describe('The learning topic.'),
  learningContent: z.string().describe('The generated learning content for the topic.'),
});
export type GenerateTopicQuizInput = z.infer<typeof GenerateTopicQuizInputSchema>;

const GenerateTopicQuizOutputSchema = z.object({
  quiz: z.object({
    childName: z.string().describe("The child's name."),
    topic: z.string().describe('The learning topic.'),
    questions: z
      .array(
        z.object({
          question: z.string().describe('The quiz question.'),
          options: z.array(z.string()).describe('The possible answer options.'),
          answer: z.string().describe('The correct answer.'),
        })
      )
      .describe('The list of quiz questions.'),
    bonusQuestion: z
      .object({
        question: z.string().describe('The bonus question.'),
        options: z.array(z.string()).describe('The possible answer options.'),
        answer: z.string().describe('The correct answer.'),
      })
      .describe('The bonus question.'),
  }).describe('The generated quiz.'),
});
export type GenerateTopicQuizOutput = z.infer<
  typeof GenerateTopicQuizOutputSchema
>;

export async function generateTopicQuiz(
  input: GenerateTopicQuizInput
): Promise<GenerateTopicQuizOutput> {
  return generateTopicQuizFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateTopicQuizPrompt',
  input: {schema: GenerateTopicQuizInputSchema},
  output: {schema: GenerateTopicQuizOutputSchema},
  model: 'googleai/gemini-1.5-flash-latest',
  prompt: `Generate a personalized quiz in JSON format based on the learning content, tailored to the child’s profile and current topic.
  - 5 to 10 questions (MCQ, fill-in, true/false).
  - Mix of difficulties.
  - Encouraging, age-appropriate tone.
  - End with a ‘Did You Know?’ bonus question.
  Output:
  {
    "quiz": {
      "childName": "{{{childName}}}",
      "topic": "{{{topic}}}",
      "questions": [
        {
          "question": "[Question 1]",
          "options": ["Option 1", "Option 2", "Option 3", "Option 4"],
          "answer": "Correct Answer"
        },
        ...
      ],
      "bonusQuestion": {
        "question": "[Did You Know? question]",
        "options": ["Option 1", "Option 2", "Option 3", "Option 4"],
        "answer": "Correct Answer"
      }
    }
  }

  Child profile:
  - Name: {{{childName}}}
  - Age: {{{age}}}
  - Grade: {{{grade}}}
  Learning topic: {{{topic}}}
  Learning content: {{{learningContent}}}
  `,
});

const generateTopicQuizFlow = ai.defineFlow(
  {
    name: 'generateTopicQuizFlow',
    inputSchema: GenerateTopicQuizInputSchema,
    outputSchema: GenerateTopicQuizOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
