import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  PhoneCall,
  TicketCheck,
  PackageCheck,
  Tag,
  Store,
  HelpCircle,
  BookOpen,
  FileText,
  MessagesSquare,
  Bell,
  BarChart3,
  History,
  ShieldCheck,
  Settings,
  Radio,
} from 'lucide-react';

interface NavItem {
  name: string;
  path: string;
  icon: React.ElementType;
}

interface NavSection {
  title: string;
  items: NavItem[];
}

const NAVIGATION_SECTIONS: NavSection[] = [
  {
    title: 'OVERVIEW',
    items: [
      { name: 'Tổng quan', path: '/', icon: LayoutDashboard },
    ],
  },
  {
    title: 'CRM',
    items: [
      { name: 'Khách hàng', path: '/customers', icon: Users },
      { name: 'Leads tư vấn', path: '/leads', icon: PhoneCall },
      { name: 'Yêu cầu hỗ trợ', path: '/tickets', icon: TicketCheck },
    ],
  },
  {
    title: 'CONTENT',
    items: [
      { name: 'Gói cước', path: '/packages', icon: PackageCheck },
      { name: 'Khuyến mãi', path: '/promotions', icon: Tag },
      { name: 'Cửa hàng & Bản đồ', path: '/stores', icon: Store },
      { name: 'Hỏi đáp FAQ', path: '/faq', icon: HelpCircle },
    ],
  },
  {
    title: 'AI & TRI THỨC',
    items: [
      { name: 'Cơ sở tri thức', path: '/knowledge-base', icon: BookOpen },
      { name: 'Tài liệu & Nguồn', path: '/documents', icon: FileText },
      { name: 'Nhật ký hội thoại AI', path: '/ai-conversations', icon: MessagesSquare },
    ],
  },
  {
    title: 'TRUYỀN THÔNG',
    items: [
      { name: 'Trung tâm thông báo', path: '/notifications', icon: Bell },
    ],
  },
  {
    title: 'PHÂN TÍCH',
    items: [
      { name: 'Báo cáo & Thống kê', path: '/analytics', icon: BarChart3 },
    ],
  },
  {
    title: 'BẢO MẬT',
    items: [
      { name: 'Nhật ký kiểm toán', path: '/audit-logs', icon: History },
      { name: 'Phân quyền & RBAC', path: '/rbac', icon: ShieldCheck },
    ],
  },
  {
    title: 'HỆ THỐNG',
    items: [
      { name: 'Cấu hình chung', path: '/settings', icon: Settings },
    ],
  },
];

export const Sidebar: React.FC = () => {
  const location = useLocation();

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-surface-container-lowest shadow-[0_1px_8px_rgba(0,0,0,0.04)] z-50 flex flex-col justify-between overflow-y-auto border-r border-outline-variant/30">
      <div className="p-4">
        {/* Brand Header */}
        <div className="flex items-center gap-3 pb-4 border-b border-outline-variant/30 mb-3">
          <div className="h-9 w-9 rounded-xl bg-primary-container flex items-center justify-center text-white shadow-sm shrink-0">
            <Radio className="w-5 h-5 text-white" />
          </div>
          <div className="flex flex-col min-w-0">
            <span className="font-bold text-base text-primary truncate leading-tight tracking-tight">
              MobiFone Cà Mau
            </span>
            <span className="text-[11px] text-on-surface-variant truncate font-medium">
              Cà Mau Admin - CMS Portal
            </span>
          </div>
        </div>

        {/* Navigation Sections */}
        <nav className="space-y-4">
          {NAVIGATION_SECTIONS.map((section) => (
            <div key={section.title} className="space-y-1">
              <p className="px-3 text-[11px] text-outline uppercase tracking-wider font-semibold">
                {section.title}
              </p>
              {section.items.map((item) => {
                const Icon = item.icon;
                const isActive =
                  item.path === '/'
                    ? location.pathname === '/'
                    : location.pathname.startsWith(item.path);

                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center gap-3 px-3 py-2 rounded-xl text-xs transition-all ${
                      isActive
                        ? 'bg-primary-container text-white font-semibold shadow-sm'
                        : 'text-on-surface-variant hover:bg-surface-container hover:text-on-surface font-medium'
                    }`}
                  >
                    <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-white' : 'text-outline'}`} />
                    <span className="truncate">{item.name}</span>
                  </Link>
                );
              })}
            </div>
          ))}
        </nav>
      </div>

      {/* Network Node Status Widget matching Stitch */}
      <div className="p-3.5 bg-surface-container-low m-3 rounded-xl border border-outline-variant/30">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs text-on-surface font-semibold">Mạng Viễn Thông</span>
          </div>
          <span className="text-xs font-bold text-primary">99.98%</span>
        </div>
        <p className="text-[11px] text-on-surface-variant mt-1 truncate">
          Node: Cà Mau Core VN-PTN
        </p>
      </div>
    </aside>
  );
};
