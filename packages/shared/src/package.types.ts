import { z } from 'zod';
export const PhoneNumberSchema = z
    .string()
    .regex(/^(07[06789]|089|090|093)\d{7}$/, {
        message: 'So dien thoai khong dung dinh dang mang MobiFone',
    });
export const RegisterPackageSchema = z.object({
    phone: PhoneNumberSchema,
    packageCode: z.string().min(2),
    district: z.string().min(2, 'Vui long chon huyen/thi xa tai Ca Mau'),
    note: z.string().optional(),
});
export type RegisterPackageInput = z.infer<typeof RegisterPackageSchema>;
export interface TelecomPackage {
    id: string;
    code: string;
    name: string;
    price: number;
    cycle: string;
    dataPerDay: string;
    totalData: string;
    voiceInternal: string;
    voiceExternal: string;
    isHot?: boolean;
}