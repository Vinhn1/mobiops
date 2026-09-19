export type SubscriptionType = 'PREPAID' | 'POSTPAID';

export type LoyaltyTier = 'DIAMOND' | 'GOLD' | 'TITANIUM' | 'SILVER' | 'STANDARD';

export interface Customer {
    id: string;
    phoneNumber: string;
    fullName: string;
    citizenId?: string;
    email?: string;
    subscriptionType: SubscriptionType;
    loyaltyTier: LoyaltyTier;
    loyaltyPoints: number;
    mainBalance?: number;
    currentPackageCode?: string;
    currentPackageName?: string;
    packageExpiryDate?: string;
    districtId: string;
    districtName: string;
    wardName?: string;
    registeredAt: string;
    isVerified: boolean;
}

export interface CustomerMaskedSummary {
    id: string;
    maskedPhone: string;
    maskedName: string;
    subscriptionType: SubscriptionType;
    loyaltyTier: LoyaltyTier;
    currentPackageName?: string;
}
