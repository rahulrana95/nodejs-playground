/*
  Warnings:

  - A unique constraint covering the columns `[username]` on the table `UserLogin` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "UserLogin_username_key" ON "UserLogin"("username");
