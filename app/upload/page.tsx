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

  const showMessage = (type: 'success' | 'error', text: string) => {
    setMessage({ type, text });
    setTimeout(() => setMessage(null), 5000);
  };

  const handleUploadCities = async () => {
    console.log('handleUploadCities called');
    const file = citiesFileRef.current?.files?.[0];
    if (!file) {
      console.log('No file selected for cities');
      showMessage('error', '请选择 cities.xlsx 文件');
      return;
    }

    setLoading(true);
    setMessage(null);

    try {
      const formData = new FormData();
      formData.append('file', file);

      console.log('Uploading cities file:', file.name);
      const response = await fetch('/api/upload/cities', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();
      console.log('Cities upload response:', result);

      if (response.ok) {
        showMessage('success', result.message);
        if (citiesFileRef.current) {
          citiesFileRef.current.value = '';
        }
      } else {
        console.error('Cities upload error:', result);
        showMessage('error', result.error || '上传失败');
      }
    } catch (error) {
      showMessage('error', '网络错误，请重试');
    } finally {
      setLoading(false);
    }
  };

  const handleUploadSalaries = async () => {
    console.log('handleUploadSalaries called');
    const file = salariesFileRef.current?.files?.[0];
    if (!file) {
      console.log('No file selected for salaries');
      showMessage('error', '请选择 salaries.xlsx 文件');
      return;
    }

    setLoading(true);
    setMessage(null);

    try {
      const formData = new FormData();
      formData.append('file', file);

      console.log('Uploading salaries file:', file.name);
      const response = await fetch('/api/upload/salaries', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();
      console.log('Salaries upload response:', result);

      if (response.ok) {
        showMessage('success', result.message);
        if (salariesFileRef.current) {
          salariesFileRef.current.value = '';
        }
      } else {
        console.error('Salaries upload error:', result);
        showMessage('error', result.error || '上传失败');
      }
    } catch (error) {
      showMessage('error', '网络错误，请重试');
    } finally {
      setLoading(false);
    }
  };

  const handleCalculate = async () => {
    console.log('handleCalculate called');
    setLoading(true);
    setMessage(null);

    try {
      console.log('Calling calculate API...');
      const response = await fetch('/api/calculate', {
        method: 'POST',
      });

      const result = await response.json();
      console.log('Calculate response:', result);

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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* 标题和返回按钮 */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2 text-blue-300 hover:text-white transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
            </Link>
            <h1 className="text-2xl font-bold text-white">数据上传</h1>
          </div>
        </div>

        {/* 消息提示 */}
        {message && (
          <div className={`mb-4 p-3 rounded-lg backdrop-blur-lg text-sm ${
            message.type === 'success'
              ? 'bg-green-500/20 text-green-300 border border-green-500/30'
              : 'bg-red-500/20 text-red-300 border border-red-500/30'
          }`}>
            {message.text}
          </div>
        )}

        {/* 功能区域 */}
        <div className="space-y-3">
          {/* 上传城市标准 */}
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-4 border border-white/20">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-7 h-7 bg-blue-500/20 rounded-lg flex items-center justify-center">
                <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                </svg>
              </div>
              <h2 className="text-sm font-semibold text-white">上传城市标准</h2>
            </div>
            <p className="text-blue-200/50 text-xs mb-3">cities.xlsx 包含城市名、年份、基数上下限、缴纳比例</p>
            <div className="flex gap-2">
              <input ref={citiesFileRef} type="file" accept=".xlsx,.xls" className="flex-1 text-xs text-blue-200 file:mr-2 file:py-2 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-medium file:bg-blue-500/20 file:text-blue-300 hover:file:bg-blue-500/30 bg-white/5 rounded-lg border border-white/10" />
              <button onClick={handleUploadCities} disabled={loading} className="px-4 py-2 bg-blue-600 text-white text-xs rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50">上传</button>
            </div>
          </div>

          {/* 上传员工工资 */}
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-4 border border-white/20">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-7 h-7 bg-purple-500/20 rounded-lg flex items-center justify-center">
                <svg className="w-4 h-4 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <h2 className="text-sm font-semibold text-white">上传员工工资</h2>
            </div>
            <p className="text-blue-200/50 text-xs mb-3">salaries.xlsx 包含员工工号、姓名、月份、工资金额</p>
            <div className="flex gap-2">
              <input ref={salariesFileRef} type="file" accept=".xlsx,.xls" className="flex-1 text-xs text-blue-200 file:mr-2 file:py-2 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-medium file:bg-purple-500/20 file:text-purple-300 hover:file:bg-purple-500/30 bg-white/5 rounded-lg border border-white/10" />
              <button onClick={handleUploadSalaries} disabled={loading} className="px-4 py-2 bg-purple-600 text-white text-xs rounded-lg font-medium hover:bg-purple-700 disabled:opacity-50">上传</button>
            </div>
          </div>

          {/* 执行计算 */}
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-4 border border-white/20">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-7 h-7 bg-green-500/20 rounded-lg flex items-center justify-center">
                <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
              <h2 className="text-sm font-semibold text-white">执行计算</h2>
            </div>
            <p className="text-blue-200/50 text-xs mb-3">上传数据后执行计算并存储结果</p>
            <button onClick={handleCalculate} disabled={loading} className="w-full px-4 py-3 bg-green-600 text-white text-sm rounded-lg font-medium hover:bg-green-700 disabled:opacity-50 flex items-center justify-center gap-2">
              {loading ? <span>处理中...</span> : '执行计算并存储结果'}
            </button>
          </div>

          {/* 清空数据表 */}
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-4 border border-white/20">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-7 h-7 bg-red-500/20 rounded-lg flex items-center justify-center">
                <svg className="w-4 h-4 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </div>
              <h2 className="text-sm font-semibold text-white">清空数据表</h2>
            </div>
            <div className="flex flex-wrap gap-2 mt-3">
              <button onClick={() => handleClear('cities')} disabled={loading} className="px-3 py-1.5 bg-orange-500/20 text-orange-300 text-xs rounded-lg hover:bg-orange-500/30">cities</button>
              <button onClick={() => handleClear('salaries')} disabled={loading} className="px-3 py-1.5 bg-orange-500/20 text-orange-300 text-xs rounded-lg hover:bg-orange-500/30">salaries</button>
              <button onClick={() => handleClear('results')} disabled={loading} className="px-3 py-1.5 bg-orange-500/20 text-orange-300 text-xs rounded-lg hover:bg-orange-500/30">results</button>
              <button onClick={() => handleClear('all')} disabled={loading} className="px-3 py-1.5 bg-red-500/20 text-red-300 text-xs rounded-lg hover:bg-red-500/30">清空全部</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
