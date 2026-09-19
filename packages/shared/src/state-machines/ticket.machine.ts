import { TicketStatus } from '../models/ticket.types';

const TICKET_TRANSITION_MAP: Record<TicketStatus, TicketStatus[]> = {
    RECEIVED: ['CLASSIFIED', 'REJECTED'],
    CLASSIFIED: ['PROCESSING', 'REJECTED'],
    PROCESSING: ['RESPONDED', 'REJECTED'],
    RESPONDED: ['CONFIRMED', 'PROCESSING'], // Co the quay lai PROCESSING neu khach hang chua hai long
    CONFIRMED: ['RESOLVED'],
    RESOLVED: [],
    REJECTED: [],
};

export function canTransitionTicket(
    currentStatus: TicketStatus,
    nextStatus: TicketStatus
): boolean {
    if (currentStatus === nextStatus) {
        return false;
    }
    const allowed = TICKET_TRANSITION_MAP[currentStatus] || [];
    return allowed.includes(nextStatus);
}

export function getNextAllowedTicketStatuses(currentStatus: TicketStatus): TicketStatus[] {
    return TICKET_TRANSITION_MAP[currentStatus] || [];
}

export function isTicketTerminalState(status: TicketStatus): boolean {
    return status === 'RESOLVED' || status === 'REJECTED';
}
