import React from 'react';
import { Layout, Menu } from 'antd';
import { connect } from 'react-redux';
// import menus from '../config/menus';
import styles from './layouts.scss';

class BasicLayout extends React.Component {
  render() {
    const { children, appState } = this.props;
    return (
      <Layout className={styles.layout}>
        <Layout.Header className={styles.header}>
          <div className={styles.logo}>Anvil</div>
        </Layout.Header>
        <Layout>
          <Layout.Sider theme="light">
            <Menu mode="inline">
              {appState.userMenus.map((menu) =>
                menu.childCategory ? (
                  <Menu.SubMenu key={menu.parentName} title={menu.parentName}>
                    {menu.childCategory.map((subMenu) => (
                      <Menu.Item key={subMenu.url}>{subMenu.categoryName}</Menu.Item>
                    ))}
                  </Menu.SubMenu>
                ) : (
                  <Menu.Item key={menu.parentName}>{menu.parentName}</Menu.Item>
                )
              )}
            </Menu>
          </Layout.Sider>
          <Layout.Content>
            <div className={styles.content}>{children}</div>
          </Layout.Content>
        </Layout>
      </Layout>
    );
  }
}

const mapStateToProps = ({ appState }) => ({ appState });

export default connect(mapStateToProps)(BasicLayout);
