-- AlterTable
ALTER TABLE `office` ADD COLUMN `acceptsCard` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `acceptsCash` BOOLEAN NOT NULL DEFAULT true,
    ADD COLUMN `acceptsTransfer` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `issuesInvoice` BOOLEAN NOT NULL DEFAULT false;

