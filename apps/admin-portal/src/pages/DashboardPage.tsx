import React, { useState } from 'react';
import {
  Users,
  UserCheck,
  Headphones,
  Store,
  Bot,
  TrendingUp,
  RefreshCw,
  Download,
  ArrowUpRight,
  ShieldCheck,
  CheckCircle2,
  MapPin,
} from 'lucide-react';
import { apiClient } from '../services/api-client';

export const DashboardPage: React.FC = () => {
  const [period, setPeriod] = useState<'today' | '7days' | '30days' | 'month'>('today');
  const [isSyncing, setIsSyncing] = useState(false);
  const [lastSyncTime, setLastSyncTime] = useState<string>('Vừa xong');

  const handleSync = async () => {
    setIsSyncing(true);
    await apiClient.getHealth();
    setTimeout(() => {
      setIsSyncing(false);
      setLastSyncTime('1 phút trước');
    }, 600);
  };

  const districtData = [
    { code: '785', name: 'TP. Cà Mau', leads: 48, tickets: 6, sla: '98.5%', status: 'Tối ưu' },
    { code: '788', name: 'Trần Văn Thời', leads: 22, tickets: 3, sla: '95.2%', status: 'Tối ưu' },
    { code: '789', name: 'Cái Nước', leads: 15, tickets: 2, sla: '96.0%', status: 'Tối ưu' },
    { code: '791', name: 'Năm Căn', leads: 14, tickets: 2, sla: '94.8%', status: 'Ổn định' },
    { code: '787', name: 'Thới Bình', leads: 11, tickets: 2, sla: '93.5%', status: 'Ổn định' },
    { code: '786', name: 'U Minh', leads: 9, tickets: 1, sla: '97.0%', status: 'Tối ưu' },
    { code: '790', name: 'Đầm Dơi', leads: 8, tickets: 1, sla: '92.0%', status: 'Ổn định' },
    { code: '792', name: 'Phú Tân', leads: 6, tickets: 1, sla: '95.0%', status: 'Ổn định' },
    { code: '793', name: 'Ngọc Hiển', leads: 5, tickets: 1, sla: '91.2%', status: 'Cần lưu ý' },
  ];

  return (
    <div className="space-y-6">
      {/* Top Command & Filter Bar matching Stitch screen */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2.5 flex-wrap">
            <h1 className="font-bold text-2xl text-on-surface">
              Tổng Quan Vận Hành & Vận Hành Số
            </h1>
            <span className="px-2.5 py-0.5 rounded-full bg-primary-fixed text-on-primary-fixed text-[11px] uppercase tracking-wider font-semibold">
              DEMO DATA - PROPOSED MODEL
            </span>
          </div>
          <p className="text-xs text-on-surface-variant max-w-3xl">
            Hệ thống theo dõi khách hàng, gói cước, mạng lưới cửa hàng và trợ lý AI tại địa bàn tỉnh Cà Mau
          </p>
        </div>

        {/* Toolbar Controls */}
        <div className="flex items-center gap-2 flex-wrap">
          {/* Period selector */}
          <div className="flex items-center bg-surface-container rounded-xl p-1">
            <button
              onClick={() => setPeriod('today')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                period === 'today'
                  ? 'bg-surface-container-lowest text-primary shadow-sm'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              Hôm nay
            </button>
            <button
              onClick={() => setPeriod('7days')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                period === '7days'
                  ? 'bg-surface-container-lowest text-primary shadow-sm'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              7 ngày qua
            </button>
            <button
              onClick={() => setPeriod('30days')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                period === '30days'
                  ? 'bg-surface-container-lowest text-primary shadow-sm'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              30 ngày qua
            </button>
            <button
              onClick={() => setPeriod('month')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                period === 'month'
                  ? 'bg-surface-container-lowest text-primary shadow-sm'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              Tháng này
            </button>
          </div>

          {/* Sync Button */}
          <button
            onClick={handleSync}
            disabled={isSyncing}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-surface-container-low hover:bg-surface-container text-on-surface text-xs font-semibold transition-colors"
          >
            <RefreshCw className={`w-3.5 h-3.5 text-primary ${isSyncing ? 'animate-spin' : ''}`} />
            <span>Đồng bộ</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
          </button>

          {/* Export Button */}
          <button
            type="button"
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-primary hover:bg-primary-container text-on-primary text-xs font-semibold transition-colors shadow-sm"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Xuất báo cáo</span>
          </button>
        </div>
      </div>

      {/* Metric Overview Grid (6 KPIs) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {/* KPI 1: Khách hàng */}
        <div className="bg-surface-container-lowest rounded-2xl p-4 shadow-sm hover:shadow-md transition-shadow border border-outline-variant/30 flex flex-col justify-between">
          <div className="flex items-start justify-between">
            <span className="text-xs text-on-surface-variant font-semibold">Khách Hàng Mini App</span>
            <div className="w-9 h-9 rounded-xl bg-primary-fixed flex items-center justify-center text-primary">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl font-bold text-on-surface tracking-tight">34,820</div>
            <div className="flex items-center gap-1 mt-1 text-xs text-emerald-600 font-semibold">
              <ArrowUpRight className="w-3.5 h-3.5" />
              <span>+8.4%</span>
              <span className="text-on-surface-variant font-normal text-[11px] ml-0.5">MoM [DEMO]</span>
            </div>
          </div>
        </div>

        {/* KPI 2: Leads hôm nay */}
        <div className="bg-surface-container-lowest rounded-2xl p-4 shadow-sm hover:shadow-md transition-shadow border border-outline-variant/30 flex flex-col justify-between">
          <div className="flex items-start justify-between">
            <span className="text-xs text-on-surface-variant font-semibold">Leads Tư Vấn Mới</span>
            <div className="w-9 h-9 rounded-xl bg-surface-container-high flex items-center justify-center text-secondary">
              <UserCheck className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="flex items-baseline gap-1.5">
              <span className="text-2xl font-bold text-on-surface tracking-tight">128</span>
              <span className="text-[11px] text-secondary font-semibold">12 cần gấp</span>
            </div>
            <div className="flex items-center gap-1 mt-1 text-xs text-on-surface-variant">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              <span className="text-[11px]">84% đã tiếp cận liên hệ</span>
            </div>
          </div>
        </div>

        {/* KPI 3: Phiếu hỗ trợ */}
        <div className="bg-surface-container-lowest rounded-2xl p-4 shadow-sm hover:shadow-md transition-shadow border border-outline-variant/30 flex flex-col justify-between">
          <div className="flex items-start justify-between">
            <span className="text-xs text-on-surface-variant font-semibold">Phiếu Hỗ Trợ Đang Mở</span>
            <div className="w-9 h-9 rounded-xl bg-surface-container-high flex items-center justify-center text-tertiary">
              <Headphones className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-bold text-on-surface tracking-tight">19</span>
              <span className="text-xs text-on-surface-variant">phiếu</span>
            </div>
            <div className="flex items-center gap-1 mt-1 text-xs text-primary font-semibold">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>SLA đạt 96.2%</span>
            </div>
          </div>
        </div>

        {/* KPI 4: Điểm giao dịch */}
        <div className="bg-surface-container-lowest rounded-2xl p-4 shadow-sm hover:shadow-md transition-shadow border border-outline-variant/30 flex flex-col justify-between">
          <div className="flex items-start justify-between">
            <span className="text-xs text-on-surface-variant font-semibold">Điểm Giao Dịch</span>
            <div className="w-9 h-9 rounded-xl bg-surface-container-high flex items-center justify-center text-primary">
              <Store className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-bold text-on-surface tracking-tight">9/9</span>
              <span className="text-xs text-on-surface-variant">Cửa hàng</span>
            </div>
            <div className="flex items-center gap-1 mt-1 text-xs text-emerald-600 font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              <span className="text-[11px]">100% Hoạt động bình thường</span>
            </div>
          </div>
        </div>

        {/* KPI 5: Hội thoại AI */}
        <div className="bg-surface-container-lowest rounded-2xl p-4 shadow-sm hover:shadow-md transition-shadow border border-outline-variant/30 flex flex-col justify-between">
          <div className="flex items-start justify-between">
            <span className="text-xs text-on-surface-variant font-semibold">Hội Thoại Trợ Lý AI</span>
            <div className="w-9 h-9 rounded-xl bg-primary-container flex items-center justify-center text-white">
              <Bot className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-bold text-on-surface tracking-tight">1,452</span>
              <span className="text-xs text-on-surface-variant">phiên</span>
            </div>
            <div className="flex items-center gap-1 mt-1 text-xs text-primary font-semibold">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>Hài lòng 94.8%</span>
            </div>
          </div>
        </div>

        {/* KPI 6: Tỷ lệ gia hạn */}
        <div className="bg-surface-container-lowest rounded-2xl p-4 shadow-sm hover:shadow-md transition-shadow border border-outline-variant/30 flex flex-col justify-between">
          <div className="flex items-start justify-between">
            <span className="text-xs text-on-surface-variant font-semibold">Tỷ Lệ Gia Hạn Gói</span>
            <div className="w-9 h-9 rounded-xl bg-surface-container-high flex items-center justify-center text-primary">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-bold text-on-surface tracking-tight">88.6%</span>
            </div>
            <div className="flex items-center gap-1 mt-1 text-xs text-on-surface-variant">
              <span className="text-[11px]">ARPU: 142.000 đ/tháng</span>
            </div>
          </div>
        </div>
      </div>

      {/* 2-Column Section: Pipeline Funnel & Package Market Share */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Leads Conversion Funnel (7 cols) */}
        <div className="lg:col-span-7 bg-surface-container-lowest rounded-2xl p-5 border border-outline-variant/30 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-bold text-base text-on-surface">Phễu Chuyển Đổi Leads Tư Vấn (4 Giai Đoạn)</h2>
              <p className="text-xs text-on-surface-variant">Theo dõi hiệu suất từ khi tiếp nhận đến khi chốt đăng ký gói cước</p>
            </div>
            <span className="text-xs font-semibold text-primary px-2.5 py-1 bg-primary-fixed rounded-lg">
              Tỷ lệ chốt: 48.2%
            </span>
          </div>

          <div className="space-y-3 pt-2">
            {/* Stage 1 */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs font-semibold text-on-surface">
                <span>1. Tiếp nhận mới từ Mini App & Bot</span>
                <span>128 leads (100%)</span>
              </div>
              <div className="w-full h-3 bg-surface-container rounded-full overflow-hidden">
                <div className="h-full bg-primary rounded-full" style={{ width: '100%' }} />
              </div>
            </div>

            {/* Stage 2 */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs font-semibold text-on-surface">
                <span>2. Đã phân bổ tới giao dịch viên Cà Mau</span>
                <span>112 leads (87.5%)</span>
              </div>
              <div className="w-full h-3 bg-surface-container rounded-full overflow-hidden">
                <div className="h-full bg-primary-container rounded-full" style={{ width: '87.5%' }} />
              </div>
            </div>

            {/* Stage 3 */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs font-semibold text-on-surface">
                <span>3. Đã liên hệ & xác định nhu cầu</span>
                <span>92 leads (71.8%)</span>
              </div>
              <div className="w-full h-3 bg-surface-container rounded-full overflow-hidden">
                <div className="h-full bg-sky-500 rounded-full" style={{ width: '71.8%' }} />
              </div>
            </div>

            {/* Stage 4 */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs font-semibold text-on-surface">
                <span>4. Chốt thành công gói cước (KC135, TK135...)</span>
                <span>62 leads (48.4%)</span>
              </div>
              <div className="w-full h-3 bg-surface-container rounded-full overflow-hidden">
                <div className="h-full bg-emerald-500 rounded-full" style={{ width: '48.4%' }} />
              </div>
            </div>
          </div>
        </div>

        {/* Package Share (5 cols) */}
        <div className="lg:col-span-5 bg-surface-container-lowest rounded-2xl p-5 border border-outline-variant/30 shadow-sm space-y-4">
          <div>
            <h2 className="font-bold text-base text-on-surface">Tỷ Trọng Đăng Ký Gói Cước Cà Mau</h2>
            <p className="text-xs text-on-surface-variant">Thống kê theo lượt đăng ký tháng 09/2026</p>
          </div>

          <div className="space-y-3 pt-1">
            <div className="space-y-1">
              <div className="flex justify-between text-xs font-medium">
                <span className="font-semibold text-on-surface">KC135 (6GB/ngày + Thoại)</span>
                <span className="text-primary font-bold">42% (14,624 TB)</span>
              </div>
              <div className="w-full h-2.5 bg-surface-container rounded-full overflow-hidden">
                <div className="h-full bg-primary rounded-full" style={{ width: '42%' }} />
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between text-xs font-medium">
                <span className="font-semibold text-on-surface">TK135 (7GB/ngày Data khỏe)</span>
                <span className="text-sky-600 font-bold">28% (9,749 TB)</span>
              </div>
              <div className="w-full h-2.5 bg-surface-container rounded-full overflow-hidden">
                <div className="h-full bg-sky-500 rounded-full" style={{ width: '28%' }} />
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between text-xs font-medium">
                <span className="font-semibold text-on-surface">MXH120 (Free TikTok & FB)</span>
                <span className="text-indigo-600 font-bold">16% (5,571 TB)</span>
              </div>
              <div className="w-full h-2.5 bg-surface-container rounded-full overflow-hidden">
                <div className="h-full bg-indigo-500 rounded-full" style={{ width: '16%' }} />
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between text-xs font-medium">
                <span className="font-semibold text-on-surface">C120N (4GB/ngày + Combo)</span>
                <span className="text-amber-600 font-bold">9% (3,133 TB)</span>
              </div>
              <div className="w-full h-2.5 bg-surface-container rounded-full overflow-hidden">
                <div className="h-full bg-amber-500 rounded-full" style={{ width: '9%' }} />
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between text-xs font-medium">
                <span className="font-semibold text-on-surface">PT90 (Data cơ bản 1.5GB/ngày)</span>
                <span className="text-slate-600 font-bold">5% (1,741 TB)</span>
              </div>
              <div className="w-full h-2.5 bg-surface-container rounded-full overflow-hidden">
                <div className="h-full bg-slate-400 rounded-full" style={{ width: '5%' }} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Cà Mau 9 Districts Performance Table matching Stitch */}
      <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant/30 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-outline-variant/30 flex items-center justify-between">
          <div>
            <h2 className="font-bold text-base text-on-surface">
              Chỉ Số Vận Hành Theo 9 Đơn Vị Hành Chính Tỉnh Cà Mau
            </h2>
            <p className="text-xs text-on-surface-variant">
              Tích hợp mạng lưới trạm BTS viễn thông và chi nhánh MobiFone tại từng huyện/thị xã
            </p>
          </div>
          <span className="text-xs text-outline font-medium">
            Đồng bộ: {lastSyncTime}
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-surface-container-low text-on-surface-variant font-semibold border-b border-outline-variant/20">
              <tr>
                <th className="px-6 py-3">Địa Bàn Hành Chính</th>
                <th className="px-6 py-3">Leads Phát Sinh</th>
                <th className="px-6 py-3">Sự Cố Đang Xử Lý</th>
                <th className="px-6 py-3">SLA Tiếp Nhận</th>
                <th className="px-6 py-3">Tình Trạng Sóng & Trạm</th>
                <th className="px-6 py-3 text-right">Chi Tiết</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/20">
              {districtData.map((d) => (
                <tr key={d.code} className="hover:bg-surface-container-low/50 transition-colors">
                  <td className="px-6 py-3.5 font-semibold text-on-surface flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-primary shrink-0" />
                    <span>{d.name}</span>
                  </td>
                  <td className="px-6 py-3.5 font-bold text-primary">{d.leads} leads</td>
                  <td className="px-6 py-3.5">
                    <span className="px-2 py-0.5 rounded-full bg-surface-container-high text-on-surface text-[11px] font-semibold">
                      {d.tickets} phiếu
                    </span>
                  </td>
                  <td className="px-6 py-3.5 font-semibold text-emerald-600">{d.sla}</td>
                  <td className="px-6 py-3.5">
                    <span
                      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold ${
                        d.status === 'Tối ưu'
                          ? 'bg-emerald-50 text-emerald-700'
                          : d.status === 'Ổn định'
                          ? 'bg-blue-50 text-blue-700'
                          : 'bg-amber-50 text-amber-700'
                      }`}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${
                          d.status === 'Tối ưu'
                            ? 'bg-emerald-500'
                            : d.status === 'Ổn định'
                            ? 'bg-blue-500'
                            : 'bg-amber-500'
                        }`}
                      />
                      {d.status}
                    </span>
                  </td>
                  <td className="px-6 py-3.5 text-right">
                    <a
                      href={`/leads?districtId=${d.code}`}
                      className="text-primary hover:underline font-semibold text-xs"
                    >
                      Xem địa bàn
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
