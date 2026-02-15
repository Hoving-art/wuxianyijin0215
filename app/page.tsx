import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="max-w-5xl mx-auto px-4 py-16">
        {/* 标题区域 */}
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            五险一金计算器
          </h1>
          <p className="text-gray-500">
            企业社保公积金缴纳计算工具
          </p>
        </div>

        {/* 功能卡片区域 */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {/* 数据上传卡片 */}
          <Link href="/upload" className="block">
            <div className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300 p-8 cursor-pointer border border-gray-100">
              <div className="flex items-center gap-5 mb-4">
                <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center">
                  <svg className="w-7 h-7 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                </div>
                <h2 className="text-xl font-semibold text-gray-800">
                  数据上传
                </h2>
              </div>
              <p className="text-gray-400 text-sm ml-[4.5rem]">
                上传员工工资数据和城市社保标准
              </p>
            </div>
          </Link>

          {/* 结果查询卡片 */}
          <Link href="/results" className="block">
            <div className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300 p-8 cursor-pointer border border-gray-100">
              <div className="flex items-center gap-5 mb-4">
                <div className="w-14 h-14 bg-green-100 rounded-xl flex items-center justify-center">
                  <svg className="w-7 h-7 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h2 className="text-xl font-semibold text-gray-800">
                  结果查询
                </h2>
              </div>
              <p className="text-gray-400 text-sm ml-[4.5rem]">
                查看社保公积金计算结果
              </p>
            </div>
          </Link>
        </div>

        {/* 系统特性区域 */}
        <div className="border-t border-gray-100 pt-10">
          <h3 className="text-center text-gray-800 font-medium mb-8">
            系统特性
          </h3>
          <div className="grid md:grid-cols-3 gap-8">
            {/* 特性1 */}
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4" />
                </svg>
              </div>
              <h4 className="font-medium text-gray-700 mb-1">云端存储</h4>
              <p className="text-gray-400 text-sm">数据安全可靠</p>
            </div>

            {/* 特性2 */}
            <div className="text-center">
              <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h4 className="font-medium text-gray-700 mb-1">快速计算</h4>
              <p className="text-gray-400 text-sm">高效精准</p>
            </div>

            {/* 特性3 */}
            <div className="text-center">
              <div className="w-12 h-12 bg-cyan-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-cyan-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h4 className="font-medium text-gray-700 mb-1">安全可靠</h4>
              <p className="text-gray-400 text-sm">隐私保护</p>
            </div>
          </div>
        </div>

        {/* 底部版权 */}
        <div className="mt-12 text-center text-gray-400 text-sm">
          <p>© 2026 五险一金计算器</p>
        </div>
      </div>
    </div>
  );
}
