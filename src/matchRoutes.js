import matchPath from 'react-router/matchPath'


export default function matchRoutes(config, pathname, shouldSwitch = true, parent) {
    let matches = []

    for (let i = 0; i < config.length; i++) {
        const route = config[i]
        // If we have no parent, fall back to the current route.
        const match = matchPath(pathname, route, parent || route)

        if (match) {
            // Look through subroutes first
            if (route.routes) {
                // Add on Recursion of sub routes.
                matches = matchRoutes(route.routes, pathname, false, route).concat(matches)
            }

            matches.push({
                route,
                match,
            })

            // Return out if we found a match in switch mode
            if (matches[0] && shouldSwitch) return matches[0]
        }
    }

    return matches
}
