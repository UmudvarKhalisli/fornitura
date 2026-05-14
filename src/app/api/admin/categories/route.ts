import { NextResponse } from 'next/server';
import { getAdminUserId } from '@/lib/supabase/admin';
import { categorySchema } from '@/lib/validation/schemas';
import { createCategory, updateCategory } from '@/lib/db/queries/categories';

export async function POST(request: Request) {
  const adminId = await getAdminUserId();
  if (!adminId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const body = await request.json();
    const parsed = categorySchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: 'Validation failed', details: parsed.error.flatten() }, { status: 400 });
    }

    const category = await createCategory(parsed.data);
    return NextResponse.json(category);
  } catch (error) {
    console.error('Create category error:', error);
    return NextResponse.json({ error: 'Failed to create category' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  const adminId = await getAdminUserId();
  if (!adminId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const body = await request.json();
    const { id, ...values } = body;
    if (!id) return NextResponse.json({ error: 'Category ID required' }, { status: 400 });

    const parsed = categorySchema.safeParse(values);
    if (!parsed.success) {
      return NextResponse.json({ error: 'Validation failed', details: parsed.error.flatten() }, { status: 400 });
    }

    const category = await updateCategory(id, parsed.data);
    return NextResponse.json(category);
  } catch (error) {
    console.error('Update category error:', error);
    return NextResponse.json({ error: 'Failed to update category' }, { status: 500 });
  }
}
