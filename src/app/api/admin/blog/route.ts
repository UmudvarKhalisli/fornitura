import { NextResponse } from 'next/server';
import { getAdminUserId } from '@/lib/supabase/admin';
import { blogPostSchema } from '@/lib/validation/schemas';
import { createPost, updatePost } from '@/lib/db/queries/blog';

export async function POST(request: Request) {
  const adminId = await getAdminUserId();
  if (!adminId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const body = await request.json();
    const parsed = blogPostSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: 'Validation failed', details: parsed.error.flatten() }, { status: 400 });
    }

    const post = await createPost(parsed.data);
    return NextResponse.json(post);
  } catch (error) {
    console.error('Create post error:', error);
    return NextResponse.json({ error: 'Failed to create post' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  const adminId = await getAdminUserId();
  if (!adminId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const body = await request.json();
    const { id, ...values } = body;
    if (!id) return NextResponse.json({ error: 'Post ID required' }, { status: 400 });

    const parsed = blogPostSchema.safeParse(values);
    if (!parsed.success) {
      return NextResponse.json({ error: 'Validation failed', details: parsed.error.flatten() }, { status: 400 });
    }

    const post = await updatePost(id, parsed.data);
    return NextResponse.json(post);
  } catch (error) {
    console.error('Update post error:', error);
    return NextResponse.json({ error: 'Failed to update post' }, { status: 500 });
  }
}
