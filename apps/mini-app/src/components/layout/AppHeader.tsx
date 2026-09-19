import React from 'react';
import { Search, Bell, User } from 'lucide-react';
import mobifoneLogo from '../../assets/logo.png';

interface AppHeaderProps {
    onSearchClick?: () => void;
    onNotificationClick?: () => void;
    onProfileClick?: () => void;
    hasNotification?: boolean;
}

export const AppHeader: React.FC<AppHeaderProps> = ({
    onSearchClick,
    onNotificationClick,
    onProfileClick,
    hasNotification = true,
}) => {
    return (
        <header className="fixed top-0 left-0 right-0 max-w-md mx-auto z-50 bg-white/90 backdrop-blur-xl border-b border-slate-100 shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
            <div className="h-14 px-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <img
                        src={mobifoneLogo}
                        alt="MobiFone Cà Mau Logo"
                        className="h-7 w-auto object-contain"
                    />
                    <div className="flex flex-col">
                        <span className="text-[11px] text-mobifone-blue font-bold uppercase tracking-wider leading-none">
                            Cà Mau
                        </span>
                        <span className="text-[10px] text-slate-500 font-medium leading-tight">
                            Mini App
                        </span>
                    </div>
                </div>

                <div className="flex items-center gap-1">
                    <button
                        type="button"
                        aria-label="Tìm kiếm"
                        onClick={onSearchClick}
                        className="w-10 h-10 flex items-center justify-center rounded-full text-slate-600 hover:text-mobifone-blue hover:bg-slate-50 transition-colors"
                    >
                        <Search size={19} />
                    </button>

                    <button
                        type="button"
                        aria-label="Thông báo"
                        onClick={onNotificationClick}
                        className="relative w-10 h-10 flex items-center justify-center rounded-full text-slate-600 hover:text-mobifone-blue hover:bg-slate-50 transition-colors"
                    >
                        <Bell size={19} />
                        {hasNotification && (
                            <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-mobifone-red rounded-full ring-2 ring-white" />
                        )}
                    </button>

                    <button
                        type="button"
                        aria-label="Tài khoản"
                        onClick={onProfileClick}
                        className="w-8 h-8 rounded-full bg-mobifone-blue text-white flex items-center justify-center ml-1 shadow-sm active:scale-95 transition-transform"
                    >
                        <User size={16} />
                    </button>
                </div>
            </div>
        </header>
    );
};
