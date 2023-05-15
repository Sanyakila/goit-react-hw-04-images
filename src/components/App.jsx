import { useState, useEffect } from 'react';
import api from 'services/api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
import css from './App.module.css';

export default function App() {
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [totalHits, setTotalHits] = useState(0);

useEffect(() => {
  if (!query) {
    return;
  };

  setIsLoading(true);

  api(query, page)
    .then(resp => {
      setImages(prevState =>
        page === 1 ? [...resp.hits] : [...prevState, ...resp.hits]
      )
      setTotalHits(resp.totalHits);

    })
    .catch(error => {
      console.log(error);
      return toast.error("Помилка, повторіть спробу");
    })
    .finally(() => {
      setIsLoading(false);
    });
}, [query, page]);

  const handleLoadMore = () => {
    setPage(prevState => prevState.page + 1);
  };

const handleFormSubmit = query => {
  setQuery(query);
  setPage(1);
  setImages([]);
};

    return (
      <div className={css.App}>
        <Searchbar onSubmit={handleFormSubmit} />
        <ImageGallery images={images} />
        {isLoading && <Loader />}
        {!isLoading && images.length !== 0 &&
          images.length < totalHits && (
            <Button onClickLoadMore={handleLoadMore} />
          )}
        <ToastContainer autoClose={3000} />
      </div>
    );
};
