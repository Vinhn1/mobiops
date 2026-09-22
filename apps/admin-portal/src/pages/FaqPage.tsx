import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';

export const FaqPage: React.FC = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const faqs = [
    {
      question: 'Làm thế nào để đăng ký gói cước KC135 qua Zalo Mini App?',
      answer:
        'Khách hàng chỉ cần truy cập Mini App MobiFone Cà Mau, chọn mục Gói Cước -> Chọn gói KC135 -> Nhấn nút "Đăng Ký Nhanh". Hệ thống sẽ tự động điều hướng cú pháp tin nhắn DK KC135 gửi 999 hoặc liên hệ tư vấn viên trong vòng 15 phút.',
    },
    {
      question: 'Thủ tục chuẩn hóa thông tin thuê bao chính chủ theo Nghị định 49 gồm những gì?',
      answer:
        'Khách hàng mang theo bản gốc Căn cước công dân (CCCD gắn chip) còn hiệu lực đến bất kỳ cửa hàng MobiFone nào trên địa bàn tỉnh Cà Mau để chụp ảnh chân dung và ký xác nhận điện tử.',
    },
    {
      question: 'Khi gặp sự cố sóng yếu tại các khu vực ven biển Sông Đốc, Năm Căn thì xử lý thế nào?',
      answer:
        'Khách hàng có thể gửi phiếu "Yêu cầu hỗ trợ & Phản ánh sóng" trực tiếp trên Mini App. Kỹ thuật viên trạm BTS khu vực sẽ tiếp nhận trong vòng 30 phút và đo kiểm chỉ số RSRP/SINR tại địa chỉ phản ánh.',
    },
    {
      question: 'Đổi eSIM cho điện thoại iPhone hoặc Samsung có mất cước phí không?',
      answer:
        'Hiện tại MobiFone Cà Mau đang triển khai chương trình miễn phí hoàn toàn phí cấp đổi eSIM cho khách hàng đăng ký qua Mini App và đến giao dịch tại 10 cửa hàng trực thuộc.',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-bold text-2xl text-on-surface">Hỏi Đáp Thường Gặp (FAQ)</h1>
          <p className="text-xs text-on-surface-variant">
            Quản trị kho câu hỏi hướng dẫn tự động phục vụ trợ lý AI Chatbot và khách hàng trên Mini App
          </p>
        </div>
      </div>

      <div className="bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant/30 shadow-sm space-y-4 max-w-4xl">
        {faqs.map((f, idx) => {
          const isOpen = openIdx === idx;
          return (
            <div
              key={idx}
              className="border border-outline-variant/30 rounded-xl overflow-hidden transition-colors"
            >
              <button
                onClick={() => setOpenIdx(isOpen ? null : idx)}
                className="w-full text-left p-4 flex items-center justify-between bg-surface-container-low hover:bg-surface-container transition-colors"
              >
                <span className="font-semibold text-xs text-on-surface flex items-center gap-2">
                  <HelpCircle className="w-4 h-4 text-primary shrink-0" />
                  <span>{f.question}</span>
                </span>
                {isOpen ? (
                  <ChevronUp className="w-4 h-4 text-outline" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-outline" />
                )}
              </button>
              {isOpen && (
                <div className="p-4 bg-surface-container-lowest text-xs text-on-surface-variant leading-relaxed border-t border-outline-variant/20">
                  {f.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
