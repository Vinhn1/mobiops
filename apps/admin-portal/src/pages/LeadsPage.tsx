import React, { useState, useEffect } from 'react';
import {
  Eye,
  Plus,
  Filter,
  ArrowRight,
  Search,
  Building,
} from 'lucide-react';
import {
  Lead,
  LeadStatus,
  maskPhoneNumber,
  getNextAllowedLeadStatuses,
  CAMAU_DISTRICTS,
  TELECOM_PACKAGES,
} from '@mobiops/shared';
import { apiClient } from '../services/api-client';
import { PIIRevealModal } from '../components/common/PIIRevealModal';

const STATUS_LABELS: Record<LeadStatus, { label: string; color: string }> = {
  NEW: { label: 'Tiếp nhận mới', color: 'bg-blue-50 text-blue-700 border-blue-200' },
  ASSIGNED: { label: 'Đã phân bổ', color: 'bg-indigo-50 text-indigo-700 border-indigo-200' },
  CONTACTED: { label: 'Đã liên hệ', color: 'bg-amber-50 text-amber-700 border-amber-200' },
  QUALIFIED: { label: 'Đủ điều kiện', color: 'bg-purple-50 text-purple-700 border-purple-200' },
  CONVERTED: { label: 'Chốt thành công', color: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
  LOST: { label: 'Thất bại / Hủy', color: 'bg-rose-50 text-rose-700 border-rose-200' },
  UNQUALIFIED: { label: 'Không phù hợp', color: 'bg-slate-100 text-slate-700 border-slate-200' },
};

export const LeadsPage: React.FC = () => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<LeadStatus | 'ALL'>('ALL');
  const [districtFilter, setDistrictFilter] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  // PII Reveal Modal State
  const [revealModalOpen, setRevealModalOpen] = useState(false);
  const [selectedLeadForReveal, setSelectedLeadForReveal] = useState<Lead | null>(null);

  // New Lead Modal State
  const [newLeadModalOpen, setNewLeadModalOpen] = useState(false);
  const [newCustomerName, setNewCustomerName] = useState('');
  const [newCustomerPhone, setNewCustomerPhone] = useState('');
  const [newDistrictId, setNewDistrictId] = useState('785');
  const [newPackageCode, setNewPackageCode] = useState('KC135');
  const [newNotes, setNewNotes] = useState('');

  const fetchLeads = async () => {
    setLoading(true);
    const data = await apiClient.getLeads(
      statusFilter === 'ALL' ? undefined : statusFilter,
      districtFilter === 'ALL' ? undefined : districtFilter
    );
    setLeads(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchLeads();
  }, [statusFilter, districtFilter]);

  const handleTransition = async (leadId: string, nextStatus: LeadStatus) => {
    try {
      await apiClient.updateLeadStatus(leadId, nextStatus);
      await fetchLeads();
    } catch {
      alert('Không thể chuyển đổi trạng thái Lead');
    }
  };

  const handleCreateLead = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCustomerPhone) {
      alert('Vui lòng nhập số điện thoại');
      return;
    }

    const selectedDistrict = CAMAU_DISTRICTS.find((d: any) => d.code === newDistrictId);
    const selectedPkg = TELECOM_PACKAGES.find((p) => p.code === newPackageCode);

    await apiClient.createLead({
      customerName: newCustomerName || 'Khách hàng Cà Mau',
      customerPhone: newCustomerPhone,
      districtId: newDistrictId,
      districtName: selectedDistrict?.name || 'Thành phố Cà Mau',
      interestedPackageCode: newPackageCode,
      interestedPackageName: selectedPkg?.name || 'Gói Cước KC135',
      source: 'MINI_APP_BANNER',
      notes: newNotes,
    });

    setNewLeadModalOpen(false);
    setNewCustomerName('');
    setNewCustomerPhone('');
    setNewNotes('');
    fetchLeads();
  };

  const filteredLeads = leads.filter((l) => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return (
      (l.customerName && l.customerName.toLowerCase().includes(q)) ||
      l.customerPhone.includes(q) ||
      l.interestedPackageCode.toLowerCase().includes(q) ||
      l.districtName.toLowerCase().includes(q)
    );
  });

  return (
    <div className="space-y-6">
      {/* Header Bar */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="font-bold text-2xl text-on-surface">Quản Lý Leads Tư Vấn & Pipeline</h1>
          <p className="text-xs text-on-surface-variant">
            Theo dõi và điều phối khách hàng tiềm năng gửi từ Zalo Mini App và Chatbot AI tại địa bàn tỉnh Cà Mau
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setNewLeadModalOpen(true)}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-primary hover:bg-primary-container text-white text-xs font-semibold transition-all shadow-sm"
          >
            <Plus className="w-4 h-4" />
            <span>Thêm Lead tư vấn</span>
          </button>
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="bg-surface-container-lowest p-4 rounded-2xl border border-outline-variant/30 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Search */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-outline" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Tìm theo tên, SĐT, gói cước..."
            className="w-full pl-9 pr-3 py-1.5 bg-surface-container-low rounded-xl text-xs text-on-surface placeholder:text-outline border border-transparent focus:border-primary focus:bg-white focus:outline-none transition-all"
          />
        </div>

        {/* Dropdowns */}
        <div className="flex items-center gap-3 flex-wrap">
          {/* Status Filter */}
          <div className="flex items-center gap-1.5 text-xs text-on-surface-variant">
            <Filter className="w-3.5 h-3.5 text-outline" />
            <span>Trạng thái:</span>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as any)}
              className="bg-surface-container-low px-2.5 py-1.5 rounded-xl border border-outline-variant/30 text-xs font-semibold text-on-surface focus:outline-none focus:border-primary"
            >
              <option value="ALL">Tất cả trạng thái</option>
              <option value="NEW">Tiếp nhận mới (NEW)</option>
              <option value="ASSIGNED">Đã phân bổ (ASSIGNED)</option>
              <option value="CONTACTED">Đã liên hệ (CONTACTED)</option>
              <option value="QUALIFIED">Đủ điều kiện (QUALIFIED)</option>
              <option value="CONVERTED">Chốt thành công (CONVERTED)</option>
              <option value="LOST">Thất bại / Hủy (LOST)</option>
            </select>
          </div>

          {/* District Filter */}
          <div className="flex items-center gap-1.5 text-xs text-on-surface-variant">
            <Building className="w-3.5 h-3.5 text-outline" />
            <span>Huyện/TX:</span>
            <select
              value={districtFilter}
              onChange={(e) => setDistrictFilter(e.target.value)}
              className="bg-surface-container-low px-2.5 py-1.5 rounded-xl border border-outline-variant/30 text-xs font-semibold text-on-surface focus:outline-none focus:border-primary"
            >
              <option value="ALL">Tất cả địa bàn Cà Mau</option>
              {CAMAU_DISTRICTS.map((d: any) => (
                <option key={d.code} value={d.code}>
                  {d.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Leads Table */}
      <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant/30 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-surface-container-low text-on-surface-variant font-semibold border-b border-outline-variant/20">
              <tr>
                <th className="px-5 py-3.5">Khách Hàng (PII Masked)</th>
                <th className="px-5 py-3.5">Địa Bàn Hành Chính</th>
                <th className="px-5 py-3.5">Gói Cước Quan Tâm</th>
                <th className="px-5 py-3.5">Nguồn Lead</th>
                <th className="px-5 py-3.5">Trạng Thái Pipeline</th>
                <th className="px-5 py-3.5">Nhân Viên Phụ Trách</th>
                <th className="px-5 py-3.5 text-right">Hành Động Chuyển Trạng Thái</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/20">
              {loading ? (
                <tr>
                  <td colSpan={7} className="px-5 py-8 text-center text-outline">
                    Đang tải danh sách leads...
                  </td>
                </tr>
              ) : filteredLeads.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-5 py-8 text-center text-outline">
                    Không tìm thấy lead nào phù hợp bộ lọc.
                  </td>
                </tr>
              ) : (
                filteredLeads.map((lead) => {
                  const statusInfo = STATUS_LABELS[lead.status] || {
                    label: lead.status,
                    color: 'bg-gray-100 text-gray-700',
                  };
                  const nextStatuses = getNextAllowedLeadStatuses(lead.status);

                  return (
                    <tr key={lead.id} className="hover:bg-surface-container-low/40 transition-colors">
                      {/* Customer info with masked phone */}
                      <td className="px-5 py-3.5">
                        <div className="font-semibold text-on-surface">{lead.customerName}</div>
                        <div className="flex items-center gap-1.5 mt-0.5">
                          <span className="font-mono text-on-surface-variant text-[11px]">
                            {maskPhoneNumber(lead.customerPhone)}
                          </span>
                          <button
                            onClick={() => {
                              setSelectedLeadForReveal(lead);
                              setRevealModalOpen(true);
                            }}
                            className="p-1 text-primary hover:bg-primary-fixed rounded transition-colors"
                            title="Mở xem SĐT chưa mask (Yêu cầu nhập lý do kiểm toán)"
                          >
                            <Eye className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>

                      {/* District */}
                      <td className="px-5 py-3.5">
                        <div className="font-medium text-on-surface">{lead.districtName}</div>
                        {lead.wardName && (
                          <div className="text-[11px] text-outline">{lead.wardName}</div>
                        )}
                      </td>

                      {/* Package */}
                      <td className="px-5 py-3.5">
                        <span className="font-bold text-primary px-2 py-0.5 bg-primary-fixed rounded text-[11px]">
                          {lead.interestedPackageCode}
                        </span>
                        <div className="text-[11px] text-on-surface-variant truncate max-w-[160px] mt-0.5">
                          {lead.interestedPackageName}
                        </div>
                      </td>

                      {/* Source */}
                      <td className="px-5 py-3.5">
                        <span className="text-[11px] px-2 py-0.5 bg-surface-container rounded font-medium text-on-surface-variant">
                          {lead.source}
                        </span>
                      </td>

                      {/* Status */}
                      <td className="px-5 py-3.5">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${statusInfo.color}`}
                        >
                          {statusInfo.label}
                        </span>
                      </td>

                      {/* Staff */}
                      <td className="px-5 py-3.5">
                        <span className="text-on-surface font-medium">
                          {lead.assignedStaffName || 'Chưa phân bổ'}
                        </span>
                      </td>

                      {/* Transition Action Buttons */}
                      <td className="px-5 py-3.5 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          {nextStatuses.map((next) => {
                            const nextLabel = STATUS_LABELS[next]?.label || next;
                            return (
                              <button
                                key={next}
                                onClick={() => handleTransition(lead.id, next)}
                                className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-surface-container hover:bg-primary hover:text-white text-on-surface text-[11px] font-semibold transition-all border border-outline-variant/30"
                              >
                                <span>{nextLabel}</span>
                                <ArrowRight className="w-3 h-3" />
                              </button>
                            );
                          })}
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* PII Reveal Modal */}
      {selectedLeadForReveal && (
        <PIIRevealModal
          isOpen={revealModalOpen}
          onClose={() => {
            setRevealModalOpen(false);
            setSelectedLeadForReveal(null);
          }}
          maskedValue={maskPhoneNumber(selectedLeadForReveal.customerPhone)}
          unmaskedValue={selectedLeadForReveal.customerPhone}
          fieldLabel="Số Điện Thoại Khách Hàng"
          targetResource={`Lead ${selectedLeadForReveal.customerName}`}
          targetId={selectedLeadForReveal.id}
        />
      )}

      {/* New Lead Modal */}
      {newLeadModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-surface-container-lowest w-full max-w-md rounded-2xl shadow-2xl border border-outline-variant/40 p-6 space-y-4">
            <h3 className="font-bold text-base text-on-surface">Thêm Lead Tư Vấn Mới</h3>

            <form onSubmit={handleCreateLead} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-semibold text-on-surface mb-1">Tên khách hàng</label>
                <input
                  type="text"
                  value={newCustomerName}
                  onChange={(e) => setNewCustomerName(e.target.value)}
                  placeholder="Ví dụ: Nguyễn Văn A"
                  className="w-full p-2.5 rounded-xl border border-outline-variant focus:border-primary focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold text-on-surface mb-1">
                  Số điện thoại <span className="text-secondary">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={newCustomerPhone}
                  onChange={(e) => setNewCustomerPhone(e.target.value)}
                  placeholder="Ví dụ: 0903123456"
                  className="w-full p-2.5 rounded-xl border border-outline-variant focus:border-primary focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold text-on-surface mb-1">Địa bàn huyện/thị xã</label>
                <select
                  value={newDistrictId}
                  onChange={(e) => setNewDistrictId(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-outline-variant focus:border-primary focus:outline-none"
                >
                  {CAMAU_DISTRICTS.map((d: any) => (
                    <option key={d.code} value={d.code}>
                      {d.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-semibold text-on-surface mb-1">Gói cước quan tâm</label>
                <select
                  value={newPackageCode}
                  onChange={(e) => setNewPackageCode(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-outline-variant focus:border-primary focus:outline-none"
                >
                  {TELECOM_PACKAGES.map((p) => (
                    <option key={p.code} value={p.code}>
                      {p.code} - {p.name} ({p.price.toLocaleString('vi-VN')} đ)
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-semibold text-on-surface mb-1">Ghi chú nhu cầu</label>
                <textarea
                  value={newNotes}
                  onChange={(e) => setNewNotes(e.target.value)}
                  placeholder="Khách cần tư vấn gói tốc độ cao..."
                  rows={2}
                  className="w-full p-2.5 rounded-xl border border-outline-variant focus:border-primary focus:outline-none"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setNewLeadModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-on-surface-variant hover:bg-surface-container font-semibold"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-primary text-white font-semibold hover:bg-primary-container shadow-sm"
                >
                  Lưu thông tin Lead
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
