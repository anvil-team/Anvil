import React from 'react';
import { Layout, Menu, Breadcrumb } from 'antd';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
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
            <Menu
              mode="inline"
              selectedKeys={this.getSelectedKeys()}
              defaultOpenKeys={this.getOpenKeys()}
            >
              {appState.userMenus.map((menu) =>
                menu.childCategory ? (
                  <Menu.SubMenu key={menu.parentName} title={menu.parentName}>
                    {menu.childCategory.map((subMenu) => (
                      <Menu.Item key={subMenu.url}>
                        <Link to={subMenu.url}>{subMenu.categoryName}</Link>
                      </Menu.Item>
                    ))}
                  </Menu.SubMenu>
                ) : (
                  <Menu.Item key={menu.parentName}>
                    <Link to={menu.url}>{menu.parentName}</Link>
                  </Menu.Item>
                )
              )}
            </Menu>
          </Layout.Sider>
          <Layout.Content>
            {this.getMenu() ? (
              <div className={styles.breadcrumb}>
                <Breadcrumb>{this.renderBreadcrumb()}</Breadcrumb>
              </div>
            ) : null}
            <div className={styles.content}>{children}</div>
          </Layout.Content>
        </Layout>
      </Layout>
    );
  }

  renderBreadcrumb = () => {
    const { history } = this.props;
    const menu = this.getMenu();
    return (
      <>
        <Breadcrumb.Item>{menu?.parentName || ''}</Breadcrumb.Item>
        {menu ? (
          <Breadcrumb.Item>
            {menu.childCategory.find((sub) => sub.url === history.location.pathname).categoryName}
          </Breadcrumb.Item>
        ) : null}
      </>
    );
  };

  getMenu = () => {
    const { history, appState } = this.props;
    const { userMenus } = appState;
    const { location } = history;
    return userMenus.find((parent) => {
      const child = parent.childCategory.find((sub) => sub.url === location.pathname);
      if (child) return true;
      return false;
    });
  };

  getOpenKeys = () => {
    const menu = this.getMenu();

    return [menu?.parentName];
  };

  getSelectedKeys = () => {
    const { history } = this.props;

    return [history.location.pathname];
  };
}

const mapStateToProps = ({ appState }) => ({ appState });

export default connect(mapStateToProps)(BasicLayout);
