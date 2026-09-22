import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import {
  Home,
  Search,
  HelpCircle,
  Bell,
  User,
  ChevronDown,
  CheckCircle2,
  ShieldCheck,
} from 'lucide-react';

const PATH_TITLES: Record<string, string> = {
  '/': 'Tổng Quan Vận Hành',
  '/customers': 'Quản Lý Khách Hàng',
  '/leads': 'Quản Lý Leads & Pipeline',
  '/tickets': 'Yêu Cầu Hỗ Trợ & SLA',
  '/packages': 'Danh Mục Gói Cước',
  '/promotions': 'Chiến Dịch Khuyến Mãi',
  '/stores': 'Cửa Hàng & Điểm Giao Dịch',
  '/faq': 'Hỏi Đáp Thường Gặp (FAQ)',
  '/knowledge-base': 'Cơ Sở Tri Thức AI',
  '/documents': 'Tài Liệu & Nguồn',
  '/ai-conversations': 'Nhật Ký Hội Thoại AI',
  '/notifications': 'Trung Tâm Thông Báo',
  '/analytics': 'Báo Cáo & Thống Kê',
  '/audit-logs': 'Nhật Ký Kiểm Toán',
  '/rbac': 'Phân Quyền & RBAC',
  '/settings': 'Cấu Hình Hệ Thống',
};

export const Header: React.FC = () => {
  const location = useLocation();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const currentTitle = PATH_TITLES[location.pathname] || 'Trang Quản Trị';

  return (
    <header className="fixed top-0 left-64 right-0 h-16 bg-surface-container-lowest shadow-[0_1px_8px_rgba(0,0,0,0.04)] z-40 flex items-center justify-between px-6 border-b border-outline-variant/30">
      {/* Left: Breadcrumbs & Search */}
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2 text-on-surface-variant text-xs">
          <Home className="w-4 h-4 text-outline" />
          <span className="text-outline">/</span>
          <span className="text-on-surface font-semibold truncate max-w-[200px]">
            {currentTitle}
          </span>
        </div>

        <div className="relative w-72 hidden md:block">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-outline" />
          <input
            type="text"
            placeholder="Tìm gói cước, số thuê bao, hồ sơ..."
            className="w-full pl-9 pr-12 py-1.5 bg-surface-container-low rounded-xl text-xs text-on-surface placeholder:text-outline border border-transparent focus:border-primary focus:bg-white focus:outline-none transition-all"
          />
          <kbd className="absolute right-2.5 top-1/2 -translate-y-1/2 px-1.5 py-0.5 rounded bg-surface-container-high text-on-surface-variant text-[10px] font-mono shadow-sm">
            ⌘K
          </kbd>
        </div>
      </div>

      {/* Right: Environment & User Controls */}
      <div className="flex items-center gap-3">
        {/* Environment Tag */}
        <span className="hidden xl:inline-flex items-center px-2.5 py-1 rounded-full bg-secondary-fixed text-on-secondary-fixed text-[11px] font-bold tracking-wide uppercase">
          DEMO ENVIRONMENT - PROTOTYPE
        </span>

        {/* System Health */}
        <div className="flex items-center gap-1.5 px-3 py-1 bg-surface-container rounded-xl">
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-500" />
          <span className="text-xs text-on-surface font-semibold">Hệ thống ổn định</span>
        </div>

        {/* Support Help */}
        <button
          aria-label="Hỗ trợ kỹ thuật"
          className="w-9 h-9 rounded-xl flex items-center justify-center text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-colors"
          title="Tài liệu hướng dẫn & Hỗ trợ"
        >
          <HelpCircle className="w-4 h-4" />
        </button>

        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            aria-label="Thông báo hệ thống"
            className="w-9 h-9 rounded-xl flex items-center justify-center text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-colors relative"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-1 right-1 w-4 h-4 bg-secondary text-white text-[10px] rounded-full flex items-center justify-center leading-none font-bold">
              3
            </span>
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-surface-container-lowest rounded-2xl shadow-xl border border-outline-variant/30 py-3 z-50 animate-in fade-in zoom-in-95 duration-150">
              <div className="px-4 pb-2 border-b border-outline-variant/30 flex items-center justify-between">
                <span className="font-semibold text-xs text-on-surface">Thông báo mới</span>
                <span className="text-[11px] text-primary font-medium cursor-pointer">Đã đọc tất cả</span>
              </div>
              <div className="divide-y divide-outline-variant/20 max-h-72 overflow-y-auto">
                <div className="p-3 hover:bg-surface-container-low transition-colors">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="text-xs font-semibold text-on-surface">Lead tư vấn mới</span>
                  </div>
                  <p className="text-[11px] text-on-surface-variant mt-1">
                    Khách hàng 0903***456 đăng ký tư vấn gói KC135 tại TP. Cà Mau.
                  </p>
                  <span className="text-[10px] text-outline mt-1 block">5 phút trước</span>
                </div>
                <div className="p-3 hover:bg-surface-container-low transition-colors">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-3.5 h-3.5 text-primary" />
                    <span className="text-xs font-semibold text-on-surface">Cập nhật chính sách PII</span>
                  </div>
                  <p className="text-[11px] text-on-surface-variant mt-1">
                    Hệ thống đã tự động khóa che giấu số CCCD theo Nghị định 13.
                  </p>
                  <span className="text-[10px] text-outline mt-1 block">1 giờ trước</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* User Badge */}
        <div className="relative">
          <button
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="flex items-center gap-2.5 pl-3 border-l border-outline-variant/30 text-left hover:opacity-80 transition-opacity"
          >
            <div className="w-8 h-8 rounded-xl bg-primary flex items-center justify-center text-white shadow-sm shrink-0">
              <User className="w-4 h-4" />
            </div>
            <div className="hidden lg:flex flex-col text-left">
              <span className="text-xs font-semibold text-on-surface leading-tight truncate max-w-[150px]">
                Nguyễn Văn Quản Trị
              </span>
              <span className="text-[11px] text-on-surface-variant truncate">
                Super Admin [DEMO]
              </span>
            </div>
            <ChevronDown className="w-4 h-4 text-outline" />
          </button>

          {showUserMenu && (
            <div className="absolute right-0 mt-2 w-52 bg-surface-container-lowest rounded-2xl shadow-xl border border-outline-variant/30 py-2 z-50 animate-in fade-in zoom-in-95 duration-150">
              <div className="px-4 py-2 border-b border-outline-variant/20">
                <p className="text-xs font-semibold text-on-surface">Nguyễn Văn Quản Trị</p>
                <p className="text-[11px] text-outline">admin.camau@mobifone.vn</p>
              </div>
              <div className="py-1">
                <a
                  href="/settings"
                  className="block px-4 py-1.5 text-xs text-on-surface hover:bg-surface-container transition-colors"
                >
                  Cài đặt tài khoản
                </a>
                <a
                  href="/audit-logs"
                  className="block px-4 py-1.5 text-xs text-on-surface hover:bg-surface-container transition-colors"
                >
                  Lịch sử truy cập
                </a>
              </div>
              <div className="pt-1 border-t border-outline-variant/20">
                <button
                  type="button"
                  className="w-full text-left px-4 py-1.5 text-xs text-secondary font-medium hover:bg-secondary-fixed/30 transition-colors"
                >
                  Đăng xuất an toàn
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
