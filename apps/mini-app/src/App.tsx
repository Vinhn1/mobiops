import React from 'react';
import { TELECOM_PACKAGES } from '@mobiops/shared';
import { Smartphone, ShieldCheck, Zap, Bell } from 'lucide-react';
import mobifoneLogo from './assets/logo.png';

// Du lieu goi cuoc noi bat KC135 tu @mobiops/shared
const FEATURED_PACKAGE = TELECOM_PACKAGES[0];

export const App: React.FC = () => {
    return (
        <div className="min-h-screen max-w-md mx-auto bg-mobifone-canvas pb-20 shadow-md">
            {/* App Header with Official Logo */}
            <header className="bg-white border-b border-slate-200 px-4 py-3 sticky top-0 z-30 shadow-sm">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <img 
                            src={mobifoneLogo} 
                            alt="MobiFone Cà Mau" 
                            className="h-6 object-contain" 
                        />
                        <span className="text-[11px] font-bold text-mobifone-blue bg-blue-50 border border-blue-200 px-1.5 py-0.5 rounded">
                            CÀ MAU
                        </span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="bg-mobifone-red/10 text-mobifone-red text-xs font-semibold px-2 py-0.5 rounded-full flex items-center gap-1">
                            <Zap size={12} /> 5G
                        </span>
                        <button className="p-1.5 text-slate-500 hover:text-mobifone-blue rounded-full hover:bg-slate-100 transition-colors relative">
                            <Bell size={18} />
                            <span className="absolute top-1 right-1 w-2 h-2 bg-mobifone-red rounded-full"></span>
                        </button>
                    </div>
                </div>
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
