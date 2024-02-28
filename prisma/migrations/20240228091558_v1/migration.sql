-- CreateTable
CREATE TABLE "UserLogin" (
    "id" VARCHAR(200) NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdOn" TIMESTAMP(3) NOT NULL,
    "lastUpdatedOn" TIMESTAMP(3) NOT NULL,
    "isGmailLogin" BOOLEAN NOT NULL,
    "isFacebookLogin" BOOLEAN NOT NULL,

    CONSTRAINT "UserLogin_pkey" PRIMARY KEY ("id")
);
