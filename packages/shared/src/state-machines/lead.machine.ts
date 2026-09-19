import { LeadStatus } from '../models/lead.types';

const LEAD_TRANSITION_MAP: Record<LeadStatus, LeadStatus[]> = {
    NEW: ['ASSIGNED', 'UNQUALIFIED', 'LOST'],
    ASSIGNED: ['CONTACTED', 'LOST', 'UNQUALIFIED'],
    CONTACTED: ['QUALIFIED', 'LOST', 'UNQUALIFIED'],
    QUALIFIED: ['CONVERTED', 'LOST'],
    CONVERTED: [],
    LOST: ['NEW'], // Cho phep mo lai lead neu khach hang tuong tac lai
    UNQUALIFIED: [],
};

export function canTransitionLead(currentStatus: LeadStatus, nextStatus: LeadStatus): boolean {
    if (currentStatus === nextStatus) {
        return false;
    }
    const allowed = LEAD_TRANSITION_MAP[currentStatus] || [];
    return allowed.includes(nextStatus);
}

export function getNextAllowedLeadStatuses(currentStatus: LeadStatus): LeadStatus[] {
    return LEAD_TRANSITION_MAP[currentStatus] || [];
}

export function isLeadTerminalState(status: LeadStatus): boolean {
    return status === 'CONVERTED' || status === 'UNQUALIFIED';
}
