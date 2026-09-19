export type TicketStatus =
    | 'RECEIVED'
    | 'CLASSIFIED'
    | 'PROCESSING'
    | 'RESPONDED'
    | 'CONFIRMED'
    | 'RESOLVED'
    | 'REJECTED';

export type TicketCategory =
    | 'NETWORK_SIGNAL'
    | 'BILLING'
    | 'SIM_ESIM'
    | 'VAS_SERVICE'
    | 'OTHER';

export const TICKET_CATEGORY_LABELS: Record<TicketCategory, string> = {
    NETWORK_SIGNAL: 'Sóng & Kết nối mạng',
    BILLING: 'Cước phí & Nạp tiền',
    SIM_ESIM: 'Thủ tục SIM & eSIM',
    VAS_SERVICE: 'Gói cước & Dịch vụ VAS',
    OTHER: 'Yêu cầu hỗ trợ khác',
};

export const TICKET_STATUS_LABELS: Record<TicketStatus, string> = {
    RECEIVED: 'Tiếp nhận',
    CLASSIFIED: 'Phân loại',
    PROCESSING: 'Đang xử lý',
    RESPONDED: 'Đã phản hồi',
    CONFIRMED: 'Khách xác nhận',
    RESOLVED: 'Đã hoàn tất',
    REJECTED: 'Từ chối / Hủy',
};

export type TicketPriority = 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT';

export interface Ticket {
    id: string;
    ticketCode: string;
    customerPhone: string;
    customerName?: string;
    districtId: string;
    districtName: string;
    wardName?: string;
    category: TicketCategory;
    priority: TicketPriority;
    status: TicketStatus;
    title: string;
    description: string;
    resolutionNote?: string;
    assignedStaffId?: string;
    assignedStaffName?: string;
    createdAt: string;
    updatedAt: string;
    resolvedAt?: string;
}

export interface TicketFilterOptions {
    status?: TicketStatus;
    category?: TicketCategory;
    priority?: TicketPriority;
    districtId?: string;
    assignedStaffId?: string;
    startDate?: string;
    endDate?: string;
}
