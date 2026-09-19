/**
 * 9 Trang thai UI chuan hoa theo PRD muc 19 (Enterprise UI States)
 */
export type UIState =
    | 'INITIAL'        // Khoi tao, chua co du lieu
    | 'LOADING'        // Dang tai du lieu tu may chu (shimmer / skeleton)
    | 'EMPTY'          // Khong co du lieu phu hop bo loc
    | 'SUCCESS'        // Tai du lieu thanh cong
    | 'PARTIAL_ERROR'  // Loi mot phan (vi du: tai duoc goi cuoc nhung khong tai duoc khuyen mai)
    | 'FATAL_ERROR'    // Loi nghiem trong khong the tiep tuc
    | 'OFFLINE'        // Mat ket noi Internet tren thiet bi
    | 'TIMEOUT'        // Het thoi gian cho phan hoi tu Gateway
    | 'MAINTENANCE';   // He thong dang trong khung gio bao tri dinh ky

export interface ApiResponse<T> {
    success: boolean;
    data?: T;
    message?: string;
    errorCode?: string;
    timestamp: string;
}

export interface PaginatedResponse<T> {
    items: T[];
    totalItems: number;
    page: number;
    pageSize: number;
    totalPages: number;
}

export interface ApiError {
    code: string;
    message: string;
    details?: Record<string, string[]>;
}
