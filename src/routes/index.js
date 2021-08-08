import React, { Suspense, lazy, } from 'react';
import { Switch, Route, HashRouter, Redirect } from 'react-router-dom';
import { ConfigProvider, Spin } from 'antd';
const Home = lazy(() => import("../pages"))
const Router = function () {
  return (
    <ConfigProvider>
      <HashRouter>
        <Suspense fallback={
          <Spin tip="加载中..." />
        }
        >
          <Switch>
            <Route path="/" component={Home} />
            <Redirect to="/" />
          </Switch>
        </Suspense>
      </HashRouter>
    </ConfigProvider>
  )
}

export default Router
