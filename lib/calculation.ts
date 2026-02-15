import { createServerClient } from './supabase/server';

// 员工工资数据类型
export interface SalaryData {
  id: number;
  employee_id: string;
  employee_name: string;
  month: string;
  salary_amount: number;
}

// 城市标准数据类型
export interface CityStandard {
  id: number;
  city_name: string;
  year: string;
  base_min: number;
  base_max: number;
  rate: number;
}

// 计算结果类型
export interface CalculationResult {
  employee_name: string;
  avg_salary: number;
  contribution_base: number;
  company_fee: number;
}

/**
 * 核心计算函数
 * 计算所有员工的社保公积金缴纳金额
 */
export async function calculateContributions(): Promise<CalculationResult[]> {
  const supabase = await createServerClient();

  // 1. 从 salaries 表中读取所有数据
  const { data: salariesData, error: salariesError } = await supabase
    .from('salaries')
    .select('*');

  if (salariesError) {
    throw new Error(`读取工资数据失败: ${salariesError.message}`);
  }

  if (!salariesData || salariesData.length === 0) {
    throw new Error('工资数据为空');
  }

  // 2. 按员工姓名分组，计算年度月平均工资
  const employeeSalaries = new Map<string, number[]>();
  salariesData.forEach((salary: SalaryData) => {
    const { employee_name, salary_amount } = salary;
    if (!employeeSalaries.has(employee_name)) {
      employeeSalaries.set(employee_name, []);
    }
    employeeSalaries.get(employee_name)!.push(salary_amount);
  });

  // 计算每位员工的平均工资
  const avgSalaries: { employee_name: string; avg_salary: number }[] = [];
  employeeSalaries.forEach((salaries, employee_name) => {
    const avgSalary = salaries.reduce((sum, salary) => sum + salary, 0) / salaries.length;
    avgSalaries.push({ employee_name, avg_salary: avgSalary });
  });

  // 3. 从 cities 表中获取所有城市标准，取第一条记录
  const { data: citiesData, error: cityError } = await supabase
    .from('cities')
    .select('*')
    .limit(1);

  if (cityError) {
    throw new Error(`读取城市标准失败: ${cityError.message}`);
  }

  if (!citiesData || citiesData.length === 0) {
    throw new Error('未找到任何城市标准数据，请先上传城市标准');
  }

  const cityStandard = citiesData[0];

  // 4. 计算每位员工的缴费基数和公司应缴金额
  const results: CalculationResult[] = avgSalaries.map(({ employee_name, avg_salary }) => {
    // 确定最终缴费基数
    let contributionBase: number;
    if (avg_salary < cityStandard.base_min) {
      contributionBase = cityStandard.base_min;
    } else if (avg_salary > cityStandard.base_max) {
      contributionBase = cityStandard.base_max;
    } else {
      contributionBase = avg_salary;
    }

    // 计算公司应缴纳金额
    const companyFee = contributionBase * cityStandard.rate;

    return {
      employee_name,
      avg_salary,
      contribution_base: contributionBase,
      company_fee: companyFee,
    };
  });

  // 5. 将计算结果存入 results 表
  const { error: insertError } = await supabase.from('results').insert(
    results.map((result) => ({
      employee_name: result.employee_name,
      avg_salary: result.avg_salary,
      contribution_base: result.contribution_base,
      company_fee: result.company_fee,
    }))
  );

  if (insertError) {
    throw new Error(`存储计算结果失败: ${insertError.message}`);
  }

  return results;
}

/**
 * 清空指定的数据表
 */
export async function clearTable(tableName: 'salaries' | 'cities' | 'results'): Promise<void> {
  const supabase = await createServerClient();

  const { error } = await supabase.from(tableName).delete().neq('id', 0);

  if (error) {
    throw new Error(`清空 ${tableName} 表失败: ${error.message}`);
  }
}

/**
 * 清空所有数据表
 */
export async function clearAllTables(): Promise<void> {
  await clearTable('results');
  await clearTable('salaries');
  await clearTable('cities');
}
