import React, { useEffect, useState } from 'react';
import './ManageSubAccount.css';
import { Button, Form, Modal } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IoWalletOutline } from "react-icons/io5";
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { BiError } from "react-icons/bi";
import { MdOutlineVerified } from "react-icons/md";
import Cookies from 'js-cookie';
import { BASE_URL_CORE } from '../../../../../axios/config';
import { customErrorFunction } from '../../../../../customFunction/errorHandling';
import axios from 'axios';
import { faEnvelopeOpen } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';

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
    }, 2000);
  }

  const sendEmail = (username, email, password) => {
    const subject = `New User Registration: ${username}`;
    const body = `Hello,\n\nPlease find the user details below:\n\nUser Name: ${username}\nEmail: ${email}\nPassword: ${password}\n\nThank you.`;
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

  const handleClose = () => {
    setAddAccount(false)
  }


  const [formData, setFormData] = useState({
    contact_number: '',
    email: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${BASE_URL_CORE}/core-api/seller/sub-account/`,
        formData,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      if (response.status === 201) {
        setRefresh(new Date())
        toast.success("Subaccount added successfully!")
        setFormData({
          contact_number: '',
          email: '',
        })
        handleClose()
      }
    } catch (error) {
      customErrorFunction(error)
      handleClose()
      setFormData({
        contact_number: '',
        email: '',
      })
    }
  };

  const handleKeyPress = (e) => {
    const allowedCharacters = /^[0-9\b.]+$/;
    const { name, value } = e.target;
    if (!allowedCharacters.test(e.key) && name === "contact_number") {
      e.preventDefault()
    }
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
                  <td>
                    <div className='d-flex flex-column'>
                      <p>{account?.seller?.email}</p>
                      <CopyToClipboard text={account.password} onCopy={() => handleCopy(account?.password, index)}>
                        <button title='Click to Copy Password' className='btn copy-password'>
                          {(index === ds && copiedText === account?.password) ? 'Password Copied!' : 'Copy Password'}
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
                      <div className='pending-status'>
                        <BiError className='font20' />
                        Pending
                      </div>
                    }
                  </td>
                  <td>
                    <div className='channel-list'>
                      {/* <div>
                        <img src={UnicommerceIcon} alt="" width={30} title='Unicommerce' />
                      </div>
                      <div>
                        <img src={AmazonLogo} alt="" width={30} title='Amazon' />
                      </div> */}
                    </div>
                  </td>
                  <td><IoWalletOutline className='font20 fw-bold' style={{ verticalAlign: '-4px' }} /> &#x20b9;{account?.seller?.balance}</td>
                  <td>
                    <CopyToClipboard text={account.apiKey} onCopy={() => handleCopy(account.apiKey, index)}>
                      <button title='Click to Copy API Key' className='btn copy-key'>
                        {(index === ds && copiedText === account.apiKey) ? 'Key Copied!' : 'Copy Key'}
                      </button>
                    </CopyToClipboard>
                  </td>
                  <td>
                    <Form.Check
                      type="switch"
                      label={account?.seller?.status ? "Active" : "Inactive"}
                      checked={account?.seller?.status}
                      onChange={() => toggleStatus(index)}
                    />
                  </td>
                  <td>
                    <button onClick={() => sendEmail(account.name, account?.seller?.email, account?.password)} className='btn email-btn'>
                      <FontAwesomeIcon icon={faEnvelopeOpen} />
                    </button>
                  </td>
                </tr>
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>

      {/* {AddAccount && (
        <AddSubAccount
          setRefresh={setRefresh}
          handleClose={() => setAddAccount(false)}
        />
      )} */}

      <Modal className='confirmation-modal add-user-pop' show={AddAccount} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className='d-flex flex-column gap-3'>
              <label>Contact Number
                <input
                  required
                  type='text'
                  maxLength={10}
                  name='contact_number'
                  onChange={handleChange}
                  className='input-field'
                  value={formData.contact_number}
                  onKeyPress={(e) => handleKeyPress(e)}
                />
              </label>

              <label>Subaccount Email
                <input
                  type='text'
                  name='email'
                  value={formData.email}
                  onChange={handleChange}
                  className='input-field'
                  maxLength={60}
                  onKeyDown={(e) => {
                    if (e.key === " " && e.target.value.endsWith(' ')) {
                      e.preventDefault()
                    }
                  }}
                />
              </label>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <div className=''>
            <div>
              {/* {errors && <div style={{ color: "red" }}>{errors}</div>} */}
            </div>
            <div className='d-flex gap-2 justify-content-end w-100'>
              <button
                className="btn cancel-button"
                onClick={handleClose}
              >
                Close
              </button>
              <button
                className="btn main-button"
                onClick={handleSubmit}
              >
                Save Changes
              </button>
            </div>
          </div>
        </Modal.Footer>
      </Modal>
    </section>
  );
}

export default ManageSubAccount;
