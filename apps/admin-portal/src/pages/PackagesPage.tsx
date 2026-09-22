import React, { useState } from 'react';
import {
  Zap,
  Settings2,
  Eye,
  Search,
  Filter,
  PhoneCall,
} from 'lucide-react';
import { TelecomPackage, TELECOM_PACKAGES } from '@mobiops/shared';

const LIFECYCLE_STEPS = [
  { step: 1, name: 'Dự thảo', status: 'done' },
  { step: 2, name: 'Thẩm định pháp lý', status: 'done' },
  { step: 3, name: 'Cấu hình OCS', status: 'done' },
  { step: 4, name: 'Thử nghiệm Sandbox', status: 'done' },
  { step: 5, name: 'Triển khai thương mại', status: 'active' },
  { step: 6, name: 'Quảng bá Mini App', status: 'active' },
  { step: 7, name: 'Theo dõi ARPU', status: 'active' },
  { step: 8, name: 'Ngừng / Thay thế', status: 'pending' },
];

export const PackagesPage: React.FC = () => {
  const [packages] = useState<TelecomPackage[]>(TELECOM_PACKAGES);
  const [selectedPkg, setSelectedPkg] = useState<TelecomPackage | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('ALL');

  const filteredPackages = packages.filter((p) => {
    if (categoryFilter !== 'ALL' && p.category !== categoryFilter) return false;
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return (
      p.code.toLowerCase().includes(q) ||
      p.name.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q)
    );
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="font-bold text-2xl text-on-surface">
            Quản Trị Danh Mục Gói Cước & Vòng Đời Dịch Vụ
          </h1>
          <p className="text-xs text-on-surface-variant">
            Cấu hình định mức data, gọi thoại và kiểm soát chu kỳ phát hành gói cước viễn thông MobiFone Cà Mau
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1.5 rounded-xl bg-primary-fixed text-on-primary-fixed text-xs font-semibold">
            Đang hoạt động: 6 gói cước ưu tiên Cà Mau
          </span>
        </div>
      </div>

      {/* 8-Step Telecom Lifecycle Roadmap */}
      <div className="bg-surface-container-lowest p-5 rounded-2xl border border-outline-variant/30 shadow-sm space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Settings2 className="w-4 h-4 text-primary" />
            <h2 className="font-bold text-xs text-outline uppercase tracking-wider">
              Vòng Đời Quản Trị Gói Cước (8 Bước Chuẩn Viễn Thông)
            </h2>
          </div>
          <span className="text-[11px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md font-semibold">
            Đang ở Bước 5 & 6: Vận hành Mini App
          </span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-2 pt-2">
          {LIFECYCLE_STEPS.map((s) => (
            <div
              key={s.step}
              className={`p-2.5 rounded-xl border text-center transition-all ${
                s.status === 'done'
                  ? 'bg-emerald-50/60 border-emerald-200 text-emerald-900'
                  : s.status === 'active'
                  ? 'bg-primary-fixed border-primary/30 text-on-primary-fixed font-semibold ring-1 ring-primary'
                  : 'bg-surface-container border-outline-variant/20 text-outline'
              }`}
            >
              <div className="text-[10px] font-mono text-outline">Bước {s.step}</div>
              <div className="text-xs mt-0.5 leading-tight line-clamp-2">{s.name}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Filter & Search */}
      <div className="bg-surface-container-lowest p-4 rounded-2xl border border-outline-variant/30 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-outline" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Tìm theo mã gói, tên gọi..."
            className="w-full pl-9 pr-3 py-1.5 bg-surface-container-low rounded-xl text-xs text-on-surface placeholder:text-outline border border-transparent focus:border-primary focus:bg-white focus:outline-none transition-all"
          />
        </div>

        <div className="flex items-center gap-2">
          <Filter className="w-3.5 h-3.5 text-outline" />
          <span className="text-xs text-on-surface-variant font-medium">Nhóm gói:</span>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="bg-surface-container-low px-3 py-1.5 rounded-xl border border-outline-variant/30 text-xs font-semibold text-on-surface focus:outline-none focus:border-primary"
          >
            <option value="ALL">Tất cả danh mục</option>
            <option value="COMBO_VOICE_DATA">Combo Thoại & Data</option>
            <option value="DATA_ONLY">Data Tốc Độ Cao</option>
            <option value="SOCIAL_APP">Mạng Xã Hội (TikTok, FB)</option>
          </select>
        </div>
      </div>

      {/* Packages Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredPackages.map((pkg) => {
          return (
            <div
              key={pkg.code}
              className="bg-surface-container-lowest rounded-2xl border border-outline-variant/30 p-5 shadow-sm hover:shadow-md transition-all flex flex-col justify-between relative overflow-hidden"
            >
              {pkg.isHot && (
                <span className="absolute top-3 right-3 px-2 py-0.5 rounded-full bg-secondary text-white text-[10px] font-bold uppercase tracking-wider">
                  Gói Bán Chạy
                </span>
              )}

              <div>
                <div className="flex items-baseline gap-2">
                  <span className="font-bold text-xl text-primary">{pkg.code}</span>
                  <span className="text-xs text-on-surface-variant font-medium">{pkg.cycle}</span>
                </div>

                <div className="mt-1 text-lg font-bold text-on-surface">
                  {pkg.price.toLocaleString('vi-VN')} đ
                </div>

                <p className="text-xs text-on-surface-variant mt-2 line-clamp-2 leading-relaxed">
                  {pkg.description}
                </p>

                {/* Highlights */}
                <div className="mt-4 p-3 bg-surface-container-low rounded-xl space-y-1.5 text-xs">
                  <div className="flex items-center gap-2 text-on-surface">
                    <Zap className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                    <span>Dung lượng: <strong className="text-primary">{pkg.dataPerDay}</strong></span>
                  </div>
                  {pkg.voiceInternal && (
                    <div className="flex items-center gap-2 text-on-surface">
                      <PhoneCall className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span className="truncate">{pkg.voiceInternal}</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="mt-5 pt-3 border-t border-outline-variant/30 flex items-center justify-between">
                <span className="text-[11px] font-mono text-outline">
                  Cú pháp: DK {pkg.code}
                </span>
                <button
                  onClick={() => setSelectedPkg(pkg)}
                  className="flex items-center gap-1 text-xs font-semibold text-primary hover:underline"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Chi tiết</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Package Detail Modal */}
      {selectedPkg && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-surface-container-lowest w-full max-w-lg rounded-2xl shadow-2xl border border-outline-variant/40 p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-outline-variant/30">
              <div>
                <h3 className="font-bold text-lg text-primary">{selectedPkg.code}</h3>
                <p className="text-xs text-on-surface-variant">{selectedPkg.name}</p>
              </div>
              <span className="text-base font-bold text-on-surface">
                {selectedPkg.price.toLocaleString('vi-VN')} đ / {selectedPkg.cycle}
              </span>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3 bg-primary-fixed/40 rounded-xl space-y-1">
                <div className="font-semibold text-primary">Đặc quyền viễn thông nổi bật:</div>
                <div className="text-on-surface-variant leading-relaxed">
                  {selectedPkg.benefits ? selectedPkg.benefits.join(' • ') : selectedPkg.description}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="p-2.5 bg-surface-container rounded-xl">
                  <span className="text-outline text-[11px] block">Cú pháp đăng ký</span>
                  <span className="font-mono font-bold text-primary">{selectedPkg.registrationSyntax}</span>
                </div>
                <div className="p-2.5 bg-surface-container rounded-xl">
                  <span className="text-outline text-[11px] block">Cú pháp hủy gói</span>
                  <span className="font-mono font-bold text-secondary">{selectedPkg.cancellationSyntax}</span>
                </div>
              </div>

              <div>
                <span className="font-semibold text-on-surface block mb-1">Đối tượng áp dụng:</span>
                <p className="text-on-surface-variant leading-relaxed">{selectedPkg.targetAudience}</p>
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setSelectedPkg(null)}
                className="px-5 py-2 rounded-xl bg-primary text-white text-xs font-semibold hover:bg-primary-container shadow-sm"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
