import React, { useState } from 'react';
import { TelecomPackage, Store } from '@mobiops/shared';
import { NavTab } from '../components/layout/BottomNav';
import { GreetingAndSearch } from '../components/home/GreetingAndSearch';
import { QuickActionsGrid } from '../components/home/QuickActionsGrid';
import { PromoBanner } from '../components/home/PromoBanner';
import { FeaturedPackagesSection } from '../components/home/FeaturedPackagesSection';
import { RecentPromosSection } from '../components/home/RecentPromosSection';
import { NearbyStoreSection } from '../components/home/NearbyStoreSection';
import { NewsSection } from '../components/home/NewsSection';

interface HomePageProps {
    packages: TelecomPackage[];
    stores: Store[];
    onNavigateTab: (tab: NavTab) => void;
    onOpenAIChat: () => void;
    onRegisterConsult: (pkg: TelecomPackage) => void;
    onViewStoreDetail: (store: Store) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
    packages,
    stores,
    onNavigateTab,
    onOpenAIChat,
    onRegisterConsult,
    onViewStoreDetail,
}) => {
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearchSubmit = () => {
        if (searchQuery.trim()) {
            onNavigateTab('packages');
        }
    };

    // Lay cua hang trung tam Ca Mau
    const nearbyStore = stores[0] || {
        id: 'STORE_CM_MAIN',
        code: 'CM001',
        name: 'Cửa hàng MobiFone Thành phố Cà Mau',
        districtId: 'TP_CA_MAU',
        districtName: 'Thành phố Cà Mau',
        wardName: 'Phường 5',
        address: 'Số 1-3 Lưu Tấn Tài, Phường 5, TP. Cà Mau',
        latitude: 9.1768,
        longitude: 105.1504,
        hotline: '0290 3838 888',
        openingHours: '07:30 - 20:00 (Cả CN)',
        services: ['SIM_REGISTRATION', 'ESIM_SWAP', 'PACKAGE_CONSULTATION', 'BILL_PAYMENT'],
        isMainBranch: true,
    };

    return (
        <div className="flex flex-col w-full pb-6">
            {/* 1. Greeting & Search Bar */}
            <GreetingAndSearch
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                onSearchSubmit={handleSearchSubmit}
            />

            {/* 2. Quick Actions Grid (6 items 3x2) */}
            <QuickActionsGrid
                onNavigateTab={onNavigateTab}
                onOpenAIChat={onOpenAIChat}
            />

            {/* 3. Promotional 5G Banner */}
            <PromoBanner onExploreClick={() => onNavigateTab('packages')} />

            {/* 4. Featured Packages (KC135 & MXH120) */}
            <FeaturedPackagesSection
                packages={packages}
                onViewAll={() => onNavigateTab('packages')}
                onSelectPackage={(pkg) => onRegisterConsult(pkg)}
                onRegisterConsult={onRegisterConsult}
            />

            {/* 5. Recent Promos Carousel */}
            <RecentPromosSection
                onViewAllPromos={() => onNavigateTab('packages')}
                onSelectPromo={(_id) => onNavigateTab('packages')}
            />

            {/* 6. Nearby Store (TP Ca Mau) */}
            <NearbyStoreSection
                store={nearbyStore}
                onViewAllStores={() => onNavigateTab('stores')}
                onViewStoreDetail={onViewStoreDetail}
            />

            {/* 7. News & Brand Badge */}
            <NewsSection
                onViewAllNews={() => onNavigateTab('support')}
                onSelectNews={(_id) => onNavigateTab('support')}
            />
        </div>
    );
};
