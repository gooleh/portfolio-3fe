// src/components/ContactSection.js
import React, { useState } from 'react';
import emailjs from 'emailjs-com';
import { motion } from 'framer-motion';

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [statusMessage, setStatusMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const templateParams = {
      from_name: formData.name,
      from_email: formData.email,
      message: formData.message,
    };

    emailjs
      .send(
        'service_kyj0jj6',
        'template_7obl9uk',
        templateParams,
        'NaJirbPrmWdlbKo3H'
      )
      .then(
        (response) => {
          console.log('SUCCESS!', response.status, response.text);
          setStatusMessage('Your message has been sent successfully.');
          setFormData({
            name: '',
            email: '',
            message: '',
          });
        },
        (err) => {
          console.error('FAILED...', err);
          setStatusMessage('Failed to send your message. Please try again.');
        }
      );
  };

  return (
    <motion.section
      id="contact"
      className="py-20 px-6 bg-background text-textPrimary"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <div className="container mx-auto max-w-lg">
        <h2 className="text-4xl font-bold mb-6 text-center text-primary">Contact Me</h2>
        {statusMessage && (
          <p className="text-center mb-4 text-secondary">{statusMessage}</p>
        )}
        <motion.form
          onSubmit={handleSubmit}
          className="bg-white shadow-lg rounded-lg p-6"
          initial={{ scale: 0.9, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-textPrimary">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-textPrimary">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="message" className="block text-sm font-medium text-textPrimary">
              Message
            </label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
              rows="4"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-primary hover:bg-teal-700 text-white py-2 px-4 rounded-md transition duration-300"
          >
            Send Message
          </button>
        </motion.form>
      </div>
    </motion.section>
  );
};

export default ContactSection;
