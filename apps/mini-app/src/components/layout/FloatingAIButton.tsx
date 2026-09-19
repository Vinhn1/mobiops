import React from 'react';
import { Sparkles } from 'lucide-react';

interface FloatingAIButtonProps {
    onClick: () => void;
}

export const FloatingAIButton: React.FC<FloatingAIButtonProps> = ({ onClick }) => {
    return (
        <aside className="fixed bottom-[74px] right-4 z-40 max-w-md mx-auto pointer-events-auto">
            <button
                type="button"
                onClick={onClick}
                className="h-11 px-4 bg-gradient-to-r from-mobifone-blue to-blue-600 text-white rounded-full flex items-center gap-2 shadow-[0_10px_20px_-3px_rgba(0,91,172,0.35),0_4px_6px_-4px_rgba(0,91,172,0.2)] hover:brightness-105 active:scale-95 transition-all"
            >
                <Sparkles size={18} className="animate-pulse text-amber-300" />
                <span className="text-xs font-semibold tracking-wide">Trợ lý AI</span>
            </button>
        </aside>
    );
};
