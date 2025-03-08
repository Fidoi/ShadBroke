/*
  Warnings:

  - You are about to drop the column `city` on the `OrderAddress` table. All the data in the column will be lost.
  - You are about to drop the column `countryId` on the `OrderAddress` table. All the data in the column will be lost.
  - You are about to drop the column `postalCode` on the `OrderAddress` table. All the data in the column will be lost.
  - You are about to drop the column `city` on the `UserAddress` table. All the data in the column will be lost.
  - You are about to drop the column `countryId` on the `UserAddress` table. All the data in the column will be lost.
  - You are about to drop the column `postalCode` on the `UserAddress` table. All the data in the column will be lost.
  - You are about to drop the `Country` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `comunaId` to the `OrderAddress` table without a default value. This is not possible if the table is not empty.
  - Added the required column `provinciaId` to the `OrderAddress` table without a default value. This is not possible if the table is not empty.
  - Added the required column `regionId` to the `OrderAddress` table without a default value. This is not possible if the table is not empty.
  - Added the required column `comunaId` to the `UserAddress` table without a default value. This is not possible if the table is not empty.
  - Added the required column `provinciaId` to the `UserAddress` table without a default value. This is not possible if the table is not empty.
  - Added the required column `regionId` to the `UserAddress` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "OrderAddress" DROP CONSTRAINT "OrderAddress_countryId_fkey";

-- DropForeignKey
ALTER TABLE "UserAddress" DROP CONSTRAINT "UserAddress_countryId_fkey";

-- AlterTable
ALTER TABLE "OrderAddress" DROP COLUMN "city",
DROP COLUMN "countryId",
DROP COLUMN "postalCode",
ADD COLUMN     "comunaId" INTEGER NOT NULL,
ADD COLUMN     "provinciaId" INTEGER NOT NULL,
ADD COLUMN     "regionId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "UserAddress" DROP COLUMN "city",
DROP COLUMN "countryId",
DROP COLUMN "postalCode",
ADD COLUMN     "comunaId" INTEGER NOT NULL,
ADD COLUMN     "provinciaId" INTEGER NOT NULL,
ADD COLUMN     "regionId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "Country";

-- CreateTable
CREATE TABLE "Region" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,

    CONSTRAINT "Region_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Provincia" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "regionId" INTEGER NOT NULL,

    CONSTRAINT "Provincia_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Comuna" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "provinciaId" INTEGER NOT NULL,

    CONSTRAINT "Comuna_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "UserAddress" ADD CONSTRAINT "UserAddress_regionId_fkey" FOREIGN KEY ("regionId") REFERENCES "Region"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserAddress" ADD CONSTRAINT "UserAddress_provinciaId_fkey" FOREIGN KEY ("provinciaId") REFERENCES "Provincia"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserAddress" ADD CONSTRAINT "UserAddress_comunaId_fkey" FOREIGN KEY ("comunaId") REFERENCES "Comuna"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderAddress" ADD CONSTRAINT "OrderAddress_regionId_fkey" FOREIGN KEY ("regionId") REFERENCES "Region"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderAddress" ADD CONSTRAINT "OrderAddress_provinciaId_fkey" FOREIGN KEY ("provinciaId") REFERENCES "Provincia"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderAddress" ADD CONSTRAINT "OrderAddress_comunaId_fkey" FOREIGN KEY ("comunaId") REFERENCES "Comuna"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Provincia" ADD CONSTRAINT "Provincia_regionId_fkey" FOREIGN KEY ("regionId") REFERENCES "Region"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comuna" ADD CONSTRAINT "Comuna_provinciaId_fkey" FOREIGN KEY ("provinciaId") REFERENCES "Provincia"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
