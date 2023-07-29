import React from 'react';
import ImageGallery from 'components/ImageGallery/ImageGallery';
import SearchBar from 'components/Searchbar/Searchbar';
import Modal from 'components/Modal/Modal';
import LoadMore from 'components/Button/Button';
import { Loader } from 'components/Loader/Loader';
import { ImgErrorView } from '../../services/Error/error';
import css from '../App/App.module.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import api from 'services/api';

export default class App extends React.Component {
  state = {
    requestPicture: '',
    pictureData: '',
    largeImage: '',
    status: 'idle',
    IsLoadingMore: false,
    page: 1,
  };

  componentDidUpdate(prevState, prevProps) {
    const prevSearch = prevProps.requestPicture;
    const nextSearch = this.state.requestPicture;
    const prevPage = prevProps.page;
    const nextPage = this.state.page;

    if (prevSearch !== nextSearch) {
      this.loadPicture();
      
      this.setState({
        pictureData: '',
        IsLoadingMore: false,
      })
    }

    if (nextPage > prevPage) {
      this.loadPicture();
    }
  }

  loadPicture = () => {
    const { requestPicture, page } = this.state;

    this.setState({ status: 'pending' });

    api
      .fetchPicture(requestPicture, page)
      .then(res => {
        const data = res.data.hits.map(
          ({ id, webformatURL, largeImageURL }) => ({
            id,
            webformatURL,
            largeImageURL,
          })
        );

        const dataLength = res.data.hits.length;

        this.setState(prevState => ({
          pictureData: [...prevState.pictureData, ...data],
          status: 'resolved',
          IsLoadingMore:
            prevState.pictureData.length + dataLength === res.data.totalHits
              ? false
              : true,
        }));
        if (dataLength === 0) {
          toast.error('There is no picture for that name');
        }
      })
      .catch(error => console.log(error));
  };

  handleFormSubmit = requestPicture => {
    
    this.setState({
      requestPicture,
      page: 1
    });
  };

  handleSearchError = () => {
    toast.error('Enter a search query');
  };

  
  loadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  pictureModalClick = picture => {
    this.setState({
      largeImage: picture,
    });
  };

  closeModal = () => {
    this.setState({
      largeImage: '',
    });
  };

  resetPage() {
    this.setState({
      page: 1,
    });
  }

  resetData() {
    this.setState({
      pictureData: '',
      IsLoadingMore: false,
    });
  }


  render() {
    const { status, pictureData, largeImage, IsLoadingMore, requestPicture } = this.state;

    return (
      <div className={css.app}>
         <ToastContainer /> 
        {status === 'idle' ? (
          <React.Fragment>
            <SearchBar onSubmit={this.handleFormSubmit} onError={this.handleSearchError} />

            <div className={css.nameMessage}>Enter the name of the photo or picture</div>
          </React.Fragment>
        ) : (
          <SearchBar onSubmit={this.handleFormSubmit} onError={this.handleSearchError} />
        )}

        {status === 'resolved' && pictureData.length === 0 && (
          <ImgErrorView
            message={`Cannot find photos for "${requestPicture}" category`}    
          />
        )}

        {pictureData.length > 0 && (
          <ImageGallery
            pictureData={pictureData}
            onClick={this.pictureModalClick}
          ></ImageGallery>
        )}

        {status === 'pending' && <Loader />}

        {IsLoadingMore && <LoadMore onClick={this.loadMore} />}

        {largeImage.length > 0 && (
          <Modal onClose={this.closeModal}>
            <img src={largeImage} alt="" />
          </Modal>
        )}

      </div>
    );
  }
}