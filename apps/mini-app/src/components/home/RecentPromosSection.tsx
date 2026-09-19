import React from 'react';
import { ChevronRight, ArrowRight, Calendar, Sparkles } from 'lucide-react';

interface RecentPromosSectionProps {
    onViewAllPromos: () => void;
    onSelectPromo: (promoId: string) => void;
}

export const RecentPromosSection: React.FC<RecentPromosSectionProps> = ({
    onViewAllPromos,
    onSelectPromo,
}) => {
    return (
        <section className="mt-5 px-4">
            <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                    <div className="w-1.5 h-4 bg-mobifone-red rounded-full" />
                    <h2 className="text-sm font-bold text-slate-900 tracking-tight">
                        Ưu đãi mới nhất
                    </h2>
                </div>
                <button
                    type="button"
                    onClick={onViewAllPromos}
                    className="text-xs text-mobifone-blue flex items-center gap-0.5 font-bold hover:underline"
                >
                    <span>Tất cả</span>
                    <ChevronRight size={15} />
                </button>
            </div>

            <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-none snap-x">
                {/* Promo Card 1 */}
                <div
                    onClick={() => onSelectPromo('promo-rewards')}
                    className="w-[260px] shrink-0 snap-start bg-white rounded-xl overflow-hidden shadow-sm border border-slate-100 flex flex-col cursor-pointer active:scale-[0.98] transition-transform"
                >
                    <div className="relative h-28 w-full bg-gradient-to-br from-blue-600 to-indigo-800 p-3 flex flex-col justify-between overflow-hidden">
                        <span className="self-start bg-mobifone-red text-white text-[10px] font-extrabold px-2 py-0.5 rounded shadow-sm">
                            MobiFone Rewards
                        </span>
                        <div className="text-white">
                            <Sparkles size={24} className="text-amber-300 opacity-80" />
                        </div>
                    </div>

                    <div className="p-3 flex flex-col flex-1 justify-between">
                        <div>
                            <h3 className="text-xs font-bold text-slate-900 line-clamp-2 leading-snug">
                                Đổi điểm MobiFone Rewards lấy voucher mua sắm tại Cà Mau
                            </h3>
                            <p className="text-[11px] text-slate-500 mt-1 line-clamp-1">
                                Hàng trăm ưu đãi ẩm thực & siêu thị
                            </p>
                        </div>

                        <div className="mt-2.5 flex items-center justify-between pt-1 border-t border-slate-50">
                            <div className="flex items-center gap-1 text-[11px] text-slate-400">
                                <Calendar size={12} />
                                <span>HSD: 30/11</span>
                            </div>
                            <span className="text-mobifone-blue text-[11px] font-bold flex items-center gap-0.5">
                                Nhận ngay <ArrowRight size={13} />
                            </span>
                        </div>
                    </div>
                </div>

                {/* Promo Card 2 */}
                <div
                    onClick={() => onSelectPromo('promo-gold-day')}
                    className="w-[260px] shrink-0 snap-start bg-white rounded-xl overflow-hidden shadow-sm border border-slate-100 flex flex-col cursor-pointer active:scale-[0.98] transition-transform"
                >
                    <div className="relative h-28 w-full bg-gradient-to-br from-red-500 to-amber-600 p-3 flex flex-col justify-between overflow-hidden">
                        <span className="self-start bg-white text-mobifone-red text-[10px] font-extrabold px-2 py-0.5 rounded shadow-sm">
                            Ngày Vàng
                        </span>
                        <div className="text-white text-right">
                            <span className="text-2xl font-black text-amber-200">+20%</span>
                        </div>
                    </div>

                    <div className="p-3 flex flex-col flex-1 justify-between">
                        <div>
                            <h3 className="text-xs font-bold text-slate-900 line-clamp-2 leading-snug">
                                Tặng 20% thẻ nạp ngày vàng trên toàn địa bàn tỉnh
                            </h3>
                            <p className="text-[11px] text-slate-500 mt-1 line-clamp-1">
                                Áp dụng cho mọi thuê bao trả trước MobiFone
                            </p>
                        </div>

                        <div className="mt-2.5 flex items-center justify-between pt-1 border-t border-slate-50">
                            <div className="flex items-center gap-1 text-[11px] text-slate-400">
                                <Calendar size={12} />
                                <span>Chỉ hôm nay</span>
                            </div>
                            <span className="text-mobifone-blue text-[11px] font-bold flex items-center gap-0.5">
                                Nạp thẻ <ArrowRight size={13} />
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
