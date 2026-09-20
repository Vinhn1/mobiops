import { CreateLeadInput, CreateTicketInput } from '@mobiops/shared';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000/api/v1';

export interface ApiResponse<T> {
    success: boolean;
    data?: T;
    message?: string;
    error?: {
        code: string;
        message: string;
        details?: Array<{ field: string; message: string }>;
    };
    timestamp: string;
}

/**
 * HTTP Client connecting Zalo Mini App to MobiOps Backend API.
 */
class ApiClient {
    private async request<T>(endpoint: string, options: RequestInit = {}): Promise<ApiResponse<T>> {
        const url = `${API_BASE_URL}${endpoint}`;
        const headers = {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            ...(options.headers || {}),
        };

        try {
            const response = await fetch(url, {
                ...options,
                headers,
            });

            const data = await response.json();
            return data as ApiResponse<T>;
        } catch (error: any) {
            console.warn(`[ApiClient] Network request failed for ${endpoint}:`, error);
            return {
                success: false,
                error: {
                    code: 'NETWORK_ERROR',
                    message: 'Không thể kết nối máy chủ máy trạm Cà Mau. Vui lòng kiểm tra kết nối mạng.',
                },
                timestamp: new Date().toISOString(),
            };
        }
    }

    /**
     * Submits a new Lead consultation request directly to PostgreSQL.
     */
    async createLead(input: CreateLeadInput) {
        return this.request<any>('/leads', {
            method: 'POST',
            body: JSON.stringify(input),
        });
    }

    /**
     * Submits a new Customer Support / Network Complaint ticket directly to PostgreSQL.
     */
    async createTicket(input: CreateTicketInput) {
        return this.request<any>('/tickets', {
            method: 'POST',
            body: JSON.stringify(input),
        });
    }

    /**
     * Tracks a ticket status by tracking code.
     */
    async trackTicket(code: string) {
        // Strip # prefix if provided
        const cleanCode = code.replace(/^#/, '');
        return this.request<any>(`/tickets/track/${cleanCode}`);
    }

    /**
     * Checks server health and database connectivity.
     */
    async checkHealth() {
        return this.request<{ status: string; database: string }>('/health');
    }
}

export const apiClient = new ApiClient();
