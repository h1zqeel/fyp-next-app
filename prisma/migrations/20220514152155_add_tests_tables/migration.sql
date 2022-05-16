-- CreateTable
CREATE TABLE `individualTest` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `patientName` VARCHAR(191) NOT NULL,
    `patientDOB` VARCHAR(191) NOT NULL,
    `result` VARCHAR(191) NOT NULL,
    `severity` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `hospitalTest` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `hospitalId` INTEGER NOT NULL,
    `patientName` VARCHAR(191) NOT NULL,
    `patientDOB` DATETIME(3) NOT NULL,
    `result` VARCHAR(191) NOT NULL,
    `severity` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `hospitalTest` ADD CONSTRAINT `hospitalTest_hospitalId_fkey` FOREIGN KEY (`hospitalId`) REFERENCES `HospitalRequest`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
