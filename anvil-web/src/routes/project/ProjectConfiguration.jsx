/*
 * @Author: zhenglfsir@gmail.com
 * @Date: 2019-01-03 22:16:54
 * @Last Modified by: zhenglfsir@gmail.com
 * @Last Modified time: 2019-03-05 22:21:01
 * 项目配置
 */

import React from 'react';
import { connect } from 'react-redux';
import { Table, Tag, Input, Button, Row, Col } from 'antd';
import BlankContent from 'src/layouts/BlankContent';
import SearchBox from 'components/UI/SearchBox';
import ProjectEditModal from './ProjectEditModal';

class ProjectConfiguration extends React.Component {
  componentDidMount() {
    const { dispatch } = this.props;

    dispatch({ type: 'project/fetchProjectList' });
    dispatch({ type: 'user/fetchUserList' });
  }

  render() {
    const { projectList, projectListLoading } = this.props;

    return (
      <>
        <BlankContent>
          <SearchBox>
            <Row>
              <Col span={12}>
                <Input placeholder="项目名称" style={{ width: 200 }} />
                <Button type="primary" style={{ marginLeft: 10 }}>
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
            loading={projectListLoading}
            dataSource={projectList}
            size="middle"
          />
        </BlankContent>
        <ProjectEditModal onClose={this.handleClose('editVis')} />
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

    dispatch({ type: 'project/setState', payload: { currentProject: record } });
  };

  handleToAdd = () => {
    const { dispatch } = this.props;
    dispatch({ type: 'project/setProjectVis', payload: { editVis: true } });
  };

  handleClose = (field) => () => {
    const { dispatch } = this.props;
    dispatch({ type: 'project/setProjectVis', payload: { [field]: false } });
  };
}

const mapStateToProps = (state) => ({
  projectState: state.projectState,
});

export default connect(mapStateToProps)(ProjectConfiguration);
