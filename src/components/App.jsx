import agent from "../agent"
import Header from "./Header"
import React, { useEffect } from "react"
import { connect } from "react-redux"
import { APP_LOAD, REDIRECT } from "../constants/actionTypes"
import { Route, Switch } from "react-router-dom"
import Article from "../components/Article"
import Editor from "../components/Editor"
import Home from "../components/Home"
import Login from "./Login"
import Profile from "../components/Profile"
import Register from "./Register"
import Settings from "../components/Settings"
import { store } from "../store"
import { push } from "react-router-redux"
import { Loader } from "./UI/Loader"
import NotFound from "./NotFound"
import ProfileFavorites from "./Profile/ProfileFavorites"
import { ROUTES } from "constants/routes"

const mapStateToProps = (state) => {
	return {
		appLoaded: state.common.appLoaded,
		appName: state.common.appName,
		currentUser: state.common.currentUser,
		redirectTo: state.common.redirectTo,
		dispatch: state.dispatch,
	}
}

const mapDispatchToProps = (dispatch) => ({
	onLoad: (payload, token) => dispatch({ type: APP_LOAD, payload, token, skipTracking: true }),
	onRedirect: () => dispatch({ type: REDIRECT }),
	pushRedirect: (payload) => dispatch(push(payload)),
})

const App = ({ onLoad, appLoaded, onRedirect, dispatch, redirectTo, pushRedirect }) => {
	useEffect(() => {
		const token = window.localStorage.getItem("jwt")
		if (token) agent.setToken(token)

		onLoad(token ? agent.Auth.current() : null, token)
	}, [])

	useEffect(() => {
		if (redirectTo) {
			// this.context.router.replace(nextProps.redirectTo);
			pushRedirect(redirectTo)
			onRedirect()
		}
	}, [redirectTo, dispatch])

	if (appLoaded)
		return (
			<>
				<Header />
				<Switch>
					<Route exact path={ROUTES.HOME} component={Home} />
					<Route path={ROUTES.LOGIN} component={Login} />
					<Route path={ROUTES.REGISTER} component={Register} />
					<Route path={ROUTES.SLUG} component={Editor} />
					<Route path={ROUTES.EDITOR} component={Editor} />
					<Route path={ROUTES.ARTICLE} component={Article} />
					<Route path={ROUTES.SETTINGS} component={Settings} />
					<Route path={ROUTES.FAVORITES} component={ProfileFavorites} />
					<Route path={ROUTES.PROFILE} component={Profile} />
					<Route component={NotFound} />
				</Switch>
			</>
		)

	return <Loader />
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
