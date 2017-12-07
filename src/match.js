import matchPath from 'react-router/matchPath'


export default function match(config, pathname, shouldSwitch = true) {
    let matches = []

    for (let i = 0; i < config.length; i++) {
        const isMatch = matchPath(pathname, config[i])
        console.log(config[i].name, isMatch)
        if (isMatch) {
            // Look through subroutes first
            if (config[i].routes) {
                console.log(`\nRoutes of: ${config[i].name}`)
                // Add on Recursion of sub routes.
                matches = match(config[i].routes, pathname, false).concat(matches)
            }

            matches.push(config[i])

            // Return out if we found a match in switch mode
            if (matches[0] && shouldSwitch) return matches[0]
        }
    }

    return matches
}


const homeRoute = [
    {
        name: 'home',
        path: '/',
        exact: true,
    }
]

const listingsRoute = [
    {
        name: 'listings',
        path: '/search',
    }
]

const carDetailRoute = [
    {
        name: 'carDetail',
        path: '/car/:carId',
    }
]

const financeRoute = [
    {
        name: 'finance',
        path: '/finance',
    },
    // Redirect from old endpoint
    {
        path: '/vehicle/finance',
        exact: true,
        status: 301,
        redirect: {
            to: '/finance'
        }
    }
]

const protectRoute = [
    {
        name: 'protect',
        path: '/protect',
    },
    // Redirect from old endpoint
    {
        path: '/vehicle/protection-plan',
        exact: true,
        status: 301,
        redirect: {
            to: '/protect'
        }
    }
]

const researchRoute = [
    {
        name: 'research',
        path: '/research',
    },
]

const articleRoute = [
    {
        name: 'article',
        path: '/article(.*)/:articleId',
    }
]

const staticInfoRoute = [
    {
        name: 'staticInfo',
        path: '/legalinfo',
        routes: [
            {
                name: 'TermsAndConditions',
                path: '/legalinfo/termsandconditions',
                routes: [
                    {
                        name: 'Nice!',
                        path: '/legalinfo/termsandconditions/nice'
                    }
                ]
            },
            {
                name: 'Legal Stuff',
                path: '/legalinfo/legalstuff',
            }
        ]
    }
]

const notFound404Route = [
    {
        name: 'notFound',
        status: 404,
    }
]


const routes = [].concat(
    homeRoute,
    listingsRoute,
    carDetailRoute,
    financeRoute,
    protectRoute,
    researchRoute,
    articleRoute,
    staticInfoRoute,
    notFound404Route,
)

console.log('\nmatch: ', match(routes, '/legalinfo/termsandconditions/nice'), '\n')