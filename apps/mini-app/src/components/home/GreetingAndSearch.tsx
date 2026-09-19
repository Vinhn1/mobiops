import React from 'react';
import { Search, Radio } from 'lucide-react';

interface GreetingAndSearchProps {
    searchQuery: string;
    onSearchChange: (val: string) => void;
    onSearchSubmit: () => void;
}

export const GreetingAndSearch: React.FC<GreetingAndSearchProps> = ({
    searchQuery,
    onSearchChange,
    onSearchSubmit,
}) => {
    return (
        <section className="px-4 pt-3 pb-2">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-lg font-bold text-mobifone-blue">
                        Xin chào Quý khách!
                    </h1>
                    <p className="text-xs text-slate-500 mt-0.5">
                        Trải nghiệm tiện ích số MobiFone Cà Mau
                    </p>
                </div>
                <div className="flex items-center gap-1.5 bg-mobifone-lightBlue px-2.5 py-1 rounded-full text-mobifone-blue text-[11px] font-bold">
                    <Radio size={13} className="text-mobifone-blue animate-pulse" />
                    <span>5G Cà Mau</span>
                </div>
            </div>

            {/* Search Bar */}
            <div className="mt-3 relative flex items-center">
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        onSearchSubmit();
                    }}
                    className="w-full bg-white rounded-xl shadow-sm border border-slate-100 flex items-center pl-3 pr-1 py-1 focus-within:shadow-md transition-shadow"
                >
                    <Search size={18} className="text-slate-400 mr-2 shrink-0" />
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => onSearchChange(e.target.value)}
                        placeholder="Bạn đang cần tìm gì? (KC135, Cửa hàng, 5G...)"
                        className="w-full bg-transparent text-slate-800 text-xs placeholder:text-slate-400 focus:outline-none"
                    />
                    <button
                        type="submit"
                        className="bg-mobifone-blue hover:bg-blue-800 text-white px-3.5 py-1.5 rounded-lg text-xs font-semibold shrink-0 active:scale-95 transition-transform"
                    >
                        Tìm
                    </button>
                </form>
            </div>
        </section>
    );
};
