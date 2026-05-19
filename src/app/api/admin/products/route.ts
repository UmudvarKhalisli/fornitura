import { NextResponse } from 'next/server';
import { getAdminUserId } from '@/lib/supabase/admin';
import { productSchema } from '@/lib/validation/schemas';
import { createProduct, updateProduct, deleteProduct } from '@/lib/db/queries/products';

export async function POST(request: Request) {
  const adminId = await getAdminUserId();
  if (!adminId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const body = await request.json();
    console.log('Incoming Payload:', body);
    
    const parsed = productSchema.safeParse(body);
    if (!parsed.success) {
      console.log('Zod Validation Failed:', parsed.error.flatten());
      return NextResponse.json({ error: 'Validation failed', details: parsed.error.flatten() }, { status: 400 });
    }

    console.log('Zod Passed. Calling DB createProduct...');
    const product = await createProduct(parsed.data);
    return NextResponse.json(product);
  } catch (error: any) {
    console.error('Create product EXACT error:', error);
    return NextResponse.json({ error: error.message || 'Failed to create product', fullError: error }, { status: 500 });
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

export async function DELETE(request: Request) {
  const adminId = await getAdminUserId();
  if (!adminId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    if (!id) return NextResponse.json({ error: 'Product ID required' }, { status: 400 });

    await deleteProduct(id);
    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Delete product error:', error);
    return NextResponse.json({ error: 'Failed to delete product' }, { status: 500 });
  }
}
