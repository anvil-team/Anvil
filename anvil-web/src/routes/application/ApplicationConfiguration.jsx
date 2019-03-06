/*
 * @Author: zhenglfsir@gmail.com
 * @Date: 2019-01-03 22:16:54
 * @Last Modified by: zhenglfsir@gmail.com
 * @Last Modified time: 2019-03-06 21:57:23
 * 项目配置
 */

import React from 'react';
import { connect } from 'react-redux';
import { Table, Tag, Input, Button, Row, Col } from 'antd';
import BlankContent from 'src/layouts/BlankContent';
import SearchBox from 'components/UI/SearchBox';
import ApplicationEditModal from './ApplicationEditModal';

class ApplicationConfiguration extends React.Component {
  componentDidMount() {
    const { dispatch } = this.props;

    dispatch({ type: 'application/fetchApplicationList' });
    dispatch({ type: 'user/fetchUserList' });
  }

  render() {
    const { applicationList, applicationListLoading } = this.props;

    return (
      <>
        <BlankContent>
          <SearchBox>
            <Row>
              <Col span={12}>
                <Input
                  placeholder="项目名称"
                  style={{ width: 200 }}
                  onChange={this.handleChange}
                  onPressEnter={this.handleSearch}
                />
                <Button type="primary" style={{ marginLeft: 10 }} onClick={this.handleSearch}>
                  搜索
                </Button>
              </Col>
              <Col span={12} align="right">
                <Button onClick={this.handleToAdd}>新增</Button>
              </Col>
            </Row>
          </SearchBox>
          <Table
            columns={this.getColumns()}
            loading={applicationListLoading}
            dataSource={applicationList}
            size="middle"
          />
        </BlankContent>
        <ApplicationEditModal onClose={this.handleClose('editVis')} />
      </>
    );
  }

  getColumns = () => {
    return [
      { title: '项目名称', dataIndex: 'applicationName' },
      { title: '项目标识码', dataIndex: 'applicationCode' },
      { title: '描述', dataIndex: 'description' },
      { title: '项目负责人', dataIndex: 'chargePersonName' },
      {
        title: '审核开关',
        dataIndex: 'shouldReviewed',
        render: (txt) => (txt === 1 ? <Tag color="red">是</Tag> : <Tag color="green">否</Tag>),
      },
      { title: '创建时间', dataIndex: 'createTime' },
      {
        title: '操作',
        dataIndex: 'btn',
        render: (txt, record) => (
          <>
            <a onClick={this.handleConfigurationProject(record)}>配置</a>
          </>
        ),
      },
    ];
  };

  handleConfigurationProject = (record) => () => {
    const { dispatch } = this.props;

    dispatch({ type: 'application/setState', payload: { currentApp: record } });
  };

  handleToAdd = () => {
    const { dispatch } = this.props;
    dispatch({ type: 'application/setApplicationVis', payload: { editVis: true } });
  };

  handleClose = (field) => () => {
    const { dispatch } = this.props;
    dispatch({ type: 'application/setApplicationVis', payload: { [field]: false } });
  };

  handleChange = (e) => {
    const { dispatch } = this.props;
    dispatch({ type: 'application/setState', payload: { applicationName: e.target.value } });
  };

  handleSearch = () => {
    const { dispatch } = this.props;
    dispatch({ type: 'application/fetchApplicationList' });
  };
}

const mapStateToProps = (state) => ({
  applicationState: state.applicationState,
});

export default connect(mapStateToProps)(ApplicationConfiguration);
