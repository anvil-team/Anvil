/*
 * @Author: zhenglfsir@gmail.com
 * @Date: 2019-01-03 22:08:11
 * @Last Modified by: zhenglfsir@gmail.com
 * @Last Modified time: 2019-02-25 22:19:44
 * 个人中心
 */

import React from 'react';
import { Row, Col, Card, Skeleton, Avatar } from 'antd';

class PersonCenter extends React.Component {
  render() {
    return (
      <>
        <Row>
          <Col span={8}>
            <Card>
              <Skeleton loading={false} avatar active>
                <Card.Meta
                  avatar={
                    <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                  }
                  title="Card title"
                  description="This is the description"
                />
              </Skeleton>
            </Card>
          </Col>
          <Col span={16}>
            <Row>{}</Row>
          </Col>
        </Row>
      </>
    );
  }
}

export default PersonCenter;
