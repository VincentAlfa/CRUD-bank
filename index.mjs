import express from 'express';
import dotenv from 'dotenv';

import {
  createUserWithProfile,
  getUserById,
  getAllUser,
  deleteUserById,
  updateUserById,
} from './controller/user.mjs';
import {
  createAccount,
  deleteAccount,
  getAccountById,
  getAllAccounts,
  updateAccount,
} from './controller/accounts.mjs';
import {
  createTransaction,
  getAllTransactions,
  getTransactionById,
} from './controller/transaction.mjs';

const PORT = 3000;
const app = express();
dotenv.config();

app.use(express.json());

// Base endpoint
app.get('/', (req, res) => {
  res.status(200).json({
    msg: 'hello world',
  });
});

// User endpoints
app.get('/api/v1/users', getAllUser);
app.get('/api/v1/users/:userId', getUserById);
app.post('/api/v1/users', createUserWithProfile);
app.put('/api/v1/users/:userId', updateUserById);
app.delete('/api/v1/users/:userId', deleteUserById);

// Account endpoints
app.post('/api/v1/accounts', createAccount);
app.get('/api/v1/accounts', getAllAccounts);
app.get('/api/v1/accounts/:accountId', getAccountById);
app.put('/api/v1/accounts/:accountId', updateAccount);
app.delete('/api/v1/accounts/:accountId', deleteAccount);

// Transaction endpoints
app.post('/api/v1/transactions', createTransaction);
app.get('/api/v1/transactions', getAllTransactions);
app.get('/api/v1/transactions/:transactionId', getTransactionById);

// Start the server
app.listen(PORT, () => {
  console.log(`server running on http://localhost:${PORT}`);
});
