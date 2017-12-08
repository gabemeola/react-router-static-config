# React Router Static Config

Static route configuration helpers for React Router.

This is a fork off [react-router-config](https://www.npmjs.com/package/react-router-config) with support for partially applied routes (you get to keep your code splitting support) and static switch matching.

## Installation

Using [npm](https://www.npmjs.com/):

	$ npm install --save react-router-static-config

Then with a module bundler like [webpack](https://webpack.github.io/), use as you would anything else:

```js
import { matchRoutes, createPartialRoutes } from 'react-router-static-config'

/* OR */

import matchRoutes from 'react-router-static-config/matchRoutes'
import createPartialRoutes from 'react-router-static-config/createPartialRoutes'
```

The UMD build is also available on [unpkg](https://unpkg.com):

```html
<script src="https://unpkg.com/react-router-static-config/umd/react-router-static-config.min.js"></script>
```

You can find the library on `window.ReactRouterStaticConfig`

## Motivation

With the introduction of React Router v4, there is no longer a centralized route configuration. There are some use-cases where it is valuable to know about all the app's potential routes such as:

- Loading data on the server or in the lifecycle before rendering the next screen
- Linking to routes by name
- Static analysis

This project seeks to define a shared format for others to build patterns on top of.

## Route Configuration Shape

Routes are objects with the same properties as a `<Route>` with a couple differences:

- the only render prop it accepts is `component` (no `render` or `children`)
- introduces the `routes` key for sub routes
- Consumers are free to add any additional props they'd like to a route, you can access `props.route` inside the `component`, this object is a reference to the object used to render and match.
- The `name` is what will be used as object key when using `createPartialRoutes`.

```js
import { matchRoutes } from 'react-router-static-config'


const routes = [
  {
	  path: '/',
	  name: 'Home',
	  exact: true,
	  component: Home
  },
  {
	  path: '/child/:id',
	  name: 'Child',
	  component: Child,
	  routes: [
		  {
			  path: '/child/:id/grand-child',
			  name: 'Grandchild',
			  component: GrandChild
		  }
    ]
  }
]


// Matching the Child route
matchRoutes(routes, '/child/jeff')
```

Static-Config also supports Redirects if you provide a Redirect Object:

```js
const routes = [
	{
		path: '/'
		name: 'Home',
		component: Home,
	},
	{
		path: '/oldhome'
		redirect: {
			to: '/'
			push: true,
		}
	}
]
```


**Note**: Just like `<Route>`, relative paths are not (yet) supported. When it is supported there, it will be supported here.

## API

### `matchRoutes(routes<object>, pathname<string>, useSwitch<bool> = true)`

Returns matched route.  
Returns an array of matched routes if `useSwitch = false`.

#### Parameters
- routes - the route configuration
- pathname - the [pathname](https://developer.mozilla.org/en-US/docs/Web/API/HTMLHyperlinkElementUtils/pathname) component of the url. This must be a decoded string representing the path.
- useSwitch - If should use [`<Switch>`](https://reacttraining.com/react-router/web/api/Switch) behavior. Recurses with child routes first if they are available to find match. This means nested child routes with be matched first when using switch.

```js
import { matchRoutes } from 'react-router-static-config'
const branch = matchRoutes(routes, '/child/23', false)
// using the routes shown earlier, this returns
// [
//   routes[0],
//   routes[0].routes[1]
// ]


// Using matchRoute's switch
import { matchRoutes } from 'react-router-static-config'

const match = matchRoutes(routes, '/child/23/grand-child')

// With switch, this returns
// {
//      path: '/child/:id/grand-child',
//			name: 'Grandchild',
//			component: GrandChild
//  }
```


### `createPartialRoutes(routes)`

In order to ensure that matching outside of render with `matchRoutes` and inside of render result in the same branch, you must use `createPartialRoutes` instead of `<Route>` inside your components. You can render a `<Route>` still, but know that it will not be accounted for in `matchRoutes` outside of render.

```js
import { BrowserRouter, Switch } from 'react-router'
import { createPartialRoutes } from 'react-router-static-config'

const Home = () => (
  <div>
    <h2>Home</h2>
  </div>
)


// Ideally you would put this in another file
const childRoutes = [
  {
    path: '/child/:id/grand-child',
    name: 'Grandchild',
  }
]

const routes = [
  {
	  path: '/',
	  name: 'Home',
	  exact: true,
	  component: Home
  },
  {
	  path: '/child/:id',
	  name: 'Child',
	  routes: childRoutes,
  }
]


const partialRoutes = createPartialRoutes(routes)

const GrandChild = ({ someProp }) => (
  <div>
    <h3>Grand Child</h3>
    <div>{someProp}</div>
  </div>
)

const Child = () => {
    const childRoutes = createPartialRoutes(childRoutes);
    return (
        <div>
          <h2>Child</h2>
          
          <childRoutes.GrandChild component={GrandChild} />
        </div>
    )
}

const Root = () => (
  <div>
    <h1>Root</h1>
    
    <Switch>
	    {/* Since we already declared our component in config we don't need to apply any more props */}
	    <partialRoutes.Home />
	    
	    <partialRoutes.Child component={Child} />
    </Switch>
  </div>
)


ReactDOM.render((
  <BrowserRouter>
    {/* kick it all off with the root route */}
    <Root />
  </BrowserRouter>
), document.getElementById('root'))

```

