'use client'
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store/store';
import { crmActions } from '../actions/crmSlice.ts'; 

const SearchBar = () => {
  const dispatch = useDispatch();
  const searchTerm = useSelector((state: RootState) => state.searchTerm); 

  return (
    <div className='relative'>
      <input
        type="text"
        placeholder="Search clients, leads, tasks..."
        className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={searchTerm}
        onChange={(e) => dispatch(crmActions.setSearchTerm(e.target.value))}
      />
      <div className="absolute left-3 top-3 text-gray-400">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>
    </div>
  );
};

export default SearchBar;
