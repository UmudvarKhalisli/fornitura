'use server';

import { updateSiteSettings as updateQuery } from '@/lib/db/queries/settings';
import { revalidatePath } from 'next/cache';

export async function updateSettingsAction(values: any) {
  try {
    const data = await updateQuery(values);
    revalidatePath('/', 'layout');
    return { success: true, data };
  } catch (error) {
    console.error('Update settings error:', error);
    return { success: false, error: 'Failed to update settings' };
  }
}
