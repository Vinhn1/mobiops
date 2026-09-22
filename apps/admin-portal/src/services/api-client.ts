import {
  Lead,
  LeadStatus,
  Ticket,
  TicketStatus,
  TelecomPackage,
  Store,
  TELECOM_PACKAGES,
  MOBIFONE_CAMAU_STORES,
} from '@mobiops/shared';

const API_BASE_URL = '/api/v1';

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  error?: string;
}

export interface AuditLogEntry {
  id: string;
  timestamp: string;
  actorName: string;
  actorRole: string;
  action: 'XEM_PII' | 'CAP_NHAT_TRANG_THAI' | 'DANG_NHAP' | 'XUAT_BAO_CAO' | 'PHAN_BO_LEAD';
  targetResource: string;
  targetId: string;
  ipAddress: string;
  reason?: string;
}

// Initial mock fallback datasets ensuring zero-downtime offline demo
let mockLeads: Lead[] = [
  {
    id: 'lead-001',
    customerPhone: '0903123456',
    customerName: 'Trần Văn Hoàng',
    districtId: '785',
    districtName: 'Thành phố Cà Mau',
    wardName: 'Phường 5',
    interestedPackageCode: 'KC135',
    interestedPackageName: 'Gói Cước KC135 (135K/tháng - 6GB/ngày)',
    source: 'MINI_APP_BANNER',
    status: 'NEW',
    notes: 'Khách hàng có nhu cầu sử dụng data tốc độ cao làm việc lưu động.',
    createdAt: new Date(Date.now() - 3600000 * 2).toISOString(),
    updatedAt: new Date(Date.now() - 3600000 * 2).toISOString(),
  },
  {
    id: 'lead-002',
    customerPhone: '0909876543',
    customerName: 'Lê Cẩm Tú',
    districtId: '788',
    districtName: 'Huyện Trần Văn Thời',
    wardName: 'Thị trấn Sông Đốc',
    interestedPackageCode: 'TK135',
    interestedPackageName: 'Gói Cước TK135 (135K/tháng - 7GB/ngày)',
    source: 'AI_CHATBOT',
    status: 'ASSIGNED',
    assignedStaffId: 'staff-01',
    assignedStaffName: 'Nguyễn Thị Mỹ Dung',
    notes: 'Khách hàng tàu cá Sông Đốc cần gói data khỏe khi vào bờ.',
    createdAt: new Date(Date.now() - 3600000 * 8).toISOString(),
    updatedAt: new Date(Date.now() - 3600000 * 3).toISOString(),
  },
  {
    id: 'lead-003',
    customerPhone: '0939112233',
    customerName: 'Nguyễn Văn Đạt',
    districtId: '791',
    districtName: 'Huyện Năm Căn',
    wardName: 'Thị trấn Năm Căn',
    interestedPackageCode: 'MXH120',
    interestedPackageName: 'Gói Cước MXH120 (120K/tháng - Free TikTok/FB)',
    source: 'PACKAGE_DETAIL',
    status: 'CONTACTED',
    assignedStaffId: 'staff-02',
    assignedStaffName: 'Trần Quốc Tuấn',
    notes: 'Đã gọi tư vấn lần 1, khách hẹn tối nay gửi link đăng ký xác thực.',
    createdAt: new Date(Date.now() - 3600000 * 24).toISOString(),
    updatedAt: new Date(Date.now() - 3600000 * 4).toISOString(),
  },
  {
    id: 'lead-004',
    customerPhone: '0907445566',
    customerName: 'Phạm Minh Trí',
    districtId: '787',
    districtName: 'Huyện Thới Bình',
    wardName: 'Thị trấn Thới Bình',
    interestedPackageCode: 'C120N',
    interestedPackageName: 'Gói Cước C120N (120K/tháng - 4GB/ngày + Gọi)',
    source: 'PROMOTION_PAGE',
    status: 'QUALIFIED',
    assignedStaffId: 'staff-01',
    assignedStaffName: 'Nguyễn Thị Mỹ Dung',
    notes: 'Khách đủ điều kiện thuê bao kích hoạt mới.',
    createdAt: new Date(Date.now() - 3600000 * 48).toISOString(),
    updatedAt: new Date(Date.now() - 3600000 * 6).toISOString(),
  },
  {
    id: 'lead-005',
    customerPhone: '0931998877',
    customerName: 'Võ Thị Bích Loan',
    districtId: '793',
    districtName: 'Huyện Ngọc Hiển',
    wardName: 'Xã Đất Mũi',
    interestedPackageCode: 'KC135',
    interestedPackageName: 'Gói Cước KC135 (135K/tháng - 6GB/ngày)',
    source: 'MINI_APP_BANNER',
    status: 'CONVERTED',
    assignedStaffId: 'staff-02',
    assignedStaffName: 'Trần Quốc Tuấn',
    notes: 'Đã kích hoạt thành công qua mã QR Mini App.',
    createdAt: new Date(Date.now() - 3600000 * 72).toISOString(),
    updatedAt: new Date(Date.now() - 3600000 * 12).toISOString(),
  },
];

