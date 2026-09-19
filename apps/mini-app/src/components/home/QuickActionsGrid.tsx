import React from 'react';
import { Database, Gift, Store, Headphones, Sparkles, Building2 } from 'lucide-react';
import { NavTab } from '../layout/BottomNav';

interface QuickActionsGridProps {
    onNavigateTab: (tab: NavTab) => void;
    onOpenAIChat: () => void;
}

export const QuickActionsGrid: React.FC<QuickActionsGridProps> = ({
    onNavigateTab,
    onOpenAIChat,
}) => {
    return (
        <section className="px-4 mt-2">
            <div className="grid grid-cols-3 gap-2">
                {/* 1. Goi cuoc */}
                <button
                    type="button"
                    onClick={() => onNavigateTab('packages')}
                    className="bg-white rounded-xl p-3 flex flex-col items-center justify-center text-center shadow-sm border border-slate-50 active:scale-95 transition-all group"
                >
                    <div className="w-11 h-11 rounded-full bg-mobifone-softBlue flex items-center justify-center mb-1.5 text-mobifone-blue group-hover:bg-mobifone-blue group-hover:text-white transition-colors">
                        <Database size={22} />
                    </div>
                    <span className="text-xs text-slate-800 font-bold line-clamp-1">Gói cước</span>
                    <span className="text-[10px] text-slate-500 leading-tight mt-0.5">Data & Thoại</span>
                </button>

                {/* 2. Khuyen mai */}
                <button
                    type="button"
                    onClick={() => onNavigateTab('packages')}
                    className="bg-white rounded-xl p-3 flex flex-col items-center justify-center text-center shadow-sm border border-slate-50 active:scale-95 transition-all group"
                >
                    <div className="w-11 h-11 rounded-full bg-red-50 flex items-center justify-center mb-1.5 text-mobifone-red group-hover:bg-mobifone-red group-hover:text-white transition-colors">
                        <Gift size={22} />
                    </div>
                    <span className="text-xs text-slate-800 font-bold line-clamp-1">Khuyến mãi</span>
                    <span className="text-[10px] text-mobifone-red font-semibold leading-tight mt-0.5">Nạp thẻ 20%</span>
                </button>

                {/* 3. Cua hang */}
                <button
                    type="button"
                    onClick={() => onNavigateTab('stores')}
                    className="bg-white rounded-xl p-3 flex flex-col items-center justify-center text-center shadow-sm border border-slate-50 active:scale-95 transition-all group"
                >
                    <div className="w-11 h-11 rounded-full bg-mobifone-softBlue flex items-center justify-center mb-1.5 text-mobifone-blue group-hover:bg-mobifone-blue group-hover:text-white transition-colors">
                        <Store size={22} />
                    </div>
                    <span className="text-xs text-slate-800 font-bold line-clamp-1">Cửa hàng</span>
                    <span className="text-[10px] text-slate-500 leading-tight mt-0.5">Điểm giao dịch</span>
                </button>

                {/* 4. Ho tro */}
                <button
                    type="button"
                    onClick={() => onNavigateTab('support')}
                    className="bg-white rounded-xl p-3 flex flex-col items-center justify-center text-center shadow-sm border border-slate-50 active:scale-95 transition-all group"
                >
                    <div className="w-11 h-11 rounded-full bg-mobifone-softBlue flex items-center justify-center mb-1.5 text-mobifone-blue group-hover:bg-mobifone-blue group-hover:text-white transition-colors">
                        <Headphones size={22} />
                    </div>
                    <span className="text-xs text-slate-800 font-bold line-clamp-1">Hỗ trợ</span>
                    <span className="text-[10px] text-slate-500 leading-tight mt-0.5">Tổng đài 24/7</span>
                </button>

                {/* 5. Tu van goi */}
                <button
                    type="button"
                    onClick={onOpenAIChat}
                    className="bg-white rounded-xl p-3 flex flex-col items-center justify-center text-center shadow-sm border border-slate-50 active:scale-95 transition-all group"
                >
                    <div className="w-11 h-11 rounded-full bg-mobifone-softBlue flex items-center justify-center mb-1.5 text-mobifone-blue group-hover:bg-mobifone-blue group-hover:text-white transition-colors">
                        <Sparkles size={22} />
                    </div>
                    <span className="text-xs text-slate-800 font-bold line-clamp-1">Tư vấn gói</span>
                    <span className="text-[10px] text-slate-500 leading-tight mt-0.5">AI thông minh</span>
                </button>

                {/* 6. Doanh nghiep */}
                <button
                    type="button"
                    onClick={() => onNavigateTab('stores')}
                    className="bg-white rounded-xl p-3 flex flex-col items-center justify-center text-center shadow-sm border border-slate-50 active:scale-95 transition-all group"
                >
                    <div className="w-11 h-11 rounded-full bg-mobifone-softBlue flex items-center justify-center mb-1.5 text-mobifone-blue group-hover:bg-mobifone-blue group-hover:text-white transition-colors">
                        <Building2 size={22} />
                    </div>
                    <span className="text-xs text-slate-800 font-bold line-clamp-1">Doanh nghiệp</span>
                    <span className="text-[10px] text-slate-500 leading-tight mt-0.5">Giải pháp SME</span>
                </button>
            </div>
        </section>
    );
};
