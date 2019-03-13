/*
 * @Author: zhenglfsir@gmail.com
 * @Date: 2019-01-03 22:17:38
 * @Last Modified by: zhenglfsir@gmail.com
 * @Last Modified time: 2019-03-13 23:04:59
 * 集群配置
 */

import React from 'react';
import BlankContent from 'src/layouts/BlankContent';
import SearchBox from 'components/UI/SearchBox';
import { Row, Col, Input, Button, Table } from 'antd';
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
        render: () => (
          <>
            <a>编辑</a>
          </>
        ),
      },
    ];
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
