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
                {/* Brand Logo & Location Tag */}
                <div className="flex items-center gap-2">
                    <img
                        src={mobifoneLogo}
                        alt="MobiFone Logo"
                        className="h-7 w-auto object-contain"
                    />
                    <div className="h-4 w-px bg-slate-200" />
                    <span className="px-2 py-0.5 rounded-md bg-primary-fixed text-primary text-[11px] font-bold tracking-wider uppercase shadow-2xs">
                        Cà Mau
                    </span>
                </div>

                {/* Header Actions */}
                <div className="flex items-center gap-1">
                    <button
                        type="button"
                        aria-label="Tìm kiếm"
                        onClick={onSearchClick}
                        className="w-9 h-9 flex items-center justify-center rounded-full text-slate-600 hover:text-primary hover:bg-surface-container-low active:scale-95 transition-all"
                    >
                        <Search size={18} />
                    </button>

                    <button
                        type="button"
                        aria-label="Thông báo"
                        onClick={onNotificationClick}
                        className="relative w-9 h-9 flex items-center justify-center rounded-full text-slate-600 hover:text-primary hover:bg-surface-container-low active:scale-95 transition-all"
                    >
                        <Bell size={18} />
                        {hasNotification && (
                            <span className="absolute top-2 right-2 w-2 h-2 bg-secondary rounded-full ring-2 ring-white" />
                        )}
                    </button>

                    <button
                        type="button"
                        aria-label="Tài khoản"
                        onClick={onProfileClick}
                        className="w-8 h-8 rounded-full bg-primary text-on-primary flex items-center justify-center ml-1 shadow-sm ring-2 ring-primary/10 active:scale-95 transition-all"
                    >
                        <User size={15} />
                    </button>
                </div>
            </div>
        </header>
    );
};
