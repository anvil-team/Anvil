import React from 'react';
import styles from './search-box.scss';

const SearchBox = (props) => {
  return <div className={styles.box}>{props.children}</div>;
};

export default SearchBox;
