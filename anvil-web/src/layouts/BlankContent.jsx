import React from 'react';
import styles from './layouts.scss';

export default function BlankContent(props) {
  return <div className={styles['blank-content']}>{props.children}</div>;
}
