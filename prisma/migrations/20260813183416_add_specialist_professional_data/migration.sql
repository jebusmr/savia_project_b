-- AlterTable
ALTER TABLE `specialistprofile` ADD COLUMN `approach` TEXT NULL,
    ADD COLUMN `philosophy` TEXT NULL;

-- CreateTable
CREATE TABLE `SpecialistEducation` (
    `id` VARCHAR(191) NOT NULL,
    `specialistId` VARCHAR(191) NOT NULL,
    `degree` VARCHAR(191) NOT NULL,
    `institution` VARCHAR(191) NOT NULL,
    `year` VARCHAR(191) NOT NULL,
    `description` TEXT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `SpecialistExperience` (
    `id` VARCHAR(191) NOT NULL,
    `specialistId` VARCHAR(191) NOT NULL,
    `position` VARCHAR(191) NOT NULL,
    `institution` VARCHAR(191) NOT NULL,
    `startYear` VARCHAR(191) NOT NULL,
    `endYear` VARCHAR(191) NULL,
    `current` BOOLEAN NOT NULL DEFAULT false,
    `description` TEXT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `SpecialistCertification` (
    `id` VARCHAR(191) NOT NULL,
    `specialistId` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `organization` VARCHAR(191) NOT NULL,
    `year` VARCHAR(191) NOT NULL,
    `description` TEXT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `SpecialistAward` (
    `id` VARCHAR(191) NOT NULL,
    `specialistId` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `organization` VARCHAR(191) NULL,
    `year` VARCHAR(191) NULL,
    `description` TEXT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `SpecialistEducation` ADD CONSTRAINT `SpecialistEducation_specialistId_fkey` FOREIGN KEY (`specialistId`) REFERENCES `Specialist`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SpecialistExperience` ADD CONSTRAINT `SpecialistExperience_specialistId_fkey` FOREIGN KEY (`specialistId`) REFERENCES `Specialist`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SpecialistCertification` ADD CONSTRAINT `SpecialistCertification_specialistId_fkey` FOREIGN KEY (`specialistId`) REFERENCES `Specialist`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SpecialistAward` ADD CONSTRAINT `SpecialistAward_specialistId_fkey` FOREIGN KEY (`specialistId`) REFERENCES `Specialist`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
