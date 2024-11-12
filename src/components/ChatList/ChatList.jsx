import React, { useState } from 'react';
import './ChatList.css';
import people1 from '../../img/1people.png';
import people2 from '../../img/2people.png';
import people3 from '../../img/3people.png';
import people4 from '../../img/4people.png';

import plus from '../../img/plus.png';

const contacts = [
  { name: 'Contact 1', photo: people1 },
  { name: 'Contact 2', photo: people2 },
  { name: 'Contact 3', photo: people3 },
  { name: 'Contact 4', photo: people4 },
  { name: 'Contact 5', photo: people1 },
  { name: 'Contact 6', photo: people2 },
  { name: 'Contact 7', photo: people3 },
  { name: 'Contact 8', photo: people4 },
  { name: 'Contact 9', photo: people1 },
  { name: 'Contact 10', photo: people2 },
];

function ChatList({ chats, setSelectedChat, setChats, selectedChat }) {
  const [showModal, setShowModal] = useState(false);

  const handleChatClick = (chat) => setSelectedChat(chat);

  const handleAddChat = (contact) => {
    const existingChat = chats.find(chat => chat.name === contact.name);
    if (existingChat) {
      setSelectedChat(existingChat);
    } else {
      const newChat = { id: Date.now(), name: contact.name, photo: contact.photo, messages: [] };
      setChats([newChat, ...chats]);
      setSelectedChat(newChat);
    }
    setShowModal(false);
  };

  const sortedChats = chats.sort((a, b) =>
    new Date(b.messages[b.messages.length - 1]?.date) - new Date(a.messages[a.messages.length - 1]?.date)
  );

  return (
    <div className="chat-list">
      <div className='chat-list-button'>
         <a href='#'> <img onClick={() => setShowModal(true)} className='chat-img-plus' src={plus}></img> </a> 
      </div>
   
      {showModal && (
        <div className="modal">
          <div className='modalHead'>
         
          <h3>Choose contact</h3> 
          <button className="close-modal" onClick={() => setShowModal(false)}>×</button>
          </div>
          {contacts.map(contact => (
            <div key={contact.name} onClick={() => handleAddChat(contact)} className="contact-item">
              <img src={contact.photo} alt={contact.name} className="contact-photo" />
              {contact.name}
            </div>
          ))}
        </div>
      )}
      {sortedChats.map(chat => (
        <div key={chat.id} onClick={() => handleChatClick(chat)} className={`chat ${chat === selectedChat ? 'selected' : ''}`}>
 <div className='chat-item'>
          <img src={chat.photo} alt={chat.name} className="chat-photo" />   
         <div className='chat-text'>
          {chat.name}
          {chat.messages.length > 0 && (
           <div className="last-message">
             {chat.messages[chat.messages.length - 1].text.substring(0, 15)}...
              <div className="message-date">{
              new Date(chat.messages[chat.messages.length - 1].date).toLocaleTimeString()}

              </div>
            </div>
             
           
          )}
          </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ChatList;
