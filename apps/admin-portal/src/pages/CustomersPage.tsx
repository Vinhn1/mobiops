import React, { useState } from 'react';
import {
  Eye,
  Search,
  Award,
  ShieldCheck,
  MapPin,
} from 'lucide-react';
import {
  Customer,
  maskPhoneNumber,
  maskCitizenId,
} from '@mobiops/shared';
import { PIIRevealModal } from '../components/common/PIIRevealModal';

const SAMPLE_CUSTOMERS: Customer[] = [
  {
    id: 'cust-001',
    phoneNumber: '0903123456',
    fullName: 'Trần Văn Hoàng',
    citizenId: '096092001234',
    email: 'hoang.tran@gmail.com',
    subscriptionType: 'PREPAID',
    loyaltyTier: 'GOLD',
    loyaltyPoints: 8450,
    mainBalance: 125000,
    currentPackageCode: 'KC135',
    currentPackageName: 'Gói Cước KC135 (6GB/ngày)',
    packageExpiryDate: '2026-10-18',
    districtId: '785',
    districtName: 'Thành phố Cà Mau',
    wardName: 'Phường 5',
    registeredAt: '2022-04-12',
    isVerified: true,
  },
  {
    id: 'cust-002',
    phoneNumber: '0909876543',
    fullName: 'Lê Cẩm Tú',
    citizenId: '096195009876',
    email: 'tu.le@yahoo.com',
    subscriptionType: 'POSTPAID',
    loyaltyTier: 'DIAMOND',
    loyaltyPoints: 24600,
    mainBalance: 450000,
    currentPackageCode: 'TK135',
    currentPackageName: 'Gói Cước TK135 (7GB/ngày)',
    packageExpiryDate: '2026-10-31',
    districtId: '788',
    districtName: 'Huyện Trần Văn Thời',
    wardName: 'Thị trấn Sông Đốc',
    registeredAt: '2020-01-08',
    isVerified: true,
  },
  {
    id: 'cust-003',
    phoneNumber: '0939112233',
    fullName: 'Nguyễn Văn Đạt',
    citizenId: '096088005432',
    subscriptionType: 'PREPAID',
    loyaltyTier: 'TITANIUM',
    loyaltyPoints: 4200,
    mainBalance: 45000,
    currentPackageCode: 'MXH120',
    currentPackageName: 'Gói Cước MXH120 (Free MXH)',
    packageExpiryDate: '2026-10-05',
    districtId: '791',
    districtName: 'Huyện Năm Căn',
    wardName: 'Thị trấn Năm Căn',
    registeredAt: '2023-08-20',
    isVerified: true,
  },
];

