import { applyMiddleware, createStore } from "redux"
import { createLogger } from "redux-logger"
import { composeWithDevTools } from "redux-devtools-extension/developmentOnly"
import { promiseMiddleware, localStorageMiddleware } from "./middleware"
import reducer from "./reducer"

import { routerMiddleware } from "react-router-redux"
import { createBrowserHistory } from "history"

export const history = createBrowserHistory()

// Build the middleware for intercepting and dispatching navigation actions
const myRouterMiddleware = routerMiddleware(history)

const getMiddleware = () => {
	// eslint-disable-next-line no-undef
	if (process.env.NODE_ENV === "production")
		return applyMiddleware(myRouterMiddleware, promiseMiddleware, localStorageMiddleware)
	// Enable additional logging in non-production environments.
	else return applyMiddleware(myRouterMiddleware, promiseMiddleware, localStorageMiddleware, createLogger())
}

export const store = createStore(reducer, composeWithDevTools(getMiddleware()))
