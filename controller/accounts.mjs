import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const createAccount = async (req, res) => {
  try {
    const { userId, bank_name, bank_account_number, balance } = req.body;

    const userExists = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!userExists) {
      return res.status(404).json({
        status: '404',
        message: 'User not found',
        data: null,
      });
    }

    const newAccount = await prisma.bankAccount.create({
      data: {
        user_id: userId,
        bank_name,
        bank_account_number,
        balance,
      },
    });

    return res.status(201).json({
      status: '201',
      message: 'Bank account created successfully',
      data: newAccount,
    });
  } catch (error) {
    return res.status(500).json({
      status: '500',
      message: 'Error creating bank account',
      error: error.message,
    });
  }
};

export const getAllAccounts = async (req, res) => {
  try {
    const accounts = await prisma.bankAccount.findMany();

    if (accounts.length === 0) {
      return res.status(404).json({
        status: '404',
        message: 'No accounts found',
        data: null,
      });
    }

    return res.status(200).json({
      status: '200',
      message: 'success',
      data: accounts,
    });
  } catch (error) {
    return res.status(500).json({
      status: '500',
      message: 'Error fetching accounts',
      error: error.message,
    });
  }
};

export const getAccountById = async (req, res) => {
  try {
    const accountId = parseInt(req.params.accountId);

    const account = await prisma.bankAccount.findUnique({
      where: { id: accountId },
    });

    if (!account) {
      return res.status(404).json({
        status: '404',
        message: 'Bank account not found',
        data: null,
      });
    }

    return res.status(200).json({
      status: '200',
      message: 'success',
      data: account,
    });
  } catch (error) {
    return res.status(500).json({
      status: '500',
      message: 'Error fetching bank account',
      error: error.message,
    });
  }
};

export const updateAccount = async (req, res) => {
  try {
    const accountId = parseInt(req.params.accountId);
    const { bank_name, bank_account_number, balance } = req.body;

    const accountExists = await prisma.bankAccount.findUnique({
      where: { id: accountId },
    });

    if (!accountExists) {
      return res.status(404).json({
        status: '404',
        message: 'Bank account not found',
        data: null,
      });
    }

    const updatedAccount = await prisma.bankAccount.update({
      where: { id: accountId },
      data: {
        bank_name,
        bank_account_number,
        balance,
      },
    });

    return res.status(200).json({
      status: '200',
      message: 'Bank account updated successfully',
      data: updatedAccount,
    });
  } catch (error) {
    return res.status(500).json({
      status: '500',
      message: 'Error updating bank account',
      error: error.message,
    });
  }
};

export const deleteAccount = async (req, res) => {
  try {
    const accountId = parseInt(req.params.accountId);

    const accountExists = await prisma.bankAccount.findUnique({
      where: { id: accountId },
    });

    if (!accountExists) {
      return res.status(404).json({
        status: '404',
        message: 'Bank account not found',
        data: null,
      });
    }

    await prisma.bankAccount.delete({
      where: { id: accountId },
    });

    return res.status(200).json({
      status: '200',
      message: 'Bank account deleted successfully',
      data: null,
    });
  } catch (error) {
    return res.status(500).json({
      status: '500',
      message: 'Error deleting bank account',
      error: error.message,
    });
  }
};
