/*
 * @Author: zhenglfsir@gmail.com
 * @Date: 2019-01-03 22:08:11
 * @Last Modified by: zhenglfsir@gmail.com
 * @Last Modified time: 2019-02-27 22:17:07
 * 个人中心
 */

import React from 'react';
import { Row, Col, Card, Avatar, Icon } from 'antd';
import { connect } from 'react-redux';
import styles from './permission.scss';
import userImage from 'assets/user.png';
import projectImage from 'assets/project.png';

class PersonCenter extends React.Component {
  render() {
    const { appState } = this.props;
    const { user } = appState;

    return (
      <>
        <Row gutter={20}>
          <Col span={6}>
            <Card className={styles['person-card']} bordered={false}>
              <div className={styles['person-card-header']}>
                <Avatar size={80} src={userImage} />
                <h3 style={{ marginTop: 10 }}>{user.username}</h3>
                <p>哈纳百川</p>
              </div>
              <div className={styles['person-desc']}>
                <p>
                  <Icon type="user" />
                  <span className={styles['person-value']}>{user.realName}</span>
                </p>
                <p>
                  <Icon type="gift" />
                  <span className={styles['person-value']}>{user.position}</span>
                </p>
                <p>
                  <Icon type="cluster" />
                  <span className={styles['person-value']}>{user.roleName}</span>
                </p>
                <p>
                  <Icon type="environment" />
                  <span className={styles['person-value']}>{user.department}</span>
                </p>
              </div>
            </Card>
          </Col>
          <Col span={18}>
            <Row gutter={10}>
              <Col span={8} style={{ marginBottom: 10 }}>
                <Card hoverable cover={<img src={projectImage} />}>
                  <Card.Meta title="Alipy" description="w" />
                </Card>
              </Col>
              <Col span={8} style={{ marginBottom: 10 }}>
                <Card hoverable cover={<img src={projectImage} />}>
                  <Card.Meta title="Alipy" description="w" />
                </Card>
              </Col>
              <Col span={8} style={{ marginBottom: 10 }}>
                <Card hoverable cover={<img src={projectImage} />}>
                  <Card.Meta title="Alipy" description="w" />
                </Card>
              </Col>
              <Col span={8} style={{ marginBottom: 10 }}>
                <Card hoverable cover={<img src={projectImage} />}>
                  <Card.Meta title="Alipy" description="w" />
                </Card>
              </Col>
              <Col span={8} style={{ marginBottom: 10 }}>
                <Card hoverable cover={<img src={projectImage} />}>
                  <Card.Meta title="Alipy" description="w" />
                </Card>
              </Col>
              <Col span={8} style={{ marginBottom: 10 }}>
                <Card hoverable cover={<img src={projectImage} />}>
                  <Card.Meta title="Alipy" description="w" />
                </Card>
              </Col>
            </Row>
          </Col>
        </Row>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  appState: state.appState,
});

export default connect(mapStateToProps)(PersonCenter);
