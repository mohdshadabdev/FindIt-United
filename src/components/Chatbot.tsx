
import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MessageSquare, X, Send, Phone, Languages, Home } from "lucide-react";

type Language = 'english' | 'hindi' | 'urdu';

// Translation dictionaries
const translations = {
  english: {
    chatTitle: "FindIt@United Assistant",
    chatSubtitle: "Always here to help! 🙏",
    placeholder: "Type your question...",
    welcome: "Welcome to FindIt@United! 🙏 How can I help you with lost and found items today?",
    typing: "Typing...",
    quickQuestions: "Quick Questions:",
    contactInfo: "Contact Information",
    goBackToMenu: "← Back to Main Menu",
    responses: {
      lost: "If you've lost an item, you can report it through our 'Report Lost Item' form on the homepage. Please provide as many details as possible including:\n• Item description and color\n• Location where you lost it\n• Date and time\n• Your contact information\n\nWe'll notify you immediately if someone reports finding a matching item! 🤞",
      found: "Thank you for being honest! Please report the found item through our 'Report Found Item' form. Provide details about:\n• What you found\n• Where you found it\n• When you found it\n• Current location of the item\n\nYour honesty helps build a better community! 🙏",
      claim: "To claim an item:\n1. Find it in our listings\n2. Click the 'This is mine' button\n3. Provide verification details like:\n   • Purchase receipts\n   • Photos of the item\n   • Unique identifying features\n   • Serial numbers (if applicable)\n\nOur staff will review your claim before approval.",
      contact: "📞 Contact Information:\n\n🏢 Office: Student Center, Room 101\n📧 Email: support@finditunited.edu\n☎️ Phone: (936) 480-0990\n🕒 Hours: Monday-Friday, 9am-5pm\n\n🌐 We provide support in Hindi, English, and Urdu!",
      kept: "Items are kept for up to 30 days. Unclaimed items may be donated, discarded, or handed to authorities based on their type. Please claim your belongings promptly.",
      help: "I can help you with:\n• Reporting lost items\n• Reporting found items\n• Claiming items\n• Contact information\n• Office hours and location\n• General lost and found policies\n\nWhat would you like to know? 😊",
      default: "I'm here to help with lost and found queries! You can ask about reporting items, claiming items, contact information, or office hours. What would you like to know? 😊"
    }
  },
  hindi: {
    chatTitle: "FindIt@United सहायक",
    chatSubtitle: "हमेशा आपकी सेवा में! 🙏",
    placeholder: "अपना प्रश्न टाइप करें...",
    welcome: "FindIt@United में आपका स्वागत है! 🙏 खोए और मिले सामान के बारे में मैं आपकी कैसे सहायता कर सकता हूँ?",
    typing: "टाइप कर रहे हैं...",
    quickQuestions: "त्वरित प्रश्न:",
    contactInfo: "संपर्क जानकारी",
    goBackToMenu: "← मुख्य मेन्यू पर वापस जाएं",
    responses: {
      lost: "यदि आपका कोई सामान खो गया है, तो आप होमपेज पर 'खोया सामान रिपोर्ट करें' फॉर्म के माध्यम से इसकी रिपोर्ट कर सकते हैं। कृपया अधिक से अधिक विवरण प्रदान करें जैसे:\n• सामान का विवरण और रंग\n• वह स्थान जहाँ आपने इसे खोया\n• दिनांक और समय\n• आपकी संपर्क जानकारी\n\nयदि कोई मिलता-जुलता सामान मिलने की रिपोर्ट करता है तो हम तुरंत आपको सूचित करेंगे! 🤞",
      found: "आपकी ईमानदारी के लिए धन्यवाद! कृपया 'मिला सामान रिपोर्ट करें' फॉर्म के माध्यम से मिले सामान की रिपोर्ट करें। विवरण प्रदान करें:\n• आपको क्या मिला\n• आपको कहाँ मिला\n• कब मिला\n• सामान की वर्तमान स्थिति\n\nआपकी ईमानदारी से एक बेहतर समुदाय बनता है! 🙏",
      claim: "सामान का दावा करने के लिए:\n1. इसे हमारी सूची में खोजें\n2. 'यह मेरा है' बटन पर क्लिक करें\n3. सत्यापन विवरण प्रदान करें जैसे:\n   • खरीदारी की रसीदें\n   • सामान की फोटो\n   • विशिष्ट पहचान चिह्न\n   • सीरियल नंबर (यदि लागू हो)\n\nहमारे कर्मचारी अनुमोदन से पहले आपके दावे की समीक्षा करेंगे।",
      contact: "📞 संपर्क जानकारी:\n\n🏢 कार्यालय: छात्र केंद्र, कमरा 101\n📧 ईमेल: support@finditunited.edu\n☎️ फोन: (936) 480-0990\n🕒 समय: सोमवार-शुक्रवार, सुबह 9-शाम 5\n\n🌐 हम हिंदी, अंग्रेजी और उर्दू में सहायता प्रदान करते हैं!",
      kept: "सामान 30 दिनों तक रखा जाता है। बिना दावा किए गए सामान को उनके प्रकार के अनुसार दान में दिया जा सकता है, फेंका जा सकता है, या अधिकारियों को सौंपा जा सकता है। कृपया अपना सामान जल्दी ले जाएं।",
      help: "मैं आपकी इनमें सहायता कर सकता हूँ:\n• खोए सामान की रिपोर्ट करना\n• मिले सामान की रिपोर्ट करना\n• सामान का दावा करना\n• संपर्क जानकारी\n• कार्यालय के घंटे और स्थान\n• सामान्य खोया-पाया नीतियां\n\nआप क्या जानना चाहते हैं? 😊",
      default: "मैं खोए और मिले सामान के सवालों में आपकी सहायता के लिए यहाँ हूँ! आप सामान रिपोर्ट करने, दावा करने, संपर्क जानकारी या कार्यालय के घंटों के बारे में पूछ सकते हैं। आप क्या जानना चाहते हैं? 😊"
    }
  },
  urdu: {
    chatTitle: "FindIt@United معاون",
    chatSubtitle: "ہمیشہ آپ کی خدمت میں! 🙏",
    placeholder: "اپنا سوال ٹائپ کریں...",
    welcome: "FindIt@United میں آپ کا خوش آمدید! 🙏 کھوئے اور ملے ہوئے سامان کے بارے میں آج میں آپ کی کیسے مدد کر سکتا ہوں؟",
    typing: "ٹائپ کر رہے ہیں...",
    quickQuestions: "فوری سوالات:",
    contactInfo: "رابطہ کی معلومات",
    goBackToMenu: "← مین مینو پر واپس جائیں",
    responses: {
      lost: "اگر آپ کا کوئی سامان کھو گیا ہے، تو آپ ہوم پیج پر 'کھویا ہوا سامان رپورٹ کریں' فارم کے ذریعے اس کی رپورٹ کر سکتے ہیں۔ براہ کرم زیادہ سے زیادہ تفصیلات فراہم کریں جیسے:\n• سامان کی تفصیل اور رنگ\n• وہ جگہ جہاں آپ نے اسے کھویا\n• تاریخ اور وقت\n• آپ کی رابطہ کی معلومات\n\nاگر کوئی ملتا جلتا سامان ملنے کی رپورٹ کرتا ہے تو ہم فوری طور پر آپ کو اطلاع دیں گے! 🤞",
      found: "آپ کی ایمانداری کے لیے شکریہ! براہ کرم 'ملا ہوا سامان رپورٹ کریں' فارم کے ذریعے ملے ہوئے سامان کی رپورٹ کریں۔ تفصیلات فراہم کریں:\n• آپ کو کیا ملا\n• آپ کو کہاں ملا\n• کب ملا\n• سامان کی موجودہ جگہ\n\nآپ کی ایمانداری سے ایک بہتر کمیونٹی بنتی ہے! 🙏",
      claim: "سامان کا دعویٰ کرنے کے لیے:\n1. اسے ہماری فہرست میں تلاش کریں\n2. 'یہ میرا ہے' بٹن پر کلک کریں\n3. تصدیقی تفصیلات فراہم کریں جیسے:\n   • خریداری کی رسیدیں\n   • سامان کی تصاویر\n   • منفرد شناختی خصوصیات\n   • سیریل نمبرز (اگر لاگو ہو)\n\nہمارے عملہ منظوری سے پہلے آپ کے دعوے کا جائزہ لیں گے۔",
      contact: "📞 رابطہ کی معلومات:\n\n🏢 دفتر: اسٹوڈنٹ سنٹر، کمرہ 101\n📧 ای میل: support@finditunited.edu\n☎️ فون: (936) 480-0990\n🕒 اوقات: پیر سے جمعہ، صبح 9 سے شام 5\n\n🌐 ہم اردو، انگریزی اور ہندی میں مدد فراہم کرتے ہیں!",
      kept: "سامان 30 دن تک رکھا جاتا ہے۔ بغیر دعویٰ کے سامان کو ان کی قسم کے مطابق عطیہ کیا جا سکتا ہے، پھینکا جا سکتا ہے، یا حکام کو دیا جا سکتا ہے۔ براہ کرم اپنا سامان جلدی لے جائیں۔",
      help: "میں آپ کی ان چیزوں میں مدد کر سکتا ہوں:\n• کھوئے ہوئے سامان کی رپورٹ کرنا\n• ملے ہوئے سامان کی رپورٹ کرنا\n• سامان کا دعویٰ کرنا\n• رابطہ کی معلومات\n• دفتری اوقات اور جگہ\n• عمومی کھویا پایا پالیسیاں\n\nآپ کیا جاننا چاہتے ہیں؟ 😊",
      default: "میں کھوئے اور ملے ہوئے سامان کے سوالات میں آپ کی مدد کے لیے یہاں ہوں! آپ سامان رپورٹ کرنے، دعویٰ کرنے، رابطہ کی معلومات یا دفتری اوقات کے بارے میں پوچھ سکتے ہیں۔ آپ کیا جاننا چاہتے ہیں؟ 😊"
    }
  }
};

// Enhanced FAQ data with multi-language support
const getQuickSuggestions = (language: Language) => {
  switch (language) {
    case 'hindi':
      return [
        "खोया सामान कैसे रिपोर्ट करें?",
        "संपर्क जानकारी चाहिए",
        "सामान कितने दिन रखा जाता है?",
        "दावा कैसे करें?"
      ];
    case 'urdu':
      return [
        "کھویا ہوا سامان کیسے رپورٹ کریں؟",
        "رابطہ کی معلومات چاہیے",
        "سامان کتنے دن رکھا جاتا ہے؟",
        "دعویٰ کیسے کریں؟"
      ];
    default:
      return [
        "How to report a lost item?",
        "Need contact information",
        "How long are items kept?",
        "How to claim an item?"
      ];
  }
};

// Theme configurations for different languages
const getLanguageTheme = (language: Language) => {
  switch (language) {
    case 'hindi':
      return {
        primary: "from-blue-500 via-indigo-500 to-purple-500",
        secondary: "from-blue-500 to-indigo-500",
        background: "from-blue-50 via-white to-indigo-50",
        darkBackground: "from-slate-800 via-blue-900/20 to-indigo-900/20",
        button: "from-blue-500 to-indigo-500",
        buttonHover: "from-blue-600 to-indigo-600",
        accent: "from-blue-100 to-indigo-100",
        darkAccent: "from-blue-800 to-indigo-800"
      };
    case 'urdu':
      return {
        primary: "from-green-500 via-emerald-500 to-teal-500",
        secondary: "from-green-500 to-emerald-500",
        background: "from-green-50 via-white to-emerald-50",
        darkBackground: "from-slate-800 via-green-900/20 to-emerald-900/20",
        button: "from-green-500 to-emerald-500",
        buttonHover: "from-green-600 to-emerald-600",
        accent: "from-green-100 to-emerald-100",
        darkAccent: "from-green-800 to-emerald-800"
      };
    default: // English
      return {
        primary: "from-orange-500 via-white via-green-500 to-blue-500",
        secondary: "from-orange-500 to-red-500",
        background: "from-orange-50 via-white to-red-50",
        darkBackground: "from-slate-800 via-slate-700 to-slate-800",
        button: "from-orange-500 to-red-500",
        buttonHover: "from-orange-600 to-red-600",
        accent: "from-orange-100 to-red-100",
        darkAccent: "from-orange-800 to-red-800"
      };
  }
};

