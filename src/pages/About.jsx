import React from 'react'
import { assets } from '../assets/assets'

const About = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-fade-in">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
          About <span className="text-blue-600">Lab medical</span>
        </h1>
        <div className="w-24 h-1 bg-blue-500 mx-auto rounded-full mb-6"></div>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Revolutionizing healthcare management with technology and compassion
        </p>
      </div>

      {/* Main Content */}
      <div className="flex flex-col lg:flex-row gap-12 items-center mb-20">
        <div className="lg:w-1/2 relative group">
          <img 
            className="w-full rounded-xl shadow-xl transform group-hover:scale-105 transition-transform duration-500" 
            src={assets.about_image} 
            alt="Healthcare professionals" 
          />
          <div className="absolute -inset-4 border-2 border-blue-200 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
        </div>
        
        <div className="lg:w-1/2 space-y-6">
          <p className="text-gray-700 leading-relaxed animate-slide-up">
            Welcome to Lab medical, your trusted partner in managing your healthcare needs conveniently and efficiently. 
            At Lab medical, we understand the challenges individuals face when it comes to scheduling doctor appointments 
            and managing their health records.
          </p>
          
          <p className="text-gray-700 leading-relaxed animate-slide-up delay-100">
            Lab medical is committed to excellence in healthcare technology. We continuously strive to enhance our platform, 
            integrating the latest advancements to improve user experience and deliver superior service. Whether you're 
            booking your first appointment or managing ongoing care, Lab medical is here to support you every step of the way.
          </p>
          
          <div className="bg-blue-50 p-6 rounded-xl border-l-4 border-blue-500 animate-slide-up delay-200">
            <h3 className="text-xl font-semibold text-blue-800 mb-3">Our Vision</h3>
            <p className="text-gray-700">
              Our vision at Lab medical is to create a seamless healthcare experience for every user. We aim to bridge 
              the gap between patients and healthcare providers, making it easier for you to access the care you need, 
              when you need it.
            </p>
          </div>
        </div>
      </div>

      {/* Why Choose Us Section */}
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">
          Why Choose <span className="text-blue-600">Lab medical</span>
        </h2>
        <div className="w-20 h-1 bg-blue-500 mx-auto rounded-full mb-8"></div>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-20">
        {/* Efficiency Card */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 group">
          <div className="p-8 h-full flex flex-col">
            <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mb-6 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600 group-hover:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-3">Efficiency</h3>
            <p className="text-gray-600 flex-grow">
              Streamlined appointment scheduling that fits into your busy lifestyle. Our intuitive platform saves you time 
              and reduces the hassle of traditional booking methods.
            </p>
            <div className="mt-4 pt-4 border-t border-gray-100 group-hover:border-blue-100 transition-colors duration-300">
              <span className="text-blue-600 font-medium group-hover:text-blue-700 transition-colors duration-300">
                Learn more →
              </span>
            </div>
          </div>
        </div>

        {/* Convenience Card */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 group">
          <div className="p-8 h-full flex flex-col">
            <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mb-6 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600 group-hover:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-3">Convenience</h3>
            <p className="text-gray-600 flex-grow">
              Access to a network of trusted healthcare professionals in your area. Find the right specialist and book 
              appointments anytime, anywhere.
            </p>
            <div className="mt-4 pt-4 border-t border-gray-100 group-hover:border-blue-100 transition-colors duration-300">
              <span className="text-blue-600 font-medium group-hover:text-blue-700 transition-colors duration-300">
                Learn more →
              </span>
            </div>
          </div>
        </div>

        {/* Personalization Card */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 group">
          <div className="p-8 h-full flex flex-col">
            <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mb-6 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600 group-hover:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-3">Personalization</h3>
            <p className="text-gray-600 flex-grow">
              Tailored recommendations and reminders to help you stay on top of your health. Our smart system learns your 
              preferences and healthcare needs.
            </p>
            <div className="mt-4 pt-4 border-t border-gray-100 group-hover:border-blue-100 transition-colors duration-300">
              <span className="text-blue-600 font-medium group-hover:text-blue-700 transition-colors duration-300">
                Learn more →
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-8 md:p-12 text-center text-white shadow-lg animate-pulse-slow">
        <h3 className="text-2xl md:text-3xl font-bold mb-4">Ready to experience better healthcare?</h3>
        <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
          Join thousands of satisfied users who have transformed their healthcare experience with Lab medical.
        </p>
        <button className="bg-white text-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-blue-50 hover:scale-105 transform transition-all duration-300 shadow-md">
          Get Started Today
        </button>
      </div>
    </div>
  )
}

export default About
