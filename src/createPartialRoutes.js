import React from 'react'
import Route from 'react-router/Route'
import Redirect from 'react-router/Redirect'


function createPartial(route) {
    if (route.redirect == null) {
        // return class extends Redirect {
        //     static defaultProps = {
        //         exact: route.exact,
        //         strict: route.strict,
        //         push: route.redirect.push,
        //         from: route.redirect.from || route.path,
        //         to: route.redirect.to,
        //     }
        // }

        // eslint-disable-next-line no-inner-declarations
        function PartialRedirect(props) {
            const passProps = Object.assign({
                exact: route.exact,
                strict: route.strict,
                push: route.redirect.push,
                from: route.redirect.from || route.path,
                to: route.redirect.to,
            }, props)

            return React.createElement(Redirect, passProps)
        }
        PartialRedirect.propTypes = Redirect.propTypes

        return PartialRedirect
    }

    function PartialRoute({ component: Comp, render: renderFunc, ...props }) {
        return React.createElement(Route, Object.assign({}, props, {
            render(props) {
                const passProps = Object.assign({ routes: route.routes }, props)

                return typeof renderFunc !== 'undefined'
                    ? renderFunc(passProps)
                    : React.createElement(Comp, passProps)
            }
        }))
    }
    PartialRoute.defaultProps = {
        path: route.path,
        exact: route.exact,
        strict: route.strict,
        component: route.component,
    }
    PartialRoute.propTypes = Route.propTypes

    return PartialRoute
}


export default function createPartialRoutes(routes) {
    let partialRoutes = {}
    if (routes == null) return partialRoutes

    for (let i = 0; i < routes.length; i++) {
        const route = routes[i]
        partialRoutes[route.name || route.path || route.redirect.from] = createPartial(route)
    }

    return partialRoutes
}
