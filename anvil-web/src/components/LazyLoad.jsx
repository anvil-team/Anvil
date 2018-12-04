import React from 'react'
import Loadable from 'react-loadable'
import { Skeleton } from 'antd'

function Loading() {
  return <Skeleton active />
}

const LazyLoad = (loader) => {
  return Loadable({
    loader,
    loading: Loading,
    delay: 300,
  })
}

export default LazyLoad
