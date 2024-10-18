import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const createTransaction = async (req, res) => {
  try {
    const { source_account_id, destination_account_id, amount } = req.body;

    const sourceAccount = await prisma.bankAccount.findUnique({
      where: { id: source_account_id },
    });

    const destinationAccount = await prisma.bankAccount.findUnique({
      where: { id: destination_account_id },
    });

    if (!sourceAccount || !destinationAccount) {
      return res.status(404).json({
        status: '404',
        message: 'Source or Destination account not found',
        data: null,
      });
    }

    if (sourceAccount.balance < amount) {
      return res.status(400).json({
        status: '400',
        message: 'Insufficient balance in source account',
        data: null,
      });
    }

    const transaction = await prisma.transactions.create({
      data: {
        source_account_id,
        destination_account_id,
        amount,
      },
    });

    await prisma.bankAccount.update({
      where: { id: source_account_id },
      data: { balance: sourceAccount.balance - amount },
    });

    await prisma.bankAccount.update({
      where: { id: destination_account_id },
      data: { balance: destinationAccount.balance + amount },
    });

    return res.status(201).json({
      status: '201',
      message: 'Transaction completed successfully',
      data: transaction,
    });
  } catch (error) {
    return res.status(500).json({
      status: '500',
      message: 'Error creating transaction',
      error: error.message,
    });
  }
};

export const getAllTransactions = async (req, res) => {
  try {
    const transactions = await prisma.transactions.findMany();

    if (transactions.length === 0) {
      return res.status(404).json({
        status: '404',
        message: 'No transactions found',
        data: null,
      });
    }

    return res.status(200).json({
      status: '200',
      message: 'success',
      data: transactions,
    });
  } catch (error) {
    return res.status(500).json({
      status: '500',
      message: 'Error fetching transactions',
      error: error.message,
    });
  }
};

export const getTransactionById = async (req, res) => {
  try {
    const transactionId = parseInt(req.params.transactionId);
    const transaction = await prisma.transactions.findUnique({
      where: { id: transactionId },
      include: {
        sourceAccount: true,
        destinationAccount: true,
      },
    });

    if (!transaction) {
      return res.status(404).json({
        status: '404',
        message: 'Transaction not found',
        data: null,
      });
    }

    return res.status(200).json({
      status: '200',
      message: 'success',
      data: {
        transaction,
      },
    });
  } catch (error) {
    return res.status(500).json({
      status: '500',
      message: 'Error fetching transaction',
      error: error.message,
    });
  }
};
