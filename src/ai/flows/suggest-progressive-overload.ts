'use server';

/**
 * @fileOverview A flow that suggests progressive overload for a given exercise based on user feedback.
 *
 * - suggestProgressiveOverload - A function that suggests whether to increase weight or reps for the next workout.
 * - SuggestProgressiveOverloadInput - The input type for the suggestProgressiveOverload function.
 * - SuggestProgressiveOverloadOutput - The return type for the suggestProgressiveOverload function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestProgressiveOverloadInputSchema = z.object({
  exerciseName: z.string().describe('The name of the exercise.'),
  userFeedback: z
    .enum(['too easy', 'easy', 'moderate', 'hard', 'too hard'])
    .describe("The user's perceived difficulty of the exercise."),
  currentWeight: z.number().optional().describe('The current weight used for the exercise (in kg).'),
  currentReps: z.number().optional().describe('The current number of reps performed for the exercise.'),
});
export type SuggestProgressiveOverloadInput = z.infer<typeof SuggestProgressiveOverloadInputSchema>;

const SuggestProgressiveOverloadOutputSchema = z.object({
  suggestion: z.string().describe('The suggestion for the next workout (e.g., increase weight, increase reps, maintain current load).'),
});
export type SuggestProgressiveOverloadOutput = z.infer<typeof SuggestProgressiveOverloadOutputSchema>;

export async function suggestProgressiveOverload(
  input: SuggestProgressiveOverloadInput
): Promise<SuggestProgressiveOverloadOutput> {
  return suggestProgressiveOverloadFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestProgressiveOverloadPrompt',
  input: {schema: SuggestProgressiveOverloadInputSchema},
  output: {schema: SuggestProgressiveOverloadOutputSchema},
  prompt: `You are a personal trainer who helps users with weightlifting. Based on the user's feedback on an exercise,
you will suggest how to adjust the weight or reps for the next workout.

Exercise: {{{exerciseName}}}
Difficulty: {{{userFeedback}}}
Current weight: {{{currentWeight}}} kg
Current reps: {{{currentReps}}}

Suggestions:
* If the exercise was "too easy" or "easy", suggest increasing the weight by 2.5-5kg or increasing the reps by 1-2.
* If the exercise was "moderate", suggest maintaining the current weight and reps.
* If the exercise was "hard" or "too hard", suggest decreasing the weight by 2.5-5kg or decreasing the reps by 1-2.

Provide a concise suggestion for the next workout. Be encouraging.

Suggestion: `,
});

const suggestProgressiveOverloadFlow = ai.defineFlow(
  {
    name: 'suggestProgressiveOverloadFlow',
    inputSchema: SuggestProgressiveOverloadInputSchema,
    outputSchema: SuggestProgressiveOverloadOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
