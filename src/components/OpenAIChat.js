import React, { useState } from 'react';
import axios from "axios";
import './ChatGPTStyle.css';  // Import the CSS file
import drpepeailogo from '../assets/drpepeai-logo.svg'

const OpenAIChat = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [input, setInput] = useState("");
  const [response, setResponse] = useState("");
  const [messages, setMessages] = useState([]);
  const [chatHistory, setChatHistory] = useState([]); // State for storing previous chats
  const [selectedChat, setSelectedChat] = useState(null); // Track selected chat . 

  // Toggle the sidebar open/close
  const toggleNav = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  const handleSend = async () => {
    const userMessage = { role: "user", content: input };
    setMessages([...messages, userMessage]);

    try {
      const res = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        {
          model: "o1-mini",
          messages: [...messages, userMessage],
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer REACT_APP_OPENAI_API_KEY`, 
          },
        }
      );

      const botMessage = { role: "assistant", content: res.data.choices[0].message.content };
      setMessages([...messages, userMessage, botMessage]);

      // Save the conversation to the chat history
      setChatHistory([...chatHistory, { id: chatHistory.length + 1, messages: [...messages, userMessage, botMessage] }]);

      setInput(""); // Clear input after sending
    } catch (error) {
      console.error("Error calling OpenAI API", error);
      setResponse("Something went wrong. Please try again.");
    }
  };

    // Load selected chat from the history
    const handleChatSelect = (chatId) => {
      const selected = chatHistory.find((chat) => chat.id === chatId);
      setMessages(selected.messages);
      setSelectedChat(chatId);
    };

  return (
    <div>
      {/* Sidebar */}
      <div className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
      <div className="panel-header">
          <h3>Previous Chats</h3>
        </div>
        <div className="chat-history">
          {chatHistory.map((chat) => (
            <div
              key={chat.id}
              className={`chat-item ${selectedChat === chat.id ? 'selected' : ''}`}
              onClick={() => handleChatSelect(chat.id)}
            >
              Chat {chat.id}
            </div>
          ))}
        </div>
   
      </div>

      {/* Open Button - Always Visible */}
      <button
        onClick={toggleNav}
        className="open-btn"
      >
        ☰ {/* Button to open and close the sidebar */}
      </button>

      {/* Main Content */}
      <div className={`main-content ${isSidebarOpen ? 'shifted' : ''}`}>

        <div className="message-container">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`message ${msg.role === "user" ? "user-message" : "bot-message"}`}
            >
              <div className='image-assistant-container'>
                {msg.role === "assistant" && (
                  <img src={drpepeailogo} height={28} width={28} alt="drpepe logo" className='image-assistant' />
                )}
                <p>{msg.content}</p>
              </div>
            </div>
          ))}
        </div>

     
        <div className={`input-container ${isSidebarOpen ? 'shifted' : ''}`}>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask something..."
            rows={3}
            className="input-box"
          />
          <div className="input-buttons-container">

            <button onClick={handleSend} className="send-button">
              S
            </button>
          </div>
          <div className='copy-bottom'> DrPepe.Ai may make mistakes. Please consider verifying important information.</div>

        </div>
      </div>
    </div>
  );
};

export default OpenAIChat;
