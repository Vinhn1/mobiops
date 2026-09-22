import React from 'react';
import { ThumbsUp } from 'lucide-react';
import { maskPhoneNumber } from '@mobiops/shared';

export const AiConversationsPage: React.FC = () => {
  const conversations = [
    {
      id: 'conv-001',
      customerPhone: '0903123456',
      district: 'Thành phố Cà Mau',
      intent: 'Tư vấn gói cước tốc độ cao',
      recommendedPkg: 'KC135',
      rating: 'POSITIVE',
      timestamp: '10 phút trước',
      messagesCount: 6,
      snippet: 'Khách hỏi gói data xem phim nhiều, AI tư vấn KC135 6GB/ngày giá 135k.',
    },
    {
      id: 'conv-002',
      customerPhone: '0909876543',
      district: 'Huyện Trần Văn Thời',
      intent: 'Tìm điểm giao dịch Sông Đốc',
      recommendedPkg: 'Không có',
      rating: 'POSITIVE',
      timestamp: '25 phút trước',
      messagesCount: 4,
      snippet: 'AI cung cấp địa chỉ Cửa hàng MobiFone Sông Đốc tại Khóm 7.',
    },
    {
      id: 'conv-003',
      customerPhone: '0939112233',
      district: 'Huyện Năm Căn',
      intent: 'Kiểm tra dung lượng còn lại',
      recommendedPkg: 'TK135',
      rating: 'POSITIVE',
      timestamp: '1 giờ trước',
      messagesCount: 5,
      snippet: 'Khách hỏi cú pháp kiểm tra data, AI hướng dẫn gửi KT DATA đến 999.',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-bold text-2xl text-on-surface">Nhật Ký Hội Thoại AI Chatbot</h1>
          <p className="text-xs text-on-surface-variant">
            Giám sát tương tác giữa khách hàng trên Zalo Mini App và trợ lý ảo tư vấn thông minh
          </p>
        </div>
      </div>

      <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant/30 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-surface-container-low text-on-surface-variant font-semibold border-b border-outline-variant/20">
              <tr>
                <th className="px-5 py-3.5">Khách Hàng (Masked)</th>
                <th className="px-5 py-3.5">Địa Bàn</th>
                <th className="px-5 py-3.5">Ý Định Khách Hàng (Intent)</th>
                <th className="px-5 py-3.5">Gói Cước Đề Xuất</th>
                <th className="px-5 py-3.5">Tóm Tắt Tương Tác</th>
                <th className="px-5 py-3.5">Đánh Giá</th>
                <th className="px-5 py-3.5 text-right">Thời Gian</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/20">
              {conversations.map((c) => (
                <tr key={c.id} className="hover:bg-surface-container-low/40 transition-colors">
                  <td className="px-5 py-3.5 font-mono text-on-surface font-semibold">
                    {maskPhoneNumber(c.customerPhone)}
                  </td>
                  <td className="px-5 py-3.5 text-on-surface-variant">{c.district}</td>
                  <td className="px-5 py-3.5 font-medium text-primary">{c.intent}</td>
                  <td className="px-5 py-3.5">
                    <span className="font-bold text-xs px-2 py-0.5 bg-primary-fixed rounded text-on-primary-fixed">
                      {c.recommendedPkg}
                    </span>
                  </td>
                  <td className="px-5 py-3.5 text-on-surface-variant max-w-xs truncate">
                    {c.snippet}
                  </td>
                  <td className="px-5 py-3.5">
                    <span className="inline-flex items-center gap-1 text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full text-[11px] font-semibold border border-emerald-200">
                      <ThumbsUp className="w-3 h-3" />
                      <span>Hài lòng</span>
                    </span>
                  </td>
                  <td className="px-5 py-3.5 text-right text-outline">{c.timestamp}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
