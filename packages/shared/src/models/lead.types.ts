export type LeadStatus =
    | 'NEW'
    | 'ASSIGNED'
    | 'CONTACTED'
    | 'QUALIFIED'
    | 'CONVERTED'
    | 'LOST'
    | 'UNQUALIFIED';

export type LeadSource =
    | 'MINI_APP_BANNER'
    | 'PACKAGE_DETAIL'
    | 'AI_CHATBOT'
    | 'PROMOTION_PAGE'
    | 'QR_CODE';

export type LeadLostReason =
    | 'CUSTOMER_REJECTED'
    | 'NOT_REACHABLE'
    | 'WRONG_NUMBER'
    | 'INSUFFICIENT_BALANCE'
    | 'NOT_ELIGIBLE'
    | 'ALREADY_SUBSCRIBED'
    | 'OTHER';

export interface Lead {
    id: string;
    customerPhone: string;
    customerName?: string;
    districtId: string;
    districtName: string;
    wardName?: string;
    interestedPackageCode: string;
    interestedPackageName: string;
    source: LeadSource;
    status: LeadStatus;
    assignedStaffId?: string;
    assignedStaffName?: string;
    notes?: string;
    lostReason?: LeadLostReason;
    createdAt: string;
    updatedAt: string;
    contactedAt?: string;
    convertedAt?: string;
}

export interface LeadFilterOptions {
    status?: LeadStatus;
    districtId?: string;
    assignedStaffId?: string;
    packageCode?: string;
    startDate?: string;
    endDate?: string;
}
