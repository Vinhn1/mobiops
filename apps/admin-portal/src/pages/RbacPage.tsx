import React, { useState } from 'react';
import {
  Check,
  X,
  Key,
} from 'lucide-react';

interface RoleDefinition {
  id: string;
  name: string;
  description: string;
  userCount: number;
  scope: string;
  permissions: Record<string, boolean>;
}

const PERMISSION_COLUMNS = [
  { key: 'customer_view', label: 'Xem khách hàng' },
  { key: 'pii_unmask', label: 'Giải mã PII (Có lý do)' },
  { key: 'lead_manage', label: 'Quản lý Lead CRM' },
  { key: 'ticket_resolve', label: 'Xử lý vé hỗ trợ' },
  { key: 'package_config', label: 'Cấu hình gói cước' },
  { key: 'audit_view', label: 'Xem nhật ký kiểm toán' },
  { key: 'rbac_manage', label: 'Quản trị phân quyền' },
];

const INITIAL_ROLES: RoleDefinition[] = [
  {
    id: 'SUPER_ADMIN',
    name: 'Super Admin (Quản trị Tỉnh)',
    description: 'Toàn quyền cấu hình, vận hành và phân quyền trên toàn tỉnh Cà Mau',
    userCount: 2,
    scope: 'Toàn tỉnh',
    permissions: {
      customer_view: true,
      pii_unmask: true,
      lead_manage: true,
      ticket_resolve: true,
      package_config: true,
      audit_view: true,
      rbac_manage: true,
    },
  },
  {
    id: 'DISTRICT_MANAGER',
    name: 'Trưởng Bưu Điện / Giám Đốc Huyện',
    description: 'Quản lý điều hành nhân sự, phân bổ leads và xử lý sự cố trong huyện phụ trách',
    userCount: 9,
    scope: 'Theo từng huyện',
    permissions: {
      customer_view: true,
      pii_unmask: true,
      lead_manage: true,
      ticket_resolve: true,
      package_config: false,
      audit_view: true,
      rbac_manage: false,
    },
  },
  {
    id: 'COUNTER_AGENT',
    name: 'Giao Dịch Viên Cửa Hàng',
    description: 'Tiếp nhận khách hàng trực tiếp, hỗ trợ cước và đổi SIM/eSIM',
    userCount: 24,
    scope: 'Tại cửa hàng',
    permissions: {
      customer_view: true,
      pii_unmask: true,
      lead_manage: false,
      ticket_resolve: true,
      package_config: false,
      audit_view: false,
      rbac_manage: false,
    },
  },
  {
    id: 'SALES_AGENT',
    name: 'Tư Vấn Viên Tiếp Thị Số',
    description: 'Tiếp cận leads tư vấn gửi từ Mini App và AI Chatbot',
    userCount: 15,
    scope: 'Được phân bổ',
    permissions: {
      customer_view: false,
      pii_unmask: false,
      lead_manage: true,
      ticket_resolve: false,
      package_config: false,
      audit_view: false,
      rbac_manage: false,
    },
  },
  {
    id: 'SECURITY_AUDITOR',
    name: 'Kiểm Toán Viên An Toàn Thông Tin',
    description: 'Giám sát tuân thủ an ninh mạng, kiểm tra nhật ký truy xuất dữ liệu',
    userCount: 3,
    scope: 'Độc lập',
    permissions: {
      customer_view: true,
      pii_unmask: false,
      lead_manage: false,
      ticket_resolve: false,
      package_config: false,
      audit_view: true,
      rbac_manage: false,
    },
  },
];

