import Route from 'react-router/Route'
import Redirect from 'react-router/Redirect'


const createPartialRoute = (route) =>
    route.redirect == null
        ? class PartialRoute extends Route {
            static defaultProps = {
                path: route.path,
                exact: route.exact,
                strict: route.strict,
            }
        }
        : class PartialRedirect extends Redirect {
            static defaultProps = {
                exact: route.exact,
                strict: route.strict,
                push: route.redirect.push,
                from: route.redirect.from || route.path,
                to: route.redirect.to
            }
        }

export default function createRoutes(routes) {
    let partialRoutes = {}

    for (let i = 0; i < routes.length; i++) {
        const route = routes[i]
        partialRoutes[route.name || route.path] = createPartialRoute(route)
    }

    return partialRoutes
}
