import Route from 'react-router/Route'
import Redirect from 'react-router/Redirect'


const createPartial = (route) =>
    route.redirect == null
        ? class PartialRoute extends Route {
            static defaultProps = {
                path: route.path,
                exact: route.exact,
                strict: route.strict,
                component: route.component,
            }
        }
        : class PartialRedirect extends Redirect {
            static defaultProps = {
                exact: route.exact,
                strict: route.strict,
                push: route.redirect.push,
                from: route.redirect.from || route.path,
                to: route.redirect.to,
            }
        }

export default function createPartialRoutes(routes) {
    let partialRoutes = {}

    for (let i = 0; i < routes.length; i++) {
        const route = routes[i]
        partialRoutes[route.name || route.path] = createPartial(route)
    }

    return partialRoutes
}
