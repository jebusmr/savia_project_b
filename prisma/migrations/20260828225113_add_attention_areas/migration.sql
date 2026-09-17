-- CreateTable
CREATE TABLE `attentionarea` (
    `id` VARCHAR(191) NOT NULL,
    `specialtyId` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `slug` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NULL,
    `order` INTEGER NOT NULL DEFAULT 0,
    `status` VARCHAR(191) NOT NULL DEFAULT 'ACTIVE',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `attentionarea_specialtyId_idx`(`specialtyId`),
    UNIQUE INDEX `attentionarea_specialtyId_slug_key`(`specialtyId`, `slug`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `specialistattentionarea` (
    `id` VARCHAR(191) NOT NULL,
    `specialistId` VARCHAR(191) NOT NULL,
    `attentionAreaId` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `specialistattentionarea_specialistId_idx`(`specialistId`),
    INDEX `specialistattentionarea_attentionAreaId_idx`(`attentionAreaId`),
    UNIQUE INDEX `specialistattentionarea_specialistId_attentionAreaId_key`(`specialistId`, `attentionAreaId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `attentionarea` ADD CONSTRAINT `AttentionArea_specialtyId_fkey` FOREIGN KEY (`specialtyId`) REFERENCES `specialty`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `specialistattentionarea` ADD CONSTRAINT `SpecialistAttentionArea_specialistId_fkey` FOREIGN KEY (`specialistId`) REFERENCES `specialist`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `specialistattentionarea` ADD CONSTRAINT `SpecialistAttentionArea_attentionAreaId_fkey` FOREIGN KEY (`attentionAreaId`) REFERENCES `attentionarea`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;


