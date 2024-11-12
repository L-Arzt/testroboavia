import React, { useState, useEffect } from 'react';
import './ChatWindow.css';

import send from '../../img/send.png';

function ChatWindow({ selectedChat, chats, setChats }) {
  const [message, setMessage] = useState('');
  const [currentMessages, setCurrentMessages] = useState([]);

  useEffect(() => {
    if (selectedChat) {
      const savedMessages = JSON.parse(localStorage.getItem(`chat-${selectedChat.id}`)) || [];
      console.log(`Загруженные сообщения для выбранного чата ${selectedChat.id}:`, savedMessages);
      setCurrentMessages(savedMessages);
    }
  }, [selectedChat]);

  const handleSendMessage = () => {
    if (!selectedChat || !message) return;

    const newMessage = { text: message, date: new Date().toISOString() };
    const updatedMessages = [...currentMessages, newMessage];
    setCurrentMessages(updatedMessages);

    const updatedChats = chats.map(chat =>
      chat.id === selectedChat.id ? { ...chat, messages: updatedMessages } : chat
    );

    setChats(updatedChats);
    console.log('Отправляем сообщение:', newMessage);
    console.log('Обновленные чаты:', updatedChats);

    localStorage.setItem('chats', JSON.stringify(updatedChats));
    localStorage.setItem(`chat-${selectedChat.id}`, JSON.stringify(updatedMessages));
    setMessage('');
  };

  return (
    <div className="chat-window">
        <>
          <div className="messages">
            {currentMessages.sort((a, b) => new Date(a.date) - new Date(b.date)).map((msg, index) => (
              <div key={index} className="message">{msg.text}</div>
            ))}
          </div>

        <div className='message-input-block'>
                <input
                className='message-input'
                id='inputid'
                    type="text"
                    placeholder="Write Message..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                />

                <a href='#'><img className='messages-img' onClick={handleSendMessage} src={send}></img> </a> 
        </div>
     
        </>
      
    </div>
  );
}

export default ChatWindow;
