import { z } from 'zod';

/**
 * Cac dau so chinh thuc cua mang MobiFone tai Viet Nam:
 * 070, 076, 077, 078, 079, 089, 090, 093
 */
export const MOBIFONE_PREFIXES = ['070', '076', '077', '078', '079', '089', '090', '093'];

export const PhoneNumberSchema = z
    .string()
    .trim()
    .regex(/^(07[06789]|089|090|093)\d{7}$/, {
        message: 'So dien thoai phai thuoc mang MobiFone (dau so 070, 076, 077, 078, 079, 089, 090, 093 gom 10 chu so)',
    });

export function isMobiFonePrefix(phone: string): boolean {
    const clean = phone.replace(/\s+/g, '');
    return /^(07[06789]|089|090|093)\d{7}$/.test(clean);
}
