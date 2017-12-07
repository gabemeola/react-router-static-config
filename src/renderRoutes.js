import React from 'react'
import Switch from 'react-router/Switch'
import Route from 'react-router/Route'
import Redirect from 'react-router/Redirect'

const renderRoutes = (routes, extraProps = {}, switchProps = {}) => routes ? (
  <Switch {...switchProps}>
    {routes.map((route, i) =>
      route.redirect == null
        ? (
            <Route
              key={route.key || i}
              path={route.path}
              exact={route.exact}
              strict={route.strict}
              render={(props) => (
                <route.component {...props} {...extraProps} route={route}/>
              )}
            />
        )
        : (
          <Redirect
            key={route.key || i}
            push={route.redirect.push}
            from={route.redirect.from || route.path}
            to={route.redirect.to}
            exact={route.exact}
            strict={route.strict}
          />
        )
    )}
  </Switch>
) : null

export default renderRoutes
