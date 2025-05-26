import "./style.css";
import React, { useState } from 'react';
import { IoSearchOutline } from "react-icons/io5";
import { cn } from '@/lib/utils';
import { useNavigate } from 'react-router-dom';

const SearchBar = ({
  onSearch,
  placeholder = "Search matches, teams, leagues...",
  className,
}) => {

  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const navigate = useNavigate();

  const handleChange = async(e) => {
    const value = e.target.value;
    setQuery(value);
    if(value){
      await navigate(`/search+about/${value}`);
    }else {
      await navigate("/");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  };
  
  return (
    <form
      onSubmit={handleSubmit}
      className={`${cn(
        'relative transition-all duration-300',
        isFocused ? 'ring-2 ring-sport-gold/30' : '',
        className
      )} search_form`}
      id='FormSearch'
    >
      <div className="relative" style={{display: "flex", padding: "0 10px"}}>
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none input-icon">
          <IoSearchOutline size={18} className="text-gray-400" />
        </div>

        <input
          type="text"
          name="search"
          className="border-0 block bg-sport-card border border-gray-700 rounded-full py-2 pl-10 pr-10 text-sm text-white placeholder-gray-400 focus:outline-none"
          value={query}
          onChange={handleChange}
          placeholder={placeholder}
        />
      </div>
    </form>
  );
};

export default SearchBar;
