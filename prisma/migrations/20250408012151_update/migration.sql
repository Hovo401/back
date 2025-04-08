/*
  Warnings:

  - A unique constraint covering the columns `[title]` on the table `Session` will be added. If there are existing duplicate values, this will fail.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "roles" TEXT NOT NULL DEFAULT 'User',
    "gender" TEXT NOT NULL DEFAULT 'Neutrois',
    "age" INTEGER NOT NULL DEFAULT 0,
    "aboutMe" TEXT NOT NULL DEFAULT '',
    "blocked" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "birthday" DATETIME
);
INSERT INTO "new_User" ("aboutMe", "age", "birthday", "createdAt", "email", "gender", "id", "name", "password", "roles") SELECT "aboutMe", "age", "birthday", "createdAt", "email", "gender", "id", "name", "password", "roles" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "Session_title_key" ON "Session"("title");
