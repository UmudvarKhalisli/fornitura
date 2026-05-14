import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { event, ...params } = body;

    if (!event) {
      return NextResponse.json({ error: 'Event name required' }, { status: 400 });
    }

    // Server-side analytics logging (optional: log to database)
    console.log(`[Analytics] Event: ${event}`, params);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Analytics error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
