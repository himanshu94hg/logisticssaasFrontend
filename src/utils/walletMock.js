import { DUMMY_SELLER_PROFILE, DUMMY_WALLET_BALANCE } from '../mockData/dashboardDummyData';

export const MOCK_WALLET_STORAGE_KEY = 'shipease_mock_wallet_balance';

export function isWalletMockMode() {
  if (process.env.REACT_APP_WALLET_DUMMY_FLOW === 'false') {
    return false;
  }
  return (
    process.env.REACT_APP_WALLET_DUMMY_FLOW === 'true' ||
    process.env.REACT_APP_BYPASS_LOGIN === 'true' ||
    process.env.NODE_ENV === 'development'
  );
}

export function readMockWalletBalance() {
  try {
    const raw = localStorage.getItem(MOCK_WALLET_STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed && parsed.balance != null) {
        return {
          balance: Number(parsed.balance),
          tolerance_limit:
            parsed.tolerance_limit ?? DUMMY_WALLET_BALANCE.tolerance_limit,
        };
      }
    }
  } catch {
    /* use default */
  }
  return { ...DUMMY_WALLET_BALANCE };
}

export function writeMockWalletBalance(wallet) {
  localStorage.setItem(
    MOCK_WALLET_STORAGE_KEY,
    JSON.stringify({
      balance: Number(wallet.balance),
      tolerance_limit: wallet.tolerance_limit ?? DUMMY_WALLET_BALANCE.tolerance_limit,
    })
  );
}

export function applyMockRechargeAmount(amount) {
  const current = readMockWalletBalance();
  const next = {
    ...current,
    balance: Number(current.balance) + Number(amount),
  };
  writeMockWalletBalance(next);
  return next;
}

export { DUMMY_SELLER_PROFILE };
