/**
 * Danh muc Don vi Hanh chinh Tinh Ca Mau
 * Cap nhat theo Nghi quyet so 1252/NQ-UBTVQH15 va 1655/NQ-UBTVQH15 cua UBTVQH
 * ve viec sap xep don vi hanh chinh cap xa tinh Ca Mau.
 *
 * Tinh Ca Mau gom 9 don vi cap huyen (1 thanh pho, 8 huyen).
 * Tai TP Ca Mau: Giai the Phuong 4, nhap vao Phuong 2 va Phuong Tan Xuyen.
 */

export interface WardUnit {
    id: string;
    name: string;
    type: 'phuong' | 'xa' | 'thi_tran';
    postalCode?: string;
}

export interface DistrictUnit {
    id: string;
    code: string;
    name: string;
    type: 'thanh_pho' | 'huyen';
    wards: WardUnit[];
}

export const CAMAU_ADMINISTRATIVE_UNITS: DistrictUnit[] = [
    {
        id: 'TP_CA_MAU',
        code: '964',
        name: 'Thành phố Cà Mau',
        type: 'thanh_pho',
        wards: [
            { id: 'CM_P1', name: 'Phường 1', type: 'phuong' },
            { id: 'CM_P2', name: 'Phường 2', type: 'phuong' }, // Đã sáp nhập Phường 4 cũ và một phần Phường 9
            { id: 'CM_P5', name: 'Phường 5', type: 'phuong' },
            { id: 'CM_P6', name: 'Phường 6', type: 'phuong' },
            { id: 'CM_P7', name: 'Phường 7', type: 'phuong' },
            { id: 'CM_P8', name: 'Phường 8', type: 'phuong' },
            { id: 'CM_P9', name: 'Phường 9', type: 'phuong' },
            { id: 'CM_PTT', name: 'Phường Tân Thành', type: 'phuong' },
            { id: 'CM_PTX', name: 'Phường Tân Xuyên', type: 'phuong' }, // Đã nhập một phần Phường 4 cũ
            { id: 'CM_XAX', name: 'Xã An Xuyên', type: 'xa' },
            { id: 'CM_XDB', name: 'Xã Định Bình', type: 'xa' },
            { id: 'CM_XHTa', name: 'Xã Hòa Tân', type: 'xa' },
            { id: 'CM_XHT', name: 'Xã Hòa Thành', type: 'xa' },
            { id: 'CM_XLVL', name: 'Xã Lý Văn Lâm', type: 'xa' },
            { id: 'CM_XTV', name: 'Xã Tắc Vân', type: 'xa' },
            { id: 'CM_XTT', name: 'Xã Tân Thành', type: 'xa' },
        ],
    },
    {
        id: 'HUYEN_CAI_NUOC',
        code: '968',
        name: 'Huyện Cái Nước',
        type: 'huyen',
        wards: [
            { id: 'CN_TT', name: 'Thị trấn Cái Nước', type: 'thi_tran' },
            { id: 'CN_XDH', name: 'Xã Đông Hưng', type: 'xa' },
            { id: 'CN_XDT', name: 'Xã Đông Thới', type: 'xa' },
            { id: 'CN_XHM', name: 'Xã Hưng Mỹ', type: 'xa' },
            { id: 'CN_XLTT', name: 'Xã Lương Thế Trân', type: 'xa' },
            { id: 'CN_XPH', name: 'Xã Phú Hưng', type: 'xa' },
            { id: 'CN_XTH', name: 'Xã Tân Hưng', type: 'xa' },
            { id: 'CN_XTHD', name: 'Xã Tân Hưng Đông', type: 'xa' },
            { id: 'CN_XTP', name: 'Xã Thạnh Phú', type: 'xa' },
            { id: 'CN_XTT', name: 'Xã Trần Thới', type: 'xa' },
        ],
    },
    {
        id: 'HUYEN_DAM_DOI',
        code: '969',
        name: 'Huyện Đầm Dơi',
        type: 'huyen',
        wards: [
            { id: 'DD_TT', name: 'Thị trấn Đầm Dơi', type: 'thi_tran' },
            { id: 'DD_XQP', name: 'Xã Quách Phẩm', type: 'xa' },
            { id: 'DD_XQPB', name: 'Xã Quách Phẩm Bắc', type: 'xa' },
            { id: 'DD_XTAK', name: 'Xã Tạ An Khương', type: 'xa' },
            { id: 'DD_XTAKD', name: 'Xã Tạ An Khương Đông', type: 'xa' },
            { id: 'DD_XTAKN', name: 'Xã Tạ An Khương Nam', type: 'xa' },
            { id: 'DD_XTD', name: 'Xã Tân Dân', type: 'xa' },
            { id: 'DD_XTDu', name: 'Xã Tân Duyệt', type: 'xa' },
            { id: 'DD_XTT', name: 'Xã Tân Thuận', type: 'xa' }, // Sáp nhập Tân Đức và Tân Thuận
            { id: 'DD_XTTi', name: 'Xã Tân Tiến', type: 'xa' }, // Sáp nhập Nguyễn Huân và Tân Tiến
            { id: 'DD_XTTr', name: 'Xã Tân Trung', type: 'xa' },
            { id: 'DD_XTTu', name: 'Xã Thanh Tùng', type: 'xa' },
            { id: 'DD_XTP', name: 'Xã Trần Phán', type: 'xa' },
            { id: 'DD_XNC', name: 'Xã Ngọc Chánh', type: 'xa' },
        ],
    },
    {
        id: 'HUYEN_NAM_CAN',
        code: '970',
        name: 'Huyện Năm Căn',
        type: 'huyen',
        wards: [
            { id: 'NC_TT', name: 'Thị trấn Năm Căn', type: 'thi_tran' },
            { id: 'NC_XDM', name: 'Xã Đất Mới', type: 'xa' },
            { id: 'NC_XHR', name: 'Xã Hàm Rồng', type: 'xa' },
            { id: 'NC_XHV', name: 'Xã Hàng Vịnh', type: 'xa' },
            { id: 'NC_XHT', name: 'Xã Hiệp Tùng', type: 'xa' },
            { id: 'NC_XLH', name: 'Xã Lâm Hải', type: 'xa' },
            { id: 'NC_XTG', name: 'Xã Tam Giang', type: 'xa' },
            { id: 'NC_XTGD', name: 'Xã Tam Giang Đông', type: 'xa' },
        ],
    },
    {
        id: 'HUYEN_NGOC_HIEN',
        code: '973',
        name: 'Huyện Ngọc Hiển',
        type: 'huyen',
        wards: [
            { id: 'NH_TT', name: 'Thị trấn Rạch Gốc', type: 'thi_tran' },
            { id: 'NH_XDM', name: 'Xã Đất Mũi', type: 'xa' },
            { id: 'NH_XTA', name: 'Xã Tân Ân', type: 'xa' },
            { id: 'NH_XTAT', name: 'Xã Tân Ân Tây', type: 'xa' },
            { id: 'NH_XTGT', name: 'Xã Tam Giang Tây', type: 'xa' },
            { id: 'NH_XVA', name: 'Xã Viên An', type: 'xa' },
            { id: 'NH_XVAD', name: 'Xã Viên An Đông', type: 'xa' },
        ],
    },
    {
        id: 'HUYEN_PHU_TAN',
        code: '971',
        name: 'Huyện Phú Tân',
        type: 'huyen',
        wards: [
            { id: 'PT_TT', name: 'Thị trấn Cái Đôi Vàm', type: 'thi_tran' }, // Đã sáp nhập một phần xã Nguyễn Việt Khái
            { id: 'PT_XNVK', name: 'Xã Nguyễn Việt Khái', type: 'xa' },
            { id: 'PT_XPM', name: 'Xã Phú Mỹ', type: 'xa' },
            { id: 'PT_XPT', name: 'Xã Phú Tân', type: 'xa' },
            { id: 'PT_XPTh', name: 'Xã Phú Thuận', type: 'xa' },
            { id: 'PT_XRC', name: 'Xã Rạch Chèo', type: 'xa' },
            { id: 'PT_XTH', name: 'Xã Tân Hải', type: 'xa' },
            { id: 'PT_XTHT', name: 'Xã Tân Hưng Tây', type: 'xa' },
            { id: 'PT_XVT', name: 'Xã Việt Thắng', type: 'xa' },
        ],
    },
    {
        id: 'HUYEN_THOI_BINH',
        code: '966',
        name: 'Huyện Thới Bình',
        type: 'huyen',
        wards: [
            { id: 'TB_TT', name: 'Thị trấn Thới Bình', type: 'thi_tran' },
            { id: 'TB_XBB', name: 'Xã Biển Bạch', type: 'xa' },
            { id: 'TB_XBBD', name: 'Xã Biển Bạch Đông', type: 'xa' },
            { id: 'TB_XHTK', name: 'Xã Hồ Thị Kỷ', type: 'xa' },
            { id: 'TB_XTB', name: 'Xã Tân Bằng', type: 'xa' },
            { id: 'TB_XTL', name: 'Xã Tân Lộc', type: 'xa' },
            { id: 'TB_XTLB', name: 'Xã Tân Lộc Bắc', type: 'xa' },
            { id: 'TB_XTLD', name: 'Xã Tân Lộc Đông', type: 'xa' },
            { id: 'TB_XTP', name: 'Xã Tân Phú', type: 'xa' },
            { id: 'TB_XThB', name: 'Xã Thới Bình', type: 'xa' },
            { id: 'TB_XTLu', name: 'Xã Trí Lực', type: 'xa' },
            { id: 'TB_XTPg', name: 'Xã Trí Phải', type: 'xa' },
        ],
    },
    {
        id: 'HUYEN_TRAN_VAN_THOI',
        code: '967',
        name: 'Huyện Trần Văn Thời',
        type: 'huyen',
        wards: [
            { id: 'TVT_TT', name: 'Thị trấn Trần Văn Thời', type: 'thi_tran' },
            { id: 'TVT_TTSD', name: 'Thị trấn Sông Đốc', type: 'thi_tran' },
            { id: 'TVT_XKB', name: 'Xã Khánh Bình', type: 'xa' },
            { id: 'TVT_XKBD', name: 'Xã Khánh Bình Đông', type: 'xa' },
            { id: 'TVT_XKBT', name: 'Xã Khánh Bình Tây', type: 'xa' },
            { id: 'TVT_XKBTB', name: 'Xã Khánh Bình Tây Bắc', type: 'xa' },
            { id: 'TVT_XKH', name: 'Xã Khánh Hải', type: 'xa' },
            { id: 'TVT_XKHu', name: 'Xã Khánh Hưng', type: 'xa' },
            { id: 'TVT_XKL', name: 'Xã Khánh Lộc', type: 'xa' },
            { id: 'TVT_XPD', name: 'Xã Phong Điền', type: 'xa' },
            { id: 'TVT_XPL', name: 'Xã Phong Lạc', type: 'xa' },
            { id: 'TVT_XLA', name: 'Xã Lợi An', type: 'xa' },
            { id: 'TVT_XTH', name: 'Xã Trần Hợi', type: 'xa' },
        ],
    },
    {
        id: 'HUYEN_U_MINH',
        code: '965',
        name: 'Huyện U Minh',
        type: 'huyen',
        wards: [
            { id: 'UM_TT', name: 'Thị trấn U Minh', type: 'thi_tran' },
            { id: 'UM_XKA', name: 'Xã Khánh An', type: 'xa' },
            { id: 'UM_XKL', name: 'Xã Khánh Lâm', type: 'xa' },
            { id: 'UM_XKH', name: 'Xã Khánh Hội', type: 'xa' },
            { id: 'UM_XKHn', name: 'Xã Khánh Hòa', type: 'xa' },
            { id: 'UM_XKT', name: 'Xã Khánh Tiến', type: 'xa' },
            { id: 'UM_XKTh', name: 'Xã Khánh Thuận', type: 'xa' },
            { id: 'UM_XNP', name: 'Xã Nguyễn Phích', type: 'xa' },
        ],
    },
];

export function getDistricts(): DistrictUnit[] {
    return CAMAU_ADMINISTRATIVE_UNITS;
}

export function getDistrictById(districtId: string): DistrictUnit | undefined {
    return CAMAU_ADMINISTRATIVE_UNITS.find((d) => d.id === districtId || d.code === districtId);
}

export function getWardsByDistrict(districtId: string): WardUnit[] {
    const district = getDistrictById(districtId);
    return district ? district.wards : [];
}

export function isValidDistrict(districtId: string): boolean {
    return CAMAU_ADMINISTRATIVE_UNITS.some((d) => d.id === districtId || d.name === districtId);
}
