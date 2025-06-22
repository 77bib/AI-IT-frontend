import React from 'react'
import { assets } from '../assets/assets'

const Contact = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-fade-in">
      {/* Header Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
          Contact <span className="text-blue-600">Us</span>
        </h1>
        <div className="w-24 h-1 bg-blue-500 mx-auto rounded-full mb-6"></div>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          We'd love to hear from you. Reach out to our team for any questions or inquiries.
        </p>
      </div>

      {/* Main Content */}
      <div className="flex flex-col lg:flex-row gap-12 items-center mb-20">
        <div className="lg:w-1/2 relative group">
          <img 
            className="w-full rounded-xl shadow-xl transform group-hover:scale-[1.02] transition-transform duration-500" 
            src={assets.contact_image} 
            alt="Our office" 
          />
          <div className="absolute -inset-4 border-2 border-blue-200 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
        </div>
        
        <div className="lg:w-1/2 space-y-8 animate-slide-up">
          {/* Office Information */}
          <div className="bg-white p-8 rounded-xl shadow-md border-l-4 border-blue-500 hover:shadow-lg transition-shadow duration-300">
            <h2 className="text-2xl font-semibold text-blue-700 mb-4">Our Office</h2>
            <div className="space-y-4 text-gray-700">
              <div className="flex items-start">
                <svg className="h-6 w-6 text-blue-500 mr-4 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <p>
                  Multi Activity Center<br />
                  IIT Roorkee, Roorkee<br />
                  Uttrakhand, India
                </p>
              </div>
              
              <div className="flex items-center">
                <svg className="h-6 w-6 text-blue-500 mr-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <p>+91-9102029342</p>
              </div>
              
              <div className="flex items-center">
                <svg className="h-6 w-6 text-blue-500 mr-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <p>rajkr5446@gmail.com</p>
              </div>
            </div>
          </div>

          {/* Careers Section */}
          <div className="bg-white p-8 rounded-xl shadow-md border-l-4 border-blue-500 hover:shadow-lg transition-shadow duration-300">
            <h2 className="text-2xl font-semibold text-blue-700 mb-4">Careers at Lab medical</h2>
            <p className="text-gray-700 mb-6">
              Learn more about our teams and job openings. We're always looking for talented individuals to join our mission.
            </p>
            <button className="bg-blue-600 text-white px-6 py-3 rounded-full font-medium hover:bg-blue-700 hover:scale-105 transform transition-all duration-300 shadow-md flex items-center">
              Explore Jobs
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Contact Form Section */}
      <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-2xl p-8 md:p-12 mb-20 animate-slide-up delay-100">
        <h2 className="text-3xl font-bold text-gray-800 mb-2 text-center">Send us a message</h2>
        <p className="text-gray-600 mb-8 text-center max-w-2xl mx-auto">
          Have questions or feedback? Fill out the form below and we'll get back to you as soon as possible.
        </p>
        
        <form className="max-w-2xl mx-auto space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
              <input 
                type="text" 
                id="name" 
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200" 
                placeholder="Your name"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input 
                type="email" 
                id="email" 
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200" 
                placeholder="your.email@example.com"
              />
            </div>
          </div>
          
          <div>
            <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
            <input 
              type="text" 
              id="subject" 
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200" 
              placeholder="What's this about?"
            />
          </div>
          
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
            <textarea 
              id="message" 
              rows="5" 
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200" 
              placeholder="Your message here..."
            ></textarea>
          </div>
          
          <div className="text-center">
            <button 
              type="submit" 
              className="bg-blue-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-blue-700 hover:scale-105 transform transition-all duration-300 shadow-md"
            >
              Send Message
            </button>
          </div>
        </form>
      </div>

      {/* Map Section */}
      <div className="rounded-2xl overflow-hidden shadow-xl mb-20 animate-slide-up delay-200">
        <iframe 
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3186.604307583403!2d6.639812020961448!3d36.356422917287674!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzbCsDIxJzIzLjEiTiA2wrAzOCczMy4zIkU!5e0!3m2!1sen!2sus!4v1620000000000!5m2!1sen!2sus"
          width="100%" 
          height="450" 
          style={{border:0}} 
          allowFullScreen="" 
          loading="lazy"
          className="filter grayscale-50 hover:grayscale-0 transition-all duration-500"
        ></iframe>
      </div>
    </div>
  )
}

export default Contact
