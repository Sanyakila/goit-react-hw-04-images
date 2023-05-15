import { useState } from "react";
import PropTypes from 'prop-types';
import css from './Searchbar.module.css';
import { toast } from 'react-toastify';
import { FaSearch } from 'react-icons/fa';

export default function Searchbar({ onSubmit }) {
    const [searchQuery, setSearchQuery] = useState('');

    const handleNameChange = e => {
        setSearchQuery(e.currentTarget.value.toLowerCase());
    };

    const handleSubmit = e => {
        e.preventDefault();

        if (searchQuery.trim() === '') {
            return toast.info('Введіть назву зображення');
        }

        onSubmit(searchQuery);
        reset();
    };

    const reset = () => {
        setSearchQuery('');
    };

        return (
            <header className={css.Searchbar}>
                <form className={css.SearchForm} onSubmit={handleSubmit}>
                    <button type="submit" className={css.SearchFormButton}>
                        <FaSearch size={24} />
                    </button>

                    <input
                        className={css.SearchFormInput}
                        value={searchQuery}
                        name="searchQuery"
                        type="text"
                        autoComplete="off"
                        autoFocus
                        placeholder="Search images nad photos"
                        onChange={handleNameChange}
                    />
                </form>
            </header>
        );
};

Searchbar.propTypes = {
    onSubmit: PropTypes.func.isRequired,
};