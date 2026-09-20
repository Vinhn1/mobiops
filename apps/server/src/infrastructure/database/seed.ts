import bcrypt from 'bcryptjs';
import { MOBIFONE_CAMAU_STORES } from '@mobiops/shared';
import { prisma } from './prisma';

/**
 * Seed script to populate initial master data for MobiOps Ca Mau.
 * Creates official stores, administrative staff users, and sample telecom records.
 */
async function main(): Promise<void> {
    console.log('[Seed] Starting database seeding...');

    // 1. Seed Stores
    console.log('[Seed] Upserting 10 Ca Mau stores...');
    for (const store of MOBIFONE_CAMAU_STORES) {
        await prisma.store.upsert({
            where: { id: store.id },
            update: {
                name: store.name,
                districtId: store.districtId,
                address: store.address,
                phone: store.hotline,
                latitude: store.latitude,
                longitude: store.longitude,
                openingHours: store.openingHours,
                services: store.services,
                isMain: store.isMainBranch,
            },
            create: {
                id: store.id,
                name: store.name,
                districtId: store.districtId,
                address: store.address,
                phone: store.hotline,
                latitude: store.latitude,
                longitude: store.longitude,
                openingHours: store.openingHours,
                services: store.services,
                isMain: store.isMainBranch,
            },
        });
    }

    // 2. Seed Administrative Users
    console.log('[Seed] Seeding administrative staff users...');
    const defaultPasswordHash = await bcrypt.hash('MobiFone@2026', 10);

    const usersData = [
        {
            username: 'admin_camau',
            email: 'admin.camau@mobifone.vn',
            fullName: 'Quản Trị Viên MobiFone Cà Mau',
            role: 'SUPER_ADMIN' as const,
            storeId: 'STORE_CM_MAIN',
        },
        {
            username: 'manager_tpcamau',
            email: 'manager.tpcamau@mobifone.vn',
            fullName: 'Trưởng Điểm Giao Dịch TP Cà Mau',
            role: 'DISTRICT_MANAGER' as const,
            storeId: 'STORE_CM_MAIN',
        },
        {
            username: 'telesale_ngoctrinh',
            email: 'telesale.ntrinh@mobifone.vn',
            fullName: 'Nguyễn Thị Ngọc Trinh',
            role: 'TELESALES' as const,
            storeId: 'STORE_CM_MAIN',
        },
        {
            username: 'tech_namcan',
            email: 'tech.namcan@mobifone.vn',
            fullName: 'Trần Văn Hưởng - Kỹ thuật BTS Năm Căn',
            role: 'FIELD_TECH' as const,
            storeId: 'STORE_NAM_CAN',
        },
        {
            username: 'support_caidoidam',
            email: 'support.cdd@mobifone.vn',
            fullName: 'Lê Hoàng Nam - Chăm sóc khách hàng Phú Tân',
            role: 'SUPPORT_AGENT' as const,
            storeId: 'STORE_PHU_TAN',
        },
    ];

    for (const userData of usersData) {
        await prisma.user.upsert({
            where: { username: userData.username },
            update: {
                email: userData.email,
                fullName: userData.fullName,
                role: userData.role,
                storeId: userData.storeId,
            },
            create: {
                username: userData.username,
                email: userData.email,
                passwordHash: defaultPasswordHash,
                fullName: userData.fullName,
                role: userData.role,
                storeId: userData.storeId,
            },
        });
    }

    // 3. Seed Sample Customers
    console.log('[Seed] Seeding sample customers...');
    const customer = await prisma.customer.upsert({
        where: { phone: '0903123456' },
        update: {},
        create: {
            phone: '0903123456',
            fullName: 'Nguyễn Văn An',
            citizenId: '096092001234',
            tier: 'GOLD',
            rewardPoints: 2450,
            districtId: 'TP_CA_MAU',
        },
    });

    // 4. Seed Sample Lead
    console.log('[Seed] Seeding sample lead...');
    await prisma.lead.upsert({
        where: { code: 'LEAD-CM-2026-0001' },
        update: {},
        create: {
            code: 'LEAD-CM-2026-0001',
            customerId: customer.id,
            customerName: customer.fullName,
            customerPhone: customer.phone,
            districtId: 'TP_CA_MAU',
            packageCode: 'KC135',
            channel: 'MINI_APP',
            status: 'NEW',
            storeId: 'STORE_CM_MAIN',
            notes: 'Khách hàng quan tâm gói KC135 chu kỳ 6 tháng tại TP Cà Mau',
            metadata: {
                source: 'mini_app_home_featured',
                interestedInEsim: true,
            },
        },
    });

    // 5. Seed Sample Ticket
    console.log('[Seed] Seeding sample ticket...');
    await prisma.ticket.upsert({
        where: { code: 'CM-HOTRO-93821' },
        update: {},
        create: {
            code: 'CM-HOTRO-93821',
            customerId: customer.id,
            customerName: customer.fullName,
            customerPhone: customer.phone,
            districtId: 'HUYEN_NAM_CAN',
            category: 'NETWORK_SIGNAL',
            priority: 'HIGH',
            title: 'Phản ánh tín hiệu sóng 4G chập chờn tại khu vực Ấp Hàng Vịnh',
            description: 'Tại khu vực Thị trấn Năm Căn gần cửa biển thường xuyên bị rớt cuộc gọi và tốc độ data dưới 1Mbps vào buổi tối.',
            preferredCallTime: '14:00 - 17:00',
            status: 'PROCESSING',
            storeId: 'STORE_NAM_CAN',
            metadata: {
                btsSector: 'BTS_NAMCAN_02_SEC3',
                deviceModel: 'Samsung Galaxy A54',
            },
        },
    });

    // 6. Seed Initial Audit Log
    console.log('[Seed] Recording system init audit log...');
    await prisma.auditLog.create({
        data: {
            action: 'SYSTEM_INITIALIZE',
            resource: 'DATABASE',
            resourceId: 'mobiops_camau',
            details: {
                version: '1.0.0',
                engine: 'PostgreSQL 16',
                seededStoresCount: MOBIFONE_CAMAU_STORES.length,
                seededUsersCount: usersData.length,
            },
            ipAddress: '127.0.0.1',
            userAgent: 'Prisma Seeder Script',
        },
    });

    console.log('[Seed] Database seeding completed successfully.');
}

main()
    .catch((error) => {
        console.error('[Seed] Seeding failed with error:', error);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
