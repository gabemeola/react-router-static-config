import matchPath from 'react-router/matchPath'


export default function matchRoutes(config, pathname, shouldSwitch = true) {
    let matches = []

    for (let i = 0; i < config.length; i++) {
        const isMatch = matchPath(pathname, config[i])
        // console.log(config[i].name, isMatch)
        if (isMatch) {
            // Look through subroutes first
            if (config[i].routes) {
                // console.log(`\nRoutes of: ${config[i].name}`)
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
