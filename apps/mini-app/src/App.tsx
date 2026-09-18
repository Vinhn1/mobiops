import React from 'react';
import { TelecomPackage } from '@mobiops/shared';
import { Smartphone, ShieldCheck, MapPin, Zap } from 'lucide-react';

// Du lieu mau goi cuoc noi bat lay theo mau Stitch KC135
const FEATURED_PACKAGE: TelecomPackage = {
    id: 'kc135',
    code: 'KC135',
    name: 'Gói Cước KC135 Đỉnh Cao Data',
    price: 135000,
    cycle: '30 ngày',
    dataPerDay: '6GB/Ngày',
    totalData: '180GB',
    voiceInternal: 'Miễn phí gọi nội mạng < 10 phút',
    voiceExternal: '50 phút gọi liên mạng',
    isHot: true,
};

export const App: React.FC = () => {
    return (
        <div className="min-h-screen max-w-md mx-auto bg-mobifone-canvas pb-20 shadow-md">
            {/* App Header */}
            <header className="bg-mobifone-blue text-white px-4 py-4 rounded-b-2xl shadow-sm flex items-center justify-between">
                <div>
                    <h1 className="text-lg font-bold tracking-tight">MobiFone Cà Mau</h1>
                    <p className="text-xs text-blue-100 flex items-center gap-1 mt-0.5">
                        <MapPin size={12} /> Chi nhánh tỉnh Cà Mau
                    </p>
                </div>
                <span className="bg-mobifone-red text-white text-xs font-semibold px-2.5 py-1 rounded-full flex items-center gap-1">
                    <Zap size={12} /> 5G Ready
                </span>
            </header>

            {/* Main Content */}
            <main className="p-4 space-y-4">
                {/* Quick Welcome Card */}
                <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-blue-50 text-mobifone-blue flex items-center justify-center font-bold">
                        <Smartphone size={20} />
                    </div>
                    <div>
                        <p className="text-xs text-mobifone-muted">Thuê bao quản lý</p>
                        <p className="text-sm font-semibold text-mobifone-dark">0903 *** 123</p>
                    </div>
                </div>

                {/* Featured Package Card (Stitch KC135) */}
                <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
                    <div className="bg-gradient-to-r from-mobifone-blue to-blue-700 p-3 text-white flex justify-between items-center">
                        <span className="text-sm font-bold">{FEATURED_PACKAGE.code}</span>
                        <span className="bg-mobifone-red text-white text-[11px] font-bold px-2 py-0.5 rounded-full">
                            HOT
                        </span>
                    </div>
                    <div className="p-4 space-y-2">
                        <h2 className="font-bold text-mobifone-dark text-base">{FEATURED_PACKAGE.name}</h2>
                        <div className="flex items-baseline gap-1 text-mobifone-blue font-bold text-xl">
                            {FEATURED_PACKAGE.price.toLocaleString('vi-VN')} đ
                            <span className="text-xs text-mobifone-muted font-normal">/{FEATURED_PACKAGE.cycle}</span>
                        </div>
                        <div className="text-xs text-slate-600 space-y-1 pt-1 border-t border-slate-100">
                            <p>• Dung lượng: <strong className="text-mobifone-blue">{FEATURED_PACKAGE.dataPerDay}</strong></p>
                            <p>• Thoại nội mạng: {FEATURED_PACKAGE.voiceInternal}</p>
                            <p>• Thoại liên mạng: {FEATURED_PACKAGE.voiceExternal}</p>
                        </div>
                        <button className="w-full mt-3 bg-mobifone-blue text-white py-2.5 rounded-lg text-sm font-semibold hover:bg-blue-800 transition-colors">
                            Đăng ký ngay
                        </button>
                    </div>
                </div>

                {/* Security Indicator */}
                <div className="p-3 bg-blue-50 border border-blue-100 rounded-lg flex items-center gap-2 text-xs text-mobifone-blue">
                    <ShieldCheck size={16} />
                    <span>Hệ thống bảo vệ dữ liệu khách hàng chuẩn OWASP ASVS 5.0</span>
                </div>
            </main>
        </div>
    );
};
