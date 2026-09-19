import React, { useState } from 'react';
import {
  TELECOM_PACKAGES,
  MOBIFONE_CAMAU_STORES,
  TelecomPackage,
  Store
} from '@mobiops/shared';
import { AppHeader } from './components/layout/AppHeader';
import { BottomNav, NavTab } from './components/layout/BottomNav';
import { FloatingAIButton } from './components/layout/FloatingAIButton';
import { HomePage } from './pages/Home';
import { PackagesPage } from './pages/Packages';
import { StoresPage } from './pages/Stores';
import { SupportPage } from './pages/Support';
import { ProfilePage } from './pages/Profile';
import { AIChatPage } from './pages/AIChat';
import { RegisterConsultModal } from './components/package/RegisterConsultModal';

export const App: React.FC = () => {
  const [currentTab, setCurrentTab] = useState<NavTab | 'aichat'>('home');
  const [selectedPackage, setSelectedPackage] = useState<TelecomPackage | null>(null);
  const [isConsultModalOpen, setIsConsultModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleOpenConsultModal = (pkg: TelecomPackage) => {
    setSelectedPackage(pkg);
    setIsConsultModalOpen(true);
  };

  const handleConsultSuccess = (leadData: { phone: string; packageCode: string; district: string }) => {
    setIsConsultModalOpen(false);
    setToastMessage(`Đã tiếp nhận tư vấn gói ${leadData.packageCode} cho số ${leadData.phone}!`);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  const handleViewStoreDetail = (_store: Store) => {
    setCurrentTab('stores');
  };

  return (
    <div className="min-h-screen max-w-md mx-auto bg-surface relative flex flex-col shadow-2xl border-x border-slate-100">
      {/* 1. Fixed Header */}
      <AppHeader
        onSearchClick={() => setCurrentTab('packages')}
        onNotificationClick={() => setCurrentTab('support')}
        onProfileClick={() => setCurrentTab('profile')}
        hasNotification={true}
      />

      {/* 2. Main Scrollable Container */}
      <main className="flex-1 w-full pt-14 pb-20 overflow-y-auto">
        {currentTab === 'home' && (
          <HomePage
            packages={TELECOM_PACKAGES}
            stores={MOBIFONE_CAMAU_STORES}
            onNavigateTab={(tab) => setCurrentTab(tab)}
            onOpenAIChat={() => setCurrentTab('aichat')}
            onRegisterConsult={handleOpenConsultModal}
            onViewStoreDetail={handleViewStoreDetail}
          />
        )}

        {currentTab === 'packages' && (
          <PackagesPage onRegisterConsult={handleOpenConsultModal} />
        )}

        {currentTab === 'stores' && (
          <StoresPage />
        )}

        {currentTab === 'support' && (
          <SupportPage
            onBackToHome={() => setCurrentTab('home')}
            onOpenAIChat={() => setCurrentTab('aichat')}
            onNavigateToStores={() => setCurrentTab('stores')}
          />
        )}

        {currentTab === 'profile' && (
          <ProfilePage
            onOpenAIChat={() => setCurrentTab('aichat')}
            onNavigateToSupport={() => setCurrentTab('support')}
            onNavigateToPackages={() => setCurrentTab('packages')}
            onNavigateToStores={() => setCurrentTab('stores')}
          />
        )}

        {currentTab === 'aichat' && (
          <div className="flex flex-col h-[calc(100vh-3.5rem)]">
            <AIChatPage onRegisterConsult={handleOpenConsultModal} />
          </div>
        )}
      </main>

      {/* 3. Floating AI Assistant button (shown when not in AI chat) */}
      {currentTab !== 'aichat' && (
        <FloatingAIButton onClick={() => setCurrentTab('aichat')} />
      )}

      {/* 4. Bottom Navigation Bar */}
      <BottomNav
        currentTab={currentTab === 'aichat' ? 'home' : currentTab}
        onSelectTab={(tab) => setCurrentTab(tab)}
      />

      {/* 5. Package Consultation Modal */}
      <RegisterConsultModal
        pkg={selectedPackage}
        isOpen={isConsultModalOpen}
        onClose={() => setIsConsultModalOpen(false)}
        onSuccess={handleConsultSuccess}
      />

      {/* 6. Notification Toast */}
      {toastMessage && (
        <div className="fixed top-16 left-4 right-4 max-w-md mx-auto z-50 p-3.5 rounded-xl bg-primary text-on-primary shadow-lg flex items-center justify-between text-xs font-semibold animate-in fade-in slide-in-from-top-2 duration-200">
          <span>{toastMessage}</span>
          <button
            onClick={() => setToastMessage(null)}
            className="p-1 text-on-primary/80 hover:text-white"
          >
            ✕
          </button>
        </div>
      )}
    </div>
  );
};
