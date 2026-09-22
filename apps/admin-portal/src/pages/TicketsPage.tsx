import React, { useState, useEffect } from 'react';
import {
  TicketCheck,
  Eye,
  CheckCircle2,
  Clock,
  ShieldCheck,
  Search,
  Radio,
} from 'lucide-react';
import {
  Ticket,
  TicketStatus,
  TicketCategory,
  TicketPriority,
  TICKET_CATEGORY_LABELS,
  TICKET_STATUS_LABELS,
  maskPhoneNumber,
} from '@mobiops/shared';
import { apiClient } from '../services/api-client';
import { PIIRevealModal } from '../components/common/PIIRevealModal';

const PRIORITY_BADGES: Record<TicketPriority, { label: string; color: string }> = {
  URGENT: { label: 'Khẩn cấp', color: 'bg-red-50 text-red-700 border-red-200' },
  HIGH: { label: 'Ưu tiên cao', color: 'bg-amber-50 text-amber-700 border-amber-200' },
  MEDIUM: { label: 'Trung bình', color: 'bg-blue-50 text-blue-700 border-blue-200' },
  LOW: { label: 'Thường', color: 'bg-slate-100 text-slate-700 border-slate-200' },
};

export const TicketsPage: React.FC = () => {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<TicketStatus | 'ALL'>('ALL');
  const [categoryFilter, setCategoryFilter] = useState<TicketCategory | 'ALL'>('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  // PII modal
  const [selectedTicketForPII, setSelectedTicketForPII] = useState<Ticket | null>(null);

  // Status transition modal
  const [activeTicketForStatus, setActiveTicketForStatus] = useState<Ticket | null>(null);
  const [newStatus, setNewStatus] = useState<TicketStatus>('PROCESSING');
  const [solutionNote, setSolutionNote] = useState('');

  const fetchTickets = async () => {
    setLoading(true);
    const data = await apiClient.getTickets(
      statusFilter === 'ALL' ? undefined : statusFilter,
      categoryFilter === 'ALL' ? undefined : categoryFilter
    );
    setTickets(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchTickets();
  }, [statusFilter, categoryFilter]);

  const handleUpdateStatus = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeTicketForStatus) return;

    await apiClient.updateTicketStatus(activeTicketForStatus.id, newStatus, solutionNote);
    setActiveTicketForStatus(null);
    setSolutionNote('');
    fetchTickets();
  };

  const filteredTickets = tickets.filter((t) => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return (
      t.ticketCode.toLowerCase().includes(q) ||
      t.title.toLowerCase().includes(q) ||
      t.customerPhone.includes(q) ||
      (t.customerName && t.customerName.toLowerCase().includes(q))
    );
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="font-bold text-2xl text-on-surface">
            Yêu Cầu Hỗ Trợ & SLA Vận Hành
          </h1>
          <p className="text-xs text-on-surface-variant">
            Xử lý phản ánh kỹ thuật trạm phát sóng BTS, cước thuê bao và thủ tục viễn thông trên địa bàn Cà Mau
          </p>
        </div>

        {/* SLA Compliance summary pill */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3.5 py-1.5 bg-emerald-50 text-emerald-800 rounded-xl border border-emerald-200">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span className="text-xs font-semibold">SLA Cam Kết: 96.2% Đạt Chuẩn</span>
          </div>
        </div>
      </div>

      {/* KPI 4 Mini Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-surface-container-lowest p-4 rounded-2xl border border-outline-variant/30 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs text-on-surface-variant font-medium">Tổng số vé tháng này</span>
            <div className="text-xl font-bold text-on-surface mt-1">142</div>
          </div>
          <div className="w-9 h-9 rounded-xl bg-primary-fixed flex items-center justify-center text-primary">
            <TicketCheck className="w-4 h-4" />
          </div>
        </div>

        <div className="bg-surface-container-lowest p-4 rounded-2xl border border-outline-variant/30 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs text-on-surface-variant font-medium">Sự cố sóng trạm BTS</span>
            <div className="text-xl font-bold text-secondary mt-1">3 trạm</div>
          </div>
          <div className="w-9 h-9 rounded-xl bg-secondary-fixed flex items-center justify-center text-secondary">
            <Radio className="w-4 h-4" />
          </div>
        </div>

        <div className="bg-surface-container-lowest p-4 rounded-2xl border border-outline-variant/30 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs text-on-surface-variant font-medium">Đang xử lý kỹ thuật</span>
            <div className="text-xl font-bold text-amber-600 mt-1">7 phiếu</div>
          </div>
          <div className="w-9 h-9 rounded-xl bg-amber-50 flex items-center justify-center text-amber-600">
            <Clock className="w-4 h-4" />
          </div>
        </div>

        <div className="bg-surface-container-lowest p-4 rounded-2xl border border-outline-variant/30 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs text-on-surface-variant font-medium">Đã hoàn tất & xác nhận</span>
            <div className="text-xl font-bold text-emerald-600 mt-1">132 phiếu</div>
          </div>
          <div className="w-9 h-9 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600">
            <CheckCircle2 className="w-4 h-4" />
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
            placeholder="Tìm theo mã vé, tiêu đề, SĐT..."
            className="w-full pl-9 pr-3 py-1.5 bg-surface-container-low rounded-xl text-xs text-on-surface placeholder:text-outline border border-transparent focus:border-primary focus:bg-white focus:outline-none transition-all"
          />
        </div>

        <div className="flex items-center gap-3 flex-wrap text-xs">
          {/* Category */}
          <div className="flex items-center gap-1.5 text-on-surface-variant">
            <span>Phân loại:</span>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value as any)}
              className="bg-surface-container-low px-2.5 py-1.5 rounded-xl border border-outline-variant/30 text-xs font-semibold text-on-surface focus:outline-none focus:border-primary"
            >
              <option value="ALL">Tất cả phân loại</option>
              <option value="NETWORK_SIGNAL">Sóng & Kết nối mạng</option>
              <option value="BILLING">Cước phí & Nạp tiền</option>
              <option value="SIM_ESIM">Thủ tục SIM & eSIM</option>
              <option value="VAS_SERVICE">Gói cước & Dịch vụ VAS</option>
              <option value="OTHER">Yêu cầu hỗ trợ khác</option>
            </select>
          </div>

          {/* Status */}
          <div className="flex items-center gap-1.5 text-on-surface-variant">
            <span>Trạng thái:</span>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as any)}
              className="bg-surface-container-low px-2.5 py-1.5 rounded-xl border border-outline-variant/30 text-xs font-semibold text-on-surface focus:outline-none focus:border-primary"
            >
              <option value="ALL">Tất cả trạng thái</option>
              <option value="RECEIVED">Tiếp nhận</option>
              <option value="CLASSIFIED">Phân loại</option>
              <option value="PROCESSING">Đang xử lý</option>
              <option value="RESPONDED">Đã phản hồi</option>
              <option value="RESOLVED">Đã hoàn tất</option>
            </select>
          </div>
        </div>
      </div>

      {/* Tickets Table */}
      <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant/30 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-surface-container-low text-on-surface-variant font-semibold border-b border-outline-variant/20">
              <tr>
                <th className="px-5 py-3.5">Mã Vé</th>
                <th className="px-5 py-3.5">Khách Hàng (PII)</th>
                <th className="px-5 py-3.5">Phân Loại Sự Cố</th>
                <th className="px-5 py-3.5">Nội Dung Chi Tiết</th>
                <th className="px-5 py-3.5">Độ Ưu Tiên</th>
                <th className="px-5 py-3.5">Trạng Thái Xử Lý</th>
                <th className="px-5 py-3.5 text-right">Thao Tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/20">
              {loading ? (
                <tr>
                  <td colSpan={7} className="px-5 py-8 text-center text-outline">
                    Đang tải danh sách vé hỗ trợ...
                  </td>
                </tr>
              ) : filteredTickets.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-5 py-8 text-center text-outline">
                    Không tìm thấy phiếu hỗ trợ nào.
                  </td>
                </tr>
              ) : (
                filteredTickets.map((t) => {
                  const prioInfo = PRIORITY_BADGES[t.priority] || {
                    label: t.priority,
                    color: 'bg-gray-100 text-gray-700',
                  };
                  const catLabel = TICKET_CATEGORY_LABELS[t.category] || t.category;
                  const statLabel = TICKET_STATUS_LABELS[t.status] || t.status;

                  return (
                    <tr key={t.id} className="hover:bg-surface-container-low/40 transition-colors">
                      <td className="px-5 py-3.5 font-mono font-bold text-primary">
                        {t.ticketCode}
                      </td>

                      <td className="px-5 py-3.5">
                        <div className="font-semibold text-on-surface">{t.customerName}</div>
                        <div className="flex items-center gap-1.5 mt-0.5">
                          <span className="font-mono text-on-surface-variant text-[11px]">
                            {maskPhoneNumber(t.customerPhone)}
                          </span>
                          <button
                            onClick={() => setSelectedTicketForPII(t)}
                            className="p-1 text-primary hover:bg-primary-fixed rounded transition-colors"
                            title="Xem SĐT chưa che (Audit logged)"
                          >
                            <Eye className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>

                      <td className="px-5 py-3.5">
                        <span className="font-medium text-on-surface px-2 py-0.5 bg-surface-container rounded text-[11px]">
                          {catLabel}
                        </span>
                        <div className="text-[11px] text-outline mt-0.5">{t.districtName}</div>
                      </td>

                      <td className="px-5 py-3.5 max-w-xs">
                        <div className="font-semibold text-on-surface truncate">{t.title}</div>
                        <div className="text-[11px] text-on-surface-variant line-clamp-1 mt-0.5">
                          {t.description}
                        </div>
                      </td>

                      <td className="px-5 py-3.5">
                        <span
                          className={`inline-flex px-2 py-0.5 rounded-md text-[11px] font-semibold border ${prioInfo.color}`}
                        >
                          {prioInfo.label}
                        </span>
                      </td>

                      <td className="px-5 py-3.5">
                        <span className="font-semibold text-on-surface px-2.5 py-0.5 bg-surface-container-high rounded-full text-[11px]">
                          {statLabel}
                        </span>
                      </td>

                      <td className="px-5 py-3.5 text-right">
                        <button
                          onClick={() => {
                            setActiveTicketForStatus(t);
                            setNewStatus(t.status);
                            setSolutionNote(t.resolutionNote || '');
                          }}
                          className="px-3 py-1 rounded-lg bg-primary hover:bg-primary-container text-white text-[11px] font-semibold transition-all shadow-sm"
                        >
                          Cập nhật SLA
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* PII Modal */}
      {selectedTicketForPII && (
        <PIIRevealModal
          isOpen={!!selectedTicketForPII}
          onClose={() => setSelectedTicketForPII(null)}
          maskedValue={maskPhoneNumber(selectedTicketForPII.customerPhone)}
          unmaskedValue={selectedTicketForPII.customerPhone}
          fieldLabel="Số Điện Thoại Thuê Bao Khiếu Nại"
          targetResource={`Vé ${selectedTicketForPII.ticketCode}`}
          targetId={selectedTicketForPII.id}
        />
      )}

      {/* Status Transition Modal */}
      {activeTicketForStatus && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-surface-container-lowest w-full max-w-lg rounded-2xl shadow-2xl border border-outline-variant/40 p-6 space-y-4">
            <h3 className="font-bold text-base text-on-surface">
              Cập Nhật Tiến Độ Vé {activeTicketForStatus.ticketCode}
            </h3>

            <div className="p-3 bg-surface-container rounded-xl text-xs space-y-1">
              <div className="font-semibold text-on-surface">{activeTicketForStatus.title}</div>
              <p className="text-on-surface-variant">{activeTicketForStatus.description}</p>
            </div>

            <form onSubmit={handleUpdateStatus} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-on-surface mb-1.5">
                  Trạng thái vận hành tiếp theo
                </label>
                <select
                  value={newStatus}
                  onChange={(e) => setNewStatus(e.target.value as TicketStatus)}
                  className="w-full p-2.5 rounded-xl border border-outline-variant focus:border-primary focus:outline-none font-semibold text-on-surface"
                >
                  <option value="CLASSIFIED">Phân loại (CLASSIFIED)</option>
                  <option value="PROCESSING">Đang điều phối kỹ thuật (PROCESSING)</option>
                  <option value="RESPONDED">Đã phản hồi khách hàng (RESPONDED)</option>
                  <option value="CONFIRMED">Khách đã xác nhận hài lòng (CONFIRMED)</option>
                  <option value="RESOLVED">Hoàn tất xử lý (RESOLVED)</option>
                  <option value="REJECTED">Từ chối / Đóng vé (REJECTED)</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-on-surface mb-1.5">
                  Phương án & Biên bản kỹ thuật
                </label>
                <textarea
                  value={solutionNote}
                  onChange={(e) => setSolutionNote(e.target.value)}
                  placeholder="Ghi nhận nguyên nhân trạm BTS, kết quả đo kiểm sóng hoặc hoàn cước thuê bao..."
                  rows={3}
                  className="w-full p-2.5 rounded-xl border border-outline-variant focus:border-primary focus:outline-none"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setActiveTicketForStatus(null)}
                  className="px-4 py-2 rounded-xl text-on-surface-variant hover:bg-surface-container font-semibold"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-primary text-white font-semibold hover:bg-primary-container shadow-sm"
                >
                  Lưu cập nhật
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
