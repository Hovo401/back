/*
  Warnings:

  - You are about to drop the column `Videos` on the `Session` table. All the data in the column will be lost.
  - You are about to drop the column `descriptions` on the `Session` table. All the data in the column will be lost.
  - You are about to drop the column `duration` on the `Session` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `Session` table. All the data in the column will be lost.
  - Added the required column `fullName` to the `Session` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Session" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "fullName" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "about" TEXT,
    "skills" TEXT,
    "experience" TEXT,
    "education" TEXT,
    "languages" TEXT,
    "price" REAL NOT NULL DEFAULT 0,
    "rating" INTEGER,
    "authorId" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "videoUrl" TEXT NOT NULL DEFAULT '[]',
    CONSTRAINT "Session_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "Ticher" ("accountId") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Session" ("authorId", "content", "createdAt", "id", "price", "updatedAt") SELECT "authorId", "content", "createdAt", "id", "price", "updatedAt" FROM "Session";
DROP TABLE "Session";
ALTER TABLE "new_Session" RENAME TO "Session";
CREATE UNIQUE INDEX "Session_fullName_key" ON "Session"("fullName");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
