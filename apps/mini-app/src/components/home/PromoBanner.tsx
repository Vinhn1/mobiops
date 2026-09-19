import React from 'react';
import { ArrowRight } from 'lucide-react';

interface PromoBannerProps {
    onExploreClick: () => void;
}

export const PromoBanner: React.FC<PromoBannerProps> = ({ onExploreClick }) => {
    return (
        <section className="mt-3 px-4">
            <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-mobifone-blue via-[#004788] to-[#00618c] text-white p-4 shadow-md">
                {/* Decorative glow */}
                <div className="absolute -right-6 -bottom-6 w-32 h-32 bg-sky-400/10 rounded-full blur-xl pointer-events-none" />

                <div className="relative z-10">
                    <div className="flex items-center gap-1.5 mb-1.5">
                        <span className="bg-mobifone-red text-white px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wide shadow-sm">
                            HOT
                        </span>
                        <span className="text-[11px] text-blue-100 uppercase font-bold tracking-wide">
                            Ưu đãi đặc quyền Cà Mau
                        </span>
                    </div>

                    <h2 className="text-base font-extrabold leading-snug tracking-tight">
                        NÂNG CẤP SIM 5G<br />TẶNG NGAY 30GB DATA
                    </h2>

                    <p className="text-xs text-blue-100 mt-1 line-clamp-1">
                        Trải nghiệm tốc độ vượt trội tại Cà Mau & Đất Mũi
                    </p>

                    <div className="mt-3 flex items-center justify-between pt-1">
                        <button
                            type="button"
                            onClick={onExploreClick}
                            className="bg-white text-mobifone-blue text-xs px-4 py-2 rounded-lg font-bold shadow-sm active:scale-95 transition-transform flex items-center gap-1.5 hover:bg-slate-50"
                        >
                            <span>Khám phá ngay</span>
                            <ArrowRight size={14} />
                        </button>

                        <div className="flex items-center gap-1">
                            <span className="w-3 h-1.5 rounded-full bg-white" />
                            <span className="w-1.5 h-1.5 rounded-full bg-white/40" />
                            <span className="w-1.5 h-1.5 rounded-full bg-white/40" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
