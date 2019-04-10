/*
 * @Author: zhenglfsir@gmail.com
 * @Date: 2019-01-03 22:08:18
 * @Last Modified by: zhenglfsir@gmail.com
 * @Last Modified time: 2019-04-10 16:24:21
 * 用户管理
 */

import React from 'react';
import { connect } from 'react-redux';
import { Form, Input, Button, Spin } from 'antd';
import BlankContent from 'src/layouts/BlankContent';
import SearchBox from 'src/components/UI/SearchBox';
import RoleTableForm from './RoleTableForm';

class PermissionManage extends React.Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({ type: 'permission/fetchRoleList' });
  }

  render() {
    const { permissionState } = this.props;
    const { roleList, roleListLoading } = permissionState;

    return (
      <>
        <BlankContent>
          <SearchBox>
            <Input
              style={{ width: 200, marginRight: 10 }}
              placeholder="请输入"
              onChange={this.handleSearchChange}
              onPressEnter={this.handleSearch}
            />
            <Button type="primary" onClick={this.handleSearch}>
              搜索
            </Button>
          </SearchBox>
          <Spin spinning={roleListLoading}>
            <RoleTableForm value={roleList} pagination={false} onChange={this.handleChange} />
          </Spin>
        </BlankContent>
      </>
    );
  }

  handleChange = (row) => {
    const { dispatch } = this.props;
    const rowData = { ...row };
    if (rowData.editable) delete rowData.editable;

    if (row.isDel) {
      dispatch({ type: 'permission/fetchDelRole', payload: rowData });
    } else {
      dispatch({ type: 'permission/fetchEditRole', payload: rowData });
    }
  };

  handleSearchChange = (e) => {
    const { dispatch, permissionState } = this.props;

    dispatch({
      type: 'permission/setState',
      payload: { roleQuery: { ...permissionState.roleQuery, roleCode: e.target.value } },
    });
  };

  handleSearch = () => {
    const { dispatch } = this.props;

    dispatch({ type: 'permission/fetchRoleList' });
  };

  handleClose = (field) => () => {
    const { dispatch } = this.props;
    dispatch({ type: 'user/setUserVis', payload: { data: { [field]: false } } });
  };
}

export default connect((state) => ({
  permissionState: state.permissionState,
}))(Form.create()(PermissionManage));
