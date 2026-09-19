import React from 'react';
import { Home, LayoutGrid, MapPin, Headphones, User, LucideIcon } from 'lucide-react';

export type NavTab = 'home' | 'packages' | 'stores' | 'support' | 'profile';

interface BottomNavProps {
    currentTab: NavTab;
    onSelectTab: (tab: NavTab) => void;
}

interface TabItem {
    id: NavTab;
    label: string;
    icon: LucideIcon;
}

const TABS: TabItem[] = [
    { id: 'home', label: 'Trang chủ', icon: Home },
    { id: 'packages', label: 'Dịch vụ', icon: LayoutGrid },
    { id: 'stores', label: 'Cửa hàng', icon: MapPin },
    { id: 'support', label: 'Hỗ trợ', icon: Headphones },
    { id: 'profile', label: 'Tài khoản', icon: User },
];

export const BottomNav: React.FC<BottomNavProps> = ({ currentTab, onSelectTab }) => {
    return (
        <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto z-50 bg-white/95 backdrop-blur-xl border-t border-slate-100 shadow-[0_-4px_16px_rgba(0,0,0,0.04)] pb-[env(safe-area-inset-bottom,0px)]">
            <div className="flex justify-around items-center h-14 px-2">
                {TABS.map((tab) => {
                    const isActive = currentTab === tab.id;
                    const IconComponent = tab.icon;

                    return (
                        <button
                            key={tab.id}
                            type="button"
                            onClick={() => onSelectTab(tab.id)}
                            className={`flex flex-col items-center justify-center flex-1 h-full py-1 transition-colors relative ${
                                isActive
                                    ? 'text-mobifone-blue font-semibold'
                                    : 'text-slate-500 hover:text-slate-800'
                            }`}
                        >
                            <IconComponent
                                size={20}
                                className={`transition-transform ${isActive ? 'scale-110' : ''}`}
                            />
                            <span className="text-[11px] leading-tight mt-1 font-medium">
                                {tab.label}
                            </span>
                            {isActive && (
                                <span className="absolute bottom-1 w-1 h-1 bg-mobifone-blue rounded-full" />
                            )}
                        </button>
                    );
                })}
            </div>
        </nav>
    );
};
