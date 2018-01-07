import React from 'react'
import Route from 'react-router/Route'
import Redirect from 'react-router/Redirect'


function createPartial(route) {
    if (route.redirect == null) {
        return class extends Redirect {
            static defaultProps = {
                exact: route.exact,
                strict: route.strict,
                push: route.redirect.push,
                from: route.redirect.from || route.path,
                to: route.redirect.to,
            }
        }
    }

    function PartialRoute({ component: Comp, render: renderFunc, ...props }) {
        return <Route
            {...props}
            render={(props) => {
                const passProps = { ...props, routes: route.routes }

                return typeof renderFunc !== 'undefined'
                    ? renderFunc(passProps)
                    : <Comp {...passProps} />
            }}
        />
    }
    PartialRoute.defaultProps = {
        path: route.path,
        exact: route.exact,
        strict: route.strict,
        component: route.component,
    }

    return PartialRoute
}


export default function createPartialRoutes(routes) {
    let partialRoutes = {}
    if (routes == null) return partialRoutes

    for (let i = 0; i < routes.length; i++) {
        const route = routes[i]
        partialRoutes[route.name || route.path] = createPartial(route)
    }

    return partialRoutes
}
