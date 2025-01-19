import React, { useState, useEffect, useRef } from 'react';
import { generateTrumpResponse } from './lib/cohere';
import { ChatMessage } from './components/ChatMessage';
import { ChatInput } from './components/ChatInput';
import { MessageSquare, Trash2, Share2, Quote } from 'lucide-react';
import type { Message } from './types';
import { LoadingScreen } from './components/LoadingScreen';
import { TRUMP_STICKERS, TRUMP_QUOTES } from './lib/constants';

function App() {
  const [messages, setMessages] = useState<Message[]>(() => {
    const saved = localStorage.getItem('chat-messages');
    return saved ? JSON.parse(saved) : [{
      role: 'assistant',
      content: "Tremendous greeting, folks! The most amazing Trump is here, believe me. Nobody does chatting better than me, ask me anything!"
    }];
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showWelcome, setShowWelcome] = useState(true);
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [currentStickerIndex, setCurrentStickerIndex] = useState(0);
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const stickerInterval = setInterval(() => {
      setCurrentStickerIndex((prev) => (prev + 1) % TRUMP_STICKERS.length);
    }, 3000);

    const quoteInterval = setInterval(() => {
      setCurrentQuoteIndex((prev) => (prev + 1) % TRUMP_QUOTES.length);
    }, 5000);

    return () => {
      clearInterval(stickerInterval);
      clearInterval(quoteInterval);
    };
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setIsInitialLoading(false);
    }, 3000);
  }, []);

  useEffect(() => {
    localStorage.setItem('chat-messages', JSON.stringify(messages));
  }, [messages]);

  const handleSendMessage = async (content: string) => {
    const userMessage: Message = { role: 'user', content };
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const response = await generateTrumpResponse(content);
      const assistantMessage: Message = { role: 'assistant', content: response };
      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const clearChat = () => {
    setMessages([{
      role: 'assistant',
      content: "Tremendous greeting, folks! The most amazing Trump is here, believe me. Nobody does chatting better than me, ask me anything!"
    }]);
  };

  if (isInitialLoading) {
    return <LoadingScreen />;
  }

  return (
    <div className="flex h-screen bg-[#FED90F]">
      {showWelcome && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-[#FED90F] p-8 rounded-3xl border-8 border-black shadow-cartoon max-w-lg mx-4">
            <img
              src={TRUMP_STICKERS[currentStickerIndex]}
              alt="Trump Sticker"
              className="w-48 h-48 mx-auto mb-6 animate-float"
            />
            <h2 className="text-3xl font-bold text-center mb-4" style={{ 
              fontFamily: 'Comic Sans MS, cursive',
              textShadow: '2px 2px 0px #000000',
              color: '#FF6B3D'
            }}>
              Welcome to Trump Persona!
            </h2>
            <p className="text-lg mb-6 text-center font-bold">
              The most tremendous, amazing, absolutely fantastic chatbot you've ever seen!
            </p>
            <button
              onClick={() => setShowWelcome(false)}
              className="w-full bg-[#FF6B3D] text-white py-4 rounded-xl font-bold text-lg border-4 border-black shadow-cartoon hover:bg-[#FF8B5D] transform hover:scale-105 transition-all"
              style={{ fontFamily: 'Comic Sans MS, cursive' }}
            >
              Let's Make Chat Great Again!
            </button>
          </div>
        </div>
      )}

      {/* Sidebar */}
      <div className="hidden md:flex w-[300px] bg-[#3C8CDE] text-white flex-col border-r-[6px] border-[#000000] shadow-cartoon">
        <div className="p-6">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-20 h-20 flex items-center justify-center transform hover:scale-110 transition-all">
              <img 
                src={TRUMP_STICKERS[currentStickerIndex]}
                alt="Trump Logo"
                className="w-full h-full object-contain animate-float"
              />
            </div>
            <h1 className="text-2xl font-bold" style={{ 
              textShadow: '2px 2px 0px #000000',
              fontFamily: 'Comic Sans MS, cursive' 
            }}>
              Trump Persona
            </h1>
          </div>
          <button 
            onClick={clearChat}
            className="w-full flex items-center gap-3 px-4 py-3 bg-[#FED90F] rounded-2xl hover:bg-[#FFE43D] transition-all transform hover:scale-105 border-4 border-black text-black font-bold shadow-cartoon mb-4"
          >
            <MessageSquare className="w-5 h-5" />
            <span>New Chat</span>
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 bg-[#FF6B3D] rounded-2xl hover:bg-[#FF8B5D] transition-all transform hover:scale-105 border-4 border-black text-white font-bold shadow-cartoon">
            <Share2 className="w-5 h-5" />
            <span>Share Chat</span>
          </button>
        </div>

        {/* Trump Quotes Section */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          <div className="bg-white/10 rounded-2xl p-4 border-4 border-black shadow-cartoon">
            <div className="flex items-center gap-2 mb-3">
              <Quote className="w-5 h-5 text-[#FED90F]" />
              <h3 className="font-bold text-[#FED90F]" style={{ fontFamily: 'Comic Sans MS, cursive' }}>
                Trump's Wisdom
              </h3>
            </div>
            <div className="animate-fadeIn">
              <p className="text-sm font-bold italic" style={{ fontFamily: 'Comic Sans MS, cursive' }}>
                "{TRUMP_QUOTES[currentQuoteIndex]}"
              </p>
            </div>
          </div>

          {/* Fun Facts */}
          <div className="bg-[#FF6B3D] rounded-2xl p-4 border-4 border-black shadow-cartoon">
            <h3 className="font-bold mb-2" style={{ fontFamily: 'Comic Sans MS, cursive' }}>
              Did you know?
            </h3>
            <p className="text-sm">
              This AI was trained on thousands of Trump speeches and tweets to capture his unique style!
            </p>
          </div>
          <div className="bg-[#FED90F] text-black rounded-2xl p-4 border-4 border-black shadow-cartoon">
            <h3 className="font-bold mb-2" style={{ fontFamily: 'Comic Sans MS, cursive' }}>
              Pro Tip
            </h3>
            <p className="text-sm">
              Try asking about the wall, trade deals, or "making America great again"!
            </p>
          </div>
          <div className="bg-white/10 rounded-2xl p-4 border-4 border-black shadow-cartoon">
            <h3 className="font-bold mb-2" style={{ fontFamily: 'Comic Sans MS, cursive' }}>
              Trump Topics
            </h3>
            <div className="flex flex-wrap gap-2">
              {['The Wall', 'Economy', 'Trade Deals', 'America First', 'Fake News'].map((topic) => (
                <span key={topic} className="px-3 py-1 bg-[#FED90F] text-black rounded-full text-sm font-bold border-2 border-black">
                  {topic}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main chat area */}
      <div className="flex-1 flex flex-col bg-[#FFE43D]">
        {/* Header */}
        <header className="h-20 border-b-4 border-black bg-[#3C8CDE] flex items-center px-6 justify-between">
          <div className="flex items-center gap-4">
            <img
              src={TRUMP_STICKERS[currentStickerIndex]}
              alt="Trump Header"
              className="w-12 h-12 object-contain animate-float md:hidden"
            />
            <h2 className="text-2xl font-bold text-white" style={{ 
              textShadow: '2px 2px 0px #000000',
              fontFamily: 'Comic Sans MS, cursive'
            }}>
              Chat with Trump Persona
            </h2>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={clearChat}
              className="md:hidden p-2 text-white hover:text-[#FED90F] transition-colors"
            >
              <Trash2 className="w-6 h-6" />
            </button>
            <div className="flex items-center gap-4">
              {/* Social Links with Descriptions */}
              <div className="flex items-center gap-6">
                {/* X.com */}
                <div className="flex items-center gap-2">
                  <a
                    href="https://x.com/TrumpPersona"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-10 h-10 bg-[#FED90F] rounded-xl border-4 border-black shadow-cartoon hover:bg-white transition-all transform hover:scale-110"
                  >
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" fill="black"/>
                    </svg>
                  </a>
                  <span className="text-[#FED90F] text-sm font-bold">
                    Join the online sensation!
                  </span>
                </div>
                
                {/* GitHub */}
                <div className="flex items-center gap-2">
                  <a
                    href="https://github.com/TrumpPersonaAI/Trump-Persona-AI"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-10 h-10 bg-[#FED90F] rounded-xl border-4 border-black shadow-cartoon hover:bg-white transition-all transform hover:scale-110"
                  >
                    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z" fill="black"/>
                    </svg>
                  </a>
                  <span className="text-[#FED90F] text-sm font-bold">
                    Star the repository!
                  </span>
                </div>
                
                {/* Docs */}
                <div className="flex items-center gap-2">
                  <a
                    href="https://trump-persona-ai.gitbook.io/trump-persona-ai/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-10 h-10 bg-[#FED90F] rounded-xl border-4 border-black shadow-cartoon hover:bg-white transition-all transform hover:scale-110"
                  >
                    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M6 2h9a2 2 0 012 2v16a2 2 0 01-2 2H6a2 2 0 01-2-2V4a2 2 0 012-2z" stroke="black" strokeWidth="2" strokeLinecap="round"/>
                      <path d="M9 7h6M9 11h6M9 15h4" stroke="black" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                  </a>
                  <span className="text-[#FED90F] text-sm font-bold">
                    Read the docs!
                  </span>
                </div>

                <div className="flex items-center gap-2 bg-[#FED90F] px-4 py-2 rounded-xl border-4 border-black shadow-cartoon">
                  <div className="h-3 w-3 rounded-full bg-[#3C8CDE] animate-pulse" />
                  <span className="text-sm font-bold">Online</span>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto">
          <div className="max-w-4xl mx-auto py-8 px-6">
            {messages.map((message, index) => (
              <div key={index} className="mb-6 animate-fadeIn">
                <ChatMessage message={message} />
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-center py-4">
                <div className="flex gap-2">
                  <div className="w-4 h-4 rounded-full bg-[#3C8CDE] animate-bounce border-2 border-black" />
                  <div className="w-4 h-4 rounded-full bg-[#FED90F] animate-bounce [animation-delay:0.2s] border-2 border-black" />
                  <div className="w-4 h-4 rounded-full bg-[#FF6B3D] animate-bounce [animation-delay:0.4s] border-2 border-black" />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Input area */}
        <div className="border-t-[6px] border-black bg-[#3C8CDE] p-6">
          <div className="max-w-4xl mx-auto">
            <ChatInput onSend={handleSendMessage} disabled={isLoading} />
            <div className="mt-3 text-center">
              <span className="inline-block bg-[#FED90F] text-black text-xs font-bold px-4 py-2 rounded-xl border-4 border-black shadow-cartoon">
                Powered by Trump Persona • Making Chat Great Again!
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;