import React, { useEffect, useState } from 'react';
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
import Cookies from 'js-cookie';
import { BASE_URL_CORE } from '../../../../../axios/config';
import { customErrorFunction } from '../../../../../customFunction/errorHandling';
import axios from 'axios';

const ManageSubAccount = () => {
  const [ds, setDs] = useState(null)
  let authToken = Cookies.get("access_token")
  const [copiedText, setCopiedText] = useState('');
  const [AddAccount, setAddAccount] = useState(false);
  const [subAccounts, setSubAccounts] = useState([]);
  const [refresh, setRefresh] = useState(null);

  const handleAddAccount = () => {
    setAddAccount(!AddAccount);
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


  useEffect(() => {
    const fetchSku = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL_CORE}/core-api/seller/sub-account/`,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
              Authorization: `Bearer ${authToken}`,
            },
          }
        );
        if (response.status === 200) {
          setSubAccounts(response?.data?.results)
        }
      } catch (error) {
        customErrorFunction(error);
      }
    };
    fetchSku();
  }, [refresh]);

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
                  <td>{account?.seller?.company_name}</td>
                  <td>{account?.seller?.email}</td>
                  <td>
                    <div className='d-flex gap-2 align-items-center'>
                      <span style={{ height: '14px' }}>*********</span>
                      <CopyToClipboard text={account.password} onCopy={() => handleCopy(account?.password, index)}>
                        <button title='Click to Copy Password' className='btn p-0 position-relative'><FontAwesomeIcon icon={faCopy} className='font20' />
                          {(index === ds && copiedText === account?.password) &&
                            <span className='copied-text'>Copied!</span>
                          }
                        </button>
                      </CopyToClipboard>
                    </div>
                  </td>
                  <td>
                    {account?.seller?.is_verified ?
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
                  <td><IoWalletOutline className='font20 fw-bold' style={{ verticalAlign: '-4px' }} /> &#x20b9;{account?.seller?.balance}</td>
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
                      label={account?.seller?.status?"Active":"Inactive"}
                      checked={account?.seller?.status}
                      onChange={() => toggleStatus(index)}
                    />
                  </td>
                  <td>
                    <button onClick={() => sendEmail(account.name, account?.seller?.email, account?.password)} className='btn p-0'>
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
          setRefresh={setRefresh}
          handleClose={() => setAddAccount(false)}
        />
      )}
    </section>
  );
}

export default ManageSubAccount;
