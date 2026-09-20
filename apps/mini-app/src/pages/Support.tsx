import React, { useState } from 'react';
import {
  ArrowLeft,
  Verified,
  Search,
  SlidersHorizontal,
  Bot,
  Phone,
  Sparkles,
  Radio,
  Smartphone,
  Store,
  CreditCard,
  ArrowLeftRight,
  Building2,
  Antenna,
  BadgeCheck,
  Flame,
  ChevronDown,
  CheckCircle2,
  MapPin,
  ThumbsUp,
  ThumbsDown,
  Clock,
  FileEdit,
  PhoneCall
} from 'lucide-react';
import {
  TicketCategory
} from '@mobiops/shared';

interface SupportProps {
  onBackToHome: () => void;
  onOpenAIChat: () => void;
  onNavigateToStores: () => void;
  onNavigateToCreateTicket?: (category?: TicketCategory) => void;
}

interface FAQItem {
  id: string;
  num: number;
  question: string;
  category: string;
  content: React.ReactNode;
}

export const SupportPage: React.FC<SupportProps> = ({
  onBackToHome,
  onOpenAIChat,
  onNavigateToStores,
  onNavigateToCreateTicket
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [expandedFaqId, setExpandedFaqId] = useState<string | null>('faq-1');
  const [helpfulFeedback, setHelpfulFeedback] = useState<Record<string, boolean | null>>({});

  // Active tracking ticket state
  const [showActiveTicket, setShowActiveTicket] = useState(true);

  const categories = [
    { id: 'package', label: 'Gói cước & Data', icon: Radio },
    { id: 'sim', label: 'SIM & eSIM 5G', icon: Smartphone },
    { id: 'store', label: 'Cửa hàng Cà Mau', icon: Store },
    { id: 'payment', label: 'Thanh toán & Cước', icon: CreditCard },
    { id: 'mnp', label: 'Chuyển mạng giữ số', icon: ArrowLeftRight },
    { id: 'b2b', label: 'Khách hàng Doanh nghiệp', icon: Building2 },
    { id: 'network', label: 'Báo hỏng & Sóng', icon: Antenna },
    { id: 'account', label: 'Tài khoản & Hội viên', icon: BadgeCheck }
  ];

  const faqs: FAQItem[] = [
    {
      id: 'faq-1',
      num: 1,
      category: 'sim',
      question: 'Thủ tục đổi sang eSIM MobiFone tại Cà Mau cần giấy tờ gì?',
      content: (
        <div className="p-3.5 rounded-lg bg-surface-container-low text-on-surface flex flex-col gap-2">
          <p className="text-[13px] text-on-surface">
            Để đổi sang eSIM MobiFone tại tỉnh Cà Mau, quý khách chỉ cần chuẩn bị các giấy tờ sau:
          </p>
          <div className="flex flex-col gap-1.5 pl-1">
            <div className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 shrink-0" />
              <span className="text-[13px]">
                <strong>CCCD gắn chip</strong> hoặc Hộ chiếu còn hiệu lực của chính chủ thuê bao.
              </span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 shrink-0" />
              <span className="text-[13px]">
                Mang theo <strong>thiết bị hỗ trợ eSIM</strong> (iPhone XR trở lên, Samsung S20 trở lên, Google Pixel...).
              </span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 shrink-0" />
              <span className="text-[13px]">
                Cước phí chuyển đổi: <strong>25.000 VNĐ/lần</strong>. Hoàn tất nhận mã QR chỉ trong 5 phút.
              </span>
            </div>
          </div>
          <div className="mt-2 pt-2 bg-surface-container-lowest p-2.5 rounded-lg flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-primary shrink-0" />
              <span className="text-xs text-on-surface">Hỗ trợ tại tất cả 10 điểm giao dịch Cà Mau</span>
            </div>
            <button
              onClick={onNavigateToStores}
              className="text-xs text-primary font-bold hover:underline"
            >
              Xem điểm gần nhất
            </button>
          </div>
        </div>
      )
    },
    {
      id: 'faq-2',
      num: 2,
      category: 'package',
      question: 'Gói cước KC135 Cà Mau khi hết 6GB/ngày thì tính cước thế nào?',
      content: (
        <div className="p-3.5 rounded-lg bg-surface-container-low text-on-surface flex flex-col gap-2">
          <p className="text-[13px] leading-relaxed">
            Với gói cước ưu đãi đặc biệt <strong>KC135 (135.000đ/tháng)</strong> dành riêng cho khách hàng Cà Mau:
          </p>
          <ul className="list-disc pl-5 text-[13px] flex flex-col gap-1 text-on-surface-variant">
            <li>Khi sử dụng hết hạn mức <strong>6GB tốc độ cao</strong> trong ngày, hệ thống sẽ tạm ngưng truy cập Internet để tránh phát sinh cước ngoài ý muốn của quý khách.</li>
            <li>Dung lượng 6GB mới sẽ được tự động làm mới vào lúc <strong>00:00 mỗi ngày</strong>.</li>
            <li>Nếu cần dùng tiếp gấp trong ngày, bạn có thể mua thêm gói data ngày phụ như <strong>D5 (5.000đ/1GB)</strong> hoặc <strong>D10 (10.000đ/2GB)</strong>.</li>
          </ul>
        </div>
      )
    },
    {
      id: 'faq-3',
      num: 3,
      category: 'store',
      question: 'Cửa hàng MobiFone TP. Cà Mau và Năm Căn mở cửa đến mấy giờ?',
      content: (
        <div className="p-3.5 rounded-lg bg-surface-container-low text-on-surface flex flex-col gap-2">
          <p className="text-[13px]">
            Khung giờ làm việc các phòng giao dịch MobiFone trực thuộc tỉnh Cà Mau:
          </p>
          <div className="flex flex-col gap-2 pt-1 text-[13px]">
            <div className="p-2 bg-surface-container-lowest rounded-lg border border-outline-variant/30">
              <div className="font-semibold text-primary">Cửa hàng MobiFone TP. Cà Mau:</div>
              <div className="text-on-surface-variant text-[12px]">Số 55 Trần Hưng Đạo, Phường 5, TP. Cà Mau</div>
              <div className="text-[12px] font-medium text-on-surface mt-0.5">Thứ 2 - Thứ 7: 07:30 - 18:30 (Không nghỉ trưa) | CN: 08:00 - 17:00</div>
            </div>
            <div className="p-2 bg-surface-container-lowest rounded-lg border border-outline-variant/30">
              <div className="font-semibold text-primary">Cửa hàng MobiFone Năm Căn:</div>
              <div className="text-on-surface-variant text-[12px]">Đường Nguyễn Tất Thành, Khóm 1, TT. Năm Căn</div>
              <div className="text-[12px] font-medium text-on-surface mt-0.5">Thứ 2 - Thứ 7: 07:30 - 17:00 | Chủ nhật: Nghỉ</div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'faq-4',
      num: 4,
      category: 'network',
      question: 'Làm thế nào để phản ánh sóng yếu tại khu vực nông thôn/ven biển?',
      content: (
        <div className="p-3.5 rounded-lg bg-surface-container-low text-on-surface flex flex-col gap-2">
          <p className="text-[13px] leading-relaxed">
            Để kỹ thuật viên MobiFone Cà Mau đo kiểm và tối ưu trạm phát sóng tại khu vực kênh rạch, ven biển (Đầm Dơi, Ngọc Hiển, U Minh...), bà con có thể gửi phản ánh nhanh bằng 2 cách:
          </p>
          <div className="flex flex-col gap-1.5 pl-2 text-[13px]">
            <div>1. Chọn mục <strong>Tạo phiếu yêu cầu hỗ trợ</strong> ngay trên Mini App, hệ thống sẽ chuyển phiếu cho đội kỹ thuật xử lý địa bàn.</div>
            <div>2. Gọi miễn cước đến tổng đài <strong>1800 1090</strong> và cung cấp địa chỉ ấp/khóm cụ thể để đội ngũ kỹ thuật giải quyết trong 24h - 48h.</div>
          </div>
          <div className="mt-2">
            <button
              onClick={() => onNavigateToCreateTicket?.('NETWORK_SIGNAL')}
              className="w-full h-9 rounded-lg bg-primary-container text-on-primary text-[12px] font-semibold flex items-center justify-center gap-1.5 shadow-sm active:scale-95 transition-all"
            >
              <Antenna className="w-4 h-4" />
              <span>Gửi phản ánh sóng yếu ngay</span>
            </button>
          </div>
        </div>
      )
    }
  ];

  const handleToggleFaq = (id: string) => {
    setExpandedFaqId(expandedFaqId === id ? null : id);
  };

  const handleFeedback = (faqId: string, isHelpful: boolean) => {
    setHelpfulFeedback(prev => ({ ...prev, [faqId]: isHelpful }));
  };

  const filteredFaqs = faqs.filter(faq => {
    const matchesSearch =
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCat = activeCategory === 'all' || faq.category === activeCategory;
    return matchesSearch && matchesCat;
  });

  return (
    <div className="flex flex-col w-full bg-surface">
      {/* Top Bar Navigation */}
      <div className="px-margin pt-space-xs pb-space-sm bg-surface-container-lowest shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-space-xs">
            <button
              onClick={onBackToHome}
              aria-label="Quay lại"
              className="w-10 h-10 -ml-1 rounded-full flex items-center justify-center text-on-surface hover:bg-surface-container transition-colors active:scale-95"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h1 className="font-h2 text-h2 font-bold text-on-surface tracking-tight">
              Hỏi đáp & Hỗ trợ
            </h1>
          </div>
          <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-primary-fixed text-primary">
            <Verified className="w-3.5 h-3.5" />
            <span className="font-caption text-[11px] font-semibold">Chính thức</span>
          </div>
        </div>

        {/* Unified Search Bar */}
        <div className="mt-space-md">
          <div className="relative flex items-center w-full bg-surface-container-low rounded-xl px-space-sm py-2.5 shadow-sm focus-within:bg-surface-container-lowest focus-within:ring-2 focus-within:ring-primary transition-all">
            <Search className="w-5 h-5 text-primary mr-2 shrink-0" />
            <input
              className="w-full bg-transparent font-body text-body text-on-surface placeholder:text-outline focus:outline-none"
              placeholder="Tìm câu hỏi, thủ tục, gói cước hoặc cước phí..."
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button
              aria-label="Bộ lọc"
              onClick={() => setActiveCategory('all')}
              className="flex items-center justify-center p-1.5 rounded-lg bg-surface-container-high text-primary hover:bg-primary hover:text-on-primary transition-colors"
            >
              <SlidersHorizontal className="w-4 h-4" />
            </button>
          </div>

          {/* Quick Search Tag Suggestions */}
          <div className="flex items-center gap-1.5 mt-2.5 overflow-x-auto no-scrollbar pb-1">
            <span className="font-caption text-[11px] text-on-surface-variant font-medium shrink-0">Gợi ý nhanh:</span>
            {['eSIM Cà Mau', 'Gói KC135', 'Cửa hàng Năm Căn', 'Báo sóng yếu'].map((tag) => (
              <button
                key={tag}
                onClick={() => setSearchQuery(tag)}
                className="px-2.5 py-1 rounded-full bg-surface-container-high text-primary font-caption text-[11px] font-semibold hover:bg-primary hover:text-on-primary transition-colors shrink-0"
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="px-margin flex flex-col gap-space-lg mt-space-md">
        {/* Active Ticket Progress (Mini Badge if exists) */}
        {showActiveTicket && (
          <div className="rounded-xl bg-amber-50 border border-amber-200 p-3 flex items-center justify-between shadow-xs">
            <div className="flex items-center gap-2.5">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse shrink-0" />
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span className="font-caption text-[11px] font-bold text-amber-900">#CM-HOTRO-93821</span>
                  <span className="text-[10px] px-1.5 py-0.2 rounded bg-amber-100 text-amber-800 font-semibold">Đang xử lý (50%)</span>
                </div>
                <span className="text-[11px] text-amber-800 line-clamp-1">KTV Lê Hoài Nam đang chuẩn bị liên hệ lại</span>
              </div>
            </div>
            <button
              onClick={() => setShowActiveTicket(false)}
              className="text-amber-600 hover:text-amber-800 text-xs px-2 py-1"
            >
              Đóng
            </button>
          </div>
        )}

        {/* Smart Guidance Banner */}
        <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-primary via-primary-container to-tertiary text-on-primary p-space-md shadow-md">
          <div className="absolute -right-6 -bottom-6 w-32 h-32 rounded-full bg-surface-container-lowest/10 pointer-events-none blur-xl"></div>
          <div className="relative z-10 flex flex-col gap-space-sm">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-surface-container-lowest/15 backdrop-blur-sm flex items-center justify-center shrink-0">
                <Bot className="w-6 h-6 text-tertiary-fixed" />
              </div>
              <div className="flex flex-col">
                <span className="font-h3 text-h3 text-on-primary font-bold leading-tight">Không tìm thấy câu trả lời?</span>
                <p className="font-body-sm text-body-sm text-on-primary-container mt-1">
                  Đừng lo, bạn có thể hỏi Trợ lý AI hoặc gửi yêu cầu để nhân viên MobiFone Cà Mau phản hồi ngay.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-space-xs mt-1">
              <button
                onClick={onOpenAIChat}
                className="h-10 px-space-sm rounded-lg bg-surface-container-lowest text-primary font-button-sm text-button-sm font-semibold flex items-center justify-center gap-1.5 shadow-sm active:scale-95 transition-all"
              >
                <Sparkles className="w-4 h-4" />
                <span>Hỏi Trợ lý AI</span>
              </button>
              <a
                className="h-10 px-space-sm rounded-lg bg-secondary text-on-secondary font-button-sm text-button-sm font-semibold flex items-center justify-center gap-1.5 shadow-sm active:scale-95 transition-all"
                href="tel:18001090"
              >
                <Phone className="w-4 h-4" />
                <span>1800 1090 (0đ)</span>
              </a>
            </div>
          </div>
        </div>

        {/* FAQ Categories (4x2 Grid) */}
        <div className="flex flex-col gap-space-xs">
          <div className="flex items-center justify-between">
            <h2 className="font-h3 text-h3 text-on-surface font-bold">Danh mục hỗ trợ</h2>
            <button
              onClick={() => setActiveCategory('all')}
              className="font-caption text-caption text-primary font-semibold hover:underline"
            >
              {activeCategory === 'all' ? 'Tất cả (8 nhóm)' : 'Hiện tất cả'}
            </button>
          </div>
          <div className="grid grid-cols-4 gap-2.5">
            {categories.map((cat) => {
              const IconComp = cat.icon;
              const isSelected = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(isSelected ? 'all' : cat.id)}
                  className={`flex flex-col items-center justify-center p-2.5 rounded-xl shadow-sm hover:shadow-md transition-all active:scale-95 text-center ${
                    isSelected ? 'bg-primary-fixed border border-primary/30' : 'bg-surface-container-lowest'
                  }`}
                >
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${
                      isSelected ? 'bg-primary text-on-primary' : 'bg-surface-container-high text-primary'
                    }`}
                  >
                    <IconComp className="w-6 h-6" />
                  </div>
                  <span className="font-caption text-[11px] font-semibold text-on-surface mt-2 line-clamp-2 leading-tight">
                    {cat.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Top FAQ Accordion Section */}
        <div className="flex flex-col gap-space-xs">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <Flame className="w-5 h-5 text-secondary" />
              <h2 className="font-h3 text-h3 text-on-surface font-bold">Câu hỏi phổ biến tại Cà Mau</h2>
            </div>
            <span className="font-caption text-[11px] text-on-surface-variant font-medium">Cập nhật 24h qua</span>
          </div>

          <div className="flex flex-col gap-2.5">
            {filteredFaqs.map((faq) => {
              const isExpanded = expandedFaqId === faq.id;
              return (
                <div
                  key={faq.id}
                  className="rounded-xl bg-surface-container-lowest shadow-sm overflow-hidden transition-all border border-outline-variant/30"
                >
                  <button
                    onClick={() => handleToggleFaq(faq.id)}
                    className="w-full p-space-md flex items-center justify-between text-left gap-2"
                  >
                    <div className="flex items-start gap-2">
                      <span className="w-5 h-5 rounded-full bg-primary-fixed text-primary font-caption text-[11px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                        {faq.num}
                      </span>
                      <span className="font-body-lg text-body text-on-surface font-semibold">
                        {faq.question}
                      </span>
                    </div>
                    <ChevronDown
                      className={`w-5 h-5 text-outline shrink-0 transition-transform duration-200 ${
                        isExpanded ? 'rotate-180 text-primary' : ''
                      }`}
                    />
                  </button>

                  {isExpanded && (
                    <div className="px-space-md pb-space-md flex flex-col gap-space-xs">
                      {faq.content}
                      <div className="flex items-center justify-between pt-2">
                        <div className="flex items-center gap-1 text-on-surface-variant font-caption text-[11px]">
                          <span>Hữu ích với bạn?</span>
                          <button
                            onClick={() => handleFeedback(faq.id, true)}
                            className={`p-1 rounded transition-colors ${
                              helpfulFeedback[faq.id] === true ? 'text-primary bg-primary-fixed' : 'hover:text-primary'
                            }`}
                            aria-label="Hữu ích"
                          >
                            <ThumbsUp className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleFeedback(faq.id, false)}
                            className={`p-1 rounded transition-colors ${
                              helpfulFeedback[faq.id] === false ? 'text-error bg-error-container' : 'hover:text-error'
                            }`}
                            aria-label="Không hữu ích"
                          >
                            <ThumbsDown className="w-4 h-4" />
                          </button>
                        </div>
                        <button
                          onClick={onOpenAIChat}
                          className="px-2.5 py-1 rounded-md bg-surface-container text-primary font-button-sm text-[11px] font-semibold flex items-center gap-1 hover:bg-primary hover:text-on-primary transition-colors"
                        >
                          <Bot className="w-3.5 h-3.5" />
                          <span>Hỏi thêm Trợ lý AI</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Direct Support Card */}
        <div className="rounded-2xl bg-surface-container-lowest p-space-md shadow-md flex flex-col gap-space-sm border border-outline-variant/30">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-surface-container-high flex items-center justify-center text-primary shrink-0">
              <PhoneCall className="w-6 h-6" />
            </div>
            <div className="flex flex-col">
              <h3 className="font-h3 text-h3 text-on-surface font-bold leading-tight">Bạn vẫn cần hỗ trợ trực tiếp?</h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
                Đội ngũ Chăm sóc khách hàng MobiFone Cà Mau luôn sẵn sàng hỗ trợ 24/7.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-2.5 mt-1">
            <button
              onClick={() => onNavigateToCreateTicket?.()}
              className="w-full h-11 rounded-xl bg-primary text-on-primary font-button text-button font-semibold flex items-center justify-center gap-2 shadow-sm hover:brightness-105 active:scale-98 transition-all"
            >
              <FileEdit className="w-5 h-5" />
              <span>Tạo phiếu yêu cầu hỗ trợ</span>
            </button>
            <a
              className="w-full h-11 rounded-xl bg-surface-container-high text-primary font-button text-button font-semibold flex items-center justify-center gap-2 hover:bg-surface-container transition-colors active:scale-98"
              href="tel:18001090"
            >
              <Phone className="w-5 h-5 text-secondary" />
              <span>Gọi Tổng đài miễn cước 1800 1090</span>
            </a>
          </div>
          <div className="flex items-center justify-center gap-2 pt-1">
            <Clock className="w-4 h-4 text-outline" />
            <span className="font-caption text-caption text-outline">Thời gian tiếp nhận giải quyết: Dưới 15 phút</span>
          </div>
        </div>
      </div>
    </div>
  );
};
