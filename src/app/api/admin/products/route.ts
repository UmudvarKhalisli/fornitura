import { NextResponse } from 'next/server';
import { getAdminUserId } from '@/lib/supabase/admin';
import { productSchema } from '@/lib/validation/schemas';
import { createProduct, updateProduct } from '@/lib/db/queries/products';

export async function POST(request: Request) {
  const adminId = await getAdminUserId();
  if (!adminId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const body = await request.json();
    const parsed = productSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: 'Validation failed', details: parsed.error.flatten() }, { status: 400 });
    }

    const product = await createProduct(parsed.data);
    return NextResponse.json(product);
  } catch (error) {
    console.error('Create product error:', error);
    return NextResponse.json({ error: 'Failed to create product' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  const adminId = await getAdminUserId();
  if (!adminId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const body = await request.json();
    const { id, ...values } = body;
    if (!id) return NextResponse.json({ error: 'Product ID required' }, { status: 400 });

    const parsed = productSchema.safeParse(values);
    if (!parsed.success) {
      return NextResponse.json({ error: 'Validation failed', details: parsed.error.flatten() }, { status: 400 });
    }

    const product = await updateProduct(id, parsed.data);
    return NextResponse.json(product);
  } catch (error) {
    console.error('Update product error:', error);
    return NextResponse.json({ error: 'Failed to update product' }, { status: 500 });
  }
}
