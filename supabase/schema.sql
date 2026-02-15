  -- 五险一金计算器 - 数据库表结构
  -- 请在 Supabase SQL Editor 中执行以下 SQL 脚本

  -- 1. 创建 cities 表（城市标准表）
  CREATE TABLE IF NOT EXISTS cities (
    id SERIAL PRIMARY KEY,
    city_name TEXT NOT NULL,
    year TEXT NOT NULL,
    base_min INTEGER NOT NULL,
    base_max INTEGER NOT NULL,
    rate NUMERIC(10, 4) NOT NULL
  );

  -- 2. 创建 salaries 表（员工工资表）
  CREATE TABLE IF NOT EXISTS salaries (
    id SERIAL PRIMARY KEY,
    employee_id TEXT NOT NULL,
    employee_name TEXT NOT NULL,
    month TEXT NOT NULL,
    salary_amount INTEGER NOT NULL
  );

  -- 3. 创建 results 表（计算结果表）
  CREATE TABLE IF NOT EXISTS results (
    id SERIAL PRIMARY KEY,
    employee_name TEXT NOT NULL,
    avg_salary NUMERIC(12, 2) NOT NULL,
    contribution_base NUMERIC(12, 2) NOT NULL,
    company_fee NUMERIC(12, 2) NOT NULL,
    calculated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
  );

  -- 禁用 RLS（行级安全策略）- 因为我们使用匿名密钥
  ALTER TABLE cities DISABLE ROW LEVEL SECURITY;
  ALTER TABLE salaries DISABLE ROW LEVEL SECURITY;
  ALTER TABLE results DISABLE ROW LEVEL SECURITY;

  -- 为常用查询创建索引（可选）
  CREATE INDEX IF NOT EXISTS idx_cities_city_name ON cities(city_name);
  CREATE INDEX IF NOT EXISTS idx_salaries_employee_name ON salaries(employee_name);
  CREATE INDEX IF NOT EXISTS idx_results_employee_name ON results(employee_name);
