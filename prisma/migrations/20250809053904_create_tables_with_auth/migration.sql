-- CreateTable
CREATE TABLE `users` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(50) NOT NULL,
    `email` VARCHAR(100) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `name` VARCHAR(100) NOT NULL,
    `token` VARCHAR(36) NULL,
    `tokenExpiresAt` DATETIME(3) NULL,
    `role` ENUM('TEKNISI', 'ADMIN') NULL DEFAULT 'TEKNISI',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `users_username_key`(`username`),
    UNIQUE INDEX `users_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `infrastructure_type` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `infrastructure_type` VARCHAR(50) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `upt` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `upt_name` VARCHAR(100) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `anomaly` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `anomaly_category` VARCHAR(100) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `detail_infrastructure` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `infrastructure_name` VARCHAR(100) NOT NULL,
    `longitude` DOUBLE NOT NULL,
    `latitude` DOUBLE NOT NULL,
    `id_upt` INTEGER NOT NULL,
    `id_infrastructure` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tasks` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `tasks` VARCHAR(255) NOT NULL,
    `status` ENUM('OPEN', 'ON_PROGRESS', 'CLOSED') NOT NULL,
    `id_infrastructure_detail` INTEGER NOT NULL,
    `id_anomaly` INTEGER NOT NULL,
    `id_user` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `log_solve` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `note` TEXT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `id_task` INTEGER NOT NULL,
    `id_user` INTEGER NOT NULL,
    `status` ENUM('OPEN', 'ON_PROGRESS', 'CLOSED') NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `detail_infrastructure` ADD CONSTRAINT `detail_infrastructure_id_upt_fkey` FOREIGN KEY (`id_upt`) REFERENCES `upt`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `detail_infrastructure` ADD CONSTRAINT `detail_infrastructure_id_infrastructure_fkey` FOREIGN KEY (`id_infrastructure`) REFERENCES `infrastructure_type`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tasks` ADD CONSTRAINT `tasks_id_infrastructure_detail_fkey` FOREIGN KEY (`id_infrastructure_detail`) REFERENCES `detail_infrastructure`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tasks` ADD CONSTRAINT `tasks_id_anomaly_fkey` FOREIGN KEY (`id_anomaly`) REFERENCES `anomaly`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tasks` ADD CONSTRAINT `tasks_id_user_fkey` FOREIGN KEY (`id_user`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `log_solve` ADD CONSTRAINT `log_solve_id_task_fkey` FOREIGN KEY (`id_task`) REFERENCES `tasks`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `log_solve` ADD CONSTRAINT `log_solve_id_user_fkey` FOREIGN KEY (`id_user`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
