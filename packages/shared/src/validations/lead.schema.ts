import { z } from 'zod';
import { PhoneNumberSchema } from './phone.schema';

export const CreateLeadSchema = z.object({
    customerPhone: PhoneNumberSchema,
    customerName: z.string().trim().max(100).optional(),
    packageCode: z
        .string()
        .trim()
        .min(2, 'Ma goi cuoc phai co it nhat 2 ky tu')
        .max(20, 'Ma goi cuoc khong qua 20 ky tu'),
    districtId: z
        .string()
        .min(1, 'Vui long chon quan/huyen/thanh pho tai Ca Mau'),
    wardName: z.string().trim().optional(),
    source: z
        .enum(['MINI_APP_BANNER', 'PACKAGE_DETAIL', 'AI_CHATBOT', 'PROMOTION_PAGE', 'QR_CODE'])
        .default('PACKAGE_DETAIL'),
    notes: z.string().trim().max(500, 'Ghi chu khong qua 500 ky tu').optional(),
});

export type CreateLeadInput = z.infer<typeof CreateLeadSchema>;
