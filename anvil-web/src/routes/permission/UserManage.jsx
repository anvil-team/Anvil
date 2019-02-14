/*
 * @Author: zhenglfsir@gmail.com
 * @Date: 2019-01-03 22:08:18
 * @Last Modified by: zhenglfsir@gmail.com
 * @Last Modified time: 2019-02-14 09:21:48
 * 用户管理
 */

import React from 'react';
import { connect } from 'react-redux';

class UserManage extends React.Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({ type: 'user/getList' });
  }

  render() {
    return (
      <>
        <div>用户管理</div>
      </>
    );
  }
}

export default connect()(UserManage);
