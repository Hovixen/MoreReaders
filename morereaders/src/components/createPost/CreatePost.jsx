import { useState } from "react";
import "./createpost.scss";
import axios from "axios";
import Modal from "../modal/Modal";
import PostAddIcon from '@mui/icons-material/PostAdd';
import { PermMedia, UploadFile } from "@mui/icons-material";
import { CircularProgress } from "@mui/material";

const CreatePost = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');
    const [loading, setLoading] = useState(false);
    const [postContent, setPostContent] = useState({

        title: '',
        details: '',
        book_img: null,
        book_file: null
    });

    const handleButtonClick = () => {
        setIsModalOpen(true);
    };

    const handleSubmitForm = async (event) => {
        event.preventDefault();
        setLoading(true);

        try {

            const result = await axios.post('/post', {
                title: postContent.title,
                details: postContent.details,
                book_img: postContent.book_img,
                book_file: postContent.book_file
            });
            console.log(result);

        } catch (error) {
            console.error(`There was an error Posting ${error}`);
            setErrorMsg('An unexpected error occured');
        } finally {
            setLoading(false);
        }
        setIsModalOpen(false);
        setPostContent({
            title: '',
            details: '',
            book_img: null,
            book_file: null
        });
    }

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setPostContent({
            ...postContent,
            [name]: value
        });
    };

    const handleFileChange = (event) => {
        const { name, files } = event.target;
        setPostContent({
            ...postContent,
            [name]: files[0]
        });
    };

    return (
        <div className="createPost">
            <PostAddIcon onClick={handleButtonClick}/>
        <div>

                <Modal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    contentLabel="Post Modal"
                >
                    <h2>Create Post</h2>
                    {errorMsg && <div className="error-message">{errorMsg}</div>}
                    <form onSubmit={handleSubmitForm} className="postForm">
                        <input
                            type="text"
                            name="title"
                            value={postContent.title}
                            placeholder="Title"
                            onChange={handleInputChange}
                            required
                        />
                        <textarea
                            name="details"
                            value={postContent.details}
                            placeholder="Share your experience"
                            onChange={handleInputChange}
                            required
                        ></textarea>
                        <div className="inputElement">
                            <label htmlFor="imgFile" className="inputFile">
                                < PermMedia className="inputIcon" />
                                <span className="imgText">Photo</span>
                                <input
                                    type="file"
                                    id="imgFile"
                                    name="book_img"
                                    accept="image/*"
                                    onChange={handleFileChange}
                                    style={{ display: "none" }}
                                />
                            </label>
                            <label htmlFor="docFile" className="inputFile">
                                <UploadFile className="inputIcon" />
                                <span className="FileText">Document</span>
                                <input
                                    type="file"
                                    id="docFile"
                                    name="book_file"
                                    accept="application/pdf"
                                    onChange={handleFileChange}
                                    style={{ display: "none" }}
                                />
                            </label>
                        </div>
                        <button type="submit" className="formButton" disabled={loading}>
                            {loading ? < CircularProgress size={24} /> : "Post"}
                        </button>
                    </form>
                    <button onClick={() => setIsModalOpen(false)} className="formButton">Close</button>
                </Modal>
            </div>
        </div>

    );
};

export default CreatePost