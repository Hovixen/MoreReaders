import React from "react";
import SearchForm from "../SearchForm/SearchForm";
import "./library.scss";

const Library = () => {
    return (
        <div className='holder-center flex flex-c text-center text-white'>
            <h2 className='search-title text-capitalize text-white'>Find your dream books.</h2>
            <SearchForm />
        </div>
    )
}

export default Library