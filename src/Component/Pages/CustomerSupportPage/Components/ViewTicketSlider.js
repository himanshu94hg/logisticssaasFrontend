import { faChevronRight, faEye } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react'
import AttachmentImage from '../../../../assets/image/AttachmentImage.jpg'
import { AiOutlineDownload } from "react-icons/ai";
import axios from 'axios';

const ViewTicketSlider = (props) => {

  const [ViewAttachmentContent, setViewAttachmentContent] = useState(false);
  const [allTicket, setAllTicket] = useState();
  const [newComment, setNewComment] = useState('');
  const [currentDate, setCurrentDate] = useState('');
  const [currentTime, setCurrentTime] = useState('');

  const comments = [
    { text: 'Hello! I am not able to create an Order', type: 'user' },
    { text: 'Hello! We apologize for the inconvenience.', type: 'support' },
    { text: 'Your Ticket has been registered with us and we are working on it.', type: 'support' },
  ];


  useEffect(() => {
    const fetchData = async () => {
      try {
        const hardcodedToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzA3NzM4NjMzLCJpYXQiOjE3MDcxMzM4MzMsImp0aSI6IjZhM2I5YWMwNDZjZjRkYjM4MWJlNGJjOWNmNWQ1NGQ1IiwidXNlcl9pZCI6Mn0.fHH4RQDMtVbC036iesCF9uX10Vmwc6VrAvpL2SSqgcY'
        const response = await axios.get(
          `http://65.2.38.87:8088/core-api/features/support-tickets/${props.viewId}/`,
          {
            headers: {
              Authorization: `Bearer ${hardcodedToken}`,
            },
          }
        );
        setAllTicket(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
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

    // Update date and time every second
    updateDateTime();

    fetchData();
  }, [props.viewId]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    try {
      const hardcodedToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzA3NzM4NjMzLCJpYXQiOjE3MDcxMzM4MzMsImp0aSI6IjZhM2I5YWMwNDZjZjRkYjM4MWJlNGJjOWNmNWQ1NGQ1IiwidXNlcl9pZCI6Mn0.fHH4RQDMtVbC036iesCF9uX10Vmwc6VrAvpL2SSqgcY';
      const response = await axios.post(
        'http://65.2.38.87:8088/core-api/features/ticket-comments/',
        {
          ticket: props.viewId,
          comment: newComment,
        },
        {
          headers: {
            Authorization: `Bearer ${hardcodedToken}`,
          },
        }
      );
      // Update the state to include the new comment
      setAllTicket(prevState => ({
        ...prevState,
        comments: [...prevState.comments, response.data], // Assuming the API returns the added comment object
      }));
      // Clear the new comment input field after submission
      setNewComment('');
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };


  return (
    <>
      <div
        id='sidepanel-closer'
        onClick={() => props.setViewTicketInfo(!props.ViewTicketInfo)}
      >
        <FontAwesomeIcon icon={faChevronRight} />
      </div>
      <section className='ticket-slider-header'>
        <h2 className='mb-0'>View Ticket : {allTicket?.id}</h2>
      </section>
      <section className='ticket-slider-body'>
        <div className='status-container mb-2'>
          <p>Status:</p>
          <p className='ticket-status ms-2'>{allTicket?.status}</p>
        </div>
        <section className='ticket-description'>
          {/* <div className='d-flex gap-2'>
            <p>Description:</p>
            <p className='fw-bold'>{allTicket?.description}</p>
          </div> */}
          <div className='ticket-view-field'>
            <div className='d-flex gap-2'>
              <p>Last Updated:</p>
              <p className='fw-bold'>{allTicket?.updated_at}</p>
            </div>
            <div className='d-flex gap-2'>
              <p>Due Date:</p>
              <p className='fw-bold'>{allTicket?.resolution_due_by}</p>
            </div>
          </div>
          <div className='ticket-view-field'>
            <div className='d-flex gap-2'>
              <p>Category:</p>
              <p className='fw-bold'>{allTicket?.category}</p>
            </div>
            <div className='d-flex gap-2'>
              <p>Subcategory:</p>
              <p className='fw-bold'>Issue with Direct orders</p>
            </div>
          </div>
          <div className='ticket-view-field'>
            <div className='d-flex gap-2'>
              <p>AWB(s):</p>
              <p className='fw-bold'>{allTicket?.awb_number}
                {/* <span className='fw-normal'>2 others</span> */}
              </p>
            </div>
            <div className='d-flex gap-2 align-items-center'>
              <p
                className='view-attachment'
                onClick={() => setViewAttachmentContent(!ViewAttachmentContent)}
              >
                <FontAwesomeIcon icon={faEye} /> View Attachment
              </p>
              <p title="Download Attachment" className='download'><AiOutlineDownload /></p>
            </div>
          </div>
        </section>
        <h4 className='mt-4'>Comments</h4>
        <section className='comments-section'>
          <div className="chat-container">
            {allTicket?.comments.map((comment, index) => (
              <div key={index} className={`comment-container ${comment.replied_by === 'replied_by' ? 'support-comment' : 'user-comment'}`}>
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
        <img src={`http://65.2.38.87:8088/media/ticket/${allTicket?.escalate_image}`} alt="" />
      </section>

      <div
        onClick={() => setViewAttachmentContent(!ViewAttachmentContent)}
        className={`backdrop ${ViewAttachmentContent ? 'd-block' : 'd-none'}`}></div>

    </>
  )
}

export default ViewTicketSlider