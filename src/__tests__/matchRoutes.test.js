// const homeRoute = [
//     {
//         name: 'home',
//         path: '/',
//         exact: true,
//     }
// ]
//
// const listingsRoute = [
//     {
//         name: 'listings',
//         path: '/search',
//     }
// ]
//
// const carDetailRoute = [
//     {
//         name: 'carDetail',
//         path: '/car/:carId',
//     }
// ]
//
// const financeRoute = [
//     {
//         name: 'finance',
//         path: '/finance',
//     },
//     // Redirect from old endpoint
//     {
//         path: '/vehicle/finance',
//         exact: true,
//         status: 301,
//         redirect: {
//             to: '/finance'
//         }
//     }
// ]
//
// const protectRoute = [
//     {
//         name: 'protect',
//         path: '/protect',
//     },
//     // Redirect from old endpoint
//     {
//         path: '/vehicle/protection-plan',
//         exact: true,
//         status: 301,
//         redirect: {
//             to: '/protect'
//         }
//     }
// ]
//
// const researchRoute = [
//     {
//         name: 'research',
//         path: '/research',
//     },
// ]
//
// const articleRoute = [
//     {
//         name: 'article',
//         path: '/article(.*)/:articleId',
//     }
// ]
//
// const staticInfoRoute = [
//     {
//         name: 'staticInfo',
//         path: '/legalinfo',
//         routes: [
//             {
//                 name: 'TermsAndConditions',
//                 path: '/legalinfo/termsandconditions',
//                 routes: [
//                     {
//                         name: 'Nice!',
//                         path: '/legalinfo/termsandconditions/nice'
//                     }
//                 ]
//             },
//             {
//                 name: 'Legal Stuff',
//                 path: '/legalinfo/legalstuff',
//             }
//         ]
//     }
// ]
//
// const notFound404Route = [
//     {
//         name: 'notFound',
//         status: 404,
//     }
// ]
//
//
// const routes = [].concat(
//     homeRoute,
//     listingsRoute,
//     carDetailRoute,
//     financeRoute,
//     protectRoute,
//     researchRoute,
//     articleRoute,
//     staticInfoRoute,
//     notFound404Route,
// )

// console.log('\nmatch: ', match(routes, '/legalinfo/termsandconditions/nice'), '\n')
// console.log('\nmatch: ', match(routes, '/vehicle/finance'), '\n')