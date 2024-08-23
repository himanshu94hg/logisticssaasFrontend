import React, { useState } from 'react';
import './ManageSubAccount.css';
import { Button, Form } from 'react-bootstrap';
import AddSubAccount from './AddSubAccount';

const ManageSubAccount = () => {
  const [AddAccount, setAddAccount] = useState(false);

  const [subAccounts, setSubAccounts] = useState([
    {
      name: 'John Doe',
      email: 'john@example.com',
      password: '********',
      status: 'Active',
      verificationStatus: 'Verified',
      channels: 'Email, SMS',
      walletBalance: '$100.00',
    },
    {
      name: 'Jane Smith',
      email: 'jane@example.com',
      password: '********',
      status: 'Inactive',
      verificationStatus: 'Pending',
      channels: 'Email',
      walletBalance: '$50.00',
    },
  ]);

  const handleAddAccount = () => {
    setAddAccount(!AddAccount);
  };

  const addNewSubAccount = (formData) => {
    setSubAccounts([...subAccounts, formData]);
    setAddAccount(false); // Close the form after submission
  };

  const toggleStatus = (index) => {
    setSubAccounts(prevAccounts =>
      prevAccounts.map((account, i) =>
        i === index
          ? { ...account, status: account.status === 'Active' ? 'Inactive' : 'Active' }
          : account
      )
    );
  };

  return (
    <>
      <div className='d-flex justify-content-between align-items-center'>
        <h4 className='mt-3 mb-2'>Manage Sub Accounts</h4>
        <Button onClick={handleAddAccount} className='btn main-button'>Add Sub Account</Button>
      </div>

      <div className='table-container'>
        <table className="w-100">
          <thead>
            <tr className='table-row box-shadow'>
              <th>Subaccount Name</th>
              <th>Subaccount Email</th>
              <th>Password</th>
              <th>Verification Status</th>
              <th>Channels</th>
              <th>Wallet Balance</th>
              <th>Key</th>
              <th>Status</th>
            </tr>
            <tr className="blank-row"><td></td></tr>
          </thead>
          <tbody>
            {subAccounts.map((account, index) => (
              <React.Fragment key={index}>
                {index > 0 && <tr className="blank-row"><td></td></tr>}
                <tr className='table-row box-shadow'>
                  <td>{account.name}</td>
                  <td>{account.email}</td>
                  <td>{account.password}</td>
                  <td>{account.verificationStatus}</td>
                  <td>{account.channels}</td>
                  <td>{account.walletBalance}</td>
                  <td></td>
                  <td>
                    <Form.Check
                      type="switch"
                      id={`status-switch-${index}`}
                      label={account.status}
                      checked={account.status === 'Active'}
                      onChange={() => toggleStatus(index)}
                    />
                  </td>
                </tr>
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>

      {AddAccount && (
        <AddSubAccount
          addNewSubAccount={addNewSubAccount}
          handleClose={() => setAddAccount(false)}
        />
      )}
    </>
  );
}

export default ManageSubAccount;
