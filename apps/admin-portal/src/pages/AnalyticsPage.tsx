import React from 'react';
import { Download, ArrowUpRight } from 'lucide-react';

export const AnalyticsPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="font-bold text-2xl text-on-surface">Báo Cáo & Thống Kê Vận Hành</h1>
          <p className="text-xs text-on-surface-variant">
            Tổng hợp dữ liệu doanh thu gói cước, chỉ số tiêu dùng data và chất lượng mạng tỉnh Cà Mau
          </p>
        </div>

        <button className="flex items-center gap-1.5 px-3.5 py-2 bg-primary hover:bg-primary-container text-white rounded-xl text-xs font-semibold shadow-sm transition-colors">
          <Download className="w-3.5 h-3.5" />
          <span>Xuất báo cáo BI / Excel</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="bg-surface-container-lowest p-5 rounded-2xl border border-outline-variant/30 shadow-sm space-y-2">
          <span className="text-xs text-outline font-medium">Doanh Thu Gói Cước Tháng 09</span>
          <div className="text-2xl font-bold text-on-surface tracking-tight">4.944.000.000 đ</div>
          <div className="flex items-center gap-1 text-xs text-emerald-600 font-semibold">
            <ArrowUpRight className="w-3.5 h-3.5" />
            <span>+12.4% so với tháng trước</span>
          </div>
        </div>

        <div className="bg-surface-container-lowest p-5 rounded-2xl border border-outline-variant/30 shadow-sm space-y-2">
          <span className="text-xs text-outline font-medium">Sản Lượng Data 4G Tiêu Thụ</span>
          <div className="text-2xl font-bold text-primary tracking-tight">6.240 TB</div>
          <div className="flex items-center gap-1 text-xs text-emerald-600 font-semibold">
            <ArrowUpRight className="w-3.5 h-3.5" />
            <span>Đỉnh tải tập trung tại TP. Cà Mau & Sông Đốc</span>
          </div>
        </div>

        <div className="bg-surface-container-lowest p-5 rounded-2xl border border-outline-variant/30 shadow-sm space-y-2">
          <span className="text-xs text-outline font-medium">Tỷ Lệ Giữ Chân Khách Hàng (Retention)</span>
          <div className="text-2xl font-bold text-emerald-600 tracking-tight">91.8%</div>
          <div className="text-xs text-on-surface-variant">
            Gói KC135 đạt tỷ lệ tái tục cao nhất (94.2%)
          </div>
        </div>
      </div>
    </div>
  );
};
