import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AdminLayout } from './components/layout/AdminLayout';
import { DashboardPage } from './pages/DashboardPage';
import { CustomersPage } from './pages/CustomersPage';
import { LeadsPage } from './pages/LeadsPage';
import { TicketsPage } from './pages/TicketsPage';
import { PackagesPage } from './pages/PackagesPage';
import { PromotionsPage } from './pages/PromotionsPage';
import { StoresPage } from './pages/StoresPage';
import { FaqPage } from './pages/FaqPage';
import { KnowledgeBasePage } from './pages/KnowledgeBasePage';
import { DocumentsPage } from './pages/DocumentsPage';
import { AiConversationsPage } from './pages/AiConversationsPage';
import { NotificationsPage } from './pages/NotificationsPage';
import { AnalyticsPage } from './pages/AnalyticsPage';
import { AuditLogsPage } from './pages/AuditLogsPage';
import { RbacPage } from './pages/RbacPage';
import { SettingsPage } from './pages/SettingsPage';

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AdminLayout />}>
          <Route index element={<DashboardPage />} />
          <Route path="customers" element={<CustomersPage />} />
          <Route path="leads" element={<LeadsPage />} />
          <Route path="tickets" element={<TicketsPage />} />
          <Route path="packages" element={<PackagesPage />} />
          <Route path="promotions" element={<PromotionsPage />} />
          <Route path="stores" element={<StoresPage />} />
          <Route path="faq" element={<FaqPage />} />
          <Route path="knowledge-base" element={<KnowledgeBasePage />} />
          <Route path="documents" element={<DocumentsPage />} />
          <Route path="ai-conversations" element={<AiConversationsPage />} />
          <Route path="notifications" element={<NotificationsPage />} />
          <Route path="analytics" element={<AnalyticsPage />} />
          <Route path="audit-logs" element={<AuditLogsPage />} />
          <Route path="rbac" element={<RbacPage />} />
          <Route path="settings" element={<SettingsPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
