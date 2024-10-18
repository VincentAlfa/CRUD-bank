import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const users = await Promise.all([
    prisma.user.create({
      data: {
        name: 'John Doe',
        email: 'johndoe1@example.com',
        password: 'password123',
        profile: {
          create: {
            identity_type: 'KTP',
            identity_number: '123456789',
            address: '123 Main St',
          },
        },
        bankAccounts: {
          create: [
            {
              bank_name: 'Bank A',
              bank_account_number: '111111',
              balance: 5000,
            },
            {
              bank_name: 'Bank B',
              bank_account_number: '222222',
              balance: 7000,
            },
            {
              bank_name: 'Bank C',
              bank_account_number: '333333',
              balance: 10000,
            },
          ],
        },
      },
    }),
    prisma.user.create({
      data: {
        name: 'Jane Smith',
        email: 'janesmith2@example.com',
        password: 'password456',
        profile: {
          create: {
            identity_type: 'Passport',
            identity_number: '987654321',
            address: '456 Oak St',
          },
        },
        bankAccounts: {
          create: [
            {
              bank_name: 'Bank D',
              bank_account_number: '444444',
              balance: 12000,
            },
            {
              bank_name: 'Bank E',
              bank_account_number: '555555',
              balance: 14000,
            },
            {
              bank_name: 'Bank F',
              bank_account_number: '666666',
              balance: 9000,
            },
          ],
        },
      },
    }),
    prisma.user.create({
      data: {
        name: 'Alice Johnson',
        email: 'alicejohnson@example.com',
        password: 'password789',
        profile: {
          create: {
            identity_type: 'KTP',
            identity_number: '1122334455',
            address: '789 Maple Ave',
          },
        },
        bankAccounts: {
          create: [
            {
              bank_name: 'Bank G',
              bank_account_number: '777777',
              balance: 8000,
            },
            {
              bank_name: 'Bank H',
              bank_account_number: '888888',
              balance: 6000,
            },
            {
              bank_name: 'Bank I',
              bank_account_number: '999999',
              balance: 11000,
            },
          ],
        },
      },
    }),
  ]);

  const transactions = await Promise.all([
    prisma.transactions.create({
      data: {
        source_account_id: 1,
        destination_account_id: 2,
        amount: 1000,
      },
    }),
    prisma.transactions.create({
      data: {
        source_account_id: 3,
        destination_account_id: 4,
        amount: 1500,
      },
    }),
    prisma.transactions.create({
      data: {
        source_account_id: 5,
        destination_account_id: 6,
        amount: 2000,
      },
    }),
  ]);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
