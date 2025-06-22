import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import { useNavigate, useParams } from 'react-router-dom'

const Doctors = () => {
  const { speciality } = useParams()
  const [filterDoc, setFilterDoc] = useState([])
  const [showFilter, setShowFilter] = useState(false)
  const navigate = useNavigate()
  const { doctors } = useContext(AppContext)

  const applyFilter = () => {
    if (speciality) {
      setFilterDoc(doctors.filter(doc => doc.speciality === speciality))
    } else {
      setFilterDoc(doctors)
    }
  }

  useEffect(() => {
    applyFilter()
  }, [doctors, speciality])

  const specialities = [
    'General Lab',
    
  ]

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-blue-800 mb-2">Find Your LAB</h1>
      <p className="text-blue-600 mb-8">Browse through our team of healthcare professionals</p>
      
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Filters Section */}
        <div className="w-full lg:w-64 flex-shrink-0">
          <button 
            onClick={() => setShowFilter(!showFilter)} 
            className={`lg:hidden mb-4 py-2 px-4 bg-blue-600 text-white rounded-lg flex items-center justify-between w-full`}
          >
            {showFilter ? 'Hide Filters' : 'Show Filters'}
            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          
          <div className={`${showFilter ? 'block' : 'hidden'} lg:block bg-white p-4 rounded-xl shadow-md border border-blue-100`}>
            <h3 className="font-semibold text-blue-800 mb-4 text-lg">Specializations</h3>
            <div className="space-y-2">
              {specialities.map((spec) => (
                <button
                  key={spec}
                  onClick={() => speciality === spec ? navigate('/doctors') : navigate(`/doctors/${spec}`)}
                  className={`w-full text-left px-4 py-2 rounded-lg transition-all ${
                    speciality === spec 
                      ? 'bg-blue-100 text-blue-700 font-medium border border-blue-200' 
                      : 'text-gray-600 hover:bg-blue-50 hover:text-blue-600'
                  }`}
                >
                  {spec}
                </button>
              ))}
            </div>
          </div>
        </div>
        
        {/* Doctors Grid */}
        <div className="flex-1">
          {filterDoc.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filterDoc.map((item, index) => (
                <div 
                  key={index}
                  onClick={() => { navigate(`/appointment/${item._id}`); window.scrollTo(0, 0) }}
                  className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 border border-blue-50 hover:border-blue-100 cursor-pointer transform hover:-translate-y-1"
                >
                  <div className="bg-blue-50 h-48 flex items-center justify-center">
                    <img 
                      className="h-full w-full object-cover" 
                      src={item.image} 
                      alt={item.name} 
                    />
                  </div>
                  <div className="p-5">
                    <div className={`flex items-center mb-2 ${item.available ? 'text-green-600' : 'text-gray-500'}`}>
                      <span className={`inline-block w-2 h-2 rounded-full mr-2 ${item.available ? 'bg-green-500' : 'bg-gray-400'}`}></span>
                      <span className="text-sm">{item.available ? 'Available Today' : 'Not Available'}</span>
                    </div>
                    <h3 className="text-xl font-semibold text-blue-800 mb-1">{item.name}</h3>
                    <p className="text-blue-600 mb-3">{item.speciality}</p>
                    <button className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
                      Book Appointment
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-blue-50 rounded-xl p-8 text-center">
              <svg className="mx-auto h-12 w-12 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="mt-4 text-lg font-medium text-blue-800">No doctors found</h3>
              <p className="mt-2 text-blue-600">We couldn't find any doctors matching your criteria.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Doctors