import matchPath from 'react-router/matchPath'


export default function matchRoutes(config, pathname, shouldSwitch = true) {
    let matches = []

    for (let i = 0; i < config.length; i++) {
        const route = config[i]
        const match = matchPath(pathname, route)

        if (match) {
            // Look through subroutes first
            if (route.routes) {
                // Add on Recursion of sub routes.
                matches = matchRoutes(route.routes, pathname, false).concat(matches)
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
