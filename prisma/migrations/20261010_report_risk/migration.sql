-- AlterTable
ALTER TABLE `ScamReport` ADD COLUMN `risk` ENUM('HIGH', 'LOW', 'NONE') NULL;
