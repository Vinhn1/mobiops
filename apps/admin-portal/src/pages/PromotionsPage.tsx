import React from 'react';
import { Calendar, MapPin, Percent } from 'lucide-react';

export const PromotionsPage: React.FC = () => {
  const promotions = [
    {
      id: 'promo-01',
      title: 'Tặng 50% Dung Lượng Data 4G Khi Đăng Ký KC135',
      code: 'KM-KC135-CM',
      target: 'Thuê bao kích hoạt mới tại tỉnh Cà Mau',
      validUntil: '31/10/2026',
      status: 'Đang áp dụng',
      discount: '+3GB/ngày (Tổng 9GB)',
    },
    {
      id: 'promo-02',
      title: 'Đổi eSIM Miễn Phí Tại 10 Cửa Hàng MobiFone Cà Mau',
      code: 'KM-ESIM-FREE',
      target: 'Tất cả khách hàng sử dụng Mini App',
      validUntil: '15/11/2026',
      status: 'Đang áp dụng',
      discount: '0 VNĐ phí dịch vụ',
    },
    {
      id: 'promo-03',
      title: 'Ưu Đãi Hội Viên Kết Nối Dài Lâu Huyện Đất Mũi & Ngọc Hiển',
      code: 'KM-DATMUI-2026',
      target: 'Thuê bao cư trú tại địa bàn Huyện Ngọc Hiển & Năm Căn',
      validUntil: '31/12/2026',
      status: 'Đang áp dụng',
      discount: 'Tặng 200 điểm thưởng',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-bold text-2xl text-on-surface">Chiến Dịch Khuyến Mãi</h1>
          <p className="text-xs text-on-surface-variant">
            Cấu hình các chương trình ưu đãi viễn thông theo địa bàn địa lý và đối tượng thuê bao Cà Mau
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {promotions.map((p) => (
          <div
            key={p.id}
            className="bg-surface-container-lowest p-5 rounded-2xl border border-outline-variant/30 shadow-sm space-y-4"
          >
            <div className="flex items-start justify-between">
              <span className="font-mono text-xs font-bold text-primary px-2.5 py-1 bg-primary-fixed rounded-lg">
                {p.code}
              </span>
              <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-bold border border-emerald-200">
                {p.status}
              </span>
            </div>

            <div>
              <h2 className="font-bold text-sm text-on-surface leading-snug">{p.title}</h2>
              <div className="mt-2 text-xs font-semibold text-secondary flex items-center gap-1.5">
                <Percent className="w-3.5 h-3.5" />
                <span>{p.discount}</span>
              </div>
            </div>

            <div className="pt-3 border-t border-outline-variant/20 space-y-1.5 text-xs text-on-surface-variant">
              <div className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-outline" />
                <span>{p.target}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-outline" />
                <span>Hiệu lực đến: {p.validUntil}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
