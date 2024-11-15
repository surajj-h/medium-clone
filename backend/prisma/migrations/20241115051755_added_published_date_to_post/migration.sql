-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "publishedDate" TIMESTAMP(3) NOT NULL DEFAULT now();
