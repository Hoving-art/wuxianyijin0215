'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function UploadPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const citiesFileRef = useRef<HTMLInputElement>(null);
  const salariesFileRef = useRef<HTMLInputElement>(null);
  const [citiesFileName, setCitiesFileName] = useState<string>('');
  const [salariesFileName, setSalariesFileName] = useState<string>('');

  const showMessage = (type: 'success' | 'error', text: string) => {
    setMessage({ type, text });
    setTimeout(() => setMessage(null), 5000);
  };

  const handleUploadCities = async () => {
    const file = citiesFileRef.current?.files?.[0];
    if (!file) {
      showMessage('error', '请选择 cities.xlsx 文件');
      return;
    }

    setLoading(true);
    setMessage(null);

    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/upload/cities', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();

      if (response.ok) {
        showMessage('success', result.message);
        if (citiesFileRef.current) {
          citiesFileRef.current.value = '';
        }
        setCitiesFileName('');
      } else {
        showMessage('error', result.error || '上传失败');
      }
    } catch (error) {
      showMessage('error', '网络错误，请重试');
    } finally {
      setLoading(false);
    }
  };

  const handleUploadSalaries = async () => {
    const file = salariesFileRef.current?.files?.[0];
    if (!file) {
      showMessage('error', '请选择 salaries.xlsx 文件');
      return;
    }

    setLoading(true);
    setMessage(null);

    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/upload/salaries', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();

      if (response.ok) {
        showMessage('success', result.message);
        if (salariesFileRef.current) {
          salariesFileRef.current.value = '';
        }
        setSalariesFileName('');
      } else {
        showMessage('error', result.error || '上传失败');
      }
    } catch (error) {
      showMessage('error', '网络错误，请重试');
    } finally {
      setLoading(false);
    }
  };

  const handleCalculate = async () => {
    setLoading(true);
    setMessage(null);

    try {
      const response = await fetch('/api/calculate', {
        method: 'POST',
      });

      const result = await response.json();

      if (response.ok) {
        showMessage('success', result.message);
        setTimeout(() => {
          router.push('/results');
        }, 1500);
      } else {
        showMessage('error', result.error || '计算失败');
      }
    } catch (error) {
      showMessage('error', '网络错误，请重试');
    } finally {
      setLoading(false);
    }
  };

  const handleClear = async (tableName: string) => {
    if (!confirm(`确定要清空 ${tableName} 表吗？此操作不可恢复。`)) {
      return;
    }

    setLoading(true);
    setMessage(null);

    try {
      const response = await fetch('/api/clear', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ tableName }),
      });

      const result = await response.json();

      if (response.ok) {
        showMessage('success', result.message);
      } else {
        showMessage('error', result.error || '清空失败');
      }
    } catch (error) {
      showMessage('error', '网络错误，请重试');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 relative overflow-hidden">
      {/* 装饰性背景元素 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-indigo-200 to-purple-200 rounded-full opacity-40 blur-3xl" />
        <div className="absolute top-1/3 -left-20 w-60 h-60 bg-gradient-to-br from-blue-200 to-cyan-200 rounded-full opacity-30 blur-3xl" />
      </div>

      <div className="relative max-w-3xl mx-auto px-4 py-12">
        {/* 标题和返回按钮 */}
        <div className="flex items-center gap-4 mb-8">
          <Link
            href="/"
            className="w-10 h-10 bg-white rounded-xl shadow-md shadow-gray-200/50 flex items-center justify-center hover:shadow-lg hover:scale-105 transition-all"
          >
            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-gray-800">数据上传</h1>
            <p className="text-sm text-gray-400">上传数据并执行计算</p>
          </div>
        </div>

        {/* 消息提示 */}
        {message && (
          <div className={`mb-6 p-4 rounded-2xl flex items-center gap-3 animate-fade-in-up ${
            message.type === 'success'
              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
              : 'bg-red-50 text-red-700 border border-red-200'
          }`}>
            {message.type === 'success' ? (
              <svg className="w-5 h-5 text-emerald-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            ) : (
              <svg className="w-5 h-5 text-red-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            )}
            <span className="font-medium">{message.text}</span>
          </div>
        )}

        {/* 功能区域 */}
        <div className="space-y-4">
          {/* 上传城市标准 */}
          <div className="bg-white rounded-2xl p-6 shadow-lg shadow-gray-100/50 border border-gray-100/80">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-md shadow-blue-500/30">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                </svg>
              </div>
              <div>
                <h2 className="font-semibold text-gray-800">城市社保标准</h2>
                <p className="text-sm text-gray-400">cities.xlsx</p>
              </div>
            </div>
            <p className="text-sm text-gray-500 mb-4 pl-16">包含城市名、年份、基数上下限、缴纳比例</p>
            <div className="flex gap-3 pl-16">
              <div className="flex-1 relative">
                <input
                  ref={citiesFileRef}
                  type="file"
                  accept=".xlsx,.xls"
                  onChange={(e) => setCitiesFileName(e.target.files?.[0]?.name || '')}
                  className="hidden"
                  id="cities-file"
                />
                <label
                  htmlFor="cities-file"
                  className="flex items-center gap-3 px-4 py-3 bg-gray-50 border-2 border-dashed border-gray-200 rounded-xl cursor-pointer hover:border-blue-300 hover:bg-blue-50/50 transition-colors"
                >
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <span className={`text-sm ${citiesFileName ? 'text-gray-700 font-medium' : 'text-gray-400'}`}>
                    {citiesFileName || '选择文件...'}
                  </span>
                </label>
              </div>
              <button
                onClick={handleUploadCities}
                disabled={loading}
                className="px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-sm font-medium rounded-xl hover:from-blue-600 hover:to-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed shadow-md shadow-blue-500/30 hover:shadow-lg transition-all flex items-center gap-2"
              >
                {loading ? (
                  <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                ) : (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                  </svg>
                )}
                上传
              </button>
            </div>
          </div>

          {/* 上传员工工资 */}
          <div className="bg-white rounded-2xl p-6 shadow-lg shadow-gray-100/50 border border-gray-100/80">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center shadow-md shadow-purple-500/30">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <div>
                <h2 className="font-semibold text-gray-800">员工工资数据</h2>
                <p className="text-sm text-gray-400">salaries.xlsx</p>
              </div>
            </div>
            <p className="text-sm text-gray-500 mb-4 pl-16">包含员工工号、姓名、月份、工资金额</p>
            <div className="flex gap-3 pl-16">
              <div className="flex-1 relative">
                <input
                  ref={salariesFileRef}
                  type="file"
                  accept=".xlsx,.xls"
                  onChange={(e) => setSalariesFileName(e.target.files?.[0]?.name || '')}
                  className="hidden"
                  id="salaries-file"
                />
                <label
                  htmlFor="salaries-file"
                  className="flex items-center gap-3 px-4 py-3 bg-gray-50 border-2 border-dashed border-gray-200 rounded-xl cursor-pointer hover:border-purple-300 hover:bg-purple-50/50 transition-colors"
                >
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <span className={`text-sm ${salariesFileName ? 'text-gray-700 font-medium' : 'text-gray-400'}`}>
                    {salariesFileName || '选择文件...'}
                  </span>
                </label>
              </div>
              <button
                onClick={handleUploadSalaries}
                disabled={loading}
                className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-600 text-white text-sm font-medium rounded-xl hover:from-purple-600 hover:to-pink-700 disabled:opacity-50 disabled:cursor-not-allowed shadow-md shadow-purple-500/30 hover:shadow-lg transition-all flex items-center gap-2"
              >
                {loading ? (
                  <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                ) : (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                  </svg>
                )}
                上传
              </button>
            </div>
          </div>

          {/* 执行计算 */}
          <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-2xl p-6 shadow-lg relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMtOS45NDEgMC0xOCA4LjA1OS0xOCAxOHM4LjA1OSAxOCAxOCAxOCAxOC04LjA1OSAxOC0xOC04LjA1OS0xOC0xOC0xOHptMCAzMmMtNy43MzIgMC0xNC02LjI2OC0xNC0xNHM2LjI2OC0xNCAxNC0xNCAxNCA2LjI2OCAxNCAxNC02LjI2OCAxNC0xNCAxNHoiIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iLjA1Ii8+PC9nPjwvc3ZnPg==')] opacity-30"></div>
            <div className="relative flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h2 className="font-semibold text-white text-lg">执行计算</h2>
                  <p className="text-sm text-white/70">上传数据后点击计算</p>
                </div>
              </div>
              <button
                onClick={handleCalculate}
                disabled={loading}
                className="px-8 py-3 bg-white text-indigo-600 font-semibold rounded-xl hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transition-all flex items-center gap-2"
              >
                {loading ? (
                  <>
                    <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    处理中...
                  </>
                ) : (
                  <>
                    开始计算
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* 清空数据表 */}
          <div className="bg-white rounded-2xl p-6 shadow-lg shadow-gray-100/50 border border-gray-100/80">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </div>
              <div>
                <h2 className="font-semibold text-gray-800">数据管理</h2>
                <p className="text-sm text-gray-400">清空指定数据表</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2 pl-16">
              <button
                onClick={() => handleClear('cities')}
                disabled={loading}
                className="px-4 py-2 bg-gray-100 text-gray-600 text-sm rounded-lg hover:bg-gray-200 disabled:opacity-50 transition-colors"
              >
                清空 cities
              </button>
              <button
                onClick={() => handleClear('salaries')}
                disabled={loading}
                className="px-4 py-2 bg-gray-100 text-gray-600 text-sm rounded-lg hover:bg-gray-200 disabled:opacity-50 transition-colors"
              >
                清空 salaries
              </button>
              <button
                onClick={() => handleClear('results')}
                disabled={loading}
                className="px-4 py-2 bg-gray-100 text-gray-600 text-sm rounded-lg hover:bg-gray-200 disabled:opacity-50 transition-colors"
              >
                清空 results
              </button>
              <button
                onClick={() => handleClear('all')}
                disabled={loading}
                className="px-4 py-2 bg-red-50 text-red-600 text-sm rounded-lg hover:bg-red-100 disabled:opacity-50 transition-colors border border-red-200"
              >
                清空全部
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
