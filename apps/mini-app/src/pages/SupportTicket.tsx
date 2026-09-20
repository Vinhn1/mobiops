import React, { useState } from 'react';
import {
  ArrowLeft,
  History,
  Bot,
  User,
  Phone,
  MapPin,
  Camera,
  X,
  Send,
  PhoneCall,
  ShieldCheck,
  ShieldAlert,
  Check,
  Copy,
  CheckCheck,
  Home,
  Store,
  Smartphone,
  Signal,
  Receipt,
  Antenna,
  Building2,
  MoreHorizontal,
  ChevronDown
} from 'lucide-react';
import {
  CAMAU_ADMINISTRATIVE_UNITS,
  CreateTicketSchema,
  TicketCategory
} from '@mobiops/shared';

interface SupportTicketPageProps {
  onBack: () => void;
  onNavigateToHome?: () => void;
  onNavigateToStores?: () => void;
  onViewHistory?: () => void;
  initialCategory?: string;
}

interface SupportCategoryOption {
  id: string;
  category: TicketCategory;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

const SUPPORT_CATEGORIES: SupportCategoryOption[] = [
  { id: 'sim', category: 'SIM_ESIM', label: 'Đổi SIM / eSIM', icon: Smartphone },
  { id: 'data', category: 'VAS_SERVICE', label: 'Gói cước Data / Thoại', icon: Signal },
  { id: 'bill', category: 'BILLING', label: 'Khiếu nại cước', icon: Receipt },
  { id: 'tech', category: 'NETWORK_SIGNAL', label: 'Hỗ trợ sóng & kỹ thuật', icon: Antenna },
  { id: 'enterprise', category: 'OTHER', label: 'Doanh nghiệp', icon: Building2 },
  { id: 'other', category: 'OTHER', label: 'Khác', icon: MoreHorizontal },
];

export const SupportTicketPage: React.FC<SupportTicketPageProps> = ({
  onBack,
  onNavigateToHome,
  onNavigateToStores,
  onViewHistory,
  initialCategory = 'data',
}) => {
  const [selectedCatId, setSelectedCatId] = useState<string>(initialCategory);
  const [fullName, setFullName] = useState('Nguyễn Văn A');
  const [phone, setPhone] = useState('0903 123 456');
  const [selectedDistrict, setSelectedDistrict] = useState(CAMAU_ADMINISTRATIVE_UNITS[0].id);
  const [issueDetails, setIssueDetails] = useState(
    'Tôi muốn được nhân viên tư vấn gói cước KC135 và kiểm tra xem SIM hiện tại có đủ điều kiện nâng cấp 5G không.'
  );
  const [callbackTime, setCallbackTime] = useState<'asap' | 'office' | 'evening'>('asap');
  const [consent, setConsent] = useState(true);
  const [hasImage, setHasImage] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [submittedTicketCode, setSubmittedTicketCode] = useState<string | null>(null);
  const [isCopied, setIsCopied] = useState(false);

  const currentCategory = SUPPORT_CATEGORIES.find((c) => c.id === selectedCatId) || SUPPORT_CATEGORIES[1];
  const selectedDistrictObj = CAMAU_ADMINISTRATIVE_UNITS.find(
    (d) => d.id === selectedDistrict || d.code === selectedDistrict
  );
  const selectedDistrictName = selectedDistrictObj ? selectedDistrictObj.name : 'TP. Cà Mau';

  const handleCopyCode = () => {
    if (!submittedTicketCode) return;
    navigator.clipboard.writeText(submittedTicketCode).then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    }).catch(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!consent) {
      setErrorMessage('Vui lòng đồng ý với chính sách liên hệ hỗ trợ của MobiFone Cà Mau.');
      return;
    }

    const validation = CreateTicketSchema.safeParse({
      customerName: fullName.trim() || undefined,
      customerPhone: phone.replace(/\s+/g, ''),
      category: currentCategory.category,
      districtId: selectedDistrict,
      title: `Hỗ trợ: ${currentCategory.label}`,
      description: issueDetails,
    });

    if (!validation.success) {
      setErrorMessage(validation.error.errors[0]?.message || 'Thông tin chưa hợp lệ');
      return;
    }

