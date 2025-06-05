
import React from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { HelpCircle, Search, Clock, Shield, Users, MapPin } from "lucide-react";

const FAQ = () => {
  const faqs = [
    {
      category: "Getting Started",
      icon: <HelpCircle className="w-5 h-5" />,
      questions: [
        {
          question: "How do I report a lost item?",
          answer: "To report a lost item, navigate to the 'Report Lost Item' section and fill out the detailed form with item description, location where you last saw it, date and time, and your contact information. The more details you provide, the better chance of recovery."
        },
        {
          question: "How do I report a found item?",
          answer: "Use the 'Report Found Item' feature to help reunite items with their owners. Provide details about where and when you found the item, its description, and your contact information. Our system will help match it with lost item reports."
        },
        {
          question: "Do I need to create an account?",
          answer: "Yes, creating an account helps us maintain security and allows you to track your submissions. You can register using your university email address for verification."
        }
      ]
    },
    {
      category: "Item Management",
      icon: <Search className="w-5 h-5" />,
      questions: [
        {
          question: "How long are items kept in the lost and found?",
          answer: "Lost and found items are typically kept for 90 days. High-value items like electronics, jewelry, or important documents may be kept longer at the discretion of campus security."
        },
        {
          question: "Can I edit my submission after posting?",
          answer: "Currently, you cannot directly edit submissions through the platform. If you need to make changes, please contact our support team at support@findunited.edu with your submission details."
        },
        {
          question: "How do I claim an item I found in the listings?",
          answer: "If you see your lost item in the listings, click the 'This is mine' button and provide verification details such as purchase receipts, photos, or unique identifying features to prove ownership."
        }
      ]
    },
    {
      category: "Contact & Support",
      icon: <Users className="w-5 h-5" />,
      questions: [
        {
          question: "Where is the physical lost and found office?",
          answer: "The lost and found office is located in the Student Center, Room 101. Office hours are Monday through Friday, 9:00 AM to 5:00 PM. You can also reach us by phone at (555) 123-4567."
        },
        {
          question: "Who reviews my claim requests?",
          answer: "All claims are reviewed by authorized university staff who manage the lost and found system. They verify ownership details and coordinate the return process to ensure items reach their rightful owners."
        },
        {
          question: "How will I be notified if my item is found?",
          answer: "You'll be contacted via the email and phone number you provided when reporting your lost item. Make sure to keep your contact information updated in your profile."
        }
      ]
    },
    {
      category: "Security & Privacy",
      icon: <Shield className="w-5 h-5" />,
      questions: [
        {
          question: "Is my personal information secure?",
          answer: "Yes, we take privacy seriously. Your personal information is encrypted and only shared with authorized campus personnel for item verification and return purposes."
        },
        {
          question: "What verification is required to claim an item?",
          answer: "You'll need to provide proof of ownership such as purchase receipts, photos of the item, or detailed description of unique features. This helps ensure items are returned to their rightful owners."
        }
      ]
    }
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Frequently Asked Questions
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400">
            Find answers to common questions about FindIt@United
          </p>
        </div>

        <div className="space-y-8">
          {faqs.map((category, categoryIndex) => (
            <div key={categoryIndex} className="bg-white dark:bg-slate-900 rounded-lg shadow-md p-6 border border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg text-white">
                  {category.icon}
                </div>
                <h2 className="text-2xl font-semibold">{category.category}</h2>
              </div>
              
              <Accordion type="single" collapsible className="space-y-2">
                {category.questions.map((faq, faqIndex) => (
                  <AccordionItem 
                    key={faqIndex} 
                    value={`${categoryIndex}-${faqIndex}`}
                    className="border border-slate-200 dark:border-slate-700 rounded-lg"
                  >
                    <AccordionTrigger className="px-4 py-3 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="px-4 pb-4 text-slate-600 dark:text-slate-400">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          ))}
        </div>

        <div className="mt-12 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg p-8 text-center border border-blue-200 dark:border-blue-700">
          <h3 className="text-xl font-semibold mb-4">Still have questions?</h3>
          <p className="text-slate-600 dark:text-slate-400 mb-6">
            Can't find what you're looking for? Our support team is here to help.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all"
            >
              <Users className="w-4 h-4 mr-2" />
              Contact Support
            </a>
            <a
              href="mailto:support@findunited.edu"
              className="inline-flex items-center justify-center px-6 py-3 border border-blue-300 dark:border-blue-600 text-blue-600 dark:text-blue-400 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all"
            >
              Email Us
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
