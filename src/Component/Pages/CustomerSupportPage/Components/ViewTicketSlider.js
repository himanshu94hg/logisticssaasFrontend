import { faEye } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react'

const ViewTicketSlider = ({ }) => {

  const comments = [
    { text: 'Hello! I am not able to create an Order', type: 'user' },
    { text: 'Hello! We apologize for the inconvenience.', type: 'support' },
    { text: 'Your Ticket has been registered with us and we are working on it.', type: 'support' },
  ];


  return (
    <>
      <div className='status-container mb-2'>
        <p>Status:</p>
        <p className='ticket-status ms-2'>Open</p>
      </div>
      <section className='ticket-description'>
        <div className='d-flex gap-2'>
          <p>Description:</p>
          <p className='fw-bold'>Order not created</p>
        </div>
        <div className='ticket-view-field'>
          <div className='d-flex gap-2'>
            <p>Last Updated:</p>
            <p className='fw-bold'>2024-01-20</p>
          </div>
          <div className='d-flex gap-2'>
            <p>Due Date:</p>
            <p className='fw-bold'>2024-01-30</p>
          </div>
        </div>
        <div className='ticket-view-field'>
          <div className='d-flex gap-2'>
            <p>Category:</p>
            <p className='fw-bold'>Others</p>
          </div>
          <div className='d-flex gap-2'>
            <p>Subcategory:</p>
            <p className='fw-bold'>Issue with Direct orders</p>
          </div>
        </div>
        <div className='ticket-view-field'>
          <div className='d-flex gap-2'>
            <p>AWB(s):</p>
            <p className='fw-bold'>12132123123123,..<span className='fw-normal'>2 others</span></p>
          </div>
          <div className='d-flex gap-2'>
            <p><FontAwesomeIcon icon={faEye} /> View Attachment</p>
          </div>
        </div>
      </section>
      <h4 className='mt-4'>Comments</h4>
      <section className='comments-section'>
        <div className="chat-container">
          {comments.map((comment, index) => (
            <div key={index} className={comment.type === 'user' ? 'user-comment' : 'support-comment'}>
              {comment.text}
            </div>
          ))}
        </div>
        <div className='new-comment-input mt-4'>
          <form action="">
            <input className='input-field' placeholder='Add your Comment' type="text" />
            <button className='btn main-button ms-3'>Submit</button>
          </form>
        </div>
      </section>
    </>
  )
}

export default ViewTicketSlider