import React from 'react';
import PropTypes from 'prop-types';
import css from './Searchbar.module.css';
import { ImSearch } from 'react-icons/im';

export default class SearchBar extends React.Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
    onError: PropTypes.func.isRequired,
  };

  state = {
    pictureName: '', // Здесь должно быть requestPicture вместо pictureName
  };

  handleSearchChange = e => {
    this.setState({ pictureName: e.currentTarget.value.toLowerCase() });
  };

  handleSubmit = e => {
    e.preventDefault();
    if (this.state.pictureName.trim() === '') {
      this.props.onError(); // Исправлено на вызов props.onError()
      return;
    }
    this.props.onSubmit(this.state.pictureName);
  };

  render() {
    return (
      <div className={css.searchbarHeader}>
        <form className={css.searchForm}>
          <button className={css.searchFormButton} type="submit" onClick={this.handleSubmit}>
            <ImSearch className={css.icon} />
          </button>
          <input
            className={css.searchFormInput}
            value={this.state.pictureName}
            onChange={this.handleSearchChange}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </form>
      </div>
    );
  }
}




