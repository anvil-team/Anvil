/*
 * @Author: zhenglfsir@gmail.com
 * @Date: 2019-01-03 22:17:38
 * @Last Modified by: zhenglfsir@gmail.com
 * @Last Modified time: 2019-04-10 16:55:26
 * 集群配置
 */

import React from 'react';
import BlankContent from 'src/layouts/BlankContent';
import SearchBox from 'components/UI/SearchBox';
import { Row, Col, Input, Button, Table, Modal, Divider } from 'antd';
import { connect } from 'react-redux';
import ClusterEditModal from './ClusterEditModal';

class ClusterConfiguration extends React.Component {
  componentDidMount() {
    const { dispatch } = this.props;

    dispatch({ type: 'cluster/fetchClusterList' });
  }

  render() {
    const { clusterState } = this.props;
    const { clusterList, clusterLoading, clusterName } = clusterState;

    return (
      <>
        <BlankContent>
          <SearchBox>
            <Row>
              <Col span={12}>
                <Input
                  value={clusterName}
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
            size="middle"
            dataSource={clusterList}
            loading={clusterLoading}
            columns={this.getColumns()}
          />
        </BlankContent>
        <ClusterEditModal />
      </>
    );
  }

  getColumns = () => {
    return [
      { title: '集群名称', dataIndex: 'clusterName' },
      { title: '集群标识码', dataIndex: 'clusterCode' },
      { title: '描述', dataIndex: 'description' },
      { title: '创建时间', dataIndex: 'createTime' },
      {
        title: '操作',
        dataIndex: 'btn',
        render: (txt, record) => (
          <>
            <a onClick={this.handleToEdit(record)}>编辑</a>
            <Divider type="vertical" />
            <a onClick={this.handleDelete(record)}>删除</a>
          </>
        ),
      },
    ];
  };

  handleDelete = (record) => () => {
    Modal.confirm({
      title: `确认删除 ${record.clusterName}?`,
      onOk: async () => {
        const { dispatch } = this.props;
        await dispatch({ type: 'cluster/fetchDeleteCluster', payload: { id: record.id } });
      },
    });
  };

  handleToEdit = (record) => () => {
    const { dispatch } = this.props;

    dispatch({ type: 'cluster/setState', payload: { cluster: { ...record } } });
    dispatch({ type: 'cluster/setClusterVis', payload: { editVis: true } });
  };

  handleToAdd = () => {
    const { dispatch } = this.props;

    dispatch({ type: 'cluster/setClusterVis', payload: { editVis: true } });
  };
}

const mapStateToProps = (state) => ({
  clusterState: state.clusterState,
});

export default connect(mapStateToProps)(ClusterConfiguration);
