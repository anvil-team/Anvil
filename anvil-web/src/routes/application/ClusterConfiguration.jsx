/*
 * @Author: zhenglfsir@gmail.com
 * @Date: 2019-01-03 22:17:38
 * @Last Modified by: zhenglfsir@gmail.com
 * @Last Modified time: 2019-03-12 20:35:16
 * 集群配置
 */

import React from 'react';
import BlankContent from 'src/layouts/BlankContent';
import SearchBox from 'components/UI/SearchBox';
import { Row, Col, Input, Button, Table } from 'antd';

class ClusterConfiguration extends React.Component {
  render() {
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
          <Table size="middle" columns={this.getColumns()}  />
        </BlankContent>
      </>
    );
  }
}

export default ClusterConfiguration;
