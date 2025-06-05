
import React from "react";
import { Shield, Eye, Database, Lock, UserCheck, Settings } from "lucide-react";

const Privacy = () => {
  const sections = [
    {
      title: "Information We Collect",
      icon: <Database className="w-5 h-5" />,
      content: [
        {
          subtitle: "Personal Information",
          items: [
            "Name and university email address for account creation",
            "Phone number for contact purposes",
            "Student/staff ID for verification purposes"
          ]
        },
        {
          subtitle: "Item Information",
          items: [
            "Descriptions of lost or found items",
            "Location and date information",
            "Photos of items (when provided)"
          ]
        },
        {
          subtitle: "Usage Data",
          items: [
            "Login times and frequency of use",
            "Pages visited and features used",
            "Device and browser information"
          ]
        }
      ]
    },
    {
      title: "How We Use Your Information",
      icon: <Eye className="w-5 h-5" />,
      content: [
        {
          subtitle: "Primary Purposes",
          items: [
            "Facilitate the return of lost items to their rightful owners",
            "Enable communication between users for item recovery",
            "Verify user identity and prevent fraudulent claims"
          ]
        },
        {
          subtitle: "Secondary Purposes",
          items: [
            "Improve the platform's functionality and user experience",
            "Generate anonymized statistics about lost and found trends",
            "Provide customer support and resolve disputes"
          ]
        }
      ]
    },
    {
      title: "Information Sharing",
      icon: <UserCheck className="w-5 h-5" />,
      content: [
        {
          subtitle: "Authorized Sharing",
          items: [
            "Contact information shared between users for legitimate item recovery",
            "Data shared with authorized university personnel for verification",
            "Information provided to campus security when required for investigation"
          ]
        },
        {
          subtitle: "Prohibited Sharing",
          items: [
            "We never sell personal information to third parties",
            "No marketing or advertising use of personal data",
            "No sharing with external organizations without explicit consent"
          ]
        }
      ]
    },
    {
      title: "Data Security",
      icon: <Lock className="w-5 h-5" />,
      content: [
        {
          subtitle: "Protection Measures",
          items: [
            "All data is encrypted in transit and at rest",
            "Regular security audits and vulnerability assessments",
            "Access controls and authentication requirements for staff"
          ]
        },
        {
          subtitle: "Data Retention",
          items: [
            "Item reports are archived after 90 days",
            "Personal data is anonymized for statistical purposes",
            "Account data is retained while the account is active"
          ]
        }
      ]
    },
    {
      title: "Your Rights",
      icon: <Settings className="w-5 h-5" />,
      content: [
        {
          subtitle: "Access and Control",
          items: [
            "View and update your personal information at any time",
            "Delete your account and associated data",
            "Opt out of non-essential communications"
          ]
        },
        {
          subtitle: "Data Portability",
          items: [
            "Request a copy of your personal data",
            "Transfer your data to another service (where applicable)",
            "Receive data in a commonly used, machine-readable format"
          ]
        }
      ]
    }
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Privacy Policy
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400">
            Your privacy is important to us. Learn how we collect, use, and protect your information.
          </p>
          <p className="text-sm text-slate-500 dark:text-slate-500 mt-2">
            Last updated: January 2025
          </p>
        </div>

        <div className="space-y-8">
          {sections.map((section, sectionIndex) => (
            <div key={sectionIndex} className="bg-white dark:bg-slate-900 rounded-lg shadow-md p-6 border border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg text-white">
                  {section.icon}
                </div>
                <h2 className="text-xl font-semibold">{section.title}</h2>
              </div>
              
              <div className="space-y-6">
                {section.content.map((subsection, subsectionIndex) => (
                  <div key={subsectionIndex}>
                    <h3 className="text-lg font-medium mb-3 text-purple-600 dark:text-purple-400">
                      {subsection.subtitle}
                    </h3>
                    <ul className="space-y-2">
                      {subsection.items.map((item, itemIndex) => (
                        <li key={itemIndex} className="flex items-start gap-3 text-slate-600 dark:text-slate-400">
                          <div className="w-2 h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mt-2 flex-shrink-0"></div>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-lg p-8 border border-purple-200 dark:border-purple-700">
          <h3 className="text-xl font-semibold mb-4 text-center">Contact Us About Privacy</h3>
          <p className="text-slate-600 dark:text-slate-400 text-center mb-6">
            If you have any questions about this privacy policy or how we handle your data, please don't hesitate to reach out.
          </p>
          <div className="text-center space-y-2">
            <p className="text-sm text-slate-500 dark:text-slate-500">
              Privacy Officer:{" "}
              <a href="mailto:privacy@findunited.edu" className="text-purple-600 dark:text-purple-400 hover:underline">
                privacy@findunited.edu
              </a>
            </p>
            <p className="text-sm text-slate-500 dark:text-slate-500">
              General Support:{" "}
              <a href="mailto:support@findunited.edu" className="text-purple-600 dark:text-purple-400 hover:underline">
                support@findunited.edu
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Privacy;