type Message = {
  isUser: boolean;
  text: string;
  isContact?: boolean;
};

export const Chatbot = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [language, setLanguage] = useState<Language>('english');
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messageEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const currentTranslations = translations[language];
  const theme = getLanguageTheme(language);

  // Initialize welcome message when language changes
  useEffect(() => {
    setMessages([{ 
      isUser: false, 
      text: currentTranslations.welcome
    }]);
  }, [language]);

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

  const handleLanguageChange = (newLanguage: Language) => {
    setLanguage(newLanguage);
  };

  const goBackToMainMenu = () => {
    setMessages([{ 
      isUser: false, 
      text: currentTranslations.welcome
    }]);
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

    setTimeout(() => {
      const response = getBotResponse(inputValue.trim());
      setMessages(prev => [...prev, { isUser: false, text: response }]);
      setIsTyping(false);
    }, 1200);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  const getBotResponse = (question: string): string => {
    const lowercaseQuestion = question.toLowerCase();
    const responses = currentTranslations.responses;
    
    // Enhanced keyword matching with better responses
    if (lowercaseQuestion.includes("lost") || lowercaseQuestion.includes("खो") || lowercaseQuestion.includes("کھو")) {
      return responses.lost;
    } else if (lowercaseQuestion.includes("found") || lowercaseQuestion.includes("मिला") || lowercaseQuestion.includes("ملا")) {
      return responses.found;
    } else if (lowercaseQuestion.includes("claim") || lowercaseQuestion.includes("दावा") || lowercaseQuestion.includes("دعویٰ")) {
      return responses.claim;
    } else if (lowercaseQuestion.includes("contact") || lowercaseQuestion.includes("संपर्क") || lowercaseQuestion.includes("رابطہ")) {
      return responses.contact;
    } else if (lowercaseQuestion.includes("kept") || lowercaseQuestion.includes("long") || lowercaseQuestion.includes("दिन") || lowercaseQuestion.includes("رکھا")) {
      return responses.kept;
    } else if (lowercaseQuestion.includes("help") || lowercaseQuestion.includes("सहायता") || lowercaseQuestion.includes("مدد")) {
      return responses.help;
    }

    return responses.default;
  };

  const handleSuggestionClick = (question: string) => {
    const userMessage = { isUser: true, text: question };
    setMessages([...messages, userMessage]);
    setIsTyping(true);

    setTimeout(() => {
      const response = getBotResponse(question);
      setMessages(prev => [...prev, { isUser: false, text: response }]);
      setIsTyping(false);
    }, 1200);
  };

  const showContactInfo = () => {
    const contactMessage = {
      isUser: false,
      text: currentTranslations.responses.contact,
      isContact: true
    };
    setMessages(prev => [...prev, contactMessage]);
  };

  const suggestions = getQuickSuggestions(language);

  return (
    <>
      {/* Chat toggle button */}
      <button
        className={`fixed bottom-6 right-6 z-50 w-16 h-16 bg-gradient-to-r ${theme.secondary} hover:${theme.buttonHover} text-white rounded-full shadow-2xl flex items-center justify-center focus:outline-none focus:ring-4 focus:ring-orange-300 dark:focus:ring-orange-800 transition-all transform hover:scale-110 animate-pulse border-4 border-white dark:border-slate-800`}
        onClick={toggleChat}
        aria-label="Chat with FindIt Assistant"
      >
        {isChatOpen ? <X size={28} /> : <MessageSquare size={28} />}
        <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
      </button>

      {/* Chat window */}
      {isChatOpen && (
        <div className={`fixed bottom-24 right-6 z-50 w-80 sm:w-96 h-[500px] bg-gradient-to-b ${theme.background} dark:${theme.darkBackground} rounded-2xl shadow-2xl flex flex-col animate-fade-in border-4 border-gradient-to-r from-orange-300 via-red-300 to-pink-300 dark:border-slate-600 overflow-hidden`}>
          {/* Chat header with language selection */}
          <div className={`bg-gradient-to-r ${theme.primary} text-slate-800 p-4 rounded-t-2xl flex justify-between items-center border-b-4 border-gold shadow-lg`}>
            <div className="flex items-center">
              <div className={`w-10 h-10 bg-gradient-to-r ${theme.button} rounded-full flex items-center justify-center mr-3 shadow-lg`}>
                <MessageSquare size={20} className="text-white" />
              </div>
              <div>
                <h3 className="font-bold text-slate-800">{currentTranslations.chatTitle}</h3>
                <p className="text-xs text-slate-600">{currentTranslations.chatSubtitle}</p>
              </div>
            </div>
            <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-700 hover:bg-white/50 rounded-full" onClick={toggleChat}>
              <X size={18} />
            </Button>
          </div>

          {/* Language selection buttons */}
          <div className="flex justify-center gap-2 p-3 bg-white/80 dark:bg-slate-700/80 border-b">
            {(['english', 'hindi', 'urdu'] as Language[]).map((lang) => (
              <button
                key={lang}
                onClick={() => handleLanguageChange(lang)}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-all flex items-center gap-1 ${
                  language === lang 
                    ? `bg-gradient-to-r ${theme.button} text-white shadow-md` 
                    : 'bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-500'
                }`}
              >
                <Languages size={12} />
                {lang === 'english' ? 'EN' : lang === 'hindi' ? 'हिं' : 'اردو'}
              </button>
            ))}
          </div>

          {/* Chat messages */}
          <div className={`flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b ${theme.background} dark:${theme.darkBackground}`}>
            {messages.map((message, index) => (
              <div
                key={index}
                className={`${
                  message.isUser 
                    ? `ml-auto bg-gradient-to-r ${theme.secondary} text-white shadow-lg` 
                    : message.isContact
                    ? "mr-auto bg-gradient-to-r from-blue-100 to-indigo-100 dark:from-blue-800 dark:to-indigo-800 text-slate-800 dark:text-white border-2 border-blue-300 dark:border-blue-600"
                    : "mr-auto bg-gradient-to-r from-white to-gray-50 dark:from-slate-600 dark:to-slate-500 text-slate-800 dark:text-white border border-gray-200 dark:border-slate-400"
                } max-w-[85%] rounded-2xl p-4 shadow-md ${message.isContact ? 'font-mono text-sm' : ''}`}
              >
                {message.isContact ? (
                  <div className="whitespace-pre-line">
                    {message.text}
                  </div>
                ) : (
                  message.text
                )}
              </div>
            ))}
            
            {isTyping && (
              <div className="mr-auto bg-white dark:bg-slate-600 text-slate-800 dark:text-white max-w-[80%] rounded-2xl p-4 border border-gray-200 dark:border-slate-400 shadow-md">
                <div className="flex space-x-2 items-center">
                  <div className={`w-3 h-3 bg-gradient-to-r ${theme.button} rounded-full animate-bounce`}></div>
                  <div className={`w-3 h-3 bg-gradient-to-r ${theme.button} rounded-full animate-bounce`} style={{ animationDelay: "0.2s" }}></div>
                  <div className={`w-3 h-3 bg-gradient-to-r ${theme.button} rounded-full animate-bounce`} style={{ animationDelay: "0.4s" }}></div>
                  <span className="text-sm text-slate-600 dark:text-slate-300 ml-2">{currentTranslations.typing}</span>
                </div>
              </div>
            )}

            {/* Quick suggestions and go back button */}
            {messages.length === 1 && !isTyping && (
              <div className="space-y-3">
                <p className="text-sm text-slate-600 dark:text-slate-400 text-center font-medium">{currentTranslations.quickQuestions}</p>
                <div className="flex flex-wrap gap-2">
                  {suggestions.map((suggestion, index) => (
                    <button
                      key={index}
                      className={`bg-white dark:bg-slate-700 hover:bg-blue-50 dark:hover:bg-slate-600 text-slate-800 dark:text-slate-200 text-sm px-4 py-2 rounded-full transition-all transform hover:scale-105 border border-gray-300 dark:border-slate-500 shadow-sm hover:shadow-md`}
                      onClick={() => handleSuggestionClick(suggestion)}
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
                
                {/* Contact info button */}
                <div className="text-center pt-2">
                  <button
                    onClick={showContactInfo}
                    className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-6 py-2 rounded-full text-sm font-medium transition-all transform hover:scale-105 shadow-lg flex items-center mx-auto gap-2"
                  >
                    <Phone size={16} />
                    {currentTranslations.contactInfo}
                  </button>
                </div>
              </div>
            )}

            {/* Go back to main menu button - shows when there are more than 1 message */}
            {messages.length > 1 && !isTyping && (
              <div className="text-center pt-2">
                <button
                  onClick={goBackToMainMenu}
                  className={`bg-gradient-to-r ${theme.button} hover:${theme.buttonHover} text-white px-6 py-2 rounded-full text-sm font-medium transition-all transform hover:scale-105 shadow-lg flex items-center mx-auto gap-2`}
                >
                  <Home size={16} />
                  {currentTranslations.goBackToMenu}
                </button>
              </div>
            )}
            
            <div ref={messageEndRef} />
          </div>

          {/* Chat input */}
          <div className={`border-t-4 border-gradient-to-r from-orange-300 to-red-300 dark:from-orange-600 dark:to-red-600 p-3 flex items-center gap-2 bg-gradient-to-r ${theme.background} dark:${theme.darkBackground}`}>
            <Input
              ref={inputRef}
              type="text"
              placeholder={currentTranslations.placeholder}
              value={inputValue}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              className="flex-1 border-2 border-orange-300 dark:border-orange-600 focus:border-red-400 dark:focus:border-red-500 rounded-full px-4 bg-white dark:bg-slate-700"
            />
            <Button 
              onClick={sendMessage} 
              size="icon"
              className={`bg-gradient-to-r ${theme.button} hover:${theme.buttonHover} rounded-full w-10 h-10 shadow-lg transform transition-all hover:scale-110`}
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
