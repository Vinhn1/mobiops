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
        <div className="flex flex-col h-[calc(100vh-120px)] w-full">
            {/* Chat Header */}
            <div className="px-4 py-3 bg-white border-b border-slate-100 flex items-center justify-between shadow-sm">
                <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-mobifone-blue to-blue-600 flex items-center justify-center text-white shadow-sm">
                        <Sparkles size={18} className="text-amber-300" />
                    </div>
                    <div>
                        <h2 className="text-xs font-bold text-slate-900">
                            Trợ Lý AI MobiFone Cà Mau
                        </h2>
                        <span className="text-[10px] text-emerald-600 font-semibold flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                            Đang trực tuyến 24/7
                        </span>
                    </div>
                </div>
            </div>

            {/* Message Feed */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3.5">
                {messages.map((m) => (
                    <div
                        key={m.id}
                        className={`flex gap-2.5 ${
                            m.sender === 'user' ? 'justify-end' : 'justify-start'
                        }`}
                    >
                        {m.sender === 'assistant' && (
                            <div className="w-7 h-7 rounded-full bg-mobifone-blue text-white flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                                <Sparkles size={14} />
                            </div>
                        )}

                        <div
                            className={`max-w-[80%] rounded-2xl px-3.5 py-2.5 text-xs leading-relaxed shadow-sm ${
                                m.sender === 'user'
                                    ? 'bg-mobifone-blue text-white rounded-tr-none'
                                    : 'bg-white text-slate-800 border border-slate-100 rounded-tl-none'
                            }`}
                        >
                            <p>{m.text}</p>

                            {/* Suggestion Card inside chat */}
                            {m.suggestedPackage && (
                                <div className="mt-2.5 p-2.5 bg-mobifone-softBlue rounded-xl border border-blue-100 text-slate-800">
                                    <div className="flex items-center justify-between font-bold text-mobifone-blue">
                                        <span>{m.suggestedPackage.code}</span>
                                        <span>{m.suggestedPackage.price.toLocaleString('vi-VN')} đ</span>
                                    </div>
                                    <p className="text-[11px] text-slate-600 mt-1">
                                        {m.suggestedPackage.dataPerDay} • {m.suggestedPackage.voiceInternal}
                                    </p>
                                    <button
                                        type="button"
                                        onClick={() => onRegisterConsult(m.suggestedPackage!)}
                                        className="w-full mt-2 bg-mobifone-blue text-white font-bold py-1.5 rounded-lg text-[11px] flex items-center justify-center gap-1 shadow-sm"
                                    >
                                        <CheckCircle2 size={13} />
                                        <span>Đăng ký tư vấn gói này</span>
                                    </button>
                                </div>
                            )}

                            {/* Safety Gate: Connect Human Agent */}
                            {m.showHumanSupportButton && (
                                <button
                                    type="button"
                                    onClick={() => onRegisterConsult(TELECOM_PACKAGES[0])}
                                    className="mt-2.5 w-full bg-slate-100 text-mobifone-blue font-bold py-1.5 rounded-lg text-[11px] flex items-center justify-center gap-1.5 hover:bg-slate-200"
                                >
                                    <Headphones size={13} />
                                    <span>Kết nối chuyên viên tư vấn</span>
                                </button>
                            )}

                            <span
                                className={`text-[9px] block mt-1 ${
                                    m.sender === 'user' ? 'text-blue-100 text-right' : 'text-slate-400'
                                }`}
                            >
                                {m.time}
                            </span>
                        </div>

                        {m.sender === 'user' && (
                            <div className="w-7 h-7 rounded-full bg-slate-200 text-slate-600 flex items-center justify-center shrink-0 mt-0.5">
                                <User size={14} />
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {/* Suggestion Chips */}
            <div className="px-4 py-1.5 flex gap-1.5 overflow-x-auto scrollbar-none">
                {[
                    'Gói cước nào nhiều data nhất?',
                    'Địa chỉ cửa hàng MobiFone TP. Cà Mau?',
                    'Cách đổi eSIM trực tuyến?',
                ].map((chip, idx) => (
                    <button
                        key={idx}
                        type="button"
                        onClick={() => handleSend(chip)}
                        className="px-2.5 py-1 bg-white border border-slate-200 rounded-full text-[11px] text-slate-700 whitespace-nowrap hover:bg-blue-50 hover:text-mobifone-blue hover:border-blue-200 transition-colors shrink-0 shadow-sm"
                    >
                        {chip}
                    </button>
                ))}
            </div>

            {/* Input Form */}
            <div className="p-3 bg-white border-t border-slate-100">
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
                        className="flex-1 px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-mobifone-blue"
                    />
                    <button
                        type="submit"
                        disabled={!inputQuery.trim()}
                        className="w-9 h-9 rounded-xl bg-mobifone-blue text-white flex items-center justify-center disabled:opacity-40 active:scale-95 transition-transform"
                    >
                        <Send size={16} />
                    </button>
                </form>
            </div>
        </div>
    );
};
