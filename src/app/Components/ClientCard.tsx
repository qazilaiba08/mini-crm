'use client'
import { useDispatch } from 'react-redux';
import {Client} from '../actions/types'
import { crmActions } from '../actions/crmSlice.ts';
import { FaUser } from 'react-icons/fa';

const ClientCard = ({client}: {client:Client}) => {
  const dispatch = useDispatch();

    return (
    <div className="bg-white rounded-lg shadow p-4 hover:shadow-md transition-shadow cursor-pointer"
    onClick={() => dispatch(crmActions.selectClient(client.id))}>
    <div className="flex items-center space-x-3 mb-2">
        <div className="bg-blue-100 p-3 rounded-full">
          <FaUser />
        </div>
         <div>
          <h3 className="font-semibold">{client.name}</h3>
          <p className="text-sm text-gray-600">{client.company}</p>
        </div>
    </div>
    <div className=''>
     {client.tags.map(tag => (
        <span key = {tag} className ="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">
            {tag}
          </span>
     ))}
    </div>
    <div className="text-sm text-gray-600">
        <div className="flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          {client.email}
        </div>
        <div className="flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
          </svg>
          {client.phone}
        </div>
      </div>
    </div>
  )
}

export default ClientCard;