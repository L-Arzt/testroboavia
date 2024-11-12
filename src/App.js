import React, { useEffect, useState } from 'react';
import ChatList from './components/ChatList/ChatList';
import ChatWindow from './components/ChatWindow/ChatWindow';
import ContactInfo from './components/ContactInfo/ContactInfo';
import './styles/App.css';

function App() {
  const [chats, setChats] = useState(() => {
    const savedChats = JSON.parse(localStorage.getItem('chats')) || [];
    return savedChats;
  });

  const [selectedChat, setSelectedChat] = useState(() => {
    const savedChats = JSON.parse(localStorage.getItem('chats')) || [];
    return savedChats.length > 0 ? savedChats[0] : null;
  });

  useEffect(() => {
    localStorage.setItem('chats', JSON.stringify(chats));
  }, [chats]);

  return (
    <div className="App">
      <ChatList chats={chats} setSelectedChat={setSelectedChat} setChats={setChats} selectedChat={selectedChat} />
      <div className="main-section">
        <ChatWindow selectedChat={selectedChat} chats={chats} setChats={setChats} />
        <ContactInfo selectedChat={selectedChat} />
      </div>
    </div>
  );
}

export default App;
