import { z } from 'zod';
import { PhoneNumberSchema } from './phone.schema';

export const CreateTicketSchema = z.object({
    customerPhone: PhoneNumberSchema,
    customerName: z.string().trim().max(100).optional(),
    districtId: z
        .string()
        .min(1, 'Vui long chon quan/huyen xay ra su co tai Ca Mau'),
    wardName: z.string().trim().optional(),
    category: z.enum(['NETWORK_SIGNAL', 'BILLING', 'SIM_ESIM', 'VAS_SERVICE', 'OTHER'], {
        errorMap: () => ({ message: 'Vui long chon phan loai su co hop le' }),
    }),
    priority: z
        .enum(['LOW', 'MEDIUM', 'HIGH', 'URGENT'])
        .default('MEDIUM'),
    title: z
        .string()
        .trim()
        .min(5, 'Tieu de yeu cau phai co it nhat 5 ky tu')
        .max(150, 'Tieu de yeu cau khong qua 150 ky tu'),
    description: z
        .string()
        .trim()
        .min(10, 'Mo ta chi tiet su co phai co it nhat 10 ky tu de ky thuat vien kiem tra')
        .max(1000, 'Mo ta khong qua 1000 ky tu'),
});

export type CreateTicketInput = z.infer<typeof CreateTicketSchema>;
