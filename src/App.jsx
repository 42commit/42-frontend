import agent from "services/agent"
import { Header } from "./components"
import React, { useEffect } from "react"
import { connect } from "react-redux"
import { APP_LOAD, REDIRECT } from "constants/actionTypes"
import { Route, Switch } from "react-router-dom"
import { Article, Editor, Home, Login, Register, Settings, Profile, ProfileFavorites, NotFound } from "./pages"
import { push } from "react-router-redux"
import { Loader } from "./components/UI"
import { ROUTES } from "constants/routes"
import PropTypes from "prop-types"

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

const App = ({ onLoad, appLoaded, onRedirect, redirectTo, pushRedirect }) => {
	useEffect(() => {
		const token = window.localStorage.getItem("jwt")
		if (token) agent.setToken(token)

		onLoad(token ? agent.Auth.current() : null, token)
	}, [])

	useEffect(() => {
		if (redirectTo) {
			pushRedirect(redirectTo)
			onRedirect()
		}
	}, [redirectTo])

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

App.propTypes = {
	onRedirect: PropTypes.func.isRequired,
	onUnload: PropTypes.func,
	redirectTo: PropTypes.string,
	appLoaded: PropTypes.bool,
	pushRedirect: PropTypes.func.isRequired,
}
