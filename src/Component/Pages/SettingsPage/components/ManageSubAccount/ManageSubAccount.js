import React, { useState } from 'react';
import './ManageSubAccount.css';
import { Button, Form } from 'react-bootstrap';
import AddSubAccount from './AddSubAccount';
import UnicommerceIcon from '../../../../../assets/image/integration/UnicommerceIcon.png'
import AmazonLogo from '../../../../../assets/image/integration/AmazonLogo1.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy } from '@fortawesome/free-regular-svg-icons';
import { IoWalletOutline } from "react-icons/io5";
import { RiMailSendLine } from "react-icons/ri";
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { BiError } from "react-icons/bi";
import { MdOutlineVerified } from "react-icons/md";

const ManageSubAccount = () => {
  const [AddAccount, setAddAccount] = useState(false);
  const [subAccounts, setSubAccounts] = useState([
    {
      name: 'John Doe',
      email: 'john@example.com',
      password: 'abc123456789',
      status: 'Active',
      verificationStatus: true,
      channels: ['amazon', 'unicommerce'],
      apiKey: 'djasjhdvakljsdbklJDQK',

      walletBalance: '100.00',
    },
    {
      name: 'Jane Smith',
      email: 'jane@example.com',
      password: 'abc12',
      status: 'Inactive',
      verificationStatus: false,
      channels: ['amazon', 'unicommerce'],
      apiKey: 'djasjhdvakljsdbklJDQK',
      walletBalance: '50.00',
    },
  ]);

  const [copiedText, setCopiedText] = useState('');

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

  const [ds, setDs] = useState(null)

  const handleCopy = (text, index) => {
    setDs(index)
    setCopiedText(text)
    setTimeout(() => {
      setCopiedText('')
      setDs(false)
    }, 1500);
  }

  const sendEmail = (username, email, password) => {
    const subject = `New User Registration: ${username}`;
    const body = `Hello,\n\nPlease find the user details below:\n\nUsername: ${username}\nEmail: ${email}\nPassword: ${password}\n\nThank you.`;
    const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoLink
  }

  return (
    <section className='manage-sub-accounts'>
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
              <th style={{ width: '10%' }}>Status</th>
              <th>Action</th>
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
                  <td>
                    <div className='d-flex gap-2 align-items-center'>
                      <span style={{ height: '14px' }}>**********</span>
                      <CopyToClipboard text={account.password} onCopy={() => handleCopy(account.password, index)}>
                        <button title='Click to Copy Password' className='btn p-0 position-relative'><FontAwesomeIcon icon={faCopy} className='font20' />
                          {(index === ds && copiedText === account.password) &&
                            <span className='copied-text'>Copied!</span>
                          }
                        </button>
                      </CopyToClipboard>
                    </div>
                  </td>
                  <td>
                    {account.verificationStatus ?
                      <>
                        <MdOutlineVerified className='font20 text-success' /> Verified
                      </>
                      :
                      <>
                        <BiError className='font20 text-danger' /> Pending
                      </>
                    }
                  </td>
                  <td>
                    <div className='channel-list'>
                      <div>
                        <img src={UnicommerceIcon} alt="" width={30} title='Unicommerce' />
                      </div>
                      <div>
                        <img src={AmazonLogo} alt="" width={30} title='Amazon' />
                      </div>
                    </div>
                  </td>
                  <td><IoWalletOutline className='font20 fw-bold' style={{ verticalAlign: '-4px' }} /> &#x20b9;{account.walletBalance}</td>
                  <td>
                    <CopyToClipboard text={account.apiKey} onCopy={() => handleCopy(account.apiKey, index)}>
                      <button title='Click to Copy API Key' className='btn p-0 ms-2 position-relative'><FontAwesomeIcon icon={faCopy} className='font20' />
                        {(index === ds && copiedText === account.apiKey) &&
                          <span className='copied-text'>Copied!</span>
                        }
                      </button>
                    </CopyToClipboard>
                  </td>
                  <td>
                    <Form.Check
                      type="switch"
                      id={`status-switch-${index}`}
                      label={account.status}
                      checked={account.status === 'Active'}
                      onChange={() => toggleStatus(index)}
                    />
                  </td>
                  <td>
                    <button onClick={() => sendEmail(account.name, account.email, account.password)} className='btn p-0'>
                      <RiMailSendLine className='font20' />
                    </button>
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
    </section>
  );
}

export default ManageSubAccount;
