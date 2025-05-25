
import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MessageSquare, X, Send } from "lucide-react";

// List of predefined questions and answers
const faqData = [
  {
    question: "How to report a lost item?",
    answer: "To report a lost item, click on the 'Report Lost Item' button on the homepage or go to the Report page and select the 'Lost Item' tab. Fill out the form with as many details as possible about your lost item."
  },
  {
    question: "How to report a found item?",
    answer: "To report a found item, click on the 'Report Found Item' button on the homepage or go to the Report page and select the 'Found Item' tab. Fill out the form with information about where and when you found the item."
  },
  {
    question: "How long are items kept?",
    answer: "Lost and found items are typically kept for 90 days. After that period, unclaimed items may be donated or disposed of according to university policy."
  },
  {
    question: "Can I edit a submission?",
    answer: "Currently, you cannot edit a submission after it's been posted. Please contact the admin team if you need to make changes to your submission."
  },
  {
    question: "How do I claim an item?",
    answer: "To claim an item, find it in the listings and click the 'This is mine' button. You'll need to provide verification details to prove that you're the owner of the item."
  },
  {
    question: "Where is the lost and found office located?",
    answer: "The physical lost and found office is located in the Student Center, Room 101. Office hours are Monday-Friday, 9am-5pm."
  },
  {
    question: "Who reviews my claim?",
    answer: "Claims are reviewed by authorized university staff who manage the lost and found system. They verify ownership details before approving claims."
  },
  {
    question: "How will I be contacted if my item is found?",
    answer: "If someone reports finding an item that matches your lost item report, you'll be notified via the contact information you provided when reporting the lost item."
  },
  {
    question: "Can I search for specific items?",
    answer: "Yes, you can use the search bar on the Listings page to search for specific items by name, category, or location."
  },
  {
    question: "How do I reset my password?",
    answer: "To reset your password, click on the 'Forgot password?' link on the login page and follow the instructions sent to your email."
  }
];

type Message = {
  isUser: boolean;
  text: string;
};

export const Chatbot = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { isUser: false, text: "Hi there! 👋 How can I help you with lost and found items today?" }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messageEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  useEffect(() => {
    if (isChatOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isChatOpen]);

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const sendMessage = () => {
    if (inputValue.trim() === "") return;

    const userMessage = { isUser: true, text: inputValue.trim() };
    setMessages([...messages, userMessage]);
    setInputValue("");
    setIsTyping(true);

    // Simulate bot thinking
    setTimeout(() => {
      const response = getBotResponse(inputValue.trim());
      setMessages(prev => [...prev, { isUser: false, text: response }]);
      setIsTyping(false);
    }, 1000);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  const getBotResponse = (question: string): string => {
    // Convert input to lowercase for case-insensitive matching
    const lowercaseQuestion = question.toLowerCase();
    
    // Check for matches in FAQ data
    for (const faq of faqData) {
      if (lowercaseQuestion.includes(faq.question.toLowerCase())) {
        return faq.answer;
      }
    }

    // Check for keywords
    if (lowercaseQuestion.includes("lost")) {
      return "If you've lost an item, you can report it through our 'Report Lost Item' form. Please provide as many details as possible to help identify your item.";
    } else if (lowercaseQuestion.includes("found")) {
      return "If you've found an item, thank you for being honest! Please report it through our 'Report Found Item' form so the owner can find it.";
    } else if (lowercaseQuestion.includes("claim") || lowercaseQuestion.includes("get my")) {
      return "To claim an item, find it in the listings and click the 'This is mine' button. You'll need to provide verification details to prove ownership.";
    } else if (lowercaseQuestion.includes("contact") || lowercaseQuestion.includes("help")) {
      return "You can contact the lost and found office at support@findunited.edu or visit in person at the Student Center, Room 101.";
    } else if (lowercaseQuestion.includes("thank")) {
      return "You're welcome! Is there anything else I can help you with?";
    } else if (lowercaseQuestion.includes("hi") || lowercaseQuestion.includes("hello")) {
      return "Hello there! How can I assist you with the lost and found system today?";
    }

    // Default response if no match
    return "I'm not sure I understand your question. You can ask about how to report lost or found items, claim items, or contact the lost and found office.";
  };

  const handleSuggestionClick = (question: string) => {
    const userMessage = { isUser: true, text: question };
    setMessages([...messages, userMessage]);
    setIsTyping(true);

    // Simulate bot thinking
    setTimeout(() => {
      const response = getBotResponse(question);
      setMessages(prev => [...prev, { isUser: false, text: response }]);
      setIsTyping(false);
    }, 1000);
  };

  // Suggestions to show at the start
  const suggestions = [
    "How to report a lost item?",
    "How long are items kept?",
    "How do I claim an item?"
  ];

  return (
    <>
      {/* Chat toggle button */}
      <button
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all"
        onClick={toggleChat}
        aria-label="Chat with FAQ Bot"
      >
        {isChatOpen ? <X size={24} /> : <MessageSquare size={24} />}
      </button>

      {/* Chat window */}
      {isChatOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-80 sm:w-96 h-96 bg-white dark:bg-slate-900 rounded-lg shadow-xl flex flex-col animate-fade-in border border-slate-200 dark:border-slate-700">
          {/* Chat header */}
          <div className="bg-blue-600 text-white p-4 rounded-t-lg flex justify-between items-center">
            <div className="flex items-center">
              <MessageSquare size={20} className="mr-2" />
              <h3 className="font-semibold">FindIt@United Assistant</h3>
            </div>
            <Button variant="ghost" size="icon" className="h-8 w-8 text-white hover:bg-blue-700" onClick={toggleChat}>
              <X size={18} />
            </Button>
          </div>

          {/* Chat messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`${
                  message.isUser ? "ml-auto bg-blue-600 text-white" : "mr-auto bg-slate-200 dark:bg-slate-800 text-slate-900 dark:text-white"
                } max-w-[80%] rounded-lg p-3`}
              >
                {message.text}
              </div>
            ))}
            {isTyping && (
              <div className="mr-auto bg-slate-200 dark:bg-slate-800 text-slate-900 dark:text-white max-w-[80%] rounded-lg p-3">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-slate-500 dark:bg-slate-400 rounded-full animate-pulse"></div>
                  <div className="w-2 h-2 bg-slate-500 dark:bg-slate-400 rounded-full animate-pulse" style={{ animationDelay: "0.2s" }}></div>
                  <div className="w-2 h-2 bg-slate-500 dark:bg-slate-400 rounded-full animate-pulse" style={{ animationDelay: "0.4s" }}></div>
                </div>
              </div>
            )}

            {/* Show quick suggestions after bot's first message */}
            {messages.length === 1 && !isTyping && (
              <div className="flex flex-wrap gap-2">
                {suggestions.map((suggestion, index) => (
                  <button
                    key={index}
                    className="bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-sm px-3 py-1.5 rounded-full transition-colors"
                    onClick={() => handleSuggestionClick(suggestion)}
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            )}
            
            <div ref={messageEndRef} />
          </div>

          {/* Chat input */}
          <div className="border-t border-slate-200 dark:border-slate-700 p-3 flex items-center gap-2">
            <Input
              ref={inputRef}
              type="text"
              placeholder="Type your question..."
              value={inputValue}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              className="flex-1"
            />
            <Button 
              onClick={sendMessage} 
              size="icon"
              className="bg-blue-600 hover:bg-blue-700"
              disabled={inputValue.trim() === "" || isTyping}
            >
              <Send size={18} />
            </Button>
          </div>
        </div>
      )}
    </>
  );
};
