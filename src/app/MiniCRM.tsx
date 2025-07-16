'use client'
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import AddClientForm from './Components/AddClientForm';
import ClientDetail from './Components/ClientDetails';
import ClientCard from './Components/ClientCard';
import SearchBar from './Components/SearchBar';
import LeadsBoard from './Components/LeadsBoard'
import { crmActions } from './actions/crmSlice.ts';
import TaskList from './Components/TaskList';
import AddLeadForm from './Components/AddLeadForm';
import TaskCalendar from './Components/TaskCalendar';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { RootState } from './store/store';
import { motion } from 'framer-motion';
import { FaTwitter, FaLinkedin, FaGithub ,FaMailBulk} from 'react-icons/fa';

const MiniCRM = () => {
  const [showClientForm, setShowClientForm] = useState(false);
  const [showLeadForm, setShowLeadForm] = useState(false);
  const view = useSelector((state: RootState) => state.view);
  const selectedClient = useSelector((state: RootState) => state.selectedClient);
  const activeTab = useSelector((state: RootState) => state.activeTab);
  const clients = useSelector((state: RootState) => state.clients);
  const dispatch = useDispatch();
  const buttonVariants = {
  initial: { opacity: 0.6, scale: 1 },
  hover: { opacity: 1, scale: 1.05 },
  active: { scale: 0.98 },
};

  return (
    <div className="min-h-screen bg-gray-900">
     
      <header className="bg-gradient-to-r bg-gray-300 shadow-lg">
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }} className="max-w-[1200px] mx-auto px-6 py-5 flex justify-between items-center">
    
        <h1 className="text-3xl mb-6 text-cyan-950">CRM Dashboard</h1>
    <div className="flex space-x-4">
      {(['clients', 'leads'] as const).map((v) => (
        <motion.button
          key={v}
          onClick={() => dispatch(crmActions.setView(v))}
          variants={buttonVariants}
          initial="initial"
          whileHover="hover"
          whileTap="active"
          className={`px-4 py-2 font-medium rounded ${view === v ? 'bg-white text-blue-600' : 'bg-opacity-20 text-pink-300'}`}
        >
          {v.charAt(0).toUpperCase() + v.slice(1)}
        </motion.button>
      ))}
    </div>
  </motion.div>
</header>

      <main className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8 min-h-screen bg-gradient-to-br from-[#f5f7fa] to-[#c3cfe2]">
        {/* Search and Navigation */}
        <div className="mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
            <SearchBar />
            <nav className="flex space-x-2">
              {(['clients', 'leads', 'tasks', 'calendar']as const).map((v) => (
                <motion.button
                  key={v}
                  variants={buttonVariants}
                  initial="initial"
                  whileHover="hover"
                  whileTap="active"
                  onClick={() => dispatch(crmActions.setView(v))}
                  className={`px-4 py-2 text-sm font-medium rounded-md ${
                    view === v ? 'bg-blue-100 text-blue-700' : 'text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  {v.charAt(0).toUpperCase() + v.slice(1)}
                </motion.button>
              ))}
            </nav>
          </div>

          {view === 'clients' && selectedClient && (
            <div className="border-b border-gray-200">
              <nav className="-mb-px flex space-x-8">
                {(['clients', 'tasks', 'notes']as const).map((tab) => (
                  <motion.button
                    key={tab}
                    variants={buttonVariants}
                    initial="initial"
                    whileHover="hover"
                    whileTap="active"
                    onClick={() => dispatch(crmActions.setActiveTab(tab))}
                    className={`py-4 px-1 border-b-2 font-medium text-sm ${
                      activeTab === tab
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    {tab === 'clients' ? 'Client Details' : tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </motion.button>
                ))}
              </nav>
            </div>
          )}
        </div>

        <div className="bg-gradient-to-r from-gray-500 to-purple-600 shadow-lg rounded overflow-hidden py-7">
          
          {view === 'clients' && (
            <div
              className="relative px-2.5 py-6 mb-1.5">
              {selectedClient ? (
                <ClientDetail client={selectedClient} />
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 py-5">
                  {clients.map((client) => (
                    <ClientCard key={client.id} client={client} />
                  ))}
                </div>
              )}
            </div>
           )}

          {view === 'leads' && (
            <motion.div  whileHover={{ y: -5, boxShadow: '0px 10px 20px rgba(0,0,0,0.1)' }} className="bg-white rounded shadow p-4">
              <LeadsBoard />
            </motion.div>
          )}

          {view === 'tasks' && (
            <motion.div whileHover={{ y: -5, boxShadow: '0px 10px 20px rgba(0,0,0,0.1)' }} className="bg-white rounded shadow p-4">
              <TaskList />
            </motion.div>
          )}

          {view === 'calendar' && (
            <motion.div whileHover={{ y: -5, boxShadow: '0px 10px 20px rgba(0,0,0,0.1)' }} className="bg-gradient-to-r from-blue-500 to-indigo-600 shadow-lg p-4">
              <TaskCalendar />
            </motion.div>
          )}
        </div>
        
      </main>

      {/* Modals */}
      {showClientForm && <AddClientForm onClose={() => setShowClientForm(false)} />}
      {showLeadForm && <AddLeadForm onClose={() => setShowLeadForm(false)} />}

      {/* Toast */}
      <ToastContainer position="bottom-right" autoClose={3000} />
     <footer className="mt-16 bg-white border-t shadow-sm">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 grid grid-cols-1 md:grid-cols-3 gap-8 text-sm text-gray-600">
    
    {/* Brand */}
    <div>
      <h2 className="text-xl font-bold text-gray-900">MiniCRM</h2>
      <p className="mt-2 text-gray-500">Empower your client management with simplicity.</p>
    </div>

    {/* Navigation */}
    <div className="space-y-2">
      <h3 className="text-gray-800 font-semibold">Navigation</h3>
      <ul className="space-y-1">
        <li><a href="#" className="hover:text-blue-600 transition">Dashboard</a></li>
        <li><a href="#" className="hover:text-blue-600 transition">Clients</a></li>
        <li><a href="#" className="hover:text-blue-600 transition">Leads</a></li>
        <li><a href="#" className="hover:text-blue-600 transition">Tasks</a></li>
      </ul>
    </div>

    {/* Social / Contact */}
    <div className="space-y-2">
      <h3 className="text-gray-800 font-semibold">Get in Touch</h3>
      <p> <FaMailBulk />Email: support@minicrm.com</p>
      <div className="flex gap-4 text-gray-500 mt-2">
        <a href="#" className="hover:text-blue-600"><FaTwitter /> </a>
        <a href="#" className="hover:text-blue-600"><FaLinkedin /></a>
        <a href="#" className="hover:text-blue-600"><FaGithub /> </a>
      </div>
    </div>
  </div>

  <div className="text-center py-4 text-xs text-gray-400 border-t mt-4">
    &copy; {new Date().getFullYear()} CRM. All rights @reserved LaibaQazi.
  </div>
</footer>

    </div>
    
  );
};

export default MiniCRM;