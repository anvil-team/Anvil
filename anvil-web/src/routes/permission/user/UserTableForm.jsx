import React, { PureComponent, Fragment } from 'react';
import { connect } from 'react-redux';
import { Table, Button, Input, message, Popconfirm, Divider, Select } from 'antd';
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

  newMember = () => {
    const { data } = this.state;
    const newData = data.map((item) => ({ ...item }));
    newData.push({
      id: `NEW_TEMP_ID_${this.index}`,
      realName: '',
      username: '',
      position: '',
      department: '',
      roleId: null,
      editable: true,
      isNew: true,
    });
    this.index += 1;
    this.setState({ data: newData });
  };

  handleRemove(id) {
    return () => {
      const { data } = this.state;
      const { onChange } = this.props;
      const newData = data.filter((item) => item.id !== id);
      this.setState({ data: newData });
      onChange(newData);
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
        if (!target.realName || !target.username || !target.roleId) {
          message.error('请填写完整成员信息。');
          e.target.focus();
          this.setState({ loading: false });
          return;
        }
        delete target.isNew;
        this.toggleEditable(e, key);
        const { data } = this.state;
        const { onChange } = this.props;
        onChange(data);

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
        />
        <Button
          style={{ width: '100%', marginTop: 16, marginBottom: 8 }}
          type="dashed"
          onClick={this.newMember}
          icon="plus"
        >
          新增成员
        </Button>
      </Fragment>
    );
  }

  getColumns = () => {
    const { userState } = this.props;
    const { roleList } = userState;

    return [
      {
        title: '姓名',
        width: '15%',
        dataIndex: 'realName',
        render: (text, record) => {
          if (record.editable) {
            return (
              <Input
                value={text}
                autoFocus
                onChange={this.handleFieldChange('realName', record.id)}
                onKeyPress={this.handleKeyPress(record.id)}
                placeholder="成员姓名"
              />
            );
          }
          return text;
        },
      },
      {
        title: '用户名',
        width: '15%',
        dataIndex: 'username',
        render: (text, record) => {
          if (record.editable) {
            return (
              <Input
                value={text}
                onChange={this.handleFieldChange('username', record.id)}
                onKeyPress={this.handleKeyPress(record.id)}
                placeholder="工号"
              />
            );
          }
          return text;
        },
      },
      {
        title: '部门信息',
        width: '20%',
        dataIndex: 'department',
        render: (text, record) => {
          if (record.editable) {
            return (
              <Input
                value={text}
                onChange={this.handleFieldChange('department', record.id)}
                onKeyPress={this.handleKeyPress(record.id)}
                placeholder="所属部门"
              />
            );
          }
          return text;
        },
      },
      {
        title: '职位',
        width: '15%',
        dataIndex: 'position',
        render: (text, record) => {
          if (record.editable) {
            return (
              <Input
                placeholder="职位"
                value={text}
                onChange={this.handleFieldChange('position', record.id)}
                onKeyPress={this.handleKeyPress(record.id)}
              />
            );
          }
          return text;
        },
      },
      {
        title: '角色名称',
        width: '15%',
        dataIndex: 'roleName',
        render: (text, record) => {
          if (record.editable) {
            return (
              <Select
                placeholder="选择角色"
                style={{ width: '100%' }}
                value={record.roleId}
                onChange={this.handleFieldChange('roleId', record.id)}
                onKeyPress={this.handleKeyPress(record.id)}
              >
                {roleList.map((role) => (
                  <Select.Option key={role.id} value={role.id}>
                    {role.roleName}
                  </Select.Option>
                ))}
              </Select>
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
                  <Popconfirm title="是否要删除此行？" onConfirm={this.handleRemove(record.id)}>
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
              <a onClick={this.handleToDistributionProject(record)}>分配项目</a>
              <Divider type="vertical" />
              <Popconfirm title="是否要删除此行？" onConfirm={this.handleRemove(record.id)}>
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
    dispatch({
      type: 'user/setUserVis',
      payload: { data: { distributionVis: true, userNow: record } },
    });
  };
}

const mapStateToProps = (state) => ({
  userState: state.userState,
});

export default connect(mapStateToProps)(TableForm);
