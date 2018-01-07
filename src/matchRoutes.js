import matchPath from 'react-router/matchPath'


export default function matchRoutes(config, pathname, shouldSwitch = true) {
    let matches = []

    for (let i = 0; i < config.length; i++) {
        const isMatch = matchPath(pathname, config[i])

        if (isMatch) {
            // Look through subroutes first
            if (config[i].routes) {
                // Add on Recursion of sub routes.
                matches = matchRoutes(config[i].routes, pathname, false).concat(matches)
            }

            matches.push(config[i])

            // Return out if we found a match in switch mode
            if (matches[0] && shouldSwitch) return matches[0]
        }
    }

    return matches
}
