"use client";

import { useState } from "react";
import { MessageSquare, X, Send, Bot, Loader2 } from "lucide-react";

export function LiveChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Array<{ sender: "user" | "bot"; text: string; time: string }>>([
    {
      sender: "bot",
      text: "Hello! Welcome to Nexus Live Support. How can we assist your shopping or service booking today?",
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isTyping) return;

    const userText = input.trim();
    const timeStr = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

    setMessages((prev) => [...prev, { sender: "user", text: userText, time: timeStr }]);
    setInput("");
    setIsTyping(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userText }),
      });
      const data = await res.json();

      if (data.success) {
        setMessages((prev) => [
          ...prev,
          { sender: "bot", text: data.reply, time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) },
        ]);
      }
    } catch (err) {
      console.error("Real-time chat error:", err);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-indigo-600 hover:bg-indigo-500 text-white p-4 rounded-full shadow-2xl shadow-indigo-600/50 flex items-center justify-center transition-all transform hover:scale-105"
          title="Open Live Chat Support"
        >
          <MessageSquare className="w-6 h-6" />
        </button>
      )}

      {isOpen && (
        <div className="w-80 sm:w-96 bg-gray-950 border border-gray-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col h-[480px] text-white">
          <div className="bg-gradient-to-r from-indigo-900 via-indigo-950 to-gray-950 p-4 border-b border-gray-800 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-9 h-9 rounded-full bg-indigo-600/30 border border-indigo-500/50 flex items-center justify-center text-indigo-400">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold">Nexus Live Support</h4>
                <span className="text-[10px] text-emerald-400 font-medium">● Real-time Connected</span>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 text-gray-400 hover:text-white rounded-lg hover:bg-gray-900 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex-1 p-4 overflow-y-auto space-y-3 text-xs">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`flex flex-col ${m.sender === "user" ? "items-end" : "items-start"}`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-3.5 py-2.5 leading-relaxed ${
                    m.sender === "user"
                      ? "bg-indigo-600 text-white rounded-br-none"
                      : "bg-gray-900 border border-gray-800 text-gray-200 rounded-bl-none"
                  }`}
                >
                  {m.text}
                </div>
                <span className="text-[9px] text-gray-500 mt-1 px-1">{m.time}</span>
              </div>
            ))}
            {isTyping && (
              <div className="flex items-center gap-1.5 text-xs text-indigo-400">
                <Loader2 className="w-3.5 h-3.5 animate-spin" /> Agent typing...
              </div>
            )}
          </div>

          <form onSubmit={handleSend} className="p-3 border-t border-gray-800 bg-gray-900/50 flex gap-2">
            <input
              type="text"
              placeholder="Type your message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 bg-gray-950 border border-gray-800 rounded-xl px-3 py-2 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500"
            />
            <button
              type="submit"
              disabled={isTyping}
              className="bg-indigo-600 hover:bg-indigo-500 text-white p-2 rounded-xl transition flex items-center justify-center disabled:opacity-50"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
