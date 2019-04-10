import React, { PureComponent, Fragment } from 'react';
import { connect } from 'react-redux';
import { Table, Button, Input, message, Popconfirm, Divider } from 'antd';
import { isEqual } from 'lodash';

class TableForm extends PureComponent {
  index = 0;

  cacheOriginData = {};

  constructor(props) {
    super(props);

    this.state = {
      data: props.value,
      loading: false,
      /* eslint-disable-next-line react/no-unused-state */
      value: props.value,
    };
  }

  static defaultProps = { onChange() {} };

  static getDerivedStateFromProps(nextProps, preState) {
    if (isEqual(nextProps.value, preState.value)) {
      return null;
    }
    return {
      data: nextProps.value,
      value: nextProps.value,
    };
  }

  getRowByKey(key, newData) {
    const { data } = this.state;
    return (newData || data).filter((item) => item.id === key)[0];
  }

  toggleEditable = (key) => {
    return (e) => {
      e.preventDefault();
      const { data } = this.state;
      const newData = data.map((item) => ({ ...item }));
      const target = this.getRowByKey(key, newData);
      if (target) {
        // 进入编辑状态时保存原始数据
        if (!target.editable) {
          this.cacheOriginData[key] = { ...target };
        }
        target.editable = !target.editable;
        this.setState({ data: newData });
      }
    };
  };

  handleAddRole = () => {
    const { data } = this.state;
    const newData = data.map((item) => ({ ...item }));
    newData.push({
      id: `NEW_TEMP_ID_${this.index}`,
      roleCode: '',
      roleName: '',
      roleDesc: '',
      editable: true,
      isNew: true,
    });
    this.index += 1;
    this.setState({ data: newData });
  };

  handleRemove(row) {
    return () => {
      const { data } = this.state;
      const { onChange } = this.props;
      const newData = data.filter((item) => item.id !== row.id);
      this.setState({ data: newData });
      if (!row.isNew) {
        row.isDel = true;
        onChange(row);
      }
    };
  }

  handleKeyPress(id) {
    return (e) => {
      if (e.key === 'Enter') this.handleSaveRow(e, id);
    };
  }

  handleFieldChange(fieldName, key) {
    return (e) => {
      const { data } = this.state;
      const newData = data.map((item) => ({ ...item }));
      const target = this.getRowByKey(key, newData);
      if (target) {
        if (e.target) {
          target[fieldName] = e.target.value;
          this.setState({ data: newData });
        } else {
          target[fieldName] = e;
          this.setState({ data: newData });
        }
      }
    };
  }

  handleSaveRow(key) {
    return (e) => {
      e.persist();
      this.setState({ loading: true });

      setTimeout(() => {
        if (this.clickedCancel) {
          this.clickedCancel = false;
          return;
        }
        const target = this.getRowByKey(key) || {};
        if (!target.roleName || !target.roleCode) {
          message.error('请填写完整角色信息。');
          e.target.focus();
          this.setState({ loading: false });
          return;
        }
        delete target.isNew;
        delete target.id;
        this.toggleEditable(e, key);

        const { onChange } = this.props;
        onChange(target);

        this.setState({ loading: false });
      }, 500);
    };
  }

  handleCancel(key) {
    return (e) => {
      this.clickedCancel = true;
      e.preventDefault();
      const { data } = this.state;
      const newData = data.map((item) => ({ ...item }));
      const target = this.getRowByKey(key, newData);
      if (this.cacheOriginData[key]) {
        Object.assign(target, this.cacheOriginData[key]);
        delete this.cacheOriginData[key];
      }
      target.editable = false;
      this.setState({ data: newData });
      this.clickedCancel = false;
    };
  }

  render() {
    const { loading, data } = this.state;

    return (
      <Fragment>
        <Table
          rowKey="id"
          loading={loading}
          columns={this.getColumns()}
          dataSource={data}
          pagination={false}
          size="middle"
        />
        <Button
          style={{ width: '100%', marginTop: 16, marginBottom: 8 }}
          type="dashed"
          onClick={this.handleAddRole}
          icon="plus"
        >
          新增角色
        </Button>
      </Fragment>
    );
  }

  getColumns = () => {
    return [
      {
        title: '角色代码',
        width: '35%',
        dataIndex: 'roleCode',
        render: (text, record) => {
          if (record.editable) {
            return (
              <Input
                value={text}
                autoFocus
                onChange={this.handleFieldChange('roleCode', record.id)}
                onKeyPress={this.handleKeyPress(record.id)}
                placeholder="角色代码"
              />
            );
          }
          return text;
        },
      },
      {
        title: '角色名称',
        width: '20%',
        dataIndex: 'roleName',
        render: (text, record) => {
          if (record.editable) {
            return (
              <Input
                value={text}
                onChange={this.handleFieldChange('roleName', record.id)}
                onKeyPress={this.handleKeyPress(record.id)}
                placeholder="角色名称"
              />
            );
          }
          return text;
        },
      },
      {
        title: '角色描述',
        width: '30%',
        dataIndex: 'roleDesc',
        render: (text, record) => {
          if (record.editable) {
            return (
              <Input
                value={text}
                onChange={this.handleFieldChange('roleDesc', record.id)}
                onKeyPress={this.handleKeyPress(record.id)}
                placeholder="角色名称"
              />
            );
          }
          return text;
        },
      },
      {
        title: '操作',
        key: 'action',
        render: (text, record) => {
          const { loading } = this.state;
          if (!!record.editable && loading) {
            return null;
          }
          if (record.editable) {
            if (record.isNew) {
              return (
                <span>
                  <a onClick={this.handleSaveRow(record.id)}>添加</a>
                  <Divider type="vertical" />
                  <Popconfirm title="是否要删除此行？" onConfirm={this.handleRemove(record)}>
                    <a>删除</a>
                  </Popconfirm>
                </span>
              );
            }
            return (
              <span>
                <a onClick={this.handleSaveRow(record.id)}>保存</a>
                <Divider type="vertical" />
                <a onClick={this.handleCancel(record.id)}>取消</a>
              </span>
            );
          }
          return (
            <span>
              <a onClick={this.toggleEditable(record.id)}>编辑</a>
              <Divider type="vertical" />
              <a onClick={this.handleToDistributionProject(record)}>分配权限</a>
              <Divider type="vertical" />
              <Popconfirm title="是否要删除此行？" onConfirm={this.handleRemove(record)}>
                <a>删除</a>
              </Popconfirm>
            </span>
          );
        },
      },
    ];
  };

  handleToDistributionProject = (record) => () => {
    const { dispatch } = this.props;
    dispatch({ type: 'user/setUserVis', payload: { data: { distributionVis: true } } });
    dispatch({ type: 'user/setState', payload: { userNow: record } });
    dispatch({ type: 'user/fetchUserApplicationAssign' });
  };
}

const mapStateToProps = (state) => ({
  userState: state.userState,
});

export default connect(mapStateToProps)(TableForm);
