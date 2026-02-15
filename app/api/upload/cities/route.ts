import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase/server';
import * as xlsx from 'xlsx';

export async function POST(request: NextRequest) {
  try {
    console.log('=== Cities upload API called ===');
    const formData = await request.formData();
    const file = formData.get('file') as File;

    console.log('File received:', file?.name, file?.size);

    if (!file) {
      return NextResponse.json({ error: '请选择文件' }, { status: 400 });
    }

    // 读取文件内容
    const buffer = await file.arrayBuffer();
    console.log('Buffer size:', buffer.byteLength);
    const workbook = xlsx.read(buffer, { type: 'array' });
    const worksheet = workbook.Sheets[workbook.SheetNames[0]];
    const data = xlsx.utils.sheet_to_json(worksheet);

    // 验证数据格式
    if (!Array.isArray(data) || data.length === 0) {
      return NextResponse.json({ error: '文件内容为空或格式不正确' }, { status: 400 });
    }

    console.log('Excel data rows:', data.length);
    console.log('First row sample:', JSON.stringify(data[0]));

    // 转换数据格式（兼容字段名拼写错误）
    const citiesData = data.map((row: any) => ({
      city_name: row.city_name || row['城市名'] || row['city_namte '] || row.city_namte,
      year: String(row.year || row['年份']),
      base_min: Number(row.base_min || row['基数下限']),
      base_max: Number(row.base_max || row['基数上限']),
      rate: Number(row.rate || row['缴纳比例']),
    }));

    console.log('Cities data prepared:', citiesData.length, 'rows');
    console.log('First city sample:', JSON.stringify(citiesData[0]));

    // 插入 Supabase
    const supabase = createServerClient();
    console.log('Inserting into Supabase...');
    const { error } = await supabase.from('cities').insert(citiesData);
    console.log('Insert result, error:', error);

    if (error) {
      return NextResponse.json({ error: `插入数据失败: ${error.message}` }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      message: `成功上传 ${citiesData.length} 条城市标准数据`,
    });
  } catch (error) {
    console.error('上传 cities 数据失败:', error);
    const errorMessage = error instanceof Error ? error.message : '上传失败，请检查文件格式';
    return NextResponse.json({ error: `上传失败: ${errorMessage}` }, { status: 500 });
  }
}
