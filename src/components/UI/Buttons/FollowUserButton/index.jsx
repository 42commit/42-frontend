import agent from "services/agent"
import { MinusIcon, PlusIcon } from "components/Icons"
import { FOLLOW_USER, UNFOLLOW_USER } from "constants/actionTypes"
import React from "react"
import { connect } from "react-redux"
import { Button } from "../.."
import PropTypes from 'prop-types'
import { user } from "constants/types"

const mapStateToProps = (state) => {
	return {
		currentUser: state.common.currentUser,
		profile: state.profile,
	}
}

const mapDispatchToProps = (dispatch) => ({
	onFollow: (username) =>
		dispatch({
			type: FOLLOW_USER,
			payload: agent.Profile.follow(username),
		}),

	onUnfollow: (username) =>
		dispatch({
			type: UNFOLLOW_USER,
			payload: agent.Profile.unfollow(username),
		}),
})

const FollowUserButton = ({ currentUser, profile, onFollow, onUnfollow }) => {
	if (currentUser && profile.username === currentUser.username) {
		return null
	}

	const handleClick = (e) => {
		e.preventDefault()
		profile.following ? onUnfollow(profile.username) : onFollow(profile.username)
	}

	const buttonContent = profile.following ? (<>
		<MinusIcon />
		<span>Отписаться</span>
	</>) : (<>
		<PlusIcon />
		<span>Подписаться</span>
	</>)

	return <Button onClick={handleClick}>{buttonContent}</Button>
}

export default connect(mapStateToProps, mapDispatchToProps)(FollowUserButton)

FollowUserButton.propTypes = {
	currentUser: user,
	profile: user,
	onFollow: PropTypes.func,
	onUnfollow: PropTypes.func,
}