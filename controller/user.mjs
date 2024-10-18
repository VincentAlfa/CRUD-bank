import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const getAllUser = async (req, res) => {
  const users = await prisma.user.findMany();
  if (!users || users.length === 0) {
    return res.status(404).json({
      status: '404',
      message: 'User not found',
      data: null,
    });
  }

  return res.status(200).json({
    status: '200',
    message: 'success',
    data: users,
  });
};

export const getUserById = async (req, res) => {
  const userId = parseInt(req.params.userId);
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (!user) {
    return res.status(404).json({
      status: '404',
      message: 'User not found',
      data: null,
    });
  }

  return res.status(200).json({
    status: '200',
    message: 'success',
    data: user,
  });
};

export const createUserWithProfile = async (req, res) => {
  try {
    const { name, email, password, profile } = req.body;

    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password,
        profile: {
          create: {
            identity_type: profile.identity_type,
            identity_number: profile.identity_number,
            address: profile.address,
          },
        },
      },
    });

    return res.status(201).json({
      status: '201',
      message: 'User created successfully',
      data: newUser,
    });
  } catch (error) {
    return res.status(500).json({
      status: '500',
      message: 'Error creating user',
      error: error.message,
    });
  }
};

export const updateUserById = async (req, res) => {
  try {
    const userId = parseInt(req.params.userId);
    const { name, email, password } = req.body;

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

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { name, email, password },
    });

    return res.status(200).json({
      status: '200',
      message: 'User updated successfully',
      data: updatedUser,
    });
  } catch (error) {
    return res.status(500).json({
      status: '500',
      message: 'Error updating user',
      error: error.message,
    });
  }
};

export const deleteUserById = async (req, res) => {
  try {
    const userId = parseInt(req.params.userId);
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

    await prisma.user.delete({
      where: { id: userId },
    });

    return res.status(200).json({
      status: '200',
      message: 'User deleted successfully',
    });
  } catch (error) {
    return res.status(500).json({
      status: '500',
      message: 'Error deleting user',
      error: error.message,
    });
  }
};
