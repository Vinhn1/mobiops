export type UserRole =
    | 'SUPER_ADMIN'
    | 'BRANCH_DIRECTOR'
    | 'PRODUCT_STAFF'
    | 'SUPPORT_STAFF'
    | 'DISTRICT_TELESALE';

export type Permission =
    | 'LEAD_VIEW_ALL'
    | 'LEAD_VIEW_ASSIGNED'
    | 'LEAD_ASSIGN'
    | 'LEAD_UPDATE_STATUS'
    | 'PACKAGE_VIEW'
    | 'PACKAGE_CREATE'
    | 'PACKAGE_APPROVE'
    | 'TICKET_VIEW_ALL'
    | 'TICKET_VIEW_ASSIGNED'
    | 'TICKET_PROCESS'
    | 'PII_VIEW_UNMASKED'
    | 'ANALYTICS_VIEW'
    | 'SYSTEM_CONFIG';

export const ROLE_PERMISSIONS_MAP: Record<UserRole, Permission[]> = {
    SUPER_ADMIN: [
        'LEAD_VIEW_ALL',
        'LEAD_VIEW_ASSIGNED',
        'LEAD_ASSIGN',
        'LEAD_UPDATE_STATUS',
        'PACKAGE_VIEW',
        'PACKAGE_CREATE',
        'PACKAGE_APPROVE',
        'TICKET_VIEW_ALL',
        'TICKET_VIEW_ASSIGNED',
        'TICKET_PROCESS',
        'PII_VIEW_UNMASKED',
        'ANALYTICS_VIEW',
        'SYSTEM_CONFIG',
    ],
    BRANCH_DIRECTOR: [
        'LEAD_VIEW_ALL',
        'LEAD_ASSIGN',
        'PACKAGE_VIEW',
        'PACKAGE_APPROVE',
        'TICKET_VIEW_ALL',
        'PII_VIEW_UNMASKED',
        'ANALYTICS_VIEW',
    ],
    PRODUCT_STAFF: [
        'PACKAGE_VIEW',
        'PACKAGE_CREATE',
        'ANALYTICS_VIEW',
    ],
    SUPPORT_STAFF: [
        'TICKET_VIEW_ALL',
        'TICKET_VIEW_ASSIGNED',
        'TICKET_PROCESS',
        'PII_VIEW_UNMASKED',
    ],
    DISTRICT_TELESALE: [
        'LEAD_VIEW_ASSIGNED',
        'LEAD_UPDATE_STATUS',
        'PACKAGE_VIEW',
    ],
};

export function hasPermission(role: UserRole, permission: Permission): boolean {
    const permissions = ROLE_PERMISSIONS_MAP[role] || [];
    return permissions.includes(permission);
}
