/**
 * Tien ich che dau thong tin dinh danh ca nhan (PII Masking)
 * Tuan thu Nghi dinh 13/2023/ND-CP ve Bao ve Du lieu Ca nhan
 * va Quy tac bao mat Du an: .agents/rules/06-data-privacy.md
 */

/**
 * Che giau so dien thoai: Giu lai 4 so dau va 3 so cuoi
 * Vi du: '0903123456' -> '0903 *** 456'
 */
export function maskPhoneNumber(phone: string): string {
    if (!phone || phone.length < 7) {
        return '***';
    }
    const cleanPhone = phone.replace(/\s+/g, '');
    if (cleanPhone.length === 10) {
        return `${cleanPhone.slice(0, 4)} *** ${cleanPhone.slice(7)}`;
    }
    const firstPart = cleanPhone.slice(0, 3);
    const lastPart = cleanPhone.slice(-3);
    return `${firstPart} *** ${lastPart}`;
}

export const maskPhone = maskPhoneNumber;

/**
 * Che giau so CCCD/CMND: Chi giu lai 4 so cuoi cung
 * Vi du: '096092001234' -> '********1234'
 */
export function maskCitizenId(idCard: string): string {
    if (!idCard || idCard.length < 4) {
        return '****';
    }
    const cleanId = idCard.replace(/\s+/g, '');
    const lastFour = cleanId.slice(-4);
    const maskLen = Math.max(0, cleanId.length - 4);
    return `${'*'.repeat(maskLen)}${lastFour}`;
}

/**
 * Che giau ho ten khach hang: Giu lai tu dau va tu cuoi
 * Vi du: 'Nguyen Van An' -> 'Nguyen V** An'
 */
export function maskFullName(fullName: string): string {
    if (!fullName) return '***';
    const words = fullName.trim().split(/\s+/);
    if (words.length <= 1) {
        const single = words[0];
        if (single.length <= 2) return single;
        return `${single[0]}***${single[single.length - 1]}`;
    }
    if (words.length === 2) {
        return `${words[0]} ${words[1][0]}***`;
    }
    const middleWordsMasked = words
        .slice(1, -1)
        .map((w) => (w.length > 0 ? `${w[0]}**` : '**'))
        .join(' ');
    return `${words[0]} ${middleWordsMasked} ${words[words.length - 1]}`;
}

/**
 * Che giau dia chi email: Giu chu cai dau va ten mien
 * Vi du: 'khachhang@gmail.com' -> 'k***@gmail.com'
 */
export function maskEmail(email: string): string {
    if (!email || !email.includes('@')) {
        return '***@***';
    }
    const [user, domain] = email.split('@');
    if (user.length <= 2) {
        return `${user[0]}***@${domain}`;
    }
    return `${user[0]}***${user[user.length - 1]}@${domain}`;
}
