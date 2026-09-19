import React from 'react';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import ccAvenue from '../../../assets/image/logo/ccAvenue.png';
import './WalletMockCheckout.css';
import { indexPattern } from '../../../Routes';

const WalletMockCheckout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const amount = Number(location.state?.amount);
  const orderId = location.state?.orderId;

  const goHome = () => {
    sessionStorage.setItem('closeWalletPanel', '1');
    navigate(indexPattern);
  };

  const handleCancel = () => {
    toast.info('Recharge cancelled.');
    goHome();
  };

  const handleConfirm = () => {
    if (!Number.isFinite(amount) || amount <= 0) {
      toast.error('Invalid recharge amount.');
      goHome();
      return;
    }

    dispatch({
      type: 'PAYMENT_SET_DATA_ACTION',
      payload: JSON.stringify({
        amount,
        description: 'Wallet Recharge (demo)',
        order_id: orderId,
        mock_ccavenue: true,
      }),
    });

    toast.success(`Demo recharge successful! ₹${amount.toLocaleString('en-IN')} added to your wallet.`);
    goHome();
  };

  if (!Number.isFinite(amount) || amount <= 0) {
    return (
      <div className="wallet-mock-checkout">
        <div className="wallet-mock-card">
          <p>Missing recharge amount.</p>
          <button type="button" className="btn main-button" onClick={goHome}>
            Back to app
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="wallet-mock-checkout">
      <div className="wallet-mock-card">
        <div className="wallet-mock-header">
          <img src={ccAvenue} alt="Payment gateway (demo)" height={28} />
          <span className="wallet-mock-badge">Demo checkout</span>
        </div>
        <h1 className="wallet-mock-title">Confirm wallet recharge</h1>
        <p className="wallet-mock-copy">
          This is a simulated payment step for local development. No real charge is made and CCAvenue is not
          contacted.
        </p>
        <dl className="wallet-mock-details">
          <div>
            <dt>Order reference</dt>
            <dd>{orderId || '—'}</dd>
          </div>
          <div>
            <dt>Amount</dt>
            <dd className="wallet-mock-amount">₹ {amount.toLocaleString('en-IN')}</dd>
          </div>
        </dl>
        <div className="wallet-mock-actions">
          <button type="button" className="btn cancel-button" onClick={handleCancel}>
            Cancel
          </button>
          <button type="button" className="btn main-button" onClick={handleConfirm}>
            Simulate successful payment
          </button>
        </div>
      </div>
    </div>
  );
};

export default WalletMockCheckout;