let mockTickets: Ticket[] = [
  {
    id: 'ticket-001',
    ticketCode: 'TK-CM-2026-001',
    customerPhone: '0901234567',
    customerName: 'Phạm Văn Nam',
    districtId: '785',
    districtName: 'Thành phố Cà Mau',
    wardName: 'Phường 6',
    category: 'NETWORK_SIGNAL',
    priority: 'HIGH',
    status: 'PROCESSING',
    title: 'Sóng yếu chập chờn tại khu vực Trạm BTS CM012 Khóm 4',
    description: 'Vào giờ cao điểm từ 18h-20h tốc độ 4G rớt xuống dưới 1Mbps, gọi thoại thường xuyên nghẽn kênh.',
    assignedStaffId: 'staff-kt-01',
    assignedStaffName: 'Phòng Kỹ Thuật Viễn Thông',
    createdAt: new Date(Date.now() - 3600000 * 5).toISOString(),
    updatedAt: new Date(Date.now() - 3600000 * 1).toISOString(),
  },
  {
    id: 'ticket-002',
    ticketCode: 'TK-CM-2026-002',
    customerPhone: '0908889999',
    customerName: 'Đặng Thanh Tâm',
    districtId: '789',
    districtName: 'Huyện Cái Nước',
    wardName: 'Thị trấn Cái Nước',
    category: 'BILLING',
    priority: 'MEDIUM',
    status: 'RECEIVED',
    title: 'Thắc mắc cước gia hạn tự động gói KC135',
    description: 'Tài khoản bị trừ cước ngày 18/09 nhưng data cộng chưa đủ 6GB/ngày theo cam kết.',
    createdAt: new Date(Date.now() - 3600000 * 3).toISOString(),
    updatedAt: new Date(Date.now() - 3600000 * 3).toISOString(),
  },
  {
    id: 'ticket-003',
    ticketCode: 'TK-CM-2026-003',
    customerPhone: '0933221144',
    customerName: 'Hồ Quốc Bảo',
    districtId: '791',
    districtName: 'Huyện Năm Căn',
    wardName: 'Thị trấn Năm Căn',
    category: 'SIM_ESIM',
    priority: 'LOW',
    status: 'RESPONDED',
    title: 'Hướng dẫn đổi SIM 4G sang eSIM trên iPhone',
    description: 'Khách hàng nhờ hướng dẫn quét QR code chuyển đổi eSIM online qua Zalo Mini App.',
    resolutionNote: 'Đã gửi video hướng dẫn và liên hệ hỗ trợ cấp lại mã QR mới qua email bảo mật.',
    createdAt: new Date(Date.now() - 3600000 * 20).toISOString(),
    updatedAt: new Date(Date.now() - 3600000 * 2).toISOString(),
  },
];

let mockAuditLogs: AuditLogEntry[] = [
  {
    id: 'audit-001',
    timestamp: new Date(Date.now() - 3600000 * 0.5).toISOString(),
    actorName: 'Nguyễn Văn Quản Trị',
    actorRole: 'Super Admin',
    action: 'DANG_NHAP',
    targetResource: 'Hệ Thống Admin Portal',
    targetId: 'AUTH-SESSION',
    ipAddress: '113.161.88.24',
    reason: 'Đăng nhập phiên làm việc ban sáng',
  },
  {
    id: 'audit-002',
    timestamp: new Date(Date.now() - 3600000 * 1.2).toISOString(),
    actorName: 'Nguyễn Thị Mỹ Dung',
    actorRole: 'Tư vấn viên',
    action: 'CAP_NHAT_TRANG_THAI',
    targetResource: 'Leads Pipeline',
    targetId: 'lead-002',
    ipAddress: '113.161.88.102',
    reason: 'Chuyển lead sang trạng thái ASSIGNED',
  },
  {
    id: 'audit-003',
    timestamp: new Date(Date.now() - 3600000 * 2.5).toISOString(),
    actorName: 'Trần Quốc Tuấn',
    actorRole: 'Giao dịch viên',
    action: 'XEM_PII',
    targetResource: 'Hồ Sơ Khách Hàng',
    targetId: 'cust-0909876543',
    ipAddress: '113.161.88.95',
    reason: 'Xác minh thông tin chủ thuê bao chuyển vùng du lịch Đất Mũi',
  },
];

