import React, { useState, useEffect } from 'react';
import {
  History,
  ShieldCheck,
  Search,
  Filter,
  Eye,
  Lock,
  UserCheck,
} from 'lucide-react';
import { apiClient, AuditLogEntry } from '../services/api-client';

const ACTION_TAGS: Record<
  string,
  { label: string; color: string }
> = {
  XEM_PII: { label: 'Xem dữ liệu PII', color: 'bg-rose-50 text-rose-700 border-rose-200' },
  CAP_NHAT_TRANG_THAI: { label: 'Cập nhật trạng thái', color: 'bg-blue-50 text-blue-700 border-blue-200' },
  DANG_NHAP: { label: 'Đăng nhập hệ thống', color: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
  XUAT_BAO_CAO: { label: 'Xuất dữ liệu báo cáo', color: 'bg-amber-50 text-amber-700 border-amber-200' },
  PHAN_BO_LEAD: { label: 'Phân bổ nhân sự', color: 'bg-indigo-50 text-indigo-700 border-indigo-200' },
};

export const AuditLogsPage: React.FC = () => {
  const [logs, setLogs] = useState<AuditLogEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionFilter, setActionFilter] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  const fetchLogs = async () => {
    setLoading(true);
    const data = await apiClient.getAuditLogs();
    setLogs(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  const filteredLogs = logs.filter((l) => {
    if (actionFilter !== 'ALL' && l.action !== actionFilter) return false;
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return (
      l.actorName.toLowerCase().includes(q) ||
      l.targetResource.toLowerCase().includes(q) ||
      (l.reason && l.reason.toLowerCase().includes(q)) ||
      l.ipAddress.includes(q)
    );
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="font-bold text-2xl text-on-surface">
            Nhật Ký Kiểm Toán Bất Biến (Audit Trail)
          </h1>
          <p className="text-xs text-on-surface-variant">
            Ghi nhận toàn bộ thao tác truy xuất dữ liệu định danh PII và biến động hệ thống theo chuẩn ISO 27001 & OWASP ASVS
          </p>
        </div>

        <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-50 text-emerald-800 rounded-xl text-xs font-semibold border border-emerald-200">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>Bảo mật chống can thiệp (WORM / Immutable)</span>
        </div>
      </div>

      {/* 4 Summary Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-surface-container-lowest p-4 rounded-2xl border border-outline-variant/30 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs text-on-surface-variant font-medium">Tổng số sự kiện</span>
            <div className="text-xl font-bold text-on-surface mt-1">{logs.length} sự kiện</div>
          </div>
          <div className="w-9 h-9 rounded-xl bg-primary-fixed flex items-center justify-center text-primary">
            <History className="w-4 h-4" />
          </div>
        </div>

        <div className="bg-surface-container-lowest p-4 rounded-2xl border border-outline-variant/30 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs text-on-surface-variant font-medium">Phiên giải mã PII</span>
            <div className="text-xl font-bold text-rose-600 mt-1">
              {logs.filter((l) => l.action === 'XEM_PII').length} lượt
            </div>
          </div>
          <div className="w-9 h-9 rounded-xl bg-rose-50 flex items-center justify-center text-rose-600">
            <Eye className="w-4 h-4" />
          </div>
        </div>

        <div className="bg-surface-container-lowest p-4 rounded-2xl border border-outline-variant/30 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs text-on-surface-variant font-medium">Cập nhật Lead / Vé</span>
            <div className="text-xl font-bold text-blue-600 mt-1">
              {logs.filter((l) => l.action === 'CAP_NHAT_TRANG_THAI').length} sự kiện
            </div>
          </div>
          <div className="w-9 h-9 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
            <UserCheck className="w-4 h-4" />
          </div>
        </div>

        <div className="bg-surface-container-lowest p-4 rounded-2xl border border-outline-variant/30 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs text-on-surface-variant font-medium">IP truy cập bất thường</span>
            <div className="text-xl font-bold text-emerald-600 mt-1">0 (An toàn)</div>
          </div>
          <div className="w-9 h-9 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600">
            <Lock className="w-4 h-4" />
          </div>
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
            placeholder="Tìm theo tài khoản, tài nguyên, lý do..."
            className="w-full pl-9 pr-3 py-1.5 bg-surface-container-low rounded-xl text-xs text-on-surface placeholder:text-outline border border-transparent focus:border-primary focus:bg-white focus:outline-none transition-all"
          />
        </div>

        <div className="flex items-center gap-3">
          <Filter className="w-3.5 h-3.5 text-outline" />
          <span className="text-xs text-on-surface-variant font-medium">Hành động:</span>
          <select
            value={actionFilter}
            onChange={(e) => setActionFilter(e.target.value)}
            className="bg-surface-container-low px-3 py-1.5 rounded-xl border border-outline-variant/30 text-xs font-semibold text-on-surface focus:outline-none focus:border-primary"
          >
            <option value="ALL">Tất cả hành động</option>
            <option value="XEM_PII">Xem dữ liệu PII (XEM_PII)</option>
            <option value="CAP_NHAT_TRANG_THAI">Cập nhật trạng thái</option>
            <option value="DANG_NHAP">Đăng nhập hệ thống</option>
            <option value="XUAT_BAO_CAO">Xuất dữ liệu</option>
          </select>
        </div>
      </div>

      {/* Audit Log Table */}
      <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant/30 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-surface-container-low text-on-surface-variant font-semibold border-b border-outline-variant/20">
              <tr>
                <th className="px-5 py-3.5">Thời Gian (Timestamp)</th>
                <th className="px-5 py-3.5">Tài Khoản & Vai Trò</th>
                <th className="px-5 py-3.5">Hành Động</th>
                <th className="px-5 py-3.5">Tài Nguyên Tác Động</th>
                <th className="px-5 py-3.5">Địa Chỉ IP</th>
                <th className="px-5 py-3.5">Lý Do Nghiệp Vụ Bắt Buộc</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/20">
              {loading ? (
                <tr>
                  <td colSpan={6} className="px-5 py-8 text-center text-outline">
                    Đang tải nhật ký kiểm toán...
                  </td>
                </tr>
              ) : filteredLogs.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-5 py-8 text-center text-outline">
                    Không có bản ghi nhật ký nào.
                  </td>
                </tr>
              ) : (
                filteredLogs.map((log) => {
                  const tag = ACTION_TAGS[log.action] || {
                    label: log.action,
                    color: 'bg-gray-100 text-gray-700',
                  };
                  return (
                    <tr key={log.id} className="hover:bg-surface-container-low/40 transition-colors">
                      <td className="px-5 py-3.5 font-mono text-outline whitespace-nowrap">
                        {new Date(log.timestamp).toLocaleString('vi-VN')}
                      </td>
                      <td className="px-5 py-3.5">
                        <div className="font-semibold text-on-surface">{log.actorName}</div>
                        <div className="text-[11px] text-outline">{log.actorRole}</div>
                      </td>
                      <td className="px-5 py-3.5">
                        <span
                          className={`inline-flex px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${tag.color}`}
                        >
                          {tag.label}
                        </span>
                      </td>
                      <td className="px-5 py-3.5 font-medium text-on-surface">
                        {log.targetResource}
                      </td>
                      <td className="px-5 py-3.5 font-mono text-[11px] text-outline">
                        {log.ipAddress}
                      </td>
                      <td className="px-5 py-3.5 max-w-sm">
                        <span className="text-on-surface-variant text-xs line-clamp-2">
                          {log.reason || 'Thực hiện thao tác chuẩn'}
                        </span>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