export const CustomersPage: React.FC = () => {
  const [customers] = useState<Customer[]>(SAMPLE_CUSTOMERS);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer>(SAMPLE_CUSTOMERS[0]);
  const [searchQuery, setSearchQuery] = useState('');

  // PII Reveal Modal
  const [revealModalOpen, setRevealModalOpen] = useState(false);
  const [revealField, setRevealField] = useState<{
    label: string;
    masked: string;
    unmasked: string;
    resource: string;
  } | null>(null);

  const openReveal = (label: string, masked: string, unmasked: string, resource: string) => {
    setRevealField({ label, masked, unmasked, resource });
    setRevealModalOpen(true);
  };

  const filteredCustomers = customers.filter((c) => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return (
      c.fullName.toLowerCase().includes(q) ||
      c.phoneNumber.includes(q) ||
      (c.citizenId && c.citizenId.includes(q))
    );
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="font-bold text-2xl text-on-surface">
            Hồ Sơ Khách Hàng 360° & Kiểm Soát PII
          </h1>
          <p className="text-xs text-on-surface-variant">
            Tra cứu thông tin thuê bao MobiFone, hội viên Kết Nối Dài Lâu và lịch sử tiêu dùng viễn thông
          </p>
        </div>

        <div className="flex items-center gap-2 px-3 py-1.5 bg-secondary-fixed text-on-secondary-fixed rounded-xl text-xs font-semibold">
          <ShieldCheck className="w-4 h-4" />
          <span>Mặc định che PII theo Nghị định 13/2023/NĐ-CP</span>
        </div>
      </div>

      {/* Main 2-Column Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Customer Directory (5 cols) */}
        <div className="lg:col-span-5 bg-surface-container-lowest rounded-2xl border border-outline-variant/30 shadow-sm p-4 space-y-4">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-outline" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm theo số điện thoại, họ tên, CCCD..."
              className="w-full pl-9 pr-3 py-2 bg-surface-container-low rounded-xl text-xs text-on-surface placeholder:text-outline border border-transparent focus:border-primary focus:bg-white focus:outline-none transition-all"
            />
          </div>

          <div className="space-y-2 max-h-[550px] overflow-y-auto pr-1">
            {filteredCustomers.map((cust) => {
              const isSelected = selectedCustomer.id === cust.id;
              return (
                <div
                  key={cust.id}
                  onClick={() => setSelectedCustomer(cust)}
                  className={`p-3.5 rounded-xl cursor-pointer transition-all border ${
                    isSelected
                      ? 'bg-primary-container/10 border-primary shadow-sm'
                      : 'bg-surface hover:bg-surface-container border-outline-variant/30'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs text-on-surface">
                      {cust.fullName}
                    </span>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase bg-amber-50 text-amber-700 border border-amber-200">
                      {cust.loyaltyTier}
                    </span>
                  </div>

                  <div className="flex items-center justify-between mt-2 text-xs">
                    <span className="font-mono text-on-surface-variant text-[11px]">
                      {maskPhoneNumber(cust.phoneNumber)}
                    </span>
                    <span className="text-[11px] text-primary font-semibold">
                      {cust.currentPackageCode}
                    </span>
                  </div>

                  <div className="text-[11px] text-outline mt-1 flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    <span>{cust.districtName}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Customer 360 Detail View (7 cols) */}
        <div className="lg:col-span-7 bg-surface-container-lowest rounded-2xl border border-outline-variant/30 shadow-sm p-6 space-y-6">
          {/* Top Profile Card */}
          <div className="flex items-start justify-between pb-5 border-b border-outline-variant/30">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-primary flex items-center justify-center text-white text-lg font-bold shadow-md">
                {selectedCustomer.fullName.charAt(0)}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="font-bold text-lg text-on-surface">
                    {selectedCustomer.fullName}
                  </h2>
                  <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 text-[10px] font-bold border border-emerald-200">
                    Đã xác thực NĐ49
                  </span>
                </div>
                <div className="text-xs text-on-surface-variant mt-0.5">
                  Mã định danh thuê bao: <span className="font-mono">{selectedCustomer.id}</span>
                </div>
              </div>
            </div>

            <div className="text-right">
              <span className="text-[11px] text-outline block">Loại thuê bao</span>
              <span className="font-bold text-xs text-primary">
                {selectedCustomer.subscriptionType === 'PREPAID' ? 'Trả Trước' : 'Trả Sau'}
              </span>
            </div>
          </div>

          {/* PII & Identification Fields */}
          <div className="space-y-3">
            <h3 className="font-bold text-xs text-outline uppercase tracking-wider">
              Thông Tin Định Danh (Bảo Mật PII)
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 text-xs">
              {/* Phone */}
              <div className="p-3 bg-surface-container-low rounded-xl border border-outline-variant/30 flex items-center justify-between">
                <div>
                  <span className="text-[11px] text-outline block">Số điện thoại chính</span>
                  <span className="font-mono font-bold text-on-surface text-sm">
                    {maskPhoneNumber(selectedCustomer.phoneNumber)}
                  </span>
                </div>
                <button
                  onClick={() =>
                    openReveal(
                      'Số Điện Thoại Thuê Bao',
                      maskPhoneNumber(selectedCustomer.phoneNumber),
                      selectedCustomer.phoneNumber,
                      selectedCustomer.fullName
                    )
                  }
                  className="p-1.5 rounded-lg bg-surface-container hover:bg-primary-fixed text-primary transition-colors"
                  title="Mở khóa số điện thoại (Yêu cầu lý do kiểm toán)"
                >
                  <Eye className="w-4 h-4" />
                </button>
              </div>

              {/* Citizen ID */}
              <div className="p-3 bg-surface-container-low rounded-xl border border-outline-variant/30 flex items-center justify-between">
                <div>
                  <span className="text-[11px] text-outline block">Số CCCD / CMND</span>
                  <span className="font-mono font-bold text-on-surface text-sm">
                    {selectedCustomer.citizenId ? maskCitizenId(selectedCustomer.citizenId) : 'Chưa cập nhật'}
                  </span>
                </div>
                {selectedCustomer.citizenId && (
                  <button
                    onClick={() =>
                      openReveal(
                        'Số Căn Cước Công Dân (CCCD)',
                        maskCitizenId(selectedCustomer.citizenId!),
                        selectedCustomer.citizenId!,
                        selectedCustomer.fullName
                      )
                    }
                    className="p-1.5 rounded-lg bg-surface-container hover:bg-primary-fixed text-primary transition-colors"
                    title="Mở khóa CCCD (Yêu cầu lý do kiểm toán)"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Package & Service Usage */}
          <div className="space-y-3">
            <h3 className="font-bold text-xs text-outline uppercase tracking-wider">
              Gói Cước & Dịch Vụ Đang Kích Hoạt
            </h3>

            <div className="p-4 bg-gradient-to-r from-primary/5 via-primary/10 to-transparent rounded-2xl border border-primary/20 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <span className="font-bold text-base text-primary">
                    {selectedCustomer.currentPackageCode}
                  </span>
                  <p className="text-xs text-on-surface-variant">
                    {selectedCustomer.currentPackageName}
                  </p>
                </div>
                <span className="px-2.5 py-1 bg-emerald-500 text-white rounded-lg text-xs font-semibold">
                  Đang hoạt động
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-primary/10 text-xs">
                <div>
                  <span className="text-outline text-[11px] block">Ngày hết hạn</span>
                  <span className="font-semibold text-on-surface">
                    {selectedCustomer.packageExpiryDate}
                  </span>
                </div>
                <div>
                  <span className="text-outline text-[11px] block">Số dư tài khoản chính</span>
                  <span className="font-bold text-emerald-600">
                    {selectedCustomer.mainBalance?.toLocaleString('vi-VN')} đ
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Loyalty & District */}
          <div className="grid grid-cols-2 gap-3.5 text-xs">
            <div className="p-3.5 bg-surface-container-low rounded-xl border border-outline-variant/30 space-y-1">
              <div className="flex items-center gap-1.5 text-amber-700 font-semibold">
                <Award className="w-4 h-4" />
                <span>Hội viên {selectedCustomer.loyaltyTier}</span>
              </div>
              <p className="text-[11px] text-on-surface-variant">
                Điểm Kết Nối Dài Lâu: <strong className="text-on-surface">{selectedCustomer.loyaltyPoints.toLocaleString('vi-VN')} điểm</strong>
              </p>
            </div>

            <div className="p-3.5 bg-surface-container-low rounded-xl border border-outline-variant/30 space-y-1">
              <div className="flex items-center gap-1.5 text-primary font-semibold">
                <MapPin className="w-4 h-4" />
                <span>Địa bàn Cà Mau</span>
              </div>
              <p className="text-[11px] text-on-surface-variant">
                {selectedCustomer.wardName}, {selectedCustomer.districtName}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* PII Reveal Modal */}
      {revealField && (
        <PIIRevealModal
          isOpen={revealModalOpen}
          onClose={() => {
            setRevealModalOpen(false);
            setRevealField(null);
          }}
          maskedValue={revealField.masked}
          unmaskedValue={revealField.unmasked}
          fieldLabel={revealField.label}
          targetResource={`Khách hàng ${revealField.resource}`}
          targetId={selectedCustomer.id}
        />
      )}
    </div>
  );
};
