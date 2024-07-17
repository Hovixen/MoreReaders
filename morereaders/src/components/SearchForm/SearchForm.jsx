import React, {useRef, useEffect} from 'react';
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { useNavigate } from 'react-router-dom';
import { useGlobalContext } from '../../libContext';


const SearchForm = () => {
  const {setSearchTerm, setResultTitle} = useGlobalContext();
  const searchText = useRef('');
  const navigate = useNavigate();

  useEffect(() => searchText.current.focus(), []);
  const handleSubmit = (e) => {
    e.preventDefault();
    let tempSearchTerm = searchText.current.value.trim();
    if((tempSearchTerm.replace(/[^\w\s]/gi,"")).length === 0){
      setSearchTerm("the lost world");
      setResultTitle("Please Enter Something ...");
    } else {
      setSearchTerm(searchText.current.value);
    }

    navigate("/book");
  };

  return (
    <div class="search">
        <input type = "text" ref = {searchText}/>
        <SearchOutlinedIcon onClick={handleSubmit}/>
    </div>
  )
}

export default SearchForm