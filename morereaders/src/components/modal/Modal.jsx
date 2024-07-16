import  "./modal.scss";

const Modal = ({ isOpen, onClose, children}) => {
    if (!isOpen){
        return null;
    };
    return(
        <div className="modalOverlay">
            <div className="modal">
                <button className="modalClose" onClick={onClose}>X</button>
                {children}
            </div>
        </div>
    );
}

export default Modal