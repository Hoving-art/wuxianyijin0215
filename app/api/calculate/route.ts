import { NextResponse } from 'next/server';
import { calculateContributions } from '@/lib/calculation';

export async function POST() {
  try {
    const results = await calculateContributions();

    return NextResponse.json({
      success: true,
      message: `成功计算并存储 ${results.length} 条结果`,
      data: results,
    });
  } catch (error) {
    console.error('计算失败:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : '计算失败' },
      { status: 500 }
    );
  }
}
