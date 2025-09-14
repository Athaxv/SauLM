/*
  Warnings:

  - You are about to drop the column `accessTokenExpiresAt` on the `account` table. All the data in the column will be lost.
  - You are about to drop the column `accountId` on the `account` table. All the data in the column will be lost.
  - You are about to drop the column `password` on the `account` table. All the data in the column will be lost.
  - You are about to drop the column `providerId` on the `account` table. All the data in the column will be lost.
  - You are about to drop the column `refreshTokenExpiresAt` on the `account` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[provider,providerAccountId]` on the table `account` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `updatedAt` to the `ChatSession` table without a default value. This is not possible if the table is not empty.
  - Added the required column `provider` to the `account` table without a default value. This is not possible if the table is not empty.
  - Added the required column `providerAccountId` to the `account` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `account` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."ChatSession" DROP CONSTRAINT "ChatSession_documentId_fkey";

-- DropForeignKey
ALTER TABLE "public"."ChatSession" DROP CONSTRAINT "ChatSession_userId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Document" DROP CONSTRAINT "Document_userId_fkey";

-- AlterTable
ALTER TABLE "public"."ChatSession" ADD COLUMN     "title" TEXT,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "documentId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "public"."account" DROP COLUMN "accessTokenExpiresAt",
DROP COLUMN "accountId",
DROP COLUMN "password",
DROP COLUMN "providerId",
DROP COLUMN "refreshTokenExpiresAt",
ADD COLUMN     "expiresAt" INTEGER,
ADD COLUMN     "provider" TEXT NOT NULL,
ADD COLUMN     "providerAccountId" TEXT NOT NULL,
ADD COLUMN     "session_state" TEXT,
ADD COLUMN     "tokenType" TEXT,
ADD COLUMN     "type" TEXT NOT NULL;

-- CreateIndex
CREATE INDEX "ChatSession_userId_createdAt_idx" ON "public"."ChatSession"("userId", "createdAt");

-- CreateIndex
CREATE INDEX "Document_userId_idx" ON "public"."Document"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "account_provider_providerAccountId_key" ON "public"."account"("provider", "providerAccountId");

-- AddForeignKey
ALTER TABLE "public"."Document" ADD CONSTRAINT "Document_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ChatSession" ADD CONSTRAINT "ChatSession_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ChatSession" ADD CONSTRAINT "ChatSession_documentId_fkey" FOREIGN KEY ("documentId") REFERENCES "public"."Document"("id") ON DELETE SET NULL ON UPDATE CASCADE;
