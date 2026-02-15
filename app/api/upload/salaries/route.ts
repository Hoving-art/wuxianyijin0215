import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase/server';
import * as xlsx from 'xlsx';

export async function POST(request: NextRequest) {
  try {
    console.log('=== Salaries upload API called ===');
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

    // 转换数据格式
    const salariesData = data.map((row: any) => ({
      employee_id: String(row.employee_id || row['员工工号']),
      employee_name: row.employee_name || row['员工姓名'],
      month: String(row.month || row['月份']),
      salary_amount: Number(row.salary_amount || row['工资金额']),
    }));

    console.log('Salaries data prepared:', salariesData.length, 'rows');
    console.log('First salary sample:', JSON.stringify(salariesData[0]));

    // 插入 Supabase
    const supabase = createServerClient();
    console.log('Inserting into Supabase...');
    const { error } = await supabase.from('salaries').insert(salariesData);
    console.log('Insert result, error:', error);

    if (error) {
      return NextResponse.json({ error: `插入数据失败: ${error.message}` }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      message: `成功上传 ${salariesData.length} 条工资数据`,
    });
  } catch (error) {
    console.error('上传 salaries 数据失败:', error);
    const errorMessage = error instanceof Error ? error.message : '上传失败，请检查文件格式';
    return NextResponse.json({ error: `上传失败: ${errorMessage}` }, { status: 500 });
  }
}
