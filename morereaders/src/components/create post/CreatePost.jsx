import { useState } from "react";
import "./createpost.scss";
import axios from "axios";

const CreatePost = () => {
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [title, setTitle] = useState("");
    const [details, setDetails] = useState("");

    const handleButtonClick = () => {
        setIsFormOpen(!isFormOpen);
    }
    
    const handleSubmitForm = async(event) => {
        event.preventDefault();
        axios.post('/post')

    }
    return(
        <div className="createPost">
          <button className="postButton">
            <span className="postText">Create Post</span>
          </button>
        </div>
    )
}

export default CreatePost