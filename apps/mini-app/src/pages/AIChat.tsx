import React, { useState } from 'react';
import { Send, Sparkles, User, Headphones, CheckCircle2 } from 'lucide-react';
import { TelecomPackage, TELECOM_PACKAGES } from '@mobiops/shared';

interface Message {
    id: string;
    sender: 'user' | 'assistant';
    text: string;
    time: string;
    suggestedPackage?: TelecomPackage;
    showHumanSupportButton?: boolean;
}

interface AIChatPageProps {
    onRegisterConsult: (pkg: TelecomPackage) => void;
}

export const AIChatPage: React.FC<AIChatPageProps> = ({ onRegisterConsult }) => {
    const [messages, setMessages] = useState<Message[]>([
        {
            id: 'm1',
            sender: 'assistant',
            text: 'Dạ xin chào Quý khách! Em là Trợ lý AI của MobiFone Tỉnh Cà Mau. Em có thể giúp Quý khách tư vấn gói cước 4G/5G, tra cứu điểm giao dịch hoặc hướng dẫn đổi eSIM ạ!',
            time: 'Vừa xong',
        },
    ]);
    const [inputQuery, setInputQuery] = useState('');

    const handleSend = (textToSend?: string) => {
        const query = textToSend || inputQuery;
        if (!query.trim()) return;

        const now = new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' });
        const userMsg: Message = {
            id: `usr-${Date.now()}`,
            sender: 'user',
            text: query,
            time: now,
        };

        setMessages((prev) => [...prev, userMsg]);
        setInputQuery('');

        // Sinh cau tra loi dua tren du lieu that
        setTimeout(() => {
            const lower = query.toLowerCase();
            let replyText = '';
            let suggestedPackage: TelecomPackage | undefined;
            let showHumanSupport = false;

            if (lower.includes('data') || lower.includes('nhiều') || lower.includes('kc135')) {
                suggestedPackage = TELECOM_PACKAGES.find((p) => p.code === 'KC135');
                replyText =
                    'Gói cước có dung lượng data đỉnh nhất hiện nay tại Cà Mau là gói KC135 (135.000đ/tháng): Có ngay 6GB Data tốc độ cao mỗi ngày (180GB/tháng), kèm ưu đãi miễn phí tất cả cuộc gọi nội mạng dưới 10 phút và 50 phút gọi ngoại mạng!';
            } else if (lower.includes('cửa hàng') || lower.includes('địa chỉ') || lower.includes('giao dịch')) {
                replyText =
                    'Cửa hàng giao dịch trung tâm MobiFone Cà Mau đặt tại: Số 1-3 Lưu Tấn Tài, Phường 5, TP. Cà Mau (Hotline: 0290 3838 888). Cửa hàng mở cửa từ 07:30 đến 20:00 tất cả các ngày trong tuần!';
            } else if (lower.includes('esim') || lower.includes('đổi sim')) {
                replyText =
                    'Để đổi sang eSIM, Quý khách có thể mang CCCD chính chủ đến các cửa hàng MobiFone tại 9 huyện/thành phố Cà Mau, hoặc gửi yêu cầu tư vấn để chuyên viên hỗ trợ trực tiếp!';
                showHumanSupport = true;
            } else {
                replyText =
                    'Dạ em đã ghi nhận yêu cầu của Quý khách. Để giải đáp chính xác nhất trường hợp này, Quý khách có thể kết nối ngay với chuyên viên tư vấn MobiFone Cà Mau ạ!';
                showHumanSupport = true;
            }

            const botMsg: Message = {
                id: `bot-${Date.now()}`,
                sender: 'assistant',
                text: replyText,
                time: now,
                suggestedPackage,
                showHumanSupportButton: showHumanSupport,
            };

            setMessages((prev) => [...prev, botMsg]);
        }, 600);
    };

    return (
        <div className="flex flex-col h-full w-full bg-surface">
            {/* Chat Header */}
            <div className="px-margin py-2.5 bg-surface-container-lowest border-b border-outline-variant/30 flex items-center justify-between shadow-xs">
                <div className="flex items-center gap-space-xs">
                    <div className="relative w-9 h-9 rounded-full bg-primary-container text-on-primary flex items-center justify-center shadow-sm">
                        <Sparkles size={17} className="text-amber-300" />
                        <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-surface"></span>
                    </div>
                    <div className="flex flex-col">
                        <div className="flex items-center gap-1.5">
                            <h2 className="font-h3 text-body font-bold text-on-surface">
                                Trợ lý MobiFone
                            </h2>
                            <span className="px-1.5 py-0.2 rounded-full bg-primary-fixed text-primary font-caption text-[10px] font-semibold">
                                AI v2.4
                            </span>
                        </div>
                        <span className="font-caption text-[11px] text-on-surface-variant flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                            Trực tuyến • CSKH Cà Mau
                        </span>
                    </div>
                </div>
            </div>

            {/* Message Feed */}
            <div className="flex-1 overflow-y-auto px-margin py-space-sm space-y-3.5">
                {messages.map((m) => (
                    <div
                        key={m.id}
                        className={`flex gap-2.5 ${
                            m.sender === 'user' ? 'justify-end' : 'justify-start'
                        }`}
                    >
                        {m.sender === 'assistant' && (
                            <div className="w-7 h-7 rounded-full bg-primary-container text-on-primary flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                                <Sparkles size={14} />
                            </div>
                        )}

                        <div
                            className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 font-body text-body-sm leading-relaxed shadow-xs ${
                                m.sender === 'user'
                                    ? 'bg-primary text-on-primary rounded-tr-none'
                                    : 'bg-surface-container-lowest text-on-surface border border-outline-variant/30 rounded-tl-none'
                            }`}
                        >
                            <p>{m.text}</p>

                            {/* Suggestion Card inside chat */}
                            {m.suggestedPackage && (
                                <div className="mt-2.5 p-3 bg-surface-container-low rounded-xl border border-primary/20 text-on-surface">
                                    <div className="flex items-center justify-between font-bold text-primary">
                                        <span className="font-h3 text-h3">{m.suggestedPackage.code}</span>
                                        <span className="text-secondary">{m.suggestedPackage.price.toLocaleString('vi-VN')} đ</span>
                                    </div>
                                    <p className="font-caption text-caption text-on-surface-variant mt-1">
                                        {m.suggestedPackage.dataPerDay} • {m.suggestedPackage.voiceInternal}
                                    </p>
                                    <button
                                        type="button"
                                        onClick={() => onRegisterConsult(m.suggestedPackage!)}
                                        className="w-full mt-2.5 bg-primary hover:bg-primary/90 text-on-primary font-semibold py-2 rounded-lg font-button-sm text-button-sm flex items-center justify-center gap-1.5 shadow-sm active:scale-98 transition-all"
                                    >
                                        <CheckCircle2 size={14} />
                                        <span>Đăng ký tư vấn gói này</span>
                                    </button>
                                </div>
                            )}

                            {/* Safety Gate: Connect Human Agent */}
                            {m.showHumanSupportButton && (
                                <button
                                    type="button"
                                    onClick={() => onRegisterConsult(TELECOM_PACKAGES[0])}
                                    className="mt-2.5 w-full bg-surface-container-high text-primary font-semibold py-1.5 rounded-lg font-button-sm text-button-sm flex items-center justify-center gap-1.5 hover:bg-surface-container transition-colors"
                                >
                                    <Headphones size={14} />
                                    <span>Kết nối chuyên viên Cà Mau</span>
                                </button>
                            )}

                            <span
                                className={`font-caption text-[9px] block mt-1 ${
                                    m.sender === 'user' ? 'text-primary-fixed-dim text-right' : 'text-outline'
                                }`}
                            >
                                {m.time}
                            </span>
                        </div>

                        {m.sender === 'user' && (
                            <div className="w-7 h-7 rounded-full bg-surface-container-high text-on-surface-variant flex items-center justify-center shrink-0 mt-0.5">
                                <User size={14} />
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {/* Suggestion Chips */}
            <div className="px-margin py-1.5 flex gap-1.5 overflow-x-auto no-scrollbar">
                {[
                    'Gói data 4G/5G Cà Mau',
                    'Tìm cửa hàng gần tôi',
                    'Thủ tục đổi sang eSIM',
                    'Gặp nhân viên CSKH',
                ].map((chip, idx) => (
                    <button
                        key={idx}
                        type="button"
                        onClick={() => handleSend(chip)}
                        className="px-3 py-1 rounded-full bg-surface-container-lowest text-primary font-caption text-[11px] font-semibold border border-outline-variant/40 shadow-xs hover:bg-primary hover:text-on-primary active:scale-95 transition-all whitespace-nowrap shrink-0"
                    >
                        {chip}
                    </button>
                ))}
            </div>

            {/* Input Form */}
            <div className="p-2.5 bg-surface-container-lowest border-t border-outline-variant/30 shadow-[0_-2px_8px_rgba(0,0,0,0.04)]">
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        handleSend();
                    }}
                    className="flex items-center gap-2"
                >
                    <input
                        type="text"
                        value={inputQuery}
                        onChange={(e) => setInputQuery(e.target.value)}
                        placeholder="Hỏi về gói cước, cửa hàng Cà Mau..."
                        className="flex-1 px-3.5 py-2 bg-surface-container-low border border-outline-variant/40 rounded-xl font-body text-body-sm text-on-surface placeholder:text-outline focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                    <button
                        type="submit"
                        disabled={!inputQuery.trim()}
                        className="w-10 h-10 rounded-xl bg-primary-container text-on-primary flex items-center justify-center disabled:opacity-40 active:scale-95 transition-transform shadow-sm"
                    >
                        <Send size={16} />
                    </button>
                </form>
            </div>
        </div>
    );
};