    // Sinh mã phiếu ngẫu nhiên đúng định dạng Cà Mau
    const generatedCode = `#CM-HOTRO-${Math.floor(10000 + Math.random() * 90000)}`;
    setSubmittedTicketCode(generatedCode);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Màn hình gửi yêu cầu thành công chuẩn Stitch (Screen 95730b0e6cce4ec89ee71ad1abeedb8b)
  if (submittedTicketCode) {
    return (
      <div className="flex flex-col w-full bg-surface pb-16 animate-in fade-in duration-200">
        {/* Sub-Header Navigation Bar */}
        <div className="bg-surface-container-lowest px-margin py-space-sm shadow-[0_1px_3px_0_rgba(0,0,0,0.05)] flex items-center justify-between">
          <span className="font-h3 text-h3 text-on-surface font-bold">Trạng thái yêu cầu</span>
          <button
            onClick={onBack}
            aria-label="Đóng về trang chủ"
            className="w-9 h-9 rounded-full bg-surface-container-low flex items-center justify-center text-on-surface-variant hover:text-on-surface transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="px-margin pt-space-sm space-y-space-md pb-space-2xl">
          {/* Central Success Hero Card */}
          <section className="flex flex-col items-center text-center bg-surface-container-lowest rounded-xl p-space-lg shadow-sm">
            {/* Checkmark Emblem */}
            <div className="relative flex items-center justify-center mb-space-md">
              <div className="w-16 h-16 rounded-full bg-surface-container-high flex items-center justify-center relative z-10 shadow-sm">
                <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-on-primary">
                  <Check className="w-7 h-7 stroke-[3]" />
                </div>
              </div>
            </div>

            <div className="inline-flex items-center gap-1.5 px-space-xs py-1 rounded-full bg-surface-container-high mb-space-xs">
              <span className="w-2 h-2 rounded-full bg-primary"></span>
              <span className="font-caption text-caption text-primary font-semibold">Tiếp nhận thành công</span>
            </div>

            <h1 className="font-h2 text-h2 text-on-surface font-bold tracking-tight mb-space-2xs">
              Đã tiếp nhận yêu cầu hỗ trợ!
            </h1>
            <p className="font-body text-body text-on-surface-variant max-w-[320px]">
              Cảm ơn bạn đã gửi thông tin đến MobiFone Cà Mau. Yêu cầu của bạn đã được chuyển ngay tới chuyên viên phụ trách địa bàn.
            </p>
          </section>

          {/* Ticket Details & Tracking Card */}
          <section className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm">
            {/* Ticket Code & Copy Button */}
            <div className="bg-surface-container-low rounded-lg p-space-sm flex items-center justify-between mb-space-md">
              <div className="flex flex-col min-w-0">
                <span className="font-caption text-caption text-on-surface-variant">Mã yêu cầu (Ticket ID)</span>
                <span className="font-h3 text-h3 text-primary font-bold tracking-wider truncate font-mono">
                  {submittedTicketCode}
                </span>
              </div>
              <button
                type="button"
                onClick={handleCopyCode}
                aria-label="Sao chép mã yêu cầu"
                className="flex items-center gap-1 px-space-xs py-1.5 rounded-lg bg-surface-container-highest text-primary font-button-sm text-button-sm active:scale-95 transition-all font-semibold"
              >
                {isCopied ? (
                  <>
                    <CheckCheck className="w-4 h-4 text-emerald-600" />
                    <span className="text-emerald-600">Đã chép</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span>Sao chép</span>
                  </>
                )}
              </button>
            </div>

            {/* Metadata Details */}
            <div className="flex flex-col gap-space-xs pb-space-md border-b border-outline-variant/30">
              <div className="flex items-start justify-between gap-space-sm text-left">
                <span className="font-body-sm text-body-sm text-on-surface-variant flex items-center gap-1.5 shrink-0">
                  <Signal className="w-4 h-4 text-primary" /> Chủ đề hỗ trợ:
                </span>
                <span className="font-body-sm text-body-sm text-on-surface font-semibold text-right">
                  {currentCategory.label}
                </span>
              </div>
              <div className="flex items-start justify-between gap-space-sm text-left">
                <span className="font-body-sm text-body-sm text-on-surface-variant flex items-center gap-1.5 shrink-0">
                  <User className="w-4 h-4 text-primary" /> Khách hàng:
                </span>
                <span className="font-body-sm text-body-sm text-on-surface font-semibold text-right">
                  {fullName} - <span className="font-mono">{phone}</span>
                </span>
              </div>
              <div className="flex items-start justify-between gap-space-sm text-left">
                <span className="font-body-sm text-body-sm text-on-surface-variant flex items-center gap-1.5 shrink-0">
                  <MapPin className="w-4 h-4 text-primary" /> Khu vực:
                </span>
                <span className="font-body-sm text-body-sm text-on-surface font-semibold text-right">
                  {selectedDistrictName}, Tỉnh Cà Mau
                </span>
              </div>
            </div>

            {/* Progress Timeline */}
            <div className="bg-surface-container-low rounded-lg p-space-md flex flex-col mt-space-md">
              <div className="flex items-center justify-between mb-space-sm">
                <span className="font-button-sm text-button-sm text-on-surface font-semibold uppercase tracking-wider">
                  Tiến trình xử lý hồ sơ
                </span>
                <span className="font-caption text-caption text-primary font-semibold">Ưu tiên phục vụ</span>
              </div>
              <div className="flex flex-col gap-space-sm relative">
                {/* Step 1 (Completed) */}
                <div className="flex items-start gap-space-sm relative">
                  <div className="flex flex-col items-center">
                    <div className="w-6 h-6 rounded-full bg-primary text-on-primary flex items-center justify-center z-10">
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </div>
                    <div className="w-0.5 h-7 bg-primary"></div>
                  </div>
                  <div className="flex flex-col pt-0.5">
                    <span className="font-body-sm text-body-sm font-semibold text-on-surface">Đã tiếp nhận thông tin</span>
                    <span className="font-caption text-caption text-on-surface-variant">Vừa xong • Hệ thống tự động</span>
                  </div>
                </div>

                {/* Step 2 (In-Progress) */}
                <div className="flex items-start gap-space-sm relative">
                  <div className="flex flex-col items-center">
                    <div className="w-6 h-6 rounded-full bg-surface-container-highest text-primary flex items-center justify-center z-10">
                      <span className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse"></span>
                    </div>
                    <div className="w-0.5 h-7 bg-surface-container-highest"></div>
                  </div>
                  <div className="flex flex-col pt-0.5">
                    <div className="flex items-center gap-1.5">
                      <span className="font-body-sm text-body-sm font-semibold text-primary">Đang phân bổ chuyên viên tư vấn</span>
                    </div>
                    <span className="font-caption text-caption text-on-surface-variant">Hạ tầng quản lý địa bàn MobiFone Cà Mau</span>
                  </div>
                </div>

                {/* Step 3 (Pending) */}
                <div className="flex items-start gap-space-sm relative">
                  <div className="flex flex-col items-center">
                    <div className="w-6 h-6 rounded-full bg-surface-container-highest text-outline-variant flex items-center justify-center z-10">
                      <span className="w-2 h-2 rounded-full bg-outline-variant"></span>
                    </div>
                    <div className="w-0.5 h-7 bg-surface-container-highest"></div>
                  </div>
                  <div className="flex flex-col pt-0.5 opacity-70">
                    <span className="font-body-sm text-body-sm font-medium text-on-surface">Chuyên viên liên hệ hỗ trợ</span>
                    <span className="font-caption text-caption text-on-surface-variant">Dự kiến trong 15-30 phút làm việc</span>
                  </div>
                </div>

                {/* Step 4 (Pending) */}
                <div className="flex items-start gap-space-sm">
                  <div className="flex flex-col items-center">
                    <div className="w-6 h-6 rounded-full bg-surface-container-highest text-outline-variant flex items-center justify-center z-10">
                      <span className="w-2 h-2 rounded-full bg-outline-variant"></span>
                    </div>
                  </div>
                  <div className="flex flex-col pt-0.5 opacity-70">
                    <span className="font-body-sm text-body-sm font-medium text-on-surface">Hoàn tất tư vấn & kích hoạt</span>
                    <span className="font-caption text-caption text-on-surface-variant">Miễn phí 100% chi phí hỗ trợ</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Process Guidance & Security Notes */}
          <section className="flex flex-col gap-space-xs">
            <div className="flex items-start gap-space-sm p-space-sm rounded-xl bg-surface-container-low">
              <div className="w-9 h-9 rounded-full bg-primary-fixed flex items-center justify-center text-on-primary-fixed shrink-0 mt-0.5">
                <PhoneCall className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <span className="font-body-sm text-body-sm text-on-surface font-semibold">Chuyên viên MobiFone sẽ chủ động gọi lại</span>
                <p className="font-caption text-caption text-on-surface-variant mt-0.5 leading-relaxed">
                  Cuộc gọi được thực hiện từ đầu số tổng đài hoặc số chính thức của MobiFone Cà Mau để xác nhận nhu cầu và hỗ trợ kích hoạt tận nơi.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-space-sm p-space-sm rounded-xl bg-secondary-fixed/50">
              <div className="w-9 h-9 rounded-full bg-secondary text-on-secondary flex items-center justify-center shrink-0 mt-0.5">
                <ShieldAlert className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <span className="font-body-sm text-body-sm text-on-surface font-semibold">Lưu ý bảo mật từ MobiFone Cà Mau</span>
                <p className="font-caption text-caption text-on-surface-variant mt-0.5 leading-relaxed">
                  Nhân viên MobiFone <strong>tuyệt đối không bao giờ</strong> yêu cầu cung cấp mật khẩu OTP, mã CVV hoặc chuyển khoản đặt cọc trước khi tư vấn.
                </p>
              </div>
            </div>
          </section>

          {/* Action CTA Buttons */}
          <div className="flex flex-col gap-space-xs pt-2">
            <button
              onClick={onNavigateToHome || onBack}
              className="w-full h-11 rounded-lg bg-primary text-on-primary flex items-center justify-center font-button text-button shadow-sm active:scale-[0.98] transition-transform gap-2 font-semibold"
            >
              <Home className="w-4 h-4" />
              <span>Về Trang chủ</span>
            </button>
            {onNavigateToStores && (
              <button
                onClick={onNavigateToStores}
                className="w-full h-11 rounded-lg bg-surface-container-highest text-primary flex items-center justify-center font-button text-button active:scale-[0.98] transition-transform gap-2 font-semibold"
              >
                <Store className="w-4 h-4" />
                <span>Điểm giao dịch MobiFone Cà Mau</span>
              </button>
            )}
            <div className="flex items-center justify-center gap-1.5 py-space-xs text-center mt-space-xs">
              <PhoneCall className="w-4 h-4 text-secondary" />
              <span className="font-body-sm text-body-sm text-on-surface-variant">Cần hỗ trợ gấp?</span>
              <a className="font-body-sm text-body-sm text-secondary font-bold hover:underline" href="tel:18001090">
                Hotline 1800 1090 (Miễn phí)
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Màn hình form gửi yêu cầu chuẩn Stitch (Screen 9502cf81863a43fe9f50e2bd3c5b928b)
  return (
    <div className="flex flex-col w-full bg-surface pb-16">
      {/* Sub-Header / Step Progress Bar */}
      <div className="bg-surface-container-lowest px-margin py-space-sm shadow-[0_1px_3px_0_rgba(0,0,0,0.05)]">
        <div className="flex items-center justify-between">
          <button
            onClick={onBack}
            aria-label="Quay lại"
            className="w-10 h-10 -ml-1 rounded-full flex items-center justify-center text-on-surface-variant hover:text-primary hover:bg-surface-container-low transition-colors active:scale-95"
            type="button"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex flex-col items-center flex-1 mx-space-xs text-center">
            <h1 className="font-h3 text-h3 text-on-surface font-bold">Gặp nhân viên hỗ trợ</h1>
            <span className="font-caption text-caption text-primary font-semibold">
              Bước 1/2: Thông tin yêu cầu
            </span>
          </div>
          <button
            onClick={onViewHistory || onBack}
            aria-label="Lịch sử hỗ trợ"
            className="w-10 h-10 -mr-1 rounded-full flex items-center justify-center text-on-surface-variant hover:text-primary hover:bg-surface-container-low transition-colors active:scale-95"
            type="button"
          >
            <History className="w-5 h-5" />
          </button>
        </div>

        {/* Step Bar */}
        <div className="w-full bg-surface-container-high h-1 rounded-full mt-space-xs overflow-hidden">
          <div className="bg-primary-container h-full w-1/2 rounded-full transition-all duration-300"></div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="px-margin pt-space-md space-y-space-md">
        {/* Error Alert */}
        {errorMessage && (
          <div className="p-3 rounded-xl bg-error-container text-error text-xs font-medium flex items-center gap-2 shadow-sm">
            <span>{errorMessage}</span>
          </div>
        )}

        {/* 1. Context Handoff Card from AI Assistant */}
        <div className="bg-surface-container-low rounded-xl p-space-md shadow-sm relative overflow-hidden">
          <div className="absolute -right-4 -bottom-4 w-20 h-20 bg-primary/5 rounded-full pointer-events-none"></div>
          <div className="flex items-start gap-space-sm relative z-10">
            <div className="w-9 h-9 rounded-full bg-primary-container flex items-center justify-center text-on-primary shrink-0 shadow-sm">
              <Bot className="w-5 h-5" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-1">
                <span className="font-button-sm text-button-sm text-primary font-bold uppercase">
                  Chuyển tiếp từ Trợ lý AI
                </span>
                <span className="font-caption text-[11px] text-on-surface-variant bg-surface-container px-2 py-0.5 rounded-full font-medium">
                  Đã lưu ngữ cảnh
                </span>
              </div>
              <p className="font-body-sm text-body-sm text-on-surface-variant mt-1 leading-relaxed">
                Yêu cầu tư vấn gói cước & dịch vụ viễn thông tại địa bàn{' '}
                <strong className="text-on-surface font-semibold">tỉnh Cà Mau</strong>. Chuyên viên kỹ thuật sẽ kế thừa lịch sử trao đổi.
              </p>
            </div>
          </div>
        </div>

        {/* 2. Support Category Selector */}
        <div className="space-y-space-xs">
          <div className="flex items-center justify-between">
            <label className="font-button text-button text-on-surface font-bold flex items-center gap-1.5">
              <span>Danh mục cần hỗ trợ</span>
              <span className="text-secondary">*</span>
            </label>
            <span className="font-caption text-caption text-on-surface-variant">Chọn 1 chủ đề</span>
          </div>
          <div className="flex flex-wrap gap-2 pt-1">
            {SUPPORT_CATEGORIES.map((cat) => {
              const IconComp = cat.icon;
              const isSelected = selectedCatId === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setSelectedCatId(cat.id)}
                  className={`px-3.5 py-2 rounded-lg font-button-sm text-button-sm shadow-sm transition-all active:scale-95 flex items-center gap-1.5 font-semibold ${
                    isSelected
                      ? 'bg-primary-container text-on-primary'
                      : 'bg-surface-container-lowest text-on-surface-variant hover:bg-surface-container-low'
                  }`}
                >
                  <IconComp className="w-4 h-4" />
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 3. Mobile-First Contact & Request Form */}
        <div className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm space-y-space-md border border-outline-variant/30">
          {/* Full Name */}
          <div className="space-y-1.5">
            <label className="font-button text-button text-on-surface font-semibold flex items-center gap-1" htmlFor="fullName">
              <span>Họ và tên khách hàng</span>
              <span className="text-secondary">*</span>
            </label>
            <div className="relative flex items-center">
              <User className="absolute left-3 text-on-surface-variant w-5 h-5 pointer-events-none" />
              <input
                id="fullName"
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Nhập họ và tên"
                className="w-full h-11 pl-10 pr-10 rounded-lg bg-surface-container-low text-on-surface font-body text-body outline-none focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary transition-all"
              />
              <span className="absolute right-3 text-emerald-600 font-caption text-[11px] font-bold">
                ✓ Đã xác thực
              </span>
            </div>
          </div>

          {/* Phone Number */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="font-button text-button text-on-surface font-semibold flex items-center gap-1" htmlFor="phoneNumber">
                <span>Số điện thoại liên hệ</span>
                <span className="text-secondary">*</span>
              </label>
              <span className="font-caption text-[11px] font-semibold text-primary bg-primary-fixed px-2 py-0.5 rounded-full">
                Thuê bao MobiFone
              </span>
            </div>
            <div className="relative flex items-center">
              <Phone className="absolute left-3 text-on-surface-variant w-5 h-5 pointer-events-none" />
              <input
                id="phoneNumber"
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Số điện thoại của bạn"
                className="w-full h-11 pl-10 pr-3 rounded-lg bg-surface-container-low text-on-surface font-body text-body outline-none focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary font-mono transition-all"
              />
            </div>
          </div>

          {/* District Selection in Ca Mau */}
          <div className="space-y-1.5">
            <label className="font-button text-button text-on-surface font-semibold flex items-center gap-1" htmlFor="districtSelect">
              <span>Khu vực sinh sống tại Cà Mau</span>
              <span className="text-secondary">*</span>
            </label>
            <div className="relative flex items-center">
              <MapPin className="absolute left-3 text-on-surface-variant w-5 h-5 pointer-events-none" />
              <select
                id="districtSelect"
                value={selectedDistrict}
                onChange={(e) => setSelectedDistrict(e.target.value)}
                className="w-full h-11 pl-10 pr-10 rounded-lg bg-surface-container-low text-on-surface font-body text-body outline-none focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary transition-all appearance-none cursor-pointer"
              >
                {CAMAU_ADMINISTRATIVE_UNITS.map((d) => (
                  <option key={d.id} value={d.id}>
                    {d.name}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 text-on-surface-variant w-5 h-5 pointer-events-none" />
            </div>
          </div>

          {/* Issue Description */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="font-button text-button text-on-surface font-semibold flex items-center gap-1" htmlFor="issueDetails">
                <span>Chi tiết vấn đề cần hỗ trợ</span>
                <span className="text-secondary">*</span>
              </label>
              <span className="font-caption text-caption text-on-surface-variant">
                {issueDetails.length}/500
              </span>
            </div>
            <textarea
              id="issueDetails"
              required
              maxLength={500}
              rows={4}
              value={issueDetails}
              onChange={(e) => setIssueDetails(e.target.value)}
              placeholder="Vui lòng mô tả chi tiết yêu cầu để điện thoại viên chuẩn bị trước giải pháp..."
              className="w-full p-3 rounded-lg bg-surface-container-low text-on-surface font-body text-body outline-none focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary transition-all leading-relaxed resize-none"
            />
          </div>

          {/* Callback Time Preference */}
          <div className="space-y-2 pt-1">
            <label className="font-button text-button text-on-surface font-semibold block">
              Thời gian mong muốn được gọi lại
            </label>
            <div className="grid grid-cols-1 gap-2">
              <label
                onClick={() => setCallbackTime('asap')}
                className={`flex items-center gap-3 p-2.5 rounded-lg cursor-pointer transition-colors ${
                  callbackTime === 'asap' ? 'bg-primary-fixed/60 border border-primary/30' : 'bg-surface-container-low hover:bg-surface-container'
                }`}
              >
                <input
                  type="radio"
                  name="callTime"
                  checked={callbackTime === 'asap'}
                  onChange={() => setCallbackTime('asap')}
                  className="w-4 h-4 text-primary accent-primary"
                />
                <div className="flex flex-col">
                  <span className="font-body text-body font-medium text-on-surface flex items-center gap-1.5">
                    Càng sớm càng tốt
                    <span className="bg-secondary-fixed text-secondary px-1.5 py-0.2 rounded font-caption text-[10px] font-bold uppercase">
                      Ưu tiên
                    </span>
                  </span>
                  <span className="font-caption text-caption text-on-surface-variant">
                    Phản hồi trong vòng 15 - 30 phút
                  </span>
                </div>
              </label>

              <label
                onClick={() => setCallbackTime('office')}
                className={`flex items-center gap-3 p-2.5 rounded-lg cursor-pointer transition-colors ${
                  callbackTime === 'office' ? 'bg-primary-fixed/60 border border-primary/30' : 'bg-surface-container-low hover:bg-surface-container'
                }`}
              >
                <input
                  type="radio"
                  name="callTime"
                  checked={callbackTime === 'office'}
                  onChange={() => setCallbackTime('office')}
                  className="w-4 h-4 text-primary accent-primary"
                />
                <div className="flex flex-col">
                  <span className="font-body text-body font-medium text-on-surface">Giờ hành chính</span>
                  <span className="font-caption text-caption text-on-surface-variant">
                    08:00 - 11:30 | 13:30 - 17:00
                  </span>
                </div>
              </label>

              <label
                onClick={() => setCallbackTime('evening')}
                className={`flex items-center gap-3 p-2.5 rounded-lg cursor-pointer transition-colors ${
                  callbackTime === 'evening' ? 'bg-primary-fixed/60 border border-primary/30' : 'bg-surface-container-low hover:bg-surface-container'
                }`}
              >
                <input
                  type="radio"
                  name="callTime"
                  checked={callbackTime === 'evening'}
                  onChange={() => setCallbackTime('evening')}
                  className="w-4 h-4 text-primary accent-primary"
                />
                <div className="flex flex-col">
                  <span className="font-body text-body font-medium text-on-surface">Buổi tối</span>
                  <span className="font-caption text-caption text-on-surface-variant">
                    18:00 - 20:00 (Sau giờ làm việc)
                  </span>
                </div>
              </label>
            </div>
          </div>

          {/* Attachment Area */}
          <div className="space-y-1.5 pt-1">
            <label className="font-button text-button text-on-surface font-semibold block">
              Hình ảnh đính kèm (Tùy chọn)
            </label>
            <div className="flex items-center gap-3 overflow-x-auto py-1">
              <button
                type="button"
                onClick={() => setHasImage(!hasImage)}
                className="w-20 h-20 rounded-lg bg-surface-container-low text-primary flex flex-col items-center justify-center gap-1 shrink-0 hover:bg-surface-container transition-colors active:scale-95 border border-dashed border-outline-variant"
              >
                <Camera className="w-6 h-6" />
                <span className="font-caption text-[11px] font-medium">Thêm ảnh</span>
              </button>

              {hasImage && (
                <div className="relative w-20 h-20 rounded-lg overflow-hidden shrink-0 shadow-sm border border-outline-variant bg-surface-container-high flex items-center justify-center">
                  <div className="p-2 text-center text-[10px] text-primary font-semibold leading-tight">
                    kc135_loi_song.png
                  </div>
                  <button
                    type="button"
                    onClick={() => setHasImage(false)}
                    aria-label="Xóa ảnh"
                    className="absolute top-1 right-1 w-5 h-5 rounded-full bg-slate-800/80 text-white flex items-center justify-center hover:bg-secondary transition-colors"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              )}

              <div className="flex flex-col justify-center text-on-surface-variant pr-2">
                <span className="font-caption text-caption font-medium">
                  Chụp màn hình lỗi gói cước / vạch sóng
                </span>
                <span className="font-caption text-[11px]">Tối đa 3 ảnh (JPG, PNG)</span>
              </div>
            </div>
          </div>
        </div>

        {/* 4. Privacy & Consent Card */}
        <div className="bg-surface-container-low rounded-xl p-space-md shadow-sm">
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={consent}
              onChange={(e) => setConsent(e.target.checked)}
              className="mt-0.5 w-4 h-4 text-primary accent-primary rounded cursor-pointer shrink-0"
            />
            <div className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
              Tôi đồng ý để MobiFone Cà Mau liên hệ theo số điện thoại đã cung cấp để xử lý yêu cầu hỗ trợ. Xem{' '}
              <a href="#" className="text-primary font-semibold underline underline-offset-2 hover:text-primary-container">
                Chính sách bảo mật thông tin viễn thông
              </a>
              .
            </div>
          </label>
        </div>

        {/* 5. Primary Action & Emergency Support */}
        <div className="space-y-space-md pt-2">
          <button
            type="submit"
            className="w-full h-12 bg-primary-container text-on-primary rounded-xl font-button text-button font-semibold flex items-center justify-center gap-2 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.08)] hover:brightness-105 active:scale-[0.98] transition-all"
          >
            <span>Gửi yêu cầu hỗ trợ ngay</span>
            <Send className="w-4 h-4" />
          </button>

          {/* Emergency Hotline Strip */}
          <div className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm flex items-center justify-between gap-space-xs border border-outline-variant/30">
            <div className="flex items-center gap-space-xs min-w-0">
              <div className="w-10 h-10 rounded-full bg-secondary-fixed flex items-center justify-center text-secondary shrink-0">
                <PhoneCall className="w-5 h-5" />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="font-caption text-caption text-on-surface-variant">Cần hỗ trợ khẩn cấp?</span>
                <span className="font-h3 text-h3 text-secondary font-bold truncate">Tổng đài 1800 1090</span>
              </div>
            </div>
            <a
              href="tel:18001090"
              className="h-9 px-3.5 bg-surface-container text-primary rounded-lg font-button-sm text-button-sm font-semibold flex items-center gap-1.5 shrink-0 hover:bg-surface-container-high active:scale-95 transition-all"
            >
              <span>Gọi miễn phí</span>
            </a>
          </div>

          {/* Footer reassurance badge */}
          <div className="flex items-center justify-center gap-1.5 text-on-surface-variant pt-1 pb-4">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span className="font-caption text-caption">Hỗ trợ chính thức bởi MobiFone Tỉnh Cà Mau</span>
          </div>
        </div>
      </form>
    </div>
  );
};
