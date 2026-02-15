'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface ResultData {
  id: number;
  employee_name: string;
  avg_salary: number;
  contribution_base: number;
  company_fee: number;
  calculated_at: string;
}

export default function ResultsPage() {
  const [results, setResults] = useState<ResultData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchResults = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/results');
      const data = await response.json();

      if (response.ok) {
        setResults(data.data || []);
      } else {
        setError(data.error || '获取数据失败');
      }
    } catch (error) {
      setError('网络错误，请重试');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchResults();
  }, []);

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('zh-CN', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(num);
  };

  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleString('zh-CN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  // 计算总计
  const totalFee = results.reduce((sum, r) => sum + r.company_fee, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* 标题和返回按钮 */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="flex items-center gap-2 text-blue-300 hover:text-white transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
            </Link>
            <h1 className="text-3xl font-bold text-white">计算结果</h1>
          </div>
          <div className="flex gap-4">
            <button
              onClick={fetchResults}
              disabled={loading}
              className="flex items-center gap-2 px-4 py-2 bg-white/10 text-white rounded-xl font-medium hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed transition-colors border border-white/20"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              刷新
            </button>
            <Link
              href="/"
              className="flex items-center gap-2 text-blue-300 hover:text-white transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              返回
            </Link>
          </div>
        </div>

        {/* 错误提示 */}
        {error && (
          <div className="mb-6 p-4 bg-red-500/20 text-red-300 rounded-xl border border-red-500/30 backdrop-blur-lg">
            {error}
          </div>
        )}

        {/* 加载状态 */}
        {loading && (
          <div className="text-center py-20">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
            <p className="mt-4 text-blue-200">加载中...</p>
          </div>
        )}

        {/* 空数据状态 */}
        {!loading && results.length === 0 && !error && (
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-12 text-center border border-white/20">
            <div className="w-20 h-20 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <p className="text-white text-xl mb-6">暂无计算结果</p>
            <Link
              href="/upload"
              className="inline-block px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-xl font-medium hover:from-blue-600 hover:to-cyan-600 transition-all shadow-lg shadow-blue-500/25"
            >
              去上传数据并计算
            </Link>
          </div>
        )}

        {/* 结果表格 */}
        {!loading && results.length > 0 && (
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl overflow-hidden border border-white/20">
            {/* 统计卡片 */}
            <div className="grid grid-cols-3 gap-4 p-6 border-b border-white/10">
              <div className="bg-blue-500/20 rounded-xl p-4 text-center">
                <p className="text-blue-300 text-sm">员工数量</p>
                <p className="text-2xl font-bold text-white mt-1">{results.length}</p>
              </div>
              <div className="bg-purple-500/20 rounded-xl p-4 text-center">
                <p className="text-purple-300 text-sm">平均缴费基数</p>
                <p className="text-2xl font-bold text-white mt-1">
                  ¥{formatNumber(results.reduce((sum, r) => sum + r.contribution_base, 0) / results.length)}
                </p>
              </div>
              <div className="bg-green-500/20 rounded-xl p-4 text-center">
                <p className="text-green-300 text-sm">公司总缴纳</p>
                <p className="text-2xl font-bold text-green-400 mt-1">¥{formatNumber(totalFee)}</p>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-white/5">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-blue-200">序号</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-blue-200">员工姓名</th>
                    <th className="px-6 py-4 text-right text-sm font-semibold text-blue-200">年度月平均工资</th>
                    <th className="px-6 py-4 text-right text-sm font-semibold text-blue-200">最终缴费基数</th>
                    <th className="px-6 py-4 text-right text-sm font-semibold text-blue-200">公司缴纳金额</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-blue-200">计算时间</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10">
                  {results.map((result, index) => (
                    <tr key={result.id} className="hover:bg-white/5 transition-colors">
                      <td className="px-6 py-4 text-sm text-blue-300">{index + 1}</td>
                      <td className="px-6 py-4 text-sm font-medium text-white">{result.employee_name}</td>
                      <td className="px-6 py-4 text-sm text-right text-blue-200 font-mono">
                        ¥{formatNumber(result.avg_salary)}
                      </td>
                      <td className="px-6 py-4 text-sm text-right text-blue-200 font-mono">
                        ¥{formatNumber(result.contribution_base)}
                      </td>
                      <td className="px-6 py-4 text-sm text-right text-green-400 font-semibold font-mono">
                        ¥{formatNumber(result.company_fee)}
                      </td>
                      <td className="px-6 py-4 text-sm text-blue-300/70">{formatDateTime(result.calculated_at)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
