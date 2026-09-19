export type PackageStatus =
    | 'DRAFT'
    | 'SUBMITTED'
    | 'PENDING_REVIEW'
    | 'APPROVED'
    | 'SCHEDULED'
    | 'ACTIVE'
    | 'SUSPENDED'
    | 'DEPRECATED';

export type PackageCategory =
    | 'DATA_HEAVY'
    | 'COMBO_VOICE_DATA'
    | 'MONTHLY'
    | 'LONG_CYCLE'
    | 'ENTERPRISE';

export interface TelecomPackage {
    id: string;
    code: string;
    name: string;
    price: number;
    cycle: string;
    dataPerDay: string;
    totalData: string;
    voiceInternal: string;
    voiceExternal: string;
    sms?: string;
    description: string;
    category: PackageCategory;
    status: PackageStatus;
    isHot?: boolean;
    isPromotional?: boolean;
    registrationSyntax: string;
    cancellationSyntax: string;
    targetAudience: string;
    benefits: string[];
}

export interface PackageFilterOptions {
    category?: PackageCategory;
    cycleType?: '30_DAYS' | 'LONG_CYCLE';
    minPrice?: number;
    maxPrice?: number;
    isHot?: boolean;
    keyword?: string;
}
