import React, { useState } from 'react';
import { MOBIFONE_CAMAU_STORES, CAMAU_ADMINISTRATIVE_UNITS, Store, StoreServiceType } from '@mobiops/shared';
import { MapPin, Phone, Clock, Navigation, BadgeCheck, Filter } from 'lucide-react';

interface StoresPageProps {
    onSelectStore?: (store: Store) => void;
}

export const StoresPage: React.FC<StoresPageProps> = () => {
    const [selectedDistrict, setSelectedDistrict] = useState<string>('ALL');
    const [selectedService, setSelectedService] = useState<string>('ALL');

    const filteredStores = MOBIFONE_CAMAU_STORES.filter((store) => {
        if (selectedDistrict !== 'ALL' && store.districtId !== selectedDistrict) {
            return false;
        }
        if (selectedService !== 'ALL') {
            return store.services.includes(selectedService as StoreServiceType);
        }
        return true;
    });

    const handleOpenMap = (store: Store) => {
        const url = `https://www.google.com/maps/search/?api=1&query=${store.latitude},${store.longitude}`;
        window.open(url, '_blank');
    };

    return (
        <div className="flex flex-col w-full pb-8">
            {/* Header */}
            <div className="px-4 pt-3 pb-2">
                <h1 className="text-lg font-bold text-mobifone-blue">
                    Điểm Giao Dịch MobiFone Cà Mau
                </h1>
                <p className="text-xs text-slate-500 mt-0.5">
                    Mạng lưới 10 cửa hàng & điểm hỗ trợ tại 9 huyện/thành phố
                </p>

                {/* District Filter Dropdown */}
                <div className="mt-3">
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">
                        Khu vực quận / huyện:
                    </label>
                    <select
                        value={selectedDistrict}
                        onChange={(e) => setSelectedDistrict(e.target.value)}
                        className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 bg-white focus:outline-none focus:border-mobifone-blue shadow-sm"
                    >
                        <option value="ALL">Toàn tỉnh Cà Mau (Tất cả khu vực)</option>
                        {CAMAU_ADMINISTRATIVE_UNITS.map((district) => (
                            <option key={district.id} value={district.id}>
                                {district.name}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Service Filter Chips */}
                <div className="flex items-center gap-1.5 overflow-x-auto py-3 scrollbar-none">
                    {[
                        { id: 'ALL', label: 'Tất cả dịch vụ' },
                        { id: 'SIM_REGISTRATION', label: 'Đăng ký SIM / eSIM' },
                        { id: 'BILL_PAYMENT', label: 'Nạp tiền / Cước' },
                        { id: 'B2B_SUPPORT', label: 'Khách hàng KHDN' },
                        { id: 'WARRANTY', label: 'Bảo hành / Khiếu nại' },
                    ].map((chip) => {
                        const isActive = selectedService === chip.id;
                        return (
                            <button
                                key={chip.id}
                                type="button"
                                onClick={() => setSelectedService(chip.id)}
                                className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                                    isActive
                                        ? 'bg-mobifone-blue text-white shadow-sm'
                                        : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
                                }`}
                            >
                                {chip.label}
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Stores List */}
            <div className="px-4 flex flex-col gap-3">
                {filteredStores.length === 0 ? (
                    <div className="bg-white rounded-xl p-8 text-center border border-slate-100 my-4 shadow-sm">
                        <Filter size={24} className="mx-auto text-slate-400 mb-2" />
                        <h3 className="text-sm font-bold text-slate-800">
                            Không có điểm giao dịch phù hợp
                        </h3>
                        <p className="text-xs text-slate-500 mt-1">
                            Vui lòng chọn lại khu vực hoặc dịch vụ cần tìm.
                        </p>
                    </div>
                ) : (
                    filteredStores.map((store) => (
                        <div
                            key={store.id}
                            className="bg-white rounded-xl p-4 shadow-sm border border-slate-100 transition-all hover:shadow-md"
                        >
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
                                            {store.isMainBranch && (
                                                <BadgeCheck size={15} className="text-mobifone-blue fill-blue-100" />
                                            )}
                                        </div>
                                        <p className="text-[11px] text-slate-500 mt-0.5">
                                            {store.districtName}
                                        </p>
                                    </div>
                                </div>

                                {store.isMainBranch && (
                                    <span className="bg-blue-50 text-mobifone-blue text-[10px] font-bold px-2 py-0.5 rounded-full border border-blue-100">
                                        Trụ sở tỉnh
                                    </span>
                                )}
                            </div>

                            {/* Details Box */}
                            <div className="mt-3 bg-slate-50 p-2.5 rounded-lg space-y-1.5 text-xs text-slate-700">
                                <div className="flex items-start gap-2">
                                    <MapPin size={14} className="text-slate-400 mt-0.5 shrink-0" />
                                    <span className="line-clamp-2">{store.address}</span>
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

                            {/* Actions */}
                            <div className="mt-3 grid grid-cols-2 gap-2 pt-1">
                                <a
                                    href={`tel:${store.hotline.replace(/\s+/g, '')}`}
                                    className="w-full bg-slate-100 text-slate-800 hover:bg-slate-200 text-xs py-2 rounded-lg font-semibold flex items-center justify-center gap-1.5 active:scale-95 transition-transform"
                                >
                                    <Phone size={14} />
                                    <span>Gọi ngay</span>
                                </a>

                                <button
                                    type="button"
                                    onClick={() => handleOpenMap(store)}
                                    className="w-full bg-mobifone-blue hover:bg-blue-800 text-white text-xs py-2 rounded-lg font-semibold shadow-sm flex items-center justify-center gap-1.5 active:scale-95 transition-transform"
                                >
                                    <Navigation size={14} />
                                    <span>Chỉ đường</span>
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};
