import React from 'react';
import { ChevronRight, Flame, Zap, Phone, CheckCircle2, Heart } from 'lucide-react';
import { TelecomPackage } from '@mobiops/shared';

interface FeaturedPackagesSectionProps {
    packages: TelecomPackage[];
    onViewAll: () => void;
    onSelectPackage: (pkg: TelecomPackage) => void;
    onRegisterConsult: (pkg: TelecomPackage) => void;
}

export const FeaturedPackagesSection: React.FC<FeaturedPackagesSectionProps> = ({
    packages,
    onViewAll,
    onSelectPackage,
    onRegisterConsult,
}) => {
    // Lay 2 goi cuoc tieu bieu: KC135 va MXH120
    const featuredList = packages.slice(0, 2);

    return (
        <section className="mt-5 px-4">
            <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                    <div className="w-1.5 h-4 bg-mobifone-blue rounded-full" />
                    <h2 className="text-sm font-bold text-slate-900 tracking-tight">
                        Gói cước nổi bật
                    </h2>
                </div>
                <button
                    type="button"
                    onClick={onViewAll}
                    className="text-xs text-mobifone-blue flex items-center gap-0.5 font-bold hover:underline"
                >
                    <span>Xem tất cả</span>
                    <ChevronRight size={15} />
                </button>
            </div>

            <div className="flex flex-col gap-3">
                {featuredList.map((pkg) => {
                    const isKC135 = pkg.code === 'KC135';

                    return (
                        <div
                            key={pkg.id}
                            onClick={() => onSelectPackage(pkg)}
                            className="bg-white rounded-xl p-4 shadow-sm border border-slate-100 relative overflow-hidden transition-all hover:shadow-md cursor-pointer"
                        >
                            {/* Top Badge */}
                            {isKC135 ? (
                                <div className="absolute top-0 right-0 bg-red-50 text-mobifone-red text-[11px] font-bold px-3 py-1 rounded-bl-xl flex items-center gap-1 border-l border-b border-red-100">
                                    <Flame size={13} className="fill-mobifone-red" />
                                    <span>Bán chạy nhất</span>
                                </div>
                            ) : (
                                <div className="absolute top-0 right-0 bg-blue-50 text-mobifone-blue text-[11px] font-bold px-3 py-1 rounded-bl-xl flex items-center gap-1 border-l border-b border-blue-100">
                                    <Heart size={13} className="fill-mobifone-blue" />
                                    <span>Combo Giới Trẻ</span>
                                </div>
                            )}

                            {/* Package Code & Price */}
                            <div className="flex items-baseline gap-2">
                                <span className="text-xl font-black text-mobifone-blue">
                                    {pkg.code}
                                </span>
                                <span className="text-xs text-slate-500 font-medium">Cà Mau</span>
                            </div>

                            <div className="flex items-baseline gap-1 mt-0.5">
                                <span className="text-lg font-bold text-mobifone-red">
                                    {pkg.price.toLocaleString('vi-VN')} đ
                                </span>
                                <span className="text-xs text-slate-500">/ {pkg.cycle}</span>
                            </div>

                            {/* 2-Column Benefits Box */}
                            <div className="mt-3 grid grid-cols-2 gap-2 bg-mobifone-softBlue p-2.5 rounded-lg border border-blue-50">
                                <div className="flex items-center gap-2">
                                    <Zap size={18} className="text-mobifone-blue shrink-0" />
                                    <div>
                                        <p className="text-[10px] text-slate-500">Data tốc độ cao</p>
                                        <p className="text-xs text-slate-900 font-bold">{pkg.dataPerDay}</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-2">
                                    <Phone size={18} className="text-mobifone-blue shrink-0" />
                                    <div>
                                        <p className="text-[10px] text-slate-500">Thoại nội & ngoại</p>
                                        <p className="text-xs text-slate-900 font-bold line-clamp-1">
                                            {isKC135 ? 'Free <10p + 50p' : 'Free MXH'}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Footer info & CTA */}
                            <div className="mt-3 flex items-center justify-between gap-2 pt-1 border-t border-slate-50">
                                <div className="flex items-center gap-1 text-slate-600 text-[11px]">
                                    <CheckCircle2 size={14} className="text-mobifone-blue shrink-0" />
                                    <span className="line-clamp-1">{pkg.totalData}</span>
                                </div>

                                <div className="flex items-center gap-2 shrink-0">
                                    <button
                                        type="button"
                                        onClick={() => onRegisterConsult(pkg)}
                                        className="bg-mobifone-blue hover:bg-blue-800 text-white px-3.5 py-1.5 rounded-lg text-xs font-semibold shadow-sm active:scale-95 transition-transform flex items-center gap-1"
                                    >
                                        <span>Đăng ký</span>
                                        <ChevronRight size={14} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </section>
    );
};
