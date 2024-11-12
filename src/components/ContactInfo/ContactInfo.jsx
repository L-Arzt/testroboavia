import React from 'react';
import './ContactInfo.css';
import phone from '../../img/phone.png';
import like from '../../img/like.png';
import video from '../../img/video.png';

function ContactInfo({ selectedChat }) {
  if (!selectedChat) {
    return <p>Select a chat to see contact info</p>;
  }

  return (
    <div className={`contact-info ${selectedChat ? 'visible' : ''}`}>
      <div className='contact-text'>
        <img src={selectedChat.photo} alt={selectedChat.name} className="contact-photo-large" />
        <h2>{selectedChat.name}</h2>
      </div>
      <div className='contact-images'>
        <img src={phone} alt="phone" className="contact-img" />
        <img src={video} alt="video" className="contact-img" />
        <img src={like} alt="like" className="contact-img" />
      </div>
    </div>
  );
}

export default ContactInfo;
