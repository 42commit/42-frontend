import { ROUTES } from "constants/routes"
import React from "react"
import { connect } from "react-redux"

const mapStateToProps = (state) => ({
	currentUser: state.common.currentUser,
	appLoaded: state.common.appLoaded,
})

export const withProtectRoute = (Сomponent, mustAuth = true) => {
	const ProtectRoute = ({ appLoaded, currentUser, ...props }) => {
		if (!appLoaded) return null

		if (!!currentUser === mustAuth) return <Сomponent {...props} />

		else window.location.replace(mustAuth ? ROUTES.LOGIN : ROUTES.HOME)
	}

	return connect(mapStateToProps)(ProtectRoute)
}
