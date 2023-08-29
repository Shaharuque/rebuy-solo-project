import React, { useState } from 'react';
import { AiOutlineSearch } from 'react-icons/ai'; // Import the search icon from react-icons/ai
import { useDispatch } from 'react-redux';
import { searchKeyStore } from '../../features/search/searchSlice';

const Search: React.FC = () => {
    const [searchText, setSearchText] = useState('');
    const dispatch=useDispatch()

    const handleInputChange = (event:any) => {
        setSearchText(event.target.value);
    };

    const handleEnterPress = (event:any) => {
        if (event.key === 'Enter') {
            // Perform your search or handling logic here using the searchText state
            console.log('Search text:', searchText);
            if(searchText.length>0){
                dispatch(searchKeyStore({searchedKey:searchText}))
            }
        }
    };

    return (
        <div className='flex items-center bg-gray-300 border border-gray-300 ml-4 mr-2 mt-4 rounded-2xl h-[40px] px-3'>
            <AiOutlineSearch className="text-gray-600" /> {/* Search icon */}
            <input
                type="text"
                placeholder='Search for your fa'
                className="bg-transparent border-none ml-2 w-full focus:outline-none"
                value={searchText}
                onChange={handleInputChange}
                onKeyDown={handleEnterPress}
            />
        </div>
    );
};

export default Search;