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
        name: 'Thanh pho Ca Mau',
        type: 'thanh_pho',
        wards: [
            { id: 'CM_P1', name: 'Phuong 1', type: 'phuong' },
            { id: 'CM_P2', name: 'Phuong 2', type: 'phuong' }, // Da sap nhap Phuong 4 cu va mot phan Phuong 9
            { id: 'CM_P5', name: 'Phuong 5', type: 'phuong' },
            { id: 'CM_P6', name: 'Phuong 6', type: 'phuong' },
            { id: 'CM_P7', name: 'Phuong 7', type: 'phuong' },
            { id: 'CM_P8', name: 'Phuong 8', type: 'phuong' },
            { id: 'CM_P9', name: 'Phuong 9', type: 'phuong' },
            { id: 'CM_PTT', name: 'Phuong Tan Thanh', type: 'phuong' },
            { id: 'CM_PTX', name: 'Phuong Tan Xuyen', type: 'phuong' }, // Da nhap mot phan Phuong 4 cu
            { id: 'CM_XAX', name: 'Xa An Xuyen', type: 'xa' },
            { id: 'CM_XDB', name: 'Xa Dinh Binh', type: 'xa' },
            { id: 'CM_XHTa', name: 'Xa Hoa Tan', type: 'xa' },
            { id: 'CM_XHT', name: 'Xa Hoa Thanh', type: 'xa' },
            { id: 'CM_XLVL', name: 'Xa Ly Van Lam', type: 'xa' },
            { id: 'CM_XTV', name: 'Xa Tac Van', type: 'xa' },
            { id: 'CM_XTT', name: 'Xa Tan Thanh', type: 'xa' },
        ],
    },
    {
        id: 'HUYEN_CAI_NUOC',
        code: '968',
        name: 'Huyen Cai Nuoc',
        type: 'huyen',
        wards: [
            { id: 'CN_TT', name: 'Thi tran Cai Nuoc', type: 'thi_tran' },
            { id: 'CN_XDH', name: 'Xa Dong Hung', type: 'xa' },
            { id: 'CN_XDT', name: 'Xa Dong Thoi', type: 'xa' },
            { id: 'CN_XHM', name: 'Xa Hung My', type: 'xa' },
            { id: 'CN_XLTT', name: 'Xa Luong The Tran', type: 'xa' },
            { id: 'CN_XPH', name: 'Xa Phu Hung', type: 'xa' },
            { id: 'CN_XTH', name: 'Xa Tan Hung', type: 'xa' },
            { id: 'CN_XTHD', name: 'Xa Tan Hung Dong', type: 'xa' },
            { id: 'CN_XTP', name: 'Xa Thanh Phu', type: 'xa' },
            { id: 'CN_XTT', name: 'Xa Tran Thoi', type: 'xa' },
        ],
    },
    {
        id: 'HUYEN_DAM_DOI',
        code: '969',
        name: 'Huyen Dam Doi',
        type: 'huyen',
        wards: [
            { id: 'DD_TT', name: 'Thi tran Dam Doi', type: 'thi_tran' },
            { id: 'DD_XQP', name: 'Xa Quach Pham', type: 'xa' },
            { id: 'DD_XQPB', name: 'Xa Quach Pham Bac', type: 'xa' },
            { id: 'DD_XTAK', name: 'Xa Ta An Khuong', type: 'xa' },
            { id: 'DD_XTAKD', name: 'Xa Ta An Khuong Dong', type: 'xa' },
            { id: 'DD_XTAKN', name: 'Xa Ta An Khuong Nam', type: 'xa' },
            { id: 'DD_XTD', name: 'Xa Tan Dan', type: 'xa' },
            { id: 'DD_XTDu', name: 'Xa Tan Duyet', type: 'xa' },
            { id: 'DD_XTT', name: 'Xa Tan Thuan', type: 'xa' }, // Sap nhap Tan Duc va Tan Thuan
            { id: 'DD_XTTi', name: 'Xa Tan Tien', type: 'xa' }, // Sap nhap Nguyen Huan va Tan Tien
            { id: 'DD_XTTr', name: 'Xa Tan Trung', type: 'xa' },
            { id: 'DD_XTTu', name: 'Xa Thanh Tung', type: 'xa' },
            { id: 'DD_XTP', name: 'Xa Tran Phan', type: 'xa' },
            { id: 'DD_XNC', name: 'Xa Ngoc Chanh', type: 'xa' },
        ],
    },
    {
        id: 'HUYEN_NAM_CAN',
        code: '970',
        name: 'Huyen Nam Can',
        type: 'huyen',
        wards: [
            { id: 'NC_TT', name: 'Thi tran Nam Can', type: 'thi_tran' },
            { id: 'NC_XDM', name: 'Xa Dat Moi', type: 'xa' },
            { id: 'NC_XHR', name: 'Xa Ham Rong', type: 'xa' },
            { id: 'NC_XHV', name: 'Xa Hang Vinh', type: 'xa' },
            { id: 'NC_XHT', name: 'Xa Hiep Tung', type: 'xa' },
            { id: 'NC_XLH', name: 'Xa Lam Hai', type: 'xa' },
            { id: 'NC_XTG', name: 'Xa Tam Giang', type: 'xa' },
            { id: 'NC_XTGD', name: 'Xa Tam Giang Dong', type: 'xa' },
        ],
    },
    {
        id: 'HUYEN_NGOC_HIEN',
        code: '973',
        name: 'Huyen Ngoc Hien',
        type: 'huyen',
        wards: [
            { id: 'NH_TT', name: 'Thi tran Rach Goc', type: 'thi_tran' },
            { id: 'NH_XDM', name: 'Xa Dat Mui', type: 'xa' },
            { id: 'NH_XTA', name: 'Xa Tan An', type: 'xa' },
            { id: 'NH_XTAT', name: 'Xa Tan An Tay', type: 'xa' },
            { id: 'NH_XTGT', name: 'Xa Tam Giang Tay', type: 'xa' },
            { id: 'NH_XVA', name: 'Xa Vien An', type: 'xa' },
            { id: 'NH_XVAD', name: 'Xa Vien An Dong', type: 'xa' },
        ],
    },
    {
        id: 'HUYEN_PHU_TAN',
        code: '971',
        name: 'Huyen Phu Tan',
        type: 'huyen',
        wards: [
            { id: 'PT_TT', name: 'Thi tran Cai Doi Vam', type: 'thi_tran' }, // Da sap nhap mot phan xa Nguyen Viet Khai
            { id: 'PT_XNVK', name: 'Xa Nguyen Viet Khai', type: 'xa' },
            { id: 'PT_XPM', name: 'Xa Phu My', type: 'xa' },
            { id: 'PT_XPT', name: 'Xa Phu Tan', type: 'xa' },
            { id: 'PT_XPTh', name: 'Xa Phu Thuan', type: 'xa' },
            { id: 'PT_XRC', name: 'Xa Rach Cheo', type: 'xa' },
            { id: 'PT_XTH', name: 'Xa Tan Hai', type: 'xa' },
            { id: 'PT_XTHT', name: 'Xa Tan Hung Tay', type: 'xa' },
            { id: 'PT_XVT', name: 'Xa Viet Thang', type: 'xa' },
        ],
    },
    {
        id: 'HUYEN_THOI_BINH',
        code: '966',
        name: 'Huyen Thoi Binh',
        type: 'huyen',
        wards: [
            { id: 'TB_TT', name: 'Thi tran Thoi Binh', type: 'thi_tran' },
            { id: 'TB_XBB', name: 'Xa Bien Bach', type: 'xa' },
            { id: 'TB_XBBD', name: 'Xa Bien Bach Dong', type: 'xa' },
            { id: 'TB_XHTK', name: 'Xa Ho Thi Ky', type: 'xa' },
            { id: 'TB_XTB', name: 'Xa Tan Bang', type: 'xa' },
            { id: 'TB_XTL', name: 'Xa Tan Loc', type: 'xa' },
            { id: 'TB_XTLB', name: 'Xa Tan Loc Bac', type: 'xa' },
            { id: 'TB_XTLD', name: 'Xa Tan Loc Dong', type: 'xa' },
            { id: 'TB_XTP', name: 'Xa Tan Phu', type: 'xa' },
            { id: 'TB_XThB', name: 'Xa Thoi Binh', type: 'xa' },
            { id: 'TB_XTLu', name: 'Xa Tri Luc', type: 'xa' },
            { id: 'TB_XTPg', name: 'Xa Tri Phai', type: 'xa' },
        ],
    },
    {
        id: 'HUYEN_TRAN_VAN_THOI',
        code: '967',
        name: 'Huyen Tran Van Thoi',
        type: 'huyen',
        wards: [
            { id: 'TVT_TT', name: 'Thi tran Tran Van Thoi', type: 'thi_tran' },
            { id: 'TVT_TTSD', name: 'Thi tran Song Doc', type: 'thi_tran' },
            { id: 'TVT_XKB', name: 'Xa Khanh Binh', type: 'xa' },
            { id: 'TVT_XKBD', name: 'Xa Khanh Binh Dong', type: 'xa' },
            { id: 'TVT_XKBT', name: 'Xa Khanh Binh Tay', type: 'xa' },
            { id: 'TVT_XKBTB', name: 'Xa Khanh Binh Tay Bac', type: 'xa' },
            { id: 'TVT_XKH', name: 'Xa Khanh Hai', type: 'xa' },
            { id: 'TVT_XKHu', name: 'Xa Khanh Hung', type: 'xa' },
            { id: 'TVT_XKL', name: 'Xa Khanh Loc', type: 'xa' },
            { id: 'TVT_XPD', name: 'Xa Phong Dien', type: 'xa' },
            { id: 'TVT_XPL', name: 'Xa Phong Lac', type: 'xa' },
            { id: 'TVT_XLA', name: 'Xa Loi An', type: 'xa' },
            { id: 'TVT_XTH', name: 'Xa Tran Hoi', type: 'xa' },
        ],
    },
    {
        id: 'HUYEN_U_MINH',
        code: '965',
        name: 'Huyen U Minh',
        type: 'huyen',
        wards: [
            { id: 'UM_TT', name: 'Thi tran U Minh', type: 'thi_tran' },
            { id: 'UM_XKA', name: 'Xa Khanh An', type: 'xa' },
            { id: 'UM_XKL', name: 'Xa Khanh Lam', type: 'xa' },
            { id: 'UM_XKH', name: 'Xa Khanh Hoi', type: 'xa' },
            { id: 'UM_XKHn', name: 'Xa Khanh Hoa', type: 'xa' },
            { id: 'UM_XKT', name: 'Xa Khanh Tien', type: 'xa' },
            { id: 'UM_XKTh', name: 'Xa Khanh Thuan', type: 'xa' },
            { id: 'UM_XNP', name: 'Xa Nguyen Phich', type: 'xa' },
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
