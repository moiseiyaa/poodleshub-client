import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';

/**
 * POST /api/revalidate
 * Body: { paths: string[] }
 * Revalidates the given Next.js paths immediately (ISR on-demand)
 */
export async function POST(request: NextRequest) {
  try {
    const { paths = [] } = (await request.json()) as { paths?: string[] };
    if (!Array.isArray(paths) || paths.length === 0) {
      return NextResponse.json({ error: 'No paths provided' }, { status: 400 });
    }

    paths.forEach((p) => revalidatePath(p));
    return NextResponse.json({ revalidated: true, paths });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
