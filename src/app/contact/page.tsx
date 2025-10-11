'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import Breadcrumbs from '@/components/Breadcrumbs';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    category: 'general'
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const contactMethods = [
    {
      icon: '📧',
      title: 'Email Support',
      description: 'Get help with calculations or report issues',
      contact: 'support@calcfort.com',
      response: '24-48 hours'
    },
    {
      icon: '💼',
      title: 'Business Inquiries',
      description: 'Partnerships, licensing, and enterprise solutions',
      contact: 'business@calcfort.com',
      response: '1-2 business days'
    },
    {
      icon: '🐛',
      title: 'Bug Reports',
      description: 'Found a calculation error or technical issue?',
      contact: 'bugs@calcfort.com',
      response: '12-24 hours'
    },
    {
      icon: '💡',
      title: 'Feature Requests',
      description: 'Suggest new calculators or improvements',
      contact: 'features@calcfort.com',
      response: '2-3 business days'
    }
  ];

  const faqItems = [
    {
      question: 'Are the calculations accurate?',
      answer: 'Yes, all our calculators use verified mathematical formulas and are thoroughly tested for accuracy across different scenarios and edge cases.'
    },
    {
      question: 'Do you store my calculation data?',
      answer: 'No, all calculations are performed locally in your browser. We do not store or track your calculation inputs or results unless you create an account and choose to save them.'
    },
    {
      question: 'Can I use Calculator Fort for commercial purposes?',
      answer: 'Yes, Calculator Fort is free for personal and commercial use. For enterprise solutions or API access, please contact our business team.'
    },
    {
      question: 'How do I report a calculation error?',
      answer: 'Please use the contact form below or email bugs@calcfort.com with details about the calculation, expected result, and actual result you received.'
    },
    {
      question: 'Can you add a specific calculator?',
      answer: 'We welcome suggestions! Please describe your calculator idea using the contact form or email features@calcfort.com with details about the calculations needed.'
    }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setIsSubmitted(true);
        // Reset form after showing success message
        setTimeout(() => {
          setIsSubmitted(false);
          setFormData({
            name: '',
            email: '',
            subject: '',
            message: '',
            category: 'general'
          });
        }, 5000); // Show success message for 5 seconds
      } else {
        setSubmitError(data.error || 'There was an error sending your message. Please try again.');
      }
    } catch (error) {
      console.error('Contact form error:', error);
      setSubmitError('There was an error sending your message. Please try again or contact us directly at support@calcfort.com');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      <Header />
      <Breadcrumbs 
        items={[
          { label: 'Home', href: '/' },
          { label: 'Contact', current: true }
        ]} 
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-green-500 to-blue-600 rounded-2xl shadow-lg mb-8">
            <span className="text-white text-4xl">📞</span>
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-6">Get in Touch — Contact CalcFort Support</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Have questions, suggestions, or need help? We're here to assist you with anything related to Calculator Fort.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Send us a Message</h2>
              
              {isSubmitted ? (
                <div className="bg-green-50 border border-green-200 rounded-xl p-8 text-center">
                  <div className="text-4xl mb-4">✅</div>
                  <h3 className="text-xl font-semibold text-green-900 mb-2">Message Sent Successfully!</h3>
                  <p className="text-green-700 mb-4">Thank you for contacting us! We've sent you a confirmation email and our team will respond soon.</p>
                  <div className="text-sm text-green-600">
                    <p>📧 Confirmation sent to: <strong>{formData.email}</strong></p>
                    <p>📋 Reference: <strong>{formData.category.toUpperCase()}</strong> - {formData.subject}</p>
                  </div>
                </div>
              ) : (
                <>
                  {submitError && (
                    <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6">
                      <div className="flex items-center">
                        <div className="text-red-500 mr-3">⚠️</div>
                        <div>
                          <h4 className="text-red-900 font-medium">Error</h4>
                          <p className="text-red-700 text-sm">{submitError}</p>
                        </div>
                      </div>
                    </div>
                  )}
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Name *</label>
                      <input
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Your full name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="your.email@example.com"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="general">General Inquiry</option>
                      <option value="bug">Bug Report</option>
                      <option value="feature">Feature Request</option>
                      <option value="business">Business/Partnership</option>
                      <option value="support">Technical Support</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Subject *</label>
                    <input
                      type="text"
                      name="subject"
                      required
                      value={formData.subject}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Brief description of your inquiry"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Message *</label>
                    <textarea
                      name="message"
                      required
                      rows={6}
                      value={formData.message}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Please provide as much detail as possible..."
                    />
                  </div>
                  
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-blue-500 to-green-600 text-white py-4 px-6 rounded-lg font-semibold hover:from-blue-600 hover:to-green-700 transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:from-blue-500 disabled:hover:to-green-600"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center justify-center">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Sending Message...
                      </div>
                    ) : (
                      'Send Message'
                    )}
                  </button>
                </form>
                </>
              )}
            </div>
          </div>

          {/* Contact Methods & FAQ */}
          <div className="space-y-8">
            {/* Contact Methods */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Other Ways to Reach Us</h3>
              <div className="space-y-4">
                {contactMethods.map((method, index) => (
                  <div key={index} className="border-b border-gray-100 pb-4 last:border-b-0 last:pb-0">
                    <div className="flex items-start space-x-3">
                      <div className="text-2xl">{method.icon}</div>
                      <div>
                        <h4 className="font-semibold text-gray-900">{method.title}</h4>
                        <p className="text-sm text-gray-600 mb-1">{method.description}</p>
                        <p className="text-blue-600 font-medium text-sm">{method.contact}</p>
                        <p className="text-xs text-gray-500">Response time: {method.response}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick FAQ */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Frequently Asked Questions</h3>
              <div className="space-y-4">
                {faqItems.map((faq, index) => (
                  <div key={index} className="border-b border-gray-100 pb-4 last:border-b-0 last:pb-0">
                    <h4 className="font-medium text-gray-900 mb-2">{faq.question}</h4>
                    <p className="text-sm text-gray-600 leading-relaxed">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}