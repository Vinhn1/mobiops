import React from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Header } from './Header';

export const AdminLayout: React.FC = () => {
  return (
    <div className="bg-surface font-sans text-on-surface antialiased min-h-screen">
      <Sidebar />
      <div className="pl-64">
        <Header />
        <main className="relative pt-16 bg-surface min-h-screen">
          <div className="w-full px-6 py-6">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};
