import React from 'react'
import { Layout, Menu } from 'antd'
import menus from '../config/menus'
import styles from './layouts.module.scss'

class BasicLayout extends React.Component {
  render() {
    const { children } = this.props
    return (
      <Layout className={styles.layout}>
        <Layout.Header className={styles.header}>
          <div className={styles.logo}>Anvil</div>
        </Layout.Header>
        <Layout>
          <Layout.Sider theme="light">
            <Menu mode="inline">
              {menus.map((menu) =>
                menu.children ? (
                  <Menu.SubMenu key={menu.name} title={menu.name}>
                    {menu.children.map((subMenu) => (
                      <Menu.Item key={subMenu.path}>{subMenu.name}</Menu.Item>
                    ))}
                  </Menu.SubMenu>
                ) : (
                  <Menu.Item key={menu.path}>{menu.name}</Menu.Item>
                )
              )}
            </Menu>
          </Layout.Sider>
          <Layout.Content>
            <div className={styles.content}>{children}</div>
          </Layout.Content>
        </Layout>
      </Layout>
    )
  }
}

export default BasicLayout
