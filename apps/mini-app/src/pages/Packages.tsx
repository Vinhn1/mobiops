import React, { useState } from 'react';
import { TelecomPackage, TELECOM_PACKAGES } from '@mobiops/shared';
import { Search, Zap, Phone, CheckCircle2, ChevronRight, Filter } from 'lucide-react';

interface PackagesPageProps {
    onRegisterConsult: (pkg: TelecomPackage) => void;
}

type FilterTab = 'ALL' | 'HOT' | 'DATA_HEAVY' | 'COMBO_VOICE_DATA' | 'LONG_CYCLE';

export const PackagesPage: React.FC<PackagesPageProps> = ({ onRegisterConsult }) => {
    const [activeFilter, setActiveFilter] = useState<FilterTab>('ALL');
    const [searchKeyword, setSearchKeyword] = useState('');

    const filteredPackages = TELECOM_PACKAGES.filter((pkg) => {
        // Keyword search
        if (searchKeyword.trim()) {
            const kw = searchKeyword.toLowerCase();
            const matchCode = pkg.code.toLowerCase().includes(kw);
            const matchName = pkg.name.toLowerCase().includes(kw);
            if (!matchCode && !matchName) return false;
        }

        // Category filter
        if (activeFilter === 'HOT') return pkg.isHot;
        if (activeFilter === 'DATA_HEAVY') return pkg.category === 'DATA_HEAVY';
        if (activeFilter === 'COMBO_VOICE_DATA') return pkg.category === 'COMBO_VOICE_DATA';
        if (activeFilter === 'LONG_CYCLE') return pkg.category === 'LONG_CYCLE';
        return true;
    });

    return (
        <div className="flex flex-col w-full pb-8">
            {/* Header Title */}
            <div className="px-4 pt-3 pb-2">
                <h1 className="text-lg font-bold text-mobifone-blue">
                    Danh Sách Gói Cước 4G/5G
                </h1>
                <p className="text-xs text-slate-500 mt-0.5">
                    Các gói cước ưu đãi data tốc độ cao tại tỉnh Cà Mau
                </p>

                {/* Search input */}
                <div className="mt-3 relative flex items-center">
                    <div className="w-full bg-white rounded-xl shadow-sm border border-slate-100 flex items-center px-3 py-2">
                        <Search size={18} className="text-slate-400 mr-2 shrink-0" />
                        <input
                            type="text"
                            value={searchKeyword}
                            onChange={(e) => setSearchKeyword(e.target.value)}
                            placeholder="Tìm kiếm theo mã gói (KC135, PT120...)"
                            className="w-full bg-transparent text-slate-800 text-xs focus:outline-none placeholder:text-slate-400"
                        />
                    </div>
                </div>

                {/* Category Pills */}
                <div className="flex items-center gap-1.5 overflow-x-auto py-3 scrollbar-none">
                    {[
                        { id: 'ALL', label: 'Tất cả' },
                        { id: 'HOT', label: 'Gói HOT' },
                        { id: 'DATA_HEAVY', label: 'Siêu Data' },
                        { id: 'COMBO_VOICE_DATA', label: 'Thoại + Data' },
                        { id: 'LONG_CYCLE', label: 'Chu kỳ dài' },
                    ].map((tab) => {
                        const isActive = activeFilter === tab.id;
                        return (
                            <button
                                key={tab.id}
                                type="button"
                                onClick={() => setActiveFilter(tab.id as FilterTab)}
                                className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                                    isActive
                                        ? 'bg-mobifone-blue text-white shadow-sm'
                                        : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
                                }`}
                            >
                                {tab.label}
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Packages List */}
            <div className="px-4 flex flex-col gap-3">
                {filteredPackages.length === 0 ? (
                    /* Empty State (Stitch screen: Không Tìm Thấy Gói Phù Hợp) */
                    <div className="bg-white rounded-xl p-8 text-center border border-slate-100 my-4 shadow-sm">
                        <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto mb-2">
                            <Filter size={24} />
                        </div>
                        <h3 className="text-sm font-bold text-slate-800">
                            Không tìm thấy gói cước phù hợp
                        </h3>
                        <p className="text-xs text-slate-500 mt-1 max-w-xs mx-auto">
                            Quý khách vui lòng thử tìm với từ khóa khác hoặc liên hệ Trợ lý AI để được gợi ý.
                        </p>
                        <button
                            type="button"
                            onClick={() => {
                                setActiveFilter('ALL');
                                setSearchKeyword('');
                            }}
                            className="mt-4 bg-mobifone-softBlue text-mobifone-blue px-4 py-2 rounded-lg text-xs font-bold hover:bg-blue-100"
                        >
                            Xem tất cả gói cước
                        </button>
                    </div>
                ) : (
                    filteredPackages.map((pkg) => (
                        <div
                            key={pkg.id}
                            className="bg-white rounded-xl p-4 shadow-sm border border-slate-100 relative overflow-hidden transition-all hover:shadow-md"
                        >
                            {pkg.isHot && (
                                <div className="absolute top-0 right-0 bg-red-50 text-mobifone-red text-[11px] font-bold px-3 py-1 rounded-bl-xl border-l border-b border-red-100">
                                    HOT
                                </div>
                            )}

                            <div className="flex items-baseline gap-2">
                                <span className="text-xl font-black text-mobifone-blue">
                                    {pkg.code}
                                </span>
                                <span className="text-xs text-slate-500 font-medium">Cà Mau</span>
                            </div>

                            <p className="text-xs text-slate-700 font-semibold mt-0.5">
                                {pkg.name}
                            </p>

                            <div className="flex items-baseline gap-1 mt-1">
                                <span className="text-lg font-bold text-mobifone-red">
                                    {pkg.price.toLocaleString('vi-VN')} đ
                                </span>
                                <span className="text-xs text-slate-500">/ {pkg.cycle}</span>
                            </div>

                            {/* Benefits 2 cols */}
                            <div className="mt-3 grid grid-cols-2 gap-2 bg-mobifone-softBlue p-2.5 rounded-lg border border-blue-50 text-xs">
                                <div className="flex items-center gap-2">
                                    <Zap size={16} className="text-mobifone-blue shrink-0" />
                                    <div>
                                        <p className="text-[10px] text-slate-500">Dung lượng</p>
                                        <p className="font-bold text-slate-900">{pkg.dataPerDay}</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-2">
                                    <Phone size={16} className="text-mobifone-blue shrink-0" />
                                    <div>
                                        <p className="text-[10px] text-slate-500">Thoại</p>
                                        <p className="font-bold text-slate-900 line-clamp-1">
                                            {pkg.voiceInternal.includes('Mien phi')
                                                ? 'Miễn phí gọi'
                                                : 'Cước thường'}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* SMS syntax info */}
                            <div className="mt-2.5 p-2 bg-slate-50 rounded-lg text-[11px] text-slate-600 flex items-center justify-between">
                                <span className="font-mono text-slate-700 font-bold">
                                    {pkg.registrationSyntax}
                                </span>
                                <span className="text-slate-400">SMS 999</span>
                            </div>

                            {/* CTA */}
                            <div className="mt-3 flex items-center justify-between pt-1 border-t border-slate-50">
                                <div className="flex items-center gap-1 text-[11px] text-slate-500">
                                    <CheckCircle2 size={13} className="text-mobifone-blue shrink-0" />
                                    <span>{pkg.totalData}</span>
                                </div>

                                <button
                                    type="button"
                                    onClick={() => onRegisterConsult(pkg)}
                                    className="bg-mobifone-blue hover:bg-blue-800 text-white px-4 py-2 rounded-lg text-xs font-semibold shadow-sm active:scale-95 transition-transform flex items-center gap-1"
                                >
                                    <span>Đăng ký tư vấn</span>
                                    <ChevronRight size={14} />
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};
