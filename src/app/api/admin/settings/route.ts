import { NextResponse } from 'next/server';
import { getAdminUserId } from '@/lib/supabase/admin';
import { updateSiteSettings } from '@/lib/db/queries/settings';

export async function PUT(request: Request) {
  const adminId = await getAdminUserId();
  if (!adminId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const body = await request.json();
    const settings = await updateSiteSettings(body);
    return NextResponse.json(settings);
  } catch (error) {
    console.error('Update settings error:', error);
    return NextResponse.json({ error: 'Failed to update settings' }, { status: 500 });
  }
}
