import { NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase/server';

export async function GET() {
  try {
    const supabase = createServerClient();

    const { data, error } = await supabase
      .from('results')
      .select('*')
      .order('id', { ascending: true });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ data });
  } catch (error) {
    console.error('获取结果失败:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : '获取结果失败' },
      { status: 500 }
    );
  }
}
