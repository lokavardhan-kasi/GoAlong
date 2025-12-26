'use server';
/**
 * @fileOverview A flow to assist riders with location details using natural language.
 *
 * - assistRiderWithLocationDetails - A function that handles the location details process.
 * - RiderAssistanceInput - The input type for the assistRiderWithLocationDetails function.
 * - RiderAssistanceOutput - The return type for the assistRiderWithLocationDetails function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const RiderAssistanceInputSchema = z.object({
  locationDescription: z
    .string()
    .describe('A natural language description of the desired location.'),
});
export type RiderAssistanceInput = z.infer<typeof RiderAssistanceInputSchema>;

const RiderAssistanceOutputSchema = z.object({
  accurateAddress: z
    .string()
    .describe('The specific, accurate address corresponding to the location description.'),
});
export type RiderAssistanceOutput = z.infer<typeof RiderAssistanceOutputSchema>;

export async function assistRiderWithLocationDetails(
  input: RiderAssistanceInput
): Promise<RiderAssistanceOutput> {
  return riderAssistanceFlow(input);
}

const prompt = ai.definePrompt({
  name: 'riderAssistancePrompt',
  input: {schema: RiderAssistanceInputSchema},
  output: {schema: RiderAssistanceOutputSchema},
  prompt: `You are a helpful assistant that converts natural language descriptions of locations into specific, accurate addresses.

  Description: {{{locationDescription}}}

  Convert the location description above into a specific, accurate address.`,
});

const riderAssistanceFlow = ai.defineFlow(
  {
    name: 'riderAssistanceFlow',
    inputSchema: RiderAssistanceInputSchema,
    outputSchema: RiderAssistanceOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
