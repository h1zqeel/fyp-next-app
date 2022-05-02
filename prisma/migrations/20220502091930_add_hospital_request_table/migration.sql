-- CreateTable
CREATE TABLE `HospitalRequest` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `hospitalName` VARCHAR(191) NOT NULL,
    `hospitalEmail` VARCHAR(191) NOT NULL,
    `plan` INTEGER NOT NULL,
    `phone` VARCHAR(191) NOT NULL,
    `hospitalPhone` VARCHAR(191) NOT NULL,
    `why` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `HospitalRequest_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
