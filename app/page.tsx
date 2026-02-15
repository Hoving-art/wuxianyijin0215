import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 py-16 px-4 relative overflow-hidden">
      {/* 背景装饰 */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        {/* 标题 */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-blue-400 to-cyan-300 rounded-xl mb-4 shadow-lg shadow-blue-500/30">
            <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
          </div>
          <h1 className="text-4xl font-bold text-white mb-3 tracking-tight">
            五险一金计算器
          </h1>
          <p className="text-blue-200 text-lg">
            企业社保公积金缴纳计算工具
          </p>
        </div>

        {/* 功能卡片 */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* 数据上传卡片 */}
          <Link href="/upload" className="group">
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl hover:shadow-xl transition-all duration-300 p-6 cursor-pointer hover:-translate-y-1 border border-white/20 hover:border-blue-400/50">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                </div>
                <h2 className="text-xl font-bold text-white">
                  数据上传
                </h2>
              </div>
              <p className="text-blue-200/70 text-sm">
                上传员工工资数据和城市社保标准
              </p>
            </div>
          </Link>

          {/* 结果查询卡片 */}
          <Link href="/results" className="group">
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl hover:shadow-xl transition-all duration-300 p-6 cursor-pointer hover:-translate-y-1 border border-white/20 hover:border-green-400/50">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg shadow-green-500/20">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h2 className="text-xl font-bold text-white">
                  结果查询
                </h2>
              </div>
              <p className="text-green-200/70 text-sm">
                查看社保公积金计算结果
              </p>
            </div>
          </Link>
        </div>

        {/* 底部信息 */}
        <div className="mt-12 text-center text-blue-400 text-sm">
          <p>© 2026 五险一金计算器 · 支持佛山社保标准</p>
        </div>
      </div>
    </div>
  );
}
