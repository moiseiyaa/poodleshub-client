'use client';

import { useState } from 'react';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock, FaCheck } from 'react-icons/fa';
import Container from '../components/organisms/Container';

/**
 * Contact page component
 * Displays contact information and a contact form
 */
const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    preferredContact: 'email'
  });
  
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormError(null);
    
    // Validate form
    if (!formData.name || !formData.email || !formData.message) {
      setFormError('Please fill in all required fields.');
      setIsSubmitting(false);
      return;
    }
    
    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      setFormSubmitted(true);
      setIsSubmitting(false);
    } catch (error) {
      setFormError('There was an error submitting your message. Please try again.');
      setIsSubmitting(false);
    }
  };
  
  const contactInfo = [
    {
      icon: <FaPhone className="h-6 w-6 text-primary" />,
      title: 'Phone',
      content: '+1 410 725 8531',
      link: 'tel:+14107258531'
    },
    {
      icon: <FaEnvelope className="h-6 w-6 text-primary" />,
      title: 'Email',
      content: 'puppyhubusa@gmail.com',
      link: 'mailto:puppyhubusa@gmail.com'
    },
    {
      icon: <FaMapMarkerAlt className="h-6 w-6 text-primary" />,
      title: 'Headquarters',
      content: 'B205 Snowden River Pkwy, Columbia, MD 21045, United States',
      link: 'https://maps.google.com/?q=B205+Snowden+River+Pkwy,+Columbia,+MD+21045'
    },
    {
      icon: <FaClock className="h-6 w-6 text-primary" />,
      title: 'Hours',
      content: 'Mon-Fri: 9am-6pm, Sat: 10am-4pm',
      link: null
    }
  ];

  return (
    <div className="py-8 md:py-12 bg-gray-50">
      <Container>
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Contact Us</h1>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            We're here to answer your questions and help you find your perfect puppy companion
          </p>
        </div>
        
        {/* Contact Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {contactInfo.map((info, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-sm text-center">
              <div className="flex justify-center mb-4">
                <div className="p-3 bg-blue-50 rounded-full">
                  {info.icon}
                </div>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">{info.title}</h3>
              {info.link ? (
                <a 
                  href={info.link} 
                  className="text-primary hover:text-primary/80 transition-colors"
                  target={info.link.startsWith('http') ? '_blank' : undefined}
                  rel={info.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                >
                  {info.content}
                </a>
              ) : (
                <p className="text-gray-700">{info.content}</p>
              )}
            </div>
          ))}
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-white p-8 rounded-xl shadow-md">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Send Us a Message</h2>
            
            {formSubmitted ? (
              <div className="text-center py-8">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-6">
                  <FaCheck className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Message Sent Successfully!</h3>
                <p className="text-gray-700 mb-6">
                  Thank you for contacting PuppyHub USA. We'll get back to you within 24-48 hours.
                </p>
                <button
                  onClick={() => {
                    setFormSubmitted(false);
                    setFormData({
                      name: '',
                      email: '',
                      phone: '',
                      subject: '',
                      message: '',
                      preferredContact: 'email'
                    });
                  }}
                  className="text-primary hover:text-primary/80 font-medium"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                      required
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                      Subject
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                    >
                      <option value="">Select a subject</option>
                      <option value="General Inquiry">General Inquiry</option>
                      <option value="Adoption Process">Adoption Process</option>
                      <option value="Available Puppies">Available Puppies</option>
                      <option value="Health Guarantee">Health Guarantee</option>
                      <option value="Training Programs">Training Programs</option>
                      <option value="Delivery Options">Delivery Options</option>
                    </select>
                  </div>
                </div>
                
                <div className="mb-6">
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    Message <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={5}
                    className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                    required
                  />
                </div>
                
                <div className="mb-6">
                  <p className="block text-sm font-medium text-gray-700 mb-2">
                    Preferred Contact Method
                  </p>
                  <div className="flex space-x-6">
                    <div className="flex items-center">
                      <input
                        type="radio"
                        id="contact-email"
                        name="preferredContact"
                        value="email"
                        checked={formData.preferredContact === 'email'}
                        onChange={handleRadioChange}
                        className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
                      />
                      <label htmlFor="contact-email" className="ml-2 block text-sm text-gray-700">
                        Email
                      </label>
                    </div>
                    
                    <div className="flex items-center">
                      <input
                        type="radio"
                        id="contact-phone"
                        name="preferredContact"
                        value="phone"
                        checked={formData.preferredContact === 'phone'}
                        onChange={handleRadioChange}
                        className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
                      />
                      <label htmlFor="contact-phone" className="ml-2 block text-sm text-gray-700">
                        Phone
                      </label>
                    </div>
                  </div>
                </div>
                
                {formError && (
                  <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-md">
                    <p className="text-red-600">{formError}</p>
                  </div>
                )}
                
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full bg-primary hover:bg-primary/90 text-white font-medium py-3 px-6 rounded-md transition-colors ${
                    isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            )}
          </div>
          
          {/* Map and Additional Info */}
          <div>
            <div className="bg-white p-8 rounded-xl shadow-md mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Visit Our Headquarters</h2>
              <div className="relative h-64 rounded-lg overflow-hidden mb-6">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3073.123456789!2d-76.823456789!3d39.191234567!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89b7c123456789ab%3A0x123456789abcdef!2sB205+Snowden+River+Pkwy%2C+Columbia%2C+MD+21045!5e0!3m2!1sen!2sus!4v1637344237264!5m2!1sen!2sus"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={false}
                  loading="lazy"
                  title="PuppyHub USA Headquarters Location"
                ></iframe>
              </div>
              <p className="text-gray-700">
                Our Columbia headquarters features a welcoming environment where you can, by appointment, see some of our available puppies. We're conveniently located at Snowden River Parkway with ample parking available.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-md">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-1">How quickly will I receive a response?</h3>
                  <p className="text-gray-700">
                    We typically respond to all inquiries within 24-48 hours during business days.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-1">Can I schedule a visit to see puppies?</h3>
                  <p className="text-gray-700">
                    Yes! We welcome visits by appointment at our headquarters and partner locations. Please contact us to schedule a time.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-1">Do you offer virtual meetings?</h3>
                  <p className="text-gray-700">
                    We encourage in-person visits when geographically feasible. Please contact us to discuss visitation options and availability in your area.
                  </p>
                </div>
              </div>
              
              <div className="mt-6">
                <a 
                  href="/faq" 
                  className="text-primary hover:text-primary/80 font-medium"
                >
                  View all FAQs
                </a>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default ContactPage;
