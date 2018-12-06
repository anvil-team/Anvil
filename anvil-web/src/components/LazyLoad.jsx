import React from 'react'
import Loadable from 'react-loadable'
import { Spin, Icon } from 'antd'

function Loading() {
  return <Spin size="large" indicator={<Icon type="loading" />} />
}

const LazyLoad = (loader) => {
  return Loadable({
    loader,
    loading: Loading,
    delay: 300,
  })
}

export default LazyLoad
