
import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Bot } from 'lucide-react';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
}

const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, text: "Hi! I'm the QuantaNova AI assistant. How can I help you today?", sender: 'bot' }
  ]);
  const [inputText, setInputText] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const getBotResponse = (text: string): string => {
    const lowerText = text.toLowerCase();
    if (lowerText.includes('admission')) return "Admissions for 2026-27 are open. Please contact us via the contact form.";
    if (lowerText.includes('location')) return "We are in Pragathi Nagar, Hyderabad.";
    return "I'm here to help. You can ask about admissions, curriculum, or location.";
  };

  const handleSendMessage = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!inputText.trim()) return;

    const newUserMessage: Message = { id: Date.now(), text: inputText, sender: 'user' };
    setMessages(prev => [...prev, newUserMessage]);
    setInputText("");

    setTimeout(() => {
      const botResponse: Message = { id: Date.now() + 1, text: getBotResponse(newUserMessage.text), sender: 'bot' };
      setMessages(prev => [...prev, botResponse]);
    }, 1000);
  };

  return (
    <>
      {!isOpen && (
        <button 
          onClick={() => setIsOpen(true)}
          className="fixed right-0 top-[52%] -translate-y-1/2 z-[100] group flex items-center justify-end"
        >
          <div className="bg-white backdrop-blur-3xl border border-slate-200 rounded-l-[1.5rem] flex items-center transition-all duration-500 overflow-hidden shadow-2xl border-r-0 hover:scale-105">
            <div className="w-16 h-16 flex items-center justify-center text-brand-red shrink-0">
              <MessageSquare size={28} className="group-hover:scale-110 transition-transform" />
            </div>
            <div className="max-w-0 overflow-hidden whitespace-nowrap transition-all duration-500 group-hover:max-w-[200px] group-hover:pl-4 group-hover:pr-6">
              <span className="text-[11px] font-black uppercase tracking-[0.3em] text-brand-indigo">ASSISTANT</span>
            </div>
          </div>
        </button>
      )}

      {isOpen && (
        <div className="fixed inset-0 z-[1000] bg-brand-indigo/20 backdrop-blur-md flex items-center justify-center p-6 animate-in fade-in duration-300">
          <div className="w-full max-w-lg h-[600px] bg-white border border-slate-200 rounded-[3rem] shadow-[0_30px_60px_rgba(57,49,130,0.2)] overflow-hidden flex flex-col animate-in zoom-in duration-300 relative">
            <div className="bg-slate-50 p-8 flex justify-between items-center shadow-sm border-b border-slate-100">
                <div className="flex items-center space-x-4">
                    <div className="bg-brand-red/10 p-2 rounded-2xl border border-brand-red/20">
                        <Bot className="text-brand-red w-6 h-6" />
                    </div>
                    <div>
                        <h3 className="text-brand-indigo font-bold text-lg tracking-wide font-display uppercase leading-none">QuantaBot</h3>
                        <span className="text-[10px] text-slate-400 flex items-center uppercase tracking-widest mt-1">
                            <span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-2 animate-pulse"></span> Online
                        </span>
                    </div>
                </div>
                <button onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-brand-red transition-colors p-2 hover:bg-slate-100 rounded-full"><X size={24} /></button>
            </div>

            <div className="flex-1 overflow-y-auto p-8 space-y-6 bg-white scrollbar-thin">
                {messages.map((msg) => (
                    <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-[85%] p-5 rounded-3xl text-sm leading-relaxed shadow-sm border ${
                            msg.sender === 'user' ? 'bg-brand-red border-brand-red text-white rounded-tr-sm' : 'bg-slate-50 border-slate-200 text-brand-indigo rounded-tl-sm'
                        }`}>{msg.text}</div>
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>

            <form onSubmit={handleSendMessage} className="p-6 bg-white border-t border-slate-100 flex gap-4">
                <input 
                    type="text" 
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    placeholder="Type a message..."
                    className="flex-1 bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 text-sm text-brand-indigo outline-none"
                />
                <button type="submit" className="p-4 bg-brand-red rounded-2xl text-white hover:opacity-90 shadow-lg"><Send size={22} /></button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;
