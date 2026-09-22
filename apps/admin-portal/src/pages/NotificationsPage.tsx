import React, { useState } from 'react';
import { Send, CheckCircle2 } from 'lucide-react';
import { CAMAU_DISTRICTS } from '@mobiops/shared';

export const NotificationsPage: React.FC = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [targetDistrict, setTargetDistrict] = useState('ALL');
  const [sentSuccess, setSentSuccess] = useState(false);

  const notificationsHistory = [
    {
      id: 'notif-01',
      title: 'Thông Báo Nâng Cấp Trạm BTS TP. Cà Mau',
      target: 'Phường 5, TP. Cà Mau',
      sentAt: 'Hôm nay, 08:30',
      delivered: '1,420 người nhận',
      type: 'Bảo trì kỹ thuật',
    },
    {
      id: 'notif-02',
      title: 'Ưu Đãi Độc Quyền Gói KC135 Mùa Tựu Trường',
      target: 'Toàn tỉnh Cà Mau',
      sentAt: 'Hôm qua, 14:00',
      delivered: '18,500 người nhận',
      type: 'Khuyến mãi',
    },
  ];

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !content) return;
    setSentSuccess(true);
    setTitle('');
    setContent('');
    setTimeout(() => setSentSuccess(false), 3000);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-bold text-2xl text-on-surface">Trung Tâm Thông Báo (Broadcast)</h1>
          <p className="text-xs text-on-surface-variant">
            Gửi thông báo Zalo ZNS / Mini App Push Notification tới thuê bao theo phân vùng địa lý Cà Mau
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Create Broadcast (5 cols) */}
        <div className="lg:col-span-5 bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant/30 shadow-sm space-y-4">
          <h2 className="font-bold text-base text-on-surface">Soạn Thông Báo Mới</h2>

          {sentSuccess && (
            <div className="p-3 bg-emerald-50 text-emerald-800 rounded-xl text-xs font-semibold flex items-center gap-2 border border-emerald-200">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Đã phát lệnh gửi thông báo thành công!</span>
            </div>
          )}

          <form onSubmit={handleSend} className="space-y-3.5 text-xs">
            <div>
              <label className="block font-semibold text-on-surface mb-1">Tiêu đề thông báo</label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Ví dụ: Ưu đãi gói data KC135..."
                className="w-full p-2.5 rounded-xl border border-outline-variant focus:border-primary focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-semibold text-on-surface mb-1">Vùng địa lý áp dụng</label>
              <select
                value={targetDistrict}
                onChange={(e) => setTargetDistrict(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-outline-variant focus:border-primary focus:outline-none"
              >
                <option value="ALL">Toàn tỉnh Cà Mau (Tất cả 9 huyện)</option>
                {CAMAU_DISTRICTS.map((d: any) => (
                  <option key={d.code} value={d.code}>
                    {d.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-semibold text-on-surface mb-1">Nội dung chi tiết</label>
              <textarea
                required
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={4}
                placeholder="Nhập nội dung gửi tới ứng dụng khách hàng..."
                className="w-full p-2.5 rounded-xl border border-outline-variant focus:border-primary focus:outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 py-2.5 bg-primary hover:bg-primary-container text-white rounded-xl font-semibold shadow-sm transition-all"
            >
              <Send className="w-4 h-4" />
              <span>Phát lệnh gửi thông báo</span>
            </button>
          </form>
        </div>

        {/* History (7 cols) */}
        <div className="lg:col-span-7 bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant/30 shadow-sm space-y-4">
          <h2 className="font-bold text-base text-on-surface">Lịch Sử Gửi Gần Đây</h2>

          <div className="space-y-3">
            {notificationsHistory.map((h) => (
              <div
                key={h.id}
                className="p-4 bg-surface-container-low rounded-xl border border-outline-variant/20 space-y-2"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs text-on-surface">{h.title}</span>
                  <span className="px-2 py-0.5 rounded-full bg-surface-container text-on-surface text-[10px] font-semibold">
                    {h.type}
                  </span>
                </div>

                <div className="flex items-center justify-between text-[11px] text-on-surface-variant pt-1 border-t border-outline-variant/20">
                  <span>Khu vực: {h.target}</span>
                  <span className="font-semibold text-primary">{h.delivered}</span>
                  <span className="text-outline">{h.sentAt}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
