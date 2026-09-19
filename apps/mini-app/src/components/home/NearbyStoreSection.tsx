import React from 'react';
import { ChevronRight, MapPin, BadgeCheck, Clock, Phone, Navigation, Info } from 'lucide-react';
import { Store } from '@mobiops/shared';

interface NearbyStoreSectionProps {
    store: Store;
    onViewAllStores: () => void;
    onViewStoreDetail: (store: Store) => void;
}

export const NearbyStoreSection: React.FC<NearbyStoreSectionProps> = ({
    store,
    onViewAllStores,
    onViewStoreDetail,
}) => {
    const handleOpenMap = () => {
        const url = `https://www.google.com/maps/search/?api=1&query=${store.latitude},${store.longitude}`;
        window.open(url, '_blank');
    };

    return (
        <section className="mt-5 px-4">
            <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                    <div className="w-1.5 h-4 bg-mobifone-blue rounded-full" />
                    <h2 className="text-sm font-bold text-slate-900 tracking-tight">
                        Điểm giao dịch gần bạn
                    </h2>
                </div>
                <button
                    type="button"
                    onClick={onViewAllStores}
                    className="text-xs text-mobifone-blue flex items-center gap-0.5 font-bold hover:underline"
                >
                    <span>Tìm thêm</span>
                    <ChevronRight size={15} />
                </button>
            </div>

            <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-100">
                <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2.5">
                        <div className="w-10 h-10 rounded-full bg-mobifone-softBlue flex items-center justify-center text-mobifone-blue shrink-0">
                            <MapPin size={20} />
                        </div>
                        <div>
                            <div className="flex items-center gap-1.5 flex-wrap">
                                <h3 className="text-xs font-bold text-slate-900">
                                    {store.name}
                                </h3>
                                <BadgeCheck size={15} className="text-mobifone-blue fill-blue-100" />
                            </div>
                            <p className="text-[11px] text-slate-500 mt-0.5">
                                {store.wardName}, {store.districtName}
                            </p>
                        </div>
                    </div>

                    <span className="bg-mobifone-softBlue text-mobifone-blue text-[11px] font-bold px-2 py-0.5 rounded-full shrink-0">
                        Cách 850m
                    </span>
                </div>

                {/* Details Container */}
                <div className="mt-3 bg-slate-50 p-2.5 rounded-lg space-y-1.5 text-xs text-slate-700">
                    <div className="flex items-start gap-2">
                        <MapPin size={14} className="text-slate-400 mt-0.5 shrink-0" />
                        <span className="line-clamp-1">{store.address}</span>
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <Clock size={14} className="text-slate-400 shrink-0" />
                            <span className="text-[11px]">{store.openingHours}</span>
                        </div>
                        <span className="text-[10px] font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">
                            Đang mở cửa
                        </span>
                    </div>

                    <div className="flex items-center gap-2">
                        <Phone size={14} className="text-slate-400 shrink-0" />
                        <a
                            href={`tel:${store.hotline.replace(/\s+/g, '')}`}
                            className="font-bold text-mobifone-blue hover:underline"
                        >
                            {store.hotline}
                        </a>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="mt-3 grid grid-cols-2 gap-2 pt-1">
                    <button
                        type="button"
                        onClick={() => onViewStoreDetail(store)}
                        className="w-full bg-slate-100 text-slate-800 hover:bg-slate-200 text-xs py-2 rounded-lg font-semibold flex items-center justify-center gap-1.5 active:scale-95 transition-transform"
                    >
                        <Info size={15} />
                        <span>Chi tiết</span>
                    </button>

                    <button
                        type="button"
                        onClick={handleOpenMap}
                        className="w-full bg-mobifone-blue hover:bg-blue-800 text-white text-xs py-2 rounded-lg font-semibold shadow-sm flex items-center justify-center gap-1.5 active:scale-95 transition-transform"
                    >
                        <Navigation size={15} />
                        <span>Chỉ đường</span>
                    </button>
                </div>
            </div>
        </section>
    );
};
