-- CreateTable
CREATE TABLE "notes" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "annotation" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "notes_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "notes_title_key" ON "notes"("title");

-- CreateIndex
CREATE UNIQUE INDEX "notes_userId_title_key" ON "notes"("userId", "title");

-- AddForeignKey
ALTER TABLE "notes" ADD CONSTRAINT "notes_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
