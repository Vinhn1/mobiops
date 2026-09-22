import React, { useState, useEffect } from 'react';
import {
  MapPin,
  Phone,
  Clock,
  Search,
  Building,
  CheckCircle2,
  ExternalLink,
} from 'lucide-react';
import { Store as StoreModel, MOBIFONE_CAMAU_STORES, CAMAU_DISTRICTS } from '@mobiops/shared';
import { apiClient } from '../services/api-client';

export const StoresPage: React.FC = () => {
  const [stores, setStores] = useState<StoreModel[]>(MOBIFONE_CAMAU_STORES);
  const [districtFilter, setDistrictFilter] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStore, setSelectedStore] = useState<StoreModel>(MOBIFONE_CAMAU_STORES[0]);

  useEffect(() => {
    apiClient.getStores().then((data) => {
      if (data && data.length > 0) {
        setStores(data);
      }
    });
  }, []);

  const filteredStores = stores.filter((s) => {
    if (districtFilter !== 'ALL' && s.districtId !== districtFilter) return false;
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return (
      s.name.toLowerCase().includes(q) ||
      s.address.toLowerCase().includes(q) ||
      s.districtName.toLowerCase().includes(q)
    );
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="font-bold text-2xl text-on-surface">
            Quản Lý Cửa Hàng & Tọa Độ Bản Đồ Số
          </h1>
          <p className="text-xs text-on-surface-variant">
            Mạng lưới 10 điểm giao dịch MobiFone phủ khắp 9 huyện/thị xã tỉnh Cà Mau kèm tọa độ GPS và năng lực phục vụ
          </p>
        </div>

        <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-50 text-emerald-800 rounded-xl text-xs font-semibold border border-emerald-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>10/10 Điểm giao dịch đang mở cửa đón khách</span>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-surface-container-lowest p-4 rounded-2xl border border-outline-variant/30 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-outline" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Tìm theo tên cửa hàng, địa chỉ..."
            className="w-full pl-9 pr-3 py-1.5 bg-surface-container-low rounded-xl text-xs text-on-surface placeholder:text-outline border border-transparent focus:border-primary focus:bg-white focus:outline-none transition-all"
          />
        </div>

        <div className="flex items-center gap-2">
          <Building className="w-3.5 h-3.5 text-outline" />
          <span className="text-xs text-on-surface-variant font-medium">Huyện/Thị xã:</span>
          <select
            value={districtFilter}
            onChange={(e) => setDistrictFilter(e.target.value)}
            className="bg-surface-container-low px-3 py-1.5 rounded-xl border border-outline-variant/30 text-xs font-semibold text-on-surface focus:outline-none focus:border-primary"
          >
            <option value="ALL">Tất cả địa bàn Cà Mau</option>
            {CAMAU_DISTRICTS.map((d: any) => (
              <option key={d.code} value={d.id}>
                {d.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* 2-Column Grid: List & Interactive Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Store List (6 cols) */}
        <div className="lg:col-span-6 space-y-3 max-h-[620px] overflow-y-auto pr-1">
          {filteredStores.map((store) => {
            const isSelected = selectedStore.id === store.id;
            return (
              <div
                key={store.id}
                onClick={() => setSelectedStore(store)}
                className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                  isSelected
                    ? 'bg-surface-container-lowest border-primary shadow-md ring-1 ring-primary'
                    : 'bg-surface-container-lowest hover:bg-surface-container-low border-outline-variant/30'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-on-surface">{store.name}</span>
                      {store.isMainBranch && (
                        <span className="px-2 py-0.5 rounded-full bg-primary-fixed text-on-primary-fixed text-[10px] font-bold">
                          Trụ sở Tỉnh
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-on-surface-variant mt-1">{store.address}</p>
                  </div>
                  <span className="font-mono text-xs font-bold text-outline px-2 py-0.5 bg-surface-container rounded">
                    {store.code}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 mt-3 pt-3 border-t border-outline-variant/20 text-xs text-on-surface-variant">
                  <div className="flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-primary" />
                    <span>{store.hotline}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-outline" />
                    <span className="truncate">{store.openingHours}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Store Map & GPS Detail Card (6 cols) */}
        <div className="lg:col-span-6 bg-surface-container-lowest rounded-2xl border border-outline-variant/30 p-6 shadow-sm space-y-5">
          <div className="flex items-start justify-between pb-4 border-b border-outline-variant/30">
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-bold text-lg text-on-surface">{selectedStore.name}</h2>
                <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 text-[10px] font-bold">
                  Hoạt động
                </span>
              </div>
              <p className="text-xs text-on-surface-variant mt-0.5">{selectedStore.address}</p>
            </div>
            <span className="font-mono text-xs font-bold text-primary px-2.5 py-1 bg-primary-fixed rounded-lg">
              {selectedStore.code}
            </span>
          </div>

          {/* Map Vector Mock matching coordinates */}
          <div className="relative h-48 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl border border-primary/20 overflow-hidden flex flex-col items-center justify-center p-4 text-center">
            <div className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center shadow-lg animate-bounce">
              <MapPin className="w-6 h-6" />
            </div>
            <div className="mt-2 font-mono text-xs font-bold text-primary">
              GPS: {selectedStore.latitude.toFixed(4)}° N, {selectedStore.longitude.toFixed(4)}° E
            </div>
            <span className="text-[11px] text-on-surface-variant mt-0.5">
              Định vị vệ tinh điểm giao dịch trên địa bàn {selectedStore.districtName}
            </span>
            <a
              href={`https://www.google.com/maps?q=${selectedStore.latitude},${selectedStore.longitude}`}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute bottom-3 right-3 flex items-center gap-1 px-2.5 py-1 bg-white text-primary text-[11px] font-semibold rounded-lg shadow-sm hover:bg-surface-container transition-colors"
            >
              <span>Mở Google Maps</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          {/* Supported Services */}
          <div className="space-y-2">
            <span className="text-xs font-bold text-outline uppercase tracking-wider block">
              Năng Lực Phục Vụ Tại Điểm Giao Dịch
            </span>
            <div className="flex flex-wrap gap-2">
              {selectedStore.services.map((srv) => (
                <span
                  key={srv}
                  className="px-2.5 py-1 bg-surface-container rounded-lg text-xs font-medium text-on-surface"
                >
                  {srv === 'SIM_REGISTRATION'
                    ? 'Chuẩn hóa TTTB / SIM chính chủ'
                    : srv === 'ESIM_SWAP'
                    ? 'Cấp đổi eSIM'
                    : srv === 'BILL_PAYMENT'
                    ? 'Thu cước & Nạp tiền'
                    : srv === 'PACKAGE_CONSULTATION'
                    ? 'Tư vấn gói cước 4G/5G'
                    : srv === 'B2B_SUPPORT'
                    ? 'Khách hàng Doanh nghiệp B2B'
                    : 'Bảo hành thiết bị'}
                </span>
              ))}
            </div>
          </div>

          {/* Contact Details */}
          <div className="grid grid-cols-2 gap-3 pt-3 border-t border-outline-variant/30 text-xs">
            <div className="p-3 bg-surface-container-low rounded-xl">
              <span className="text-outline text-[11px] block">Đường dây nóng hỗ trợ</span>
              <span className="font-bold text-primary text-sm">{selectedStore.hotline}</span>
            </div>
            <div className="p-3 bg-surface-container-low rounded-xl">
              <span className="text-outline text-[11px] block">Thời gian tiếp khách</span>
              <span className="font-medium text-on-surface">{selectedStore.openingHours}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
