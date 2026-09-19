export type StoreServiceType =
    | 'SIM_REGISTRATION'
    | 'ESIM_SWAP'
    | 'BILL_PAYMENT'
    | 'PACKAGE_CONSULTATION'
    | 'B2B_SUPPORT'
    | 'WARRANTY';

export interface StoreServiceInfo {
    code: StoreServiceType;
    name: string;
    description: string;
}

export interface Store {
    id: string;
    code: string;
    name: string;
    districtId: string;
    districtName: string;
    wardName?: string;
    address: string;
    latitude: number;
    longitude: number;
    hotline: string;
    openingHours: string;
    services: StoreServiceType[];
    isMainBranch?: boolean;
}

export interface StoreFilterOptions {
    districtId?: string;
    serviceType?: StoreServiceType;
    keyword?: string;
    maxDistanceKm?: number;
}