export const RbacPage: React.FC = () => {
  const [roles, setRoles] = useState<RoleDefinition[]>(INITIAL_ROLES);

  const togglePermission = (roleId: string, permKey: string) => {
    setRoles((prev) =>
      prev.map((r) => {
        if (r.id === roleId) {
          if (roleId === 'SUPER_ADMIN') return r; // Protected
          return {
            ...r,
            permissions: {
              ...r.permissions,
              [permKey]: !r.permissions[permKey],
            },
          };
        }
        return r;
      })
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="font-bold text-2xl text-on-surface">
            Quản Trị Bảo Mật IAM & Phân Quyền RBAC
          </h1>
          <p className="text-xs text-on-surface-variant">
            Cấu hình vai trò nhân sự MobiFone theo địa bàn và ma trận kiểm soát truy cập đặc quyền
          </p>
        </div>

        <div className="flex items-center gap-2 px-3 py-1.5 bg-primary-fixed text-on-primary-fixed rounded-xl text-xs font-semibold">
          <Key className="w-4 h-4" />
          <span>Nguyên tắc tối thiểu đặc quyền (Principle of Least Privilege)</span>
        </div>
      </div>

      {/* Role Summary Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {roles.map((r) => (
          <div
            key={r.id}
            className="bg-surface-container-lowest p-4 rounded-2xl border border-outline-variant/30 shadow-sm space-y-2"
          >
            <div className="flex items-center justify-between">
              <span className="font-bold text-xs text-on-surface truncate">{r.name}</span>
            </div>
            <p className="text-[11px] text-on-surface-variant line-clamp-2 leading-relaxed">
              {r.description}
            </p>
            <div className="pt-2 border-t border-outline-variant/20 flex items-center justify-between text-xs">
              <span className="text-outline text-[11px]">{r.scope}</span>
              <span className="font-bold text-primary">{r.userCount} tài khoản</span>
            </div>
          </div>
        ))}
      </div>

      {/* RBAC Matrix Table */}
      <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant/30 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-outline-variant/30 flex items-center justify-between">
          <div>
            <h2 className="font-bold text-base text-on-surface">
              Ma Trận Quyền Hạn Chi Tiết (Granular Access Control)
            </h2>
            <p className="text-xs text-on-surface-variant">
              Nhấp trực tiếp vào ô để cấp hoặc thu hồi quyền truy cập (Được ghi log kiểm toán tự động)
            </p>
          </div>
          <span className="text-xs text-outline font-mono">ASVS 5.0 Level 2</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-surface-container-low text-on-surface-variant font-semibold border-b border-outline-variant/20">
              <tr>
                <th className="px-5 py-3.5">Vai Trò Hệ Thống</th>
                {PERMISSION_COLUMNS.map((col) => (
                  <th key={col.key} className="px-4 py-3.5 text-center">
                    {col.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/20">
              {roles.map((role) => (
                <tr key={role.id} className="hover:bg-surface-container-low/40 transition-colors">
                  <td className="px-5 py-3.5">
                    <div className="font-semibold text-on-surface">{role.name}</div>
                    <div className="text-[11px] text-outline font-mono">{role.id}</div>
                  </td>

                  {PERMISSION_COLUMNS.map((col) => {
                    const isGranted = role.permissions[col.key];
                    const isProtected = role.id === 'SUPER_ADMIN';

                    return (
                      <td key={col.key} className="px-4 py-3.5 text-center">
                        <button
                          disabled={isProtected}
                          onClick={() => togglePermission(role.id, col.key)}
                          className={`w-7 h-7 rounded-lg inline-flex items-center justify-center transition-all ${
                            isGranted
                              ? 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
                              : 'bg-surface-container text-outline hover:bg-surface-container-high'
                          } ${isProtected ? 'cursor-not-allowed opacity-90' : 'cursor-pointer'}`}
                          title={
                            isProtected
                              ? 'Super Admin có toàn quyền bất biến'
                              : isGranted
                              ? 'Đang cấp quyền - Nhấp để thu hồi'
                              : 'Đang khóa - Nhấp để cấp quyền'
                          }
                        >
                          {isGranted ? (
                            <Check className="w-4 h-4 text-emerald-600 stroke-[2.5]" />
                          ) : (
                            <X className="w-3.5 h-3.5 text-outline" />
                          )}
                        </button>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
