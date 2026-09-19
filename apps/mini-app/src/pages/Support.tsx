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
  PhoneCall,
  X,
  Send,
  AlertCircle
} from 'lucide-react';
import {
  CAMAU_ADMINISTRATIVE_UNITS,
  CreateTicketSchema,
  TICKET_CATEGORY_LABELS,
  TicketCategory
} from '@mobiops/shared';

interface SupportProps {
  onBackToHome: () => void;
  onOpenAIChat: () => void;
  onNavigateToStores: () => void;
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
  onNavigateToStores
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [expandedFaqId, setExpandedFaqId] = useState<string | null>('faq-1');
  const [helpfulFeedback, setHelpfulFeedback] = useState<Record<string, boolean | null>>({});

  // Ticket creation modal state
  const [isTicketModalOpen, setIsTicketModalOpen] = useState(false);
  const [ticketCustomerName, setTicketCustomerName] = useState('');
  const [ticketPhone, setTicketPhone] = useState('');
  const [ticketCategory, setTicketCategory] = useState<TicketCategory>('NETWORK_SIGNAL');
  const [ticketDistrict, setTicketDistrict] = useState(CAMAU_ADMINISTRATIVE_UNITS[0].code);
  const [ticketDescription, setTicketDescription] = useState('');
  const [ticketError, setTicketError] = useState<string | null>(null);
  const [ticketSuccess, setTicketSuccess] = useState<string | null>(null);

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
              onClick={() => {
                setTicketCategory('NETWORK_SIGNAL');
                setIsTicketModalOpen(true);
              }}
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

  const handleCreateTicket = (e: React.FormEvent) => {
    e.preventDefault();
    setTicketError(null);

    const validation = CreateTicketSchema.safeParse({
      customerName: ticketCustomerName.trim() || undefined,
      customerPhone: ticketPhone,
      category: ticketCategory,
      districtId: ticketDistrict,
      title: `Yêu cầu hỗ trợ: ${TICKET_CATEGORY_LABELS[ticketCategory]}`,
      description: ticketDescription,
    });

    if (!validation.success) {
      setTicketError(validation.error.errors[0]?.message || 'Thông tin chưa hợp lệ');
      return;
    }

    const ticketCode = `CM-HOTRO-${Math.floor(10000 + Math.random() * 90000)}`;
    setTicketSuccess(ticketCode);
    setTimeout(() => {
      setIsTicketModalOpen(false);
      setTicketSuccess(null);
      setTicketCustomerName('');
      setTicketPhone('');
      setTicketDescription('');
      setShowActiveTicket(true);
    }, 2000);
  };

