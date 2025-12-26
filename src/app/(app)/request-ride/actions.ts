'use server';

import { assistRiderWithLocationDetails, RiderAssistanceInput } from '@/ai/flows/rider-assistance-with-location-details';
import { z } from 'zod';

const ActionInputSchema = z.object({
  locationDescription: z.string().min(5, { message: "Please provide a more detailed description (at least 5 characters)." }),
});

export async function getAccurateAddressAction(input: {locationDescription: string}) {
  const validatedFields = ActionInputSchema.safeParse(input);

  if (!validatedFields.success) {
    return {
      success: false,
      message: validatedFields.error.flatten().fieldErrors.locationDescription?.[0] || 'Invalid input.',
      data: null,
    };
  }
  
  try {
    const result = await assistRiderWithLocationDetails(validatedFields.data);
    return {
      success: true,
      message: 'Address found!',
      data: result,
    };
  } catch (error) {
    console.error(error);
    return {
        success: false,
        message: 'Our AI assistant could not determine the address. Please try a different description.',
        data: null
    };
  }
}
