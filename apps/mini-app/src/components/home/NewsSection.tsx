import React from 'react';
import { ChevronRight, Calendar, Radio, ShieldCheck } from 'lucide-react';

interface NewsSectionProps {
    onViewAllNews: () => void;
    onSelectNews: (newsId: string) => void;
}

export const NewsSection: React.FC<NewsSectionProps> = ({
    onViewAllNews,
    onSelectNews,
}) => {
    return (
        <section className="mt-5 px-4 pb-2">
            <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                    <div className="w-1.5 h-4 bg-mobifone-blue rounded-full" />
                    <h2 className="text-sm font-bold text-slate-900 tracking-tight">
                        Tin tức & Sự kiện Cà Mau
                    </h2>
                </div>
                <button
                    type="button"
                    onClick={onViewAllNews}
                    className="text-xs text-mobifone-blue flex items-center gap-0.5 font-bold hover:underline"
                >
                    <span>Tất cả</span>
                    <ChevronRight size={15} />
                </button>
            </div>

            <div className="flex flex-col gap-2.5">
                {/* News 1 */}
                <div
                    onClick={() => onSelectNews('news-5g-camau')}
                    className="bg-white rounded-xl p-3 shadow-sm border border-slate-100 flex gap-3 items-center cursor-pointer active:scale-[0.99] transition-transform"
                >
                    <div className="w-20 h-16 rounded-lg bg-blue-50 flex items-center justify-center text-mobifone-blue shrink-0">
                        <Radio size={28} />
                    </div>
                    <div className="flex flex-col justify-between flex-1 min-w-0">
                        <span className="text-[10px] text-mobifone-blue font-bold uppercase tracking-wider">
                            Hạ tầng 5G
                        </span>
                        <h3 className="text-xs font-semibold text-slate-900 line-clamp-2 leading-snug mt-0.5">
                            MobiFone triển khai phủ sóng 5G tại trung tâm thành phố Cà Mau và Đất Mũi
                        </h3>
                        <div className="flex items-center gap-1 mt-1 text-[11px] text-slate-400">
                            <Calendar size={11} />
                            <span>Hôm nay</span>
                        </div>
                    </div>
                </div>

                {/* News 2 */}
                <div
                    onClick={() => onSelectNews('news-kyc-guide')}
                    className="bg-white rounded-xl p-3 shadow-sm border border-slate-100 flex gap-3 items-center cursor-pointer active:scale-[0.99] transition-transform"
                >
                    <div className="w-20 h-16 rounded-lg bg-red-50 flex items-center justify-center text-mobifone-red shrink-0">
                        <ShieldCheck size={28} />
                    </div>
                    <div className="flex flex-col justify-between flex-1 min-w-0">
                        <span className="text-[10px] text-mobifone-red font-bold uppercase tracking-wider">
                            Hướng dẫn
                        </span>
                        <h3 className="text-xs font-semibold text-slate-900 line-clamp-2 leading-snug mt-0.5">
                            Hướng dẫn chuẩn hóa thông tin thuê bao trực tuyến nhanh chóng
                        </h3>
                        <div className="flex items-center gap-1 mt-1 text-[11px] text-slate-400">
                            <Calendar size={11} />
                            <span>2 ngày trước</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom micro-brand badge from Stitch */}
            <div className="mt-6 mb-2 flex flex-col items-center justify-center text-center">
                <p className="text-[11px] text-slate-400 font-medium">
                    MobiFone Tỉnh Cà Mau © 2026
                </p>
                <p className="text-[10px] text-slate-500 mt-0.5">
                    Kết nối tương lai - Đồng hành cùng quê hương Đất Mũi
                </p>
            </div>
        </section>
    );
};
