import { useState } from "react";
import PropTypes from 'prop-types';
import css from './ImageGalleryItem.module.css';
import Modal from 'components/Modal/Modal';

export default function ImageGalleryItem({ image: {webformatURL, largeImageURL, tags } }) {
    
    const [showModal, setShowModal] = useState(false);

    const togleModal = () => {
        setShowModal(prevState => (!prevState))
    };

        return (
            <>
                <li
                    onClick={togleModal}
                    className={css.ImageGalleryItem}
                >
                    <img
                        className={css.ImageGalleryItem}
                        src={webformatURL}
                        alt={tags}
                    />
                </li>
                {showModal && (<Modal
                    onClose={togleModal}>
                    <img src={largeImageURL} alt={tags} />
                </Modal>)}
            </>
        );
};
    
ImageGalleryItem.propTypes = {
        image: PropTypes.shape({
            webformatURL: PropTypes.string.isRequired,
            largeImageURL: PropTypes.string.isRequired,
            tags: PropTypes.string.isRequired,
        }).isRequired
    };