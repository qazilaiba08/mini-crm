'use client'
import { toast } from 'react-toastify';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { crmActions } from '../actions/crmSlice.ts';
import 'react-toastify/dist/ReactToastify.css';
import {Client} from '../actions/types'

const ClientDetails = ({client} : {client: Client}) => {
   const dispatch = useDispatch();
   const [newNote, setNewNote] = useState('');

   const handleAddNote = () => {
    if(newNote.trim()){
        dispatch(crmActions.addNoteToClient({clientId :client.id, content: newNote}));
        setNewNote(' ');
        toast.success('Note Add Successfully!')
    }
   }
  return (
    <div className="bg-white rounded-lg shadow p-6">
        <div className='mb-6'>
          <h2 className="text-2xl font-bold mb-2">{client.name}</h2>
          <p className="text-gray-600">{client.company}</p>
        </div>
       
       <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <h3 className="font-semibold mb-2">Contact Information</h3>
          <div className="space-y-2">
            <p><span className="font-medium">Email:</span> {client.email}</p>
            <p><span className="font-medium">Phone:</span> {client.phone}</p>
          </div>
        </div>

         <div>
                <h3 className="font-semibold mb-2">Tags</h3>
          <div className="flex flex-wrap gap-2">
            {client.tags.map(tag => (
              <span key={tag} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
      
      <div>
        <h3 className="font-semibold mb-3">Notes</h3>
        <div className="space-y-4 mb-4">
          {client.notes.map(note => (
            <div key={note.id} className="bg-gray-50 p-3 rounded-lg">
              <p className="mb-1">{note.content}</p>
              <p className="text-xs text-gray-500">
                {new Date(note.createdAt).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>

        <div className="flex">
          <input
            type="text"
            value={newNote}
            onChange={(e) => setNewNote(e.target.value)}
            placeholder="Add a new note..."
            className="flex-grow p-2 border border-gray-300 rounded-l focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleAddNote}
            className="bg-blue-600 text-white px-4 rounded-r hover:bg-blue-700 transition-colors"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  )
}

export default ClientDetails;