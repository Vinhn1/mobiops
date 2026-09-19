import React, { useState } from 'react';
import {
  Settings,
  Bell,
  CheckCircle,
  Eye,
  EyeOff,
  Edit3,
  QrCode,
  Phone,
  PlusCircle,
  Sparkles,
  Gift,
  Tag,
  Clock,
  History,
  Bookmark,
  ShieldCheck,
  Bot,
  HelpCircle,
  PhoneCall,
  LogOut,
  ChevronRight,
  ArrowRight
} from 'lucide-react';
import { maskPhone } from '@mobiops/shared';

interface ProfileProps {
  onOpenAIChat: () => void;
  onNavigateToSupport: () => void;
  onNavigateToPackages: () => void;
  onNavigateToStores: () => void;
}

export const ProfilePage: React.FC<ProfileProps> = ({
  onOpenAIChat,
  onNavigateToSupport,
  onNavigateToPackages,
  onNavigateToStores
}) => {
  const rawPhone = '0903892456';
  const [isPhoneRevealed, setIsPhoneRevealed] = useState(false);
  const [showQrModal, setShowQrModal] = useState(false);

  const displayedPhone = isPhoneRevealed ? '0903 892 456' : maskPhone(rawPhone);

  return (
    <div className="flex flex-col w-full bg-surface pb-12">
      {/* Top Action Bar */}
      <div className="px-margin pt-space-xs pb-space-md flex flex-col gap-space-md">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-space-xs">
            <h1 className="font-h1 text-h1 text-on-surface">Tài khoản</h1>
            <span className="px-2 py-0.5 rounded-full bg-primary-fixed text-primary font-caption text-caption font-semibold">
              Cà Mau VIP
            </span>
          </div>
          <div className="flex items-center gap-space-xs">
            <button
              aria-label="Cài đặt tài khoản"
              className="w-11 h-11 rounded-full flex items-center justify-center text-on-surface-variant hover:text-on-surface bg-surface-container-low active:scale-95 transition-all"
            >
              <Settings className="w-5 h-5" />
            </button>
            <button
              aria-label="Trung tâm thông báo"
              className="relative w-11 h-11 rounded-full flex items-center justify-center text-on-surface-variant hover:text-on-surface bg-surface-container-low active:scale-95 transition-all"
            >
              <Bell className="w-5 h-5" />
              <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-secondary rounded-full"></span>
            </button>
          </div>
        </div>

        {/* 1. Customer Profile Header Card */}
        <div className="relative overflow-hidden rounded-xl bg-surface-container-lowest p-space-md shadow-sm border border-outline-variant/30">
          <div className="absolute -top-12 -right-12 w-36 h-36 rounded-full bg-primary-fixed-dim/30 blur-2xl pointer-events-none"></div>
          <div className="relative flex items-start gap-space-md">
            {/* Avatar */}
            <div className="relative flex-shrink-0">
              <div className="w-16 h-16 rounded-full overflow-hidden bg-primary-fixed text-primary flex items-center justify-center font-bold text-xl shadow-sm border-2 border-white">
                NA
              </div>
              <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-primary-container text-on-primary flex items-center justify-center shadow-md">
                <CheckCircle className="w-3.5 h-3.5" />
              </div>
            </div>

            {/* Identity & Status */}
            <div className="flex-1 min-w-0 flex flex-col">
              <div className="flex items-center gap-1.5 flex-wrap">
                <h2 className="font-h2 text-h2 text-on-surface truncate font-bold">Nguyễn Văn A</h2>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-50 text-amber-800 font-caption text-[11px] font-semibold border border-amber-200">
                  <Sparkles className="w-3 h-3 text-amber-600" />
                  Hạng Vàng
                </span>
              </div>
              <p className="font-caption text-caption text-on-surface-variant mt-0.5 truncate">Hội viên MobiFone Đất Mũi</p>

              {/* Phone with toggle */}
              <div className="flex items-center gap-2 mt-1.5">
                <span className="font-body text-body font-semibold text-primary tracking-wider font-mono">
                  {displayedPhone}
                </span>
                <button
                  onClick={() => setIsPhoneRevealed(!isPhoneRevealed)}
                  aria-label="Ẩn hiện số điện thoại"
                  className="w-7 h-7 flex items-center justify-center rounded-full text-outline hover:text-primary hover:bg-surface-container-low transition-colors"
                >
                  {isPhoneRevealed ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>

              {/* Subscription Badge */}
              <div className="mt-2.5 inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-surface-container-low w-fit">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span className="font-caption text-[11px] text-primary font-medium">Thuê bao trả trước • Đang hoạt động</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-space-md pt-space-xs flex items-center justify-between gap-space-xs">
            <button className="flex-1 h-11 px-space-md rounded-xl bg-surface-container-low hover:bg-surface-container-high text-primary font-button-sm text-button-sm flex items-center justify-center gap-1.5 active:scale-95 transition-all font-semibold">
              <Edit3 className="w-4 h-4" />
              <span>Chỉnh sửa hồ sơ</span>
            </button>
            <button
              onClick={() => setShowQrModal(true)}
              className="h-11 px-space-md rounded-xl bg-primary-fixed text-primary font-button-sm text-button-sm flex items-center justify-center gap-1.5 active:scale-95 transition-all font-semibold"
            >
              <QrCode className="w-4 h-4" />
              <span>Mã QR của tôi</span>
            </button>
          </div>
        </div>

        {/* 2. Notification Callout Banner */}
        <div className="rounded-xl bg-surface-container-high p-space-md shadow-sm flex items-start gap-space-sm relative overflow-hidden border border-primary/20">
          <div className="w-10 h-10 rounded-full bg-primary-container text-on-primary flex items-center justify-center flex-shrink-0 shadow-sm">
            <Bell className="w-5 h-5" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5">
              <span className="font-h3 text-h3 text-primary font-bold">Thông báo Cà Mau mới</span>
              <span className="w-2 h-2 rounded-full bg-secondary"></span>
            </div>
            <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5 line-clamp-2">
              Bạn có 2 thông báo mới về tiến trình hỗ trợ #CM-HOTRO-93821 và ưu đãi nạp thẻ tháng này.
            </p>
            <button
              onClick={onNavigateToSupport}
              className="inline-flex items-center gap-1 mt-2 text-primary font-button-sm text-button-sm font-semibold hover:underline"
            >
              <span>Xem thông báo (2)</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* 3. Account Metric & Services Overview */}
        <div className="flex flex-col gap-space-xs">
          <div className="flex items-center justify-between">
            <h3 className="font-h3 text-h3 text-on-surface font-bold">Tổng quan dịch vụ & Gói cước</h3>
            <button
              onClick={onNavigateToPackages}
              className="text-primary font-button-sm text-button-sm flex items-center gap-0.5 hover:underline font-semibold"
            >
              <span>Xem tất cả</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 gap-space-sm">
            {/* Card 1: Gói cước chính KC135 */}
            <div className="rounded-xl bg-surface-container-lowest p-space-md shadow-sm flex flex-col gap-space-sm border border-outline-variant/30">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-space-xs">
                  <div className="w-9 h-9 rounded-lg bg-primary text-on-primary flex items-center justify-center font-button text-[12px] font-bold">
                    KC
                  </div>
                  <div className="flex flex-col">
                    <span className="font-h3 text-h3 text-primary font-bold leading-tight">KC135 Cà Mau</span>
                    <span className="font-caption text-[11px] text-on-surface-variant">Gói cước ưu đãi Đất Mũi</span>
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-surface-container-high text-primary font-caption text-caption font-semibold">
                  Còn 18 ngày
                </span>
              </div>

              {/* Progress Visual */}
              <div className="bg-surface-container-low rounded-lg p-space-sm flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="font-caption text-caption text-on-surface-variant">Data hôm nay đã dùng</span>
                  <div className="flex items-baseline gap-1 mt-0.5">
                    <span className="font-h2 text-h2 text-on-surface font-bold">4.2</span>
                    <span className="font-body-sm text-body-sm text-on-surface-variant">/ 6.0 GB</span>
                  </div>
                  <span className="font-caption text-[11px] text-tertiary mt-0.5 font-medium">Tốc độ cao 5G không giới hạn</span>
                </div>

                {/* Circular Meter */}
                <div className="relative w-14 h-14 flex items-center justify-center">
                  <svg className="w-14 h-14 transform -rotate-90" viewBox="0 0 36 36">
                    <path
                      className="text-surface-container-highest"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3.5"
                    />
                    <path
                      className="text-primary"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="currentColor"
                      strokeDasharray="70, 100"
                      strokeLinecap="round"
                      strokeWidth="3.5"
                    />
                  </svg>
                  <span className="absolute font-caption text-[11px] font-bold text-primary">70%</span>
                </div>
              </div>

              <div className="flex items-center justify-between text-body-sm font-body-sm text-on-surface-variant pt-1">
                <span className="flex items-center gap-1 text-xs">
                  <Phone className="w-3.5 h-3.5 text-tertiary" />
                  Miễn phí thoại nội mạng &lt; 10p
                </span>
                <button
                  onClick={onNavigateToPackages}
                  className="text-primary font-button-sm text-button-sm font-semibold hover:underline"
                >
                  Gia hạn
                </button>
              </div>
            </div>

            {/* Card 2: Balance & Rewards */}
            <div className="rounded-xl bg-surface-container-lowest p-space-md shadow-sm grid grid-cols-2 gap-space-sm divide-x divide-outline-variant/30 border border-outline-variant/30">
              <div className="flex flex-col justify-between">
                <div>
                  <span className="font-caption text-caption text-on-surface-variant">Tài khoản chính</span>
                  <div className="font-h2 text-h2 text-on-surface font-bold mt-0.5">85.000 đ</div>
                  <span className="font-caption text-[11px] text-on-surface-variant block mt-0.5">HSD: 30/12/2025</span>
                </div>
                <button className="mt-space-sm h-9 px-3 rounded-lg bg-primary-container text-on-primary font-button-sm text-button-sm flex items-center justify-center gap-1 active:scale-95 transition-all font-semibold">
                  <PlusCircle className="w-4 h-4" />
                  <span>Nạp tiền</span>
                </button>
              </div>

              <div className="pl-space-sm flex flex-col justify-between">
                <div>
                  <span className="font-caption text-caption text-on-surface-variant">Điểm Rewards</span>
                  <div className="flex items-center gap-1 mt-0.5">
                    <span className="font-h2 text-h2 text-secondary font-bold">1.250</span>
                    <Sparkles className="w-4 h-4 text-secondary" />
                  </div>
                  <span className="font-caption text-[11px] text-on-surface-variant block mt-0.5">Đổi voucher Đất Mũi</span>
                </div>
                <button className="mt-space-sm h-9 px-3 rounded-lg bg-surface-container-high text-primary font-button-sm text-button-sm flex items-center justify-center gap-1 active:scale-95 transition-all font-semibold">
                  <Gift className="w-4 h-4" />
                  <span>Đổi quà</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* 4. Shortcut Hubs (2x2 Grid) */}
        <div className="flex flex-col gap-space-xs mt-space-xs">
          <h3 className="font-h3 text-h3 text-on-surface font-bold">Tiện ích quản lý của bạn</h3>
          <div className="grid grid-cols-2 gap-space-sm">
            <button
              onClick={onNavigateToPackages}
              className="rounded-xl bg-surface-container-lowest p-space-md shadow-sm flex flex-col justify-between hover:bg-surface-container-low transition-colors text-left border border-outline-variant/30"
            >
              <div className="flex items-start justify-between w-full">
                <div className="w-10 h-10 rounded-lg bg-primary-fixed text-primary flex items-center justify-center">
                  <Tag className="w-5 h-5" />
                </div>
                <span className="px-2 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed font-caption text-[10px] font-bold">HOT</span>
              </div>
              <div className="mt-space-sm">
                <span className="font-button text-button text-on-surface font-semibold block">Ưu đãi của tôi</span>
                <span className="font-caption text-[11px] text-on-surface-variant block mt-0.5">3 voucher & gói data sẵn sàng</span>
              </div>
            </button>

            <button
              onClick={onNavigateToSupport}
              className="rounded-xl bg-surface-container-lowest p-space-md shadow-sm flex flex-col justify-between hover:bg-surface-container-low transition-colors text-left border border-outline-variant/30"
            >
              <div className="flex items-start justify-between w-full">
                <div className="w-10 h-10 rounded-lg bg-surface-container-highest text-tertiary flex items-center justify-center">
                  <Clock className="w-5 h-5" />
                </div>
                <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 font-caption text-[10px] font-semibold">Đang xử lý</span>
              </div>
              <div className="mt-space-sm">
                <span className="font-button text-button text-on-surface font-semibold block">Yêu cầu hỗ trợ</span>
                <span className="font-caption text-[11px] text-on-surface-variant block mt-0.5 truncate">#CM-HOTRO-93821</span>
              </div>
            </button>

            <button
              onClick={onNavigateToPackages}
              className="rounded-xl bg-surface-container-lowest p-space-md shadow-sm flex flex-col justify-between hover:bg-surface-container-low transition-colors text-left border border-outline-variant/30"
            >
              <div className="flex items-start justify-between w-full">
                <div className="w-10 h-10 rounded-lg bg-surface-container-low text-primary flex items-center justify-center">
                  <History className="w-5 h-5" />
                </div>
                <ChevronRight className="w-4 h-4 text-outline" />
              </div>
              <div className="mt-space-sm">
                <span className="font-button text-button text-on-surface font-semibold block">Lịch sử tư vấn</span>
                <span className="font-caption text-[11px] text-on-surface-variant block mt-0.5 truncate">KC135 & MXH120</span>
              </div>
            </button>

            <button
              onClick={onNavigateToStores}
              className="rounded-xl bg-surface-container-lowest p-space-md shadow-sm flex flex-col justify-between hover:bg-surface-container-low transition-colors text-left border border-outline-variant/30"
            >
              <div className="flex items-start justify-between w-full">
                <div className="w-10 h-10 rounded-lg bg-surface-container-high text-primary flex items-center justify-center">
                  <Bookmark className="w-5 h-5" />
                </div>
                <ChevronRight className="w-4 h-4 text-outline" />
              </div>
              <div className="mt-space-sm">
                <span className="font-button text-button text-on-surface font-semibold block">Cửa hàng đã lưu</span>
                <span className="font-caption text-[11px] text-on-surface-variant block mt-0.5 truncate">55 Trần Hưng Đạo, TP. Cà Mau</span>
              </div>
            </button>
          </div>
        </div>

        {/* 5. Security & Privacy Assurance */}
        <div className="rounded-xl bg-surface-container-low p-space-md flex items-start gap-space-sm border border-outline-variant/20">
          <ShieldCheck className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
          <div className="flex-1 min-w-0">
            <span className="font-caption text-caption text-primary font-bold uppercase tracking-wider block">
              Tiêu chuẩn an toàn MobiFone
            </span>
            <p className="font-caption text-caption text-on-surface-variant mt-0.5 leading-relaxed">
              Bảo mật thông tin thuê bao theo Nghị định 13/2023/NĐ-CP và tiêu chuẩn an toàn viễn thông MobiFone. Không hiển thị đầy đủ thông tin cá nhân trên thiết bị công cộng.
            </p>
          </div>
        </div>

        {/* 6. Quick Support & AI Assistant Access */}
        <div className="flex flex-col gap-space-xs mt-space-xs">
          <span className="font-h3 text-h3 text-on-surface font-bold">Hỗ trợ khách hàng Cà Mau</span>
          <div className="grid grid-cols-3 gap-space-xs">
            <button
              onClick={onOpenAIChat}
              className="h-20 rounded-xl bg-surface-container-lowest shadow-sm flex flex-col items-center justify-center gap-1 hover:bg-surface-container-low active:scale-95 transition-all text-primary border border-outline-variant/30"
            >
              <Bot className="w-5 h-5" />
              <span className="font-caption text-[11px] font-semibold text-on-surface text-center">Trợ lý AI</span>
            </button>
            <button
              onClick={onNavigateToSupport}
              className="h-20 rounded-xl bg-surface-container-lowest shadow-sm flex flex-col items-center justify-center gap-1 hover:bg-surface-container-low active:scale-95 transition-all text-primary border border-outline-variant/30"
            >
              <HelpCircle className="w-5 h-5" />
              <span className="font-caption text-[11px] font-semibold text-on-surface text-center">Hỏi đáp FAQ</span>
            </button>
            <a
              className="h-20 rounded-xl bg-surface-container-lowest shadow-sm flex flex-col items-center justify-center gap-1 hover:bg-surface-container-low active:scale-95 transition-all text-secondary border border-outline-variant/30"
              href="tel:18001090"
            >
              <PhoneCall className="w-5 h-5" />
              <span className="font-caption text-[11px] font-semibold text-on-surface text-center">1800 1090</span>
            </a>
          </div>
        </div>

        {/* Logout / Switch Account */}
        <div className="mt-space-xs">
          <button className="w-full h-11 rounded-xl bg-surface-container-low hover:bg-surface-container text-on-surface-variant hover:text-error font-button-sm text-button-sm flex items-center justify-center gap-2 active:scale-98 transition-all font-semibold">
            <LogOut className="w-4 h-4" />
            <span>Đăng xuất khỏi Zalo Mini App</span>
          </button>
        </div>

        {/* Footer */}
        <div className="text-center pt-space-xs pb-space-sm">
          <p className="font-caption text-[11px] text-outline leading-tight">
            MobiFone Tỉnh Cà Mau © 2024
          </p>
          <p className="font-caption text-[10px] text-outline-variant mt-0.5">
            Phiên bản Zalo Mini App v2.4.0 • Hạ tầng số Mekong Delta
          </p>
        </div>
      </div>

      {/* QR Code Modal */}
      {showQrModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-margin backdrop-blur-xs">
          <div className="w-full max-w-xs rounded-2xl bg-surface-container-lowest p-6 shadow-xl flex flex-col items-center text-center gap-4 animate-in fade-in zoom-in duration-200">
            <h3 className="font-h2 text-h2 font-bold text-on-surface">Mã QR Hội Viên</h3>
            <div className="p-4 bg-white rounded-xl border border-outline-variant shadow-inner">
              <QrCode className="w-44 h-44 text-primary" />
            </div>
            <div className="flex flex-col">
              <span className="font-semibold text-sm text-on-surface">Nguyễn Văn A</span>
              <span className="font-mono text-xs text-primary font-bold">{rawPhone}</span>
              <span className="text-[11px] text-outline mt-1">Xuất trình tại quầy MobiFone Cà Mau để nhận ưu đãi</span>
            </div>
            <button
              onClick={() => setShowQrModal(false)}
              className="w-full h-10 rounded-xl bg-primary text-on-primary font-button-sm text-sm font-semibold"
            >
              Đóng
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
