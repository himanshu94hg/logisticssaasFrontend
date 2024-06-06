import axios from 'axios';
import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react'
import { AiOutlineDownload } from "react-icons/ai";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight, faEye } from '@fortawesome/free-solid-svg-icons';
import moment from 'moment';
import Modal from "react-bootstrap/Modal";
import { Document, Page } from "react-pdf";
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import { BASE_URL_CORE } from '../../../../axios/config';


const ViewTicketSlider = ({ viewId, ViewTicketInfo, setViewTicketInfo, }) => {
  const [ViewAttachmentContent, setViewAttachmentContent] = useState(false);
  const [allTicket, setAllTicket] = useState();
  const [newComment, setNewComment] = useState('');
  const [currentDate, setCurrentDate] = useState('');
  const [currentTime, setCurrentTime] = useState('');
  const authToken = Cookies.get("access_token")
  const [fileType, setfileType] = useState('image')


  useEffect(() => {
    if (ViewTicketInfo) {
      axios.get(`${BASE_URL_CORE}/core-api/features/support-tickets/${viewId}/`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      })
        .then((response) => {
          setAllTicket(response.data);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }

    const updateDateTime = () => {
      const today = new Date();
      const day = today.getDate();
      const month = today.toLocaleString('default', { month: 'short' });
      const year = today.getFullYear();
      let hours = today.getHours();
      const minutes = today.getMinutes();
      const seconds = today.getSeconds();
      const ampm = hours >= 12 ? 'PM' : 'AM';
      hours = hours % 12;
      hours = hours ? hours : 12; // Handle midnight (0 hours)
      const formattedDate = `${day} ${month} ${year}`;
      const formattedTime = `${hours}:${minutes}${ampm}`;
      setCurrentTime(`${formattedTime}`);
      setCurrentDate(`${formattedDate}`);
    };
    updateDateTime();

  }, [ViewTicketInfo]);



  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${BASE_URL_CORE}/core-api/features/ticket-comments/`,
        {
          ticket: viewId,
          comment: newComment,
        },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      setAllTicket(prevState => ({
        ...prevState,
        comments: [...prevState?.comments, response?.data],
      }));
      setNewComment('');
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };
  function extractFileName(fullPath) {
    // Split the fullPath string by '/' to get an array of parts.
    const parts = fullPath.split('/');
    // Get the last part of the array, which should be the file name
    const fileName = parts[parts.length - 1];
    return fileName;
  }

  const [handelAWSImage, sethandelAWSImage] = useState("");
  const [previewImage, setPreviewImage] = useState("");
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = async (pdfUrl) => {
    try {
      sethandelAWSImage(pdfUrl)
      const response = await axios.get(pdfUrl, {
        responseType: 'blob'
      });
      const blob = new Blob([response.data], { type: 'application/pdf' });
      const objectUrl = URL.createObjectURL(blob);
      setShow(true);
      setPreviewImage(objectUrl);
    } catch (error) {
      console.error('Error fetching PDF:', error);
    }
  }

  console.log("handelAWSImage", handelAWSImage)
  return (
    <>
      <div
        id='sidepanel-closer'
        onClick={() => setViewTicketInfo(!ViewTicketInfo)}
      >
        <FontAwesomeIcon icon={faChevronRight} />
      </div>
      <section className='ticket-slider-header'>
        <h2 className='mb-0'>Ticket ID: {allTicket?.id}</h2>
      </section>
      <section className='ticket-slider-body'>
        <div className='status-container mb-2'>
          <p>Status:</p>
          <p className='ticket-status ms-2'>{allTicket?.status}</p>
        </div>
        <section className='ticket-description d-flex flex-column gap-2'>
          {/* <div className='d-flex gap-2'>
            <p>Description:</p>
            <p className='fw-bold'>{allTicket?.description}</p>
          </div> */}
          <div className='ticket-view-field'>
            <div className='d-flex gap-2'>
              <p>Last Updated:</p>
              <p className='fw-bold'>{moment(allTicket?.updated_at).format("DD MMM YYYY")}</p>
            </div>
            <div className='d-flex gap-2'>
              <p>Due Date:</p>
              <p className='fw-bold'>{moment(allTicket?.resolution_due_by).format("DD MMM YYYY")}</p>

            </div>
          </div>
          <div className='ticket-view-field flex-column gap-2'>
            <div className='d-flex gap-2'>
              <p>Category:</p>
              <p className='fw-bold'>{allTicket?.category}</p>
            </div>
            <div className='d-flex gap-2'>
              <p>Subcategory:</p>
              <p className='fw-bold'>{allTicket?.sub_category}</p>
            </div>
          </div>
          <div className='ticket-view-field'>
            <div className='d-flex gap-2'>
              <p>AWB(s):</p>
              <p className='fw-bold'>{allTicket?.awb_number}
                {/* <span className='fw-normal'>2 others</span> */}
              </p>
            </div>

            {allTicket?.escalate_image &&
              <div className='d-flex gap-2 align-items-center'>
                Attachment:
                <span
                  className='view-attachment'
                  onClick={() => {
                    handleShow(allTicket.escalate_image);
                  }}
                >
                  <FontAwesomeIcon icon={faEye} />
                </span>
                {allTicket && allTicket?.escalate_image && (
                  <a href={allTicket.escalate_image} download>
                    <AiOutlineDownload />
                  </a>
                )}
              </div>
            }

          </div>
        </section>
        <h4 className='mt-4'>Comments</h4>
        <section className='comments-section'>
          <div className="chat-container">
            {allTicket?.comments.map((comment, index) => (
              <div key={index} className={`comment-container ${comment.replied_by === 'You' ? 'user-comment' : 'support-comment'}`}>
                {comment.comment}
                <p className='text-gray'>{currentTime}, {currentDate}</p>
              </div>
            ))}
          </div>
          <div className='new-comment-input mt-4'>
            <form action="" onSubmit={handleCommentSubmit}>
              <input
                className='input-field'
                placeholder='Add your Comment'
                type="text"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
              />
              <button className='btn main-button ms-3'>Submit</button>
            </form>
          </div>
        </section>
      </section>

      <section className={`attachment-container ${ViewAttachmentContent ? 'd-block' : 'd-none'}`}>
        {allTicket && allTicket?.escalate_image && (
          <>
            {/\.(jpg|jpeg|png|gif|bmp|webp)$/i.test(allTicket?.escalate_image) ? (
              <img style={{ maxHeight: '80vh', height: 'auto', objectFit: 'contain' }} src={allTicket?.escalate_image} alt="AttachmentImage" />
            ) : (
              <div className='attachment-file-unsupported'>
                <h4>Couldn't preview file </h4>
                <p>File: <span className='font13'>{extractFileName(allTicket.escalate_image)}</span></p>
                <a href={allTicket.escalate_image} download onClick={() => setViewAttachmentContent(!ViewAttachmentContent)}>
                  Download File
                </a>
              </div>
            )}
          </>
        )}
      </section>

      <div
        onClick={() => setViewAttachmentContent(!ViewAttachmentContent)}
        className={`backdrop ${ViewAttachmentContent ? 'd-block' : 'd-none'}`}></div>

      <Preview show={show} setShow={setShow} handleClose={handleClose} handleShow={handleShow} previewImage={previewImage} handelAWSImage={handelAWSImage} />

    </>
  )
}

export default ViewTicketSlider

function Preview({ show, handleClose, previewImage, handelAWSImage }) {
  const isPDF = handelAWSImage && handelAWSImage.endsWith('.pdf');
  console.log(handelAWSImage, "Pdf")

  return (
    <Modal show={show} onHide={handleClose} size="md" style={{ width: '100%', height: '670px', overflow: 'hidden' }} centered>
      <Modal.Header closeButton>
        <Modal.Title>Image/PDF Preview</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {isPDF ? (
          <Document file={previewImage}>
            <Page pageNumber={1} width={400} />
          </Document>
        ) : (
          <img src={previewImage} alt="Preview" style={{ maxWidth: '100%', maxHeight: '100%' }} />
        )}
      </Modal.Body>
    </Modal>
  );
}