import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 relative overflow-hidden">
      {/* 装饰性背景元素 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-indigo-200 to-purple-200 rounded-full opacity-40 blur-3xl animate-float" />
        <div className="absolute top-1/2 -left-20 w-60 h-60 bg-gradient-to-br from-pink-200 to-rose-200 rounded-full opacity-30 blur-3xl animate-float" style={{ animationDelay: '1s' }} />
        <div className="absolute -bottom-20 right-1/4 w-72 h-72 bg-gradient-to-br from-blue-200 to-cyan-200 rounded-full opacity-30 blur-3xl animate-float" style={{ animationDelay: '2s' }} />
      </div>

      <div className="relative max-w-5xl mx-auto px-4 py-16">
        {/* 标题区域 */}
        <div className="text-center mb-16 animate-fade-in-up">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-100 to-purple-100 rounded-full text-indigo-600 text-sm font-medium mb-6">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            企业级解决方案
          </div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
            五险一金计算器
          </h1>
          <p className="text-gray-500 text-lg max-w-md mx-auto">
            简单、精准、高效的社保公积金缴纳计算工具
          </p>
        </div>

        {/* 功能卡片区域 */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {/* 数据上传卡片 */}
          <Link href="/upload" className="group block">
            <div className="relative bg-white rounded-3xl p-8 shadow-lg shadow-indigo-100/50 border border-gray-100/80 card-hover overflow-hidden">
              {/* 背景装饰 */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-full -translate-y-1/2 translate-x-1/2 opacity-60" />

              <div className="relative">
                <div className="flex items-start gap-5 mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/30 group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h2 className="text-xl font-bold text-gray-800 mb-1 group-hover:text-indigo-600 transition-colors">
                      数据上传
                    </h2>
                    <p className="text-gray-400 text-sm">
                      上传 Excel 文件导入数据
                    </p>
                  </div>
                </div>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-3 text-sm text-gray-500">
                    <div className="w-5 h-5 bg-blue-100 rounded-md flex items-center justify-center">
                      <svg className="w-3 h-3 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    城市社保标准数据
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-500">
                    <div className="w-5 h-5 bg-blue-100 rounded-md flex items-center justify-center">
                      <svg className="w-3 h-3 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    员工工资明细数据
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-500">
                    <div className="w-5 h-5 bg-blue-100 rounded-md flex items-center justify-center">
                      <svg className="w-3 h-3 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    一键执行计算
                  </div>
                </div>

                <div className="flex items-center text-indigo-600 font-medium text-sm group-hover:gap-3 gap-2 transition-all">
                  开始上传
                  <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </div>
            </div>
          </Link>

          {/* 结果查询卡片 */}
          <Link href="/results" className="group block">
            <div className="relative bg-white rounded-3xl p-8 shadow-lg shadow-purple-100/50 border border-gray-100/80 card-hover overflow-hidden">
              {/* 背景装饰 */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-50 to-pink-100 rounded-full -translate-y-1/2 translate-x-1/2 opacity-60" />

              <div className="relative">
                <div className="flex items-start gap-5 mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center shadow-lg shadow-purple-500/30 group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h2 className="text-xl font-bold text-gray-800 mb-1 group-hover:text-purple-600 transition-colors">
                      结果查询
                    </h2>
                    <p className="text-gray-400 text-sm">
                      查看计算结果统计报表
                    </p>
                  </div>
                </div>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-3 text-sm text-gray-500">
                    <div className="w-5 h-5 bg-purple-100 rounded-md flex items-center justify-center">
                      <svg className="w-3 h-3 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    员工缴费明细一览
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-500">
                    <div className="w-5 h-5 bg-purple-100 rounded-md flex items-center justify-center">
                      <svg className="w-3 h-3 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    统计数据汇总展示
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-500">
                    <div className="w-5 h-5 bg-purple-100 rounded-md flex items-center justify-center">
                      <svg className="w-3 h-3 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    支持实时刷新数据
                  </div>
                </div>

                <div className="flex items-center text-purple-600 font-medium text-sm group-hover:gap-3 gap-2 transition-all">
                  查看结果
                  <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </div>
            </div>
          </Link>
        </div>

        {/* 系统特性区域 */}
        <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-8 shadow-lg shadow-gray-100/50 border border-gray-100/80">
          <h3 className="text-center text-gray-800 font-semibold text-lg mb-8">
            为什么选择我们
          </h3>
          <div className="grid md:grid-cols-3 gap-8">
            {/* 特性1 */}
            <div className="text-center group">
              <div className="w-14 h-14 bg-gradient-to-br from-cyan-100 to-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-7 h-7 text-cyan-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4" />
                </svg>
              </div>
              <h4 className="font-semibold text-gray-700 mb-2">云端存储</h4>
              <p className="text-gray-400 text-sm">基于 Supabase，数据安全可靠</p>
            </div>

            {/* 特性2 */}
            <div className="text-center group">
              <div className="w-14 h-14 bg-gradient-to-br from-amber-100 to-orange-100 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-7 h-7 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h4 className="font-semibold text-gray-700 mb-2">快速计算</h4>
              <p className="text-gray-400 text-sm">毫秒级响应，高效精准</p>
            </div>

            {/* 特性3 */}
            <div className="text-center group">
              <div className="w-14 h-14 bg-gradient-to-br from-emerald-100 to-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-7 h-7 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h4 className="font-semibold text-gray-700 mb-2">安全可靠</h4>
              <p className="text-gray-400 text-sm">企业级安全保障</p>
            </div>
          </div>
        </div>

        {/* 底部版权 */}
        <div className="mt-12 text-center text-gray-400 text-sm">
          <p>© 2026 五险一金计算器 · 专业社保计算工具</p>
        </div>
      </div>
    </div>
  );
}