export const apiClient = {
  // Check backend health
  async getHealth(): Promise<{ status: string; timestamp: string }> {
    try {
      const res = await fetch(`${API_BASE_URL}/health`);
      if (res.ok) {
        const json = await res.json();
        return json.data || { status: 'ok', timestamp: new Date().toISOString() };
      }
    } catch {
      // Fallback
    }
    return { status: 'healthy', timestamp: new Date().toISOString() };
  },

  // Leads CRM API
  async getLeads(status?: LeadStatus, districtId?: string): Promise<Lead[]> {
    try {
      const params = new URLSearchParams();
      if (status) params.append('status', status);
      if (districtId) params.append('districtId', districtId);
      const res = await fetch(`${API_BASE_URL}/leads?${params.toString()}`);
      if (res.ok) {
        const json: ApiResponse<Lead[]> = await res.json();
        if (json.success && Array.isArray(json.data)) {
          return json.data;
        }
      }
    } catch {
      // Fallback to memory store
    }
    return mockLeads.filter((l) => {
      if (status && l.status !== status) return false;
      if (districtId && l.districtId !== districtId) return false;
      return true;
    });
  },

  async updateLeadStatus(id: string, newStatus: LeadStatus, notes?: string): Promise<Lead> {
    try {
      const res = await fetch(`${API_BASE_URL}/leads/${id}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus, notes }),
      });
      if (res.ok) {
        const json: ApiResponse<Lead> = await res.json();
        if (json.success && json.data) {
          return json.data;
        }
      }
    } catch {
      // Fallback
    }
    const idx = mockLeads.findIndex((l) => l.id === id);
    if (idx >= 0) {
      mockLeads[idx] = {
        ...mockLeads[idx],
        status: newStatus,
        notes: notes || mockLeads[idx].notes,
        updatedAt: new Date().toISOString(),
      };
      return mockLeads[idx];
    }
    throw new Error('Không tìm thấy Lead để cập nhật');
  },

  async createLead(data: Partial<Lead>): Promise<Lead> {
    const newLead: Lead = {
      id: `lead-${Date.now()}`,
      customerPhone: data.customerPhone || '0901234567',
      customerName: data.customerName || 'Khách hàng mới',
      districtId: data.districtId || '785',
      districtName: data.districtName || 'Thành phố Cà Mau',
      interestedPackageCode: data.interestedPackageCode || 'KC135',
      interestedPackageName: data.interestedPackageName || 'Gói Cước KC135',
      source: data.source || 'MINI_APP_BANNER',
      status: 'NEW',
      notes: data.notes,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    mockLeads = [newLead, ...mockLeads];
    return newLead;
  },

  // Tickets Support API
  async getTickets(status?: TicketStatus, category?: string): Promise<Ticket[]> {
    try {
      const params = new URLSearchParams();
      if (status) params.append('status', status);
      if (category) params.append('category', category);
      const res = await fetch(`${API_BASE_URL}/tickets?${params.toString()}`);
      if (res.ok) {
        const json: ApiResponse<Ticket[]> = await res.json();
        if (json.success && Array.isArray(json.data)) {
          return json.data;
        }
      }
    } catch {
      // Fallback to memory store
    }
    return mockTickets.filter((t) => {
      if (status && t.status !== status) return false;
      if (category && t.category !== category) return false;
      return true;
    });
  },

  async updateTicketStatus(id: string, newStatus: TicketStatus, note?: string): Promise<Ticket> {
    try {
      const res = await fetch(`${API_BASE_URL}/tickets/${id}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus, resolutionNote: note }),
      });
      if (res.ok) {
        const json: ApiResponse<Ticket> = await res.json();
        if (json.success && json.data) {
          return json.data;
        }
      }
    } catch {
      // Fallback
    }
    const idx = mockTickets.findIndex((t) => t.id === id);
    if (idx >= 0) {
      mockTickets[idx] = {
        ...mockTickets[idx],
        status: newStatus,
        resolutionNote: note || mockTickets[idx].resolutionNote,
        updatedAt: new Date().toISOString(),
      };
      return mockTickets[idx];
    }
    throw new Error('Không tìm thấy Vé hỗ trợ để cập nhật');
  },

  // Packages & Stores API
  async getPackages(): Promise<TelecomPackage[]> {
    try {
      const res = await fetch(`${API_BASE_URL}/catalog/packages`);
      if (res.ok) {
        const json: ApiResponse<TelecomPackage[]> = await res.json();
        if (json.success && Array.isArray(json.data)) {
          return json.data;
        }
      }
    } catch {
      // Fallback
    }
    return TELECOM_PACKAGES;
  },

  async getStores(): Promise<Store[]> {
    try {
      const res = await fetch(`${API_BASE_URL}/catalog/stores`);
      if (res.ok) {
        const json: ApiResponse<Store[]> = await res.json();
        if (json.success && Array.isArray(json.data)) {
          return json.data;
        }
      }
    } catch {
      // Fallback
    }
    return MOBIFONE_CAMAU_STORES;
  },

  // Audit Logs API
  async getAuditLogs(): Promise<AuditLogEntry[]> {
    return mockAuditLogs;
  },

  async recordAuditLog(entry: Omit<AuditLogEntry, 'id' | 'timestamp'>): Promise<AuditLogEntry> {
    const newEntry: AuditLogEntry = {
      ...entry,
      id: `audit-${Date.now()}`,
      timestamp: new Date().toISOString(),
    };
    mockAuditLogs = [newEntry, ...mockAuditLogs];
    return newEntry;
  },
};
