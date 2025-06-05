
import React from "react";
import { FileText, Shield, Users, AlertTriangle, CheckCircle } from "lucide-react";

const Terms = () => {
  const sections = [
    {
      title: "Acceptance of Terms",
      icon: <CheckCircle className="w-5 h-5" />,
      content: [
        "By accessing and using FindIt@United, you accept and agree to be bound by the terms and provisions of this agreement.",
        "This service is exclusively available to United University students, faculty, and staff with valid university credentials.",
        "If you do not agree to abide by the above, please do not use this service."
      ]
    },
    {
      title: "User Responsibilities",
      icon: <Users className="w-5 h-5" />,
      content: [
        "Provide accurate and truthful information when reporting lost or found items",
        "Respect other users' privacy and property rights",
        "Use the platform only for legitimate lost and found purposes",
        "Maintain the confidentiality of your account credentials",
        "Report any suspicious activity or misuse of the platform"
      ]
    },
    {
      title: "Prohibited Activities",
      icon: <AlertTriangle className="w-5 h-5" />,
      content: [
        "Making false reports or providing misleading information",
        "Attempting to claim items that do not belong to you",
        "Using the service for commercial purposes or unauthorized sales",
        "Harassment, abuse, or inappropriate communication with other users",
        "Attempting to gain unauthorized access to the system or other users' accounts"
      ]
    },
    {
      title: "Platform Usage",
      icon: <FileText className="w-5 h-5" />,
      content: [
        "The university reserves the right to verify all claims and may require additional documentation",
        "Items not claimed within 90 days may be donated or disposed of according to university policy",
        "The platform is provided 'as is' without warranties of any kind",
        "We reserve the right to suspend or terminate accounts that violate these terms"
      ]
    },
    {
      title: "Privacy and Data",
      icon: <Shield className="w-5 h-5" />,
      content: [
        "Personal information is collected only for the purpose of facilitating item recovery",
        "Contact details may be shared between users for legitimate item return purposes",
        "We do not sell or share personal information with third parties",
        "Users have the right to request deletion of their data upon account closure"
      ]
    }
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent">
            Terms of Service
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400">
            Please read these terms carefully before using FindIt@United
          </p>
          <p className="text-sm text-slate-500 dark:text-slate-500 mt-2">
            Last updated: January 2025
          </p>
        </div>

        <div className="space-y-8">
          {sections.map((section, index) => (
            <div key={index} className="bg-white dark:bg-slate-900 rounded-lg shadow-md p-6 border border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-gradient-to-r from-green-500 to-teal-500 rounded-lg text-white">
                  {section.icon}
                </div>
                <h2 className="text-xl font-semibold">{section.title}</h2>
              </div>
              
              <ul className="space-y-3">
                {section.content.map((item, itemIndex) => (
                  <li key={itemIndex} className="flex items-start gap-3 text-slate-600 dark:text-slate-400">
                    <div className="w-2 h-2 bg-gradient-to-r from-green-500 to-teal-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 bg-gradient-to-r from-green-50 to-teal-50 dark:from-green-900/20 dark:to-teal-900/20 rounded-lg p-8 border border-green-200 dark:border-green-700">
          <h3 className="text-xl font-semibold mb-4 text-center">Agreement and Contact</h3>
          <p className="text-slate-600 dark:text-slate-400 text-center mb-6">
            By using FindIt@United, you acknowledge that you have read, understood, and agree to these terms of service.
          </p>
          <div className="text-center">
            <p className="text-sm text-slate-500 dark:text-slate-500">
              For questions about these terms, contact us at{" "}
              <a href="mailto:legal@findunited.edu" className="text-green-600 dark:text-green-400 hover:underline">
                legal@findunited.edu
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Terms;
