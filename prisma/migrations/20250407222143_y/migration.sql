/*
  Warnings:

  - You are about to drop the `Post` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Post";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "Ticher" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "accountId" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "skills" TEXT NOT NULL DEFAULT '',
    "reting" INTEGER NOT NULL DEFAULT 0,
    CONSTRAINT "Ticher_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Session" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "descriptions" TEXT,
    "price" REAL NOT NULL DEFAULT 0,
    "duration" INTEGER,
    "authorId" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "Videos" TEXT NOT NULL DEFAULT '[]',
    CONSTRAINT "Session_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "Ticher" ("accountId") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_UserLikedSessions" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_UserLikedSessions_A_fkey" FOREIGN KEY ("A") REFERENCES "Session" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_UserLikedSessions_B_fkey" FOREIGN KEY ("B") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

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
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "birthday" DATETIME
);
INSERT INTO "new_User" ("email", "id", "name", "password") SELECT "email", "id", "name", "password" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "Ticher_accountId_key" ON "Ticher"("accountId");

-- CreateIndex
CREATE UNIQUE INDEX "_UserLikedSessions_AB_unique" ON "_UserLikedSessions"("A", "B");

-- CreateIndex
CREATE INDEX "_UserLikedSessions_B_index" ON "_UserLikedSessions"("B");
