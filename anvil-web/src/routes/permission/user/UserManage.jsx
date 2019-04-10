/*
 * @Author: zhenglfsir@gmail.com
 * @Date: 2019-01-03 22:08:18
 * @Last Modified by: zhenglfsir@gmail.com
 * @Last Modified time: 2019-04-10 16:35:57
 * 用户管理
 */

import React from 'react';
import { connect } from 'react-redux';
import { Form, Input, Button } from 'antd';
import BlankContent from 'src/layouts/BlankContent';
import SearchBox from 'src/components/UI/SearchBox';
import UserTableForm from './UserTableForm';
import DistributionApplicationModal from './DistributionApplicationModal';

class UserManage extends React.Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({ type: 'user/fetchUserList' });
    dispatch({ type: 'permission/fetchRoleComboList' });
  }

  render() {
    const { userState, form } = this.props;
    const { userList } = userState;
    const { getFieldDecorator } = form;

    return (
      <>
        <BlankContent>
          <SearchBox>
            <Form layout="inline">
              <Form.Item>
                {getFieldDecorator('keyword')(
                  <Input
                    placeholder="请输入"
                    onChange={this.handleSearchChange}
                    onPressEnter={this.handleSearch}
                  />
                )}
              </Form.Item>
              <Form.Item>
                <Button type="primary" onClick={this.handleSearch}>
                  搜索
                </Button>
              </Form.Item>
            </Form>
          </SearchBox>
          <UserTableForm value={userList} pagination={false} onChange={this.handleChange} />
        </BlankContent>
        <DistributionApplicationModal onClose={this.handleClose('distributionVis')} />
      </>
    );
  }

  handleChange = (row) => {
    const { dispatch } = this.props;
    const rowData = { ...row };
    if (rowData.editable) delete rowData.editable;

    if (row.isDel) dispatch({ type: 'user/fetchDelUser', payload: { id: rowData.id } });
    else dispatch({ type: 'user/fetchEditUser', payload: rowData });
  };

  handleSearchChange = (e) => {
    const { dispatch } = this.props;

    dispatch({ type: 'user/setState', payload: { username: e.target.key } });
  };

  handleSearch = () => {
    const { dispatch } = this.props;

    dispatch({ type: 'user/fetchUserList' });
  };

  handleClose = (field) => () => {
    const { dispatch } = this.props;
    dispatch({ type: 'user/setUserVis', payload: { data: { [field]: false } } });
  };
}

export default connect((state) => ({
  userState: state.userState,
}))(Form.create()(UserManage));
