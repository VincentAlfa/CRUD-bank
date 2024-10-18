-- DropForeignKey
ALTER TABLE "BankAccount" DROP CONSTRAINT "BankAccount_user_id_fkey";

-- DropForeignKey
ALTER TABLE "Profiles" DROP CONSTRAINT "Profiles_user_id_fkey";

-- AddForeignKey
ALTER TABLE "BankAccount" ADD CONSTRAINT "BankAccount_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Profiles" ADD CONSTRAINT "Profiles_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
