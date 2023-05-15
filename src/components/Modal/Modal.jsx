import { useEffect } from "react";
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';
import css from './Modal.module.css';

const modalRoot = document.querySelector('#modal-root');

export default function Modal({onClose, children}) {

const handleCloseByOverlay = (evt) => {
        if (evt.target === evt.currentTarget) {
            onClose();
        }
};
    
    useEffect(() => {
        const handleCloseByEsc = evt => {
            if (evt.code === 'Escape') {
                onClose();
            }
        }
        window.addEventListener('keydown', handleCloseByEsc);
    
        return () => {
            window.removeEventListener('keydown', handleCloseByEsc);
        };
    }, [onClose]);

        return createPortal (
            <div className={css.Overlay} onClick={handleCloseByOverlay}>
                <div className={css.Modal}>
                    {children}
                </div>
            </div>,
            modalRoot
        );
};

Modal.propTypes = {
    onClose: PropTypes.func.isRequired,
    children: PropTypes.element,
};