-- CreateTable
CREATE TABLE "public"."Verification" (
    "id" TEXT NOT NULL,
    "identifier" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Verification_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Verification_token_key" ON "public"."Verification"("token");

-- CreateIndex
CREATE UNIQUE INDEX "Verification_identifier_token_key" ON "public"."Verification"("identifier", "token");