  return (
    <div className="flex flex-col w-full bg-surface pb-12">
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
            <div className="flex flex-col">
              <h1 className="font-h2 text-h2 text-on-surface tracking-tight leading-snug">Hỏi Đáp & Hỗ Trợ (FAQ)</h1>
              <span className="font-caption text-caption text-on-surface-variant">Trung tâm giải đáp dịch vụ MobiFone Cà Mau</span>
            </div>
          </div>
          <div className="flex items-center gap-1.5 px-space-xs py-1 rounded-full bg-primary-fixed text-primary">
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
        {/* Active Ticket Progress Card (if present) */}
        {showActiveTicket && (
          <section className="relative overflow-hidden rounded-xl bg-surface-container-lowest p-space-md shadow-md border border-primary/20">
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-primary via-primary-container to-secondary"></div>
            <div className="flex items-start justify-between gap-space-xs mt-1">
              <div className="flex flex-col">
                <span className="font-caption text-caption font-semibold tracking-wider text-primary">#CM-HOTRO-93821</span>
                <span className="font-body-sm text-body-sm text-on-surface-variant flex items-center gap-1 mt-0.5">
                  <Clock className="w-3.5 h-3.5 text-tertiary" />
                  Hôm nay, 14:25 • Tiếp nhận qua Trợ lý AI
                </span>
              </div>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-50 text-amber-800 text-[11px] font-semibold">
                <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
                Đang xử lý
              </span>
            </div>
            <div className="mt-space-sm">
              <h2 className="font-h3 text-h3 text-on-surface leading-snug font-bold">
                Hỗ trợ kiểm tra điều kiện gói cước KC135 & SIM 5G
              </h2>
            </div>
            <div className="mt-space-sm bg-surface-container-low rounded-lg p-space-sm">
              <div className="flex items-center justify-between text-[11px] font-caption text-on-surface-variant mb-1.5">
                <span className="font-semibold text-primary">Bước 2/4: Chuẩn bị hỗ trợ</span>
                <span>Tiến độ 50%</span>
              </div>
              <div className="w-full h-1.5 bg-surface-container-highest rounded-full overflow-hidden mb-2.5">
                <div className="h-full bg-primary rounded-full transition-all duration-500" style={{ width: '50%' }}></div>
              </div>
              <div className="flex items-start gap-space-xs text-on-surface">
                <p className="font-body-sm text-body-sm leading-snug text-on-surface">
                  Chuyên viên <strong className="font-semibold text-primary">Lê Hoài Nam</strong> (Cửa hàng TP. Cà Mau) đang chuẩn bị liên hệ lại với quý khách.
                </p>
              </div>
            </div>
          </section>
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
              onClick={() => setIsTicketModalOpen(true)}
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

      {/* Ticket Creation Modal */}
      {isTicketModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-margin backdrop-blur-xs">
          <div className="w-full max-w-sm rounded-2xl bg-surface-container-lowest p-space-lg shadow-xl relative animate-in fade-in zoom-in duration-200">
            <button
              onClick={() => setIsTicketModalOpen(false)}
              aria-label="Đóng"
              className="absolute top-4 right-4 text-outline hover:text-on-surface p-1 rounded-full"
            >
              <X className="w-5 h-5" />
            </button>

            {ticketSuccess ? (
              <div className="py-6 flex flex-col items-center text-center gap-3">
                <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="font-h2 text-h2 font-bold text-on-surface">Đã tạo phiếu thành công!</h3>
                <p className="text-body-sm text-on-surface-variant">
                  Mã phiếu của bạn: <strong className="text-primary">{ticketSuccess}</strong>
                </p>
                <p className="text-xs text-outline">
                  Nhân viên kỹ thuật/CSKH MobiFone Cà Mau sẽ liên hệ hỗ trợ bạn trong ít phút.
                </p>
              </div>
            ) : (
              <form onSubmit={handleCreateTicket} className="flex flex-col gap-3">
                <div className="flex flex-col">
                  <h3 className="font-h2 text-h2 font-bold text-on-surface">Gửi yêu cầu hỗ trợ</h3>
                  <p className="text-body-sm text-on-surface-variant">Đội ngũ MobiFone Cà Mau sẽ xử lý ngay</p>
                </div>

                {ticketError && (
                  <div className="p-2.5 rounded-lg bg-red-50 text-red-700 text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{ticketError}</span>
                  </div>
                )}

                <div>
                  <label className="block text-xs font-semibold text-on-surface mb-1">Họ và tên *</label>
                  <input
                    type="text"
                    required
                    placeholder="Nguyễn Văn A"
                    value={ticketCustomerName}
                    onChange={(e) => setTicketCustomerName(e.target.value)}
                    className="w-full h-10 px-3 rounded-lg bg-surface-container-low border border-outline-variant/50 text-on-surface text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-on-surface mb-1">Số điện thoại MobiFone *</label>
                  <input
                    type="tel"
                    required
                    placeholder="0903 123 456"
                    value={ticketPhone}
                    onChange={(e) => setTicketPhone(e.target.value)}
                    className="w-full h-10 px-3 rounded-lg bg-surface-container-low border border-outline-variant/50 text-on-surface text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-xs font-semibold text-on-surface mb-1">Loại yêu cầu</label>
                    <select
                      value={ticketCategory}
                      onChange={(e) => setTicketCategory(e.target.value as TicketCategory)}
                      className="w-full h-10 px-2 rounded-lg bg-surface-container-low border border-outline-variant/50 text-on-surface text-xs focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                      {(Object.entries(TICKET_CATEGORY_LABELS) as [TicketCategory, string][]).map(([k, v]) => (
                        <option key={k} value={k}>{v}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-on-surface mb-1">Khu vực Cà Mau</label>
                    <select
                      value={ticketDistrict}
                      onChange={(e) => setTicketDistrict(e.target.value)}
                      className="w-full h-10 px-2 rounded-lg bg-surface-container-low border border-outline-variant/50 text-on-surface text-xs focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                      {CAMAU_ADMINISTRATIVE_UNITS.map((unit) => (
                        <option key={unit.code} value={unit.code}>{unit.name}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-on-surface mb-1">Nội dung chi tiết *</label>
                  <textarea
                    required
                    rows={3}
                    placeholder="Mô tả cụ thể vấn đề quý khách gặp phải..."
                    value={ticketDescription}
                    onChange={(e) => setTicketDescription(e.target.value)}
                    className="w-full p-2.5 rounded-lg bg-surface-container-low border border-outline-variant/50 text-on-surface text-xs focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full h-10 rounded-xl bg-primary text-on-primary font-button-sm text-sm font-semibold flex items-center justify-center gap-2 shadow-sm hover:brightness-105 active:scale-95 transition-all mt-1"
                >
                  <Send className="w-4 h-4" />
                  <span>Gửi phiếu tiếp nhận</span>
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
