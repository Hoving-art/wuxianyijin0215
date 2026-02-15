import { NextRequest, NextResponse } from 'next/server';
import { clearTable, clearAllTables } from '@/lib/calculation';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { tableName } = body;

    if (tableName === 'all') {
      await clearAllTables();
      return NextResponse.json({
        success: true,
        message: '成功清空所有数据表',
      });
    } else if (tableName === 'salaries' || tableName === 'cities' || tableName === 'results') {
      await clearTable(tableName);
      return NextResponse.json({
        success: true,
        message: `成功清空 ${tableName} 表`,
      });
    } else {
      return NextResponse.json({ error: '无效的表名' }, { status: 400 });
    }
  } catch (error) {
    console.error('清空数据失败:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : '清空数据失败' },
      { status: 500 }
    );
  }
}
