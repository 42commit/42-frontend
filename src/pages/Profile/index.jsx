import { ArticleList, Banner } from "components"
import React, { useEffect } from "react"
import agent from "services/agent"
import { connect } from "react-redux"
import {
	FOLLOW_USER,
	UNFOLLOW_USER,
	PROFILE_PAGE_LOADED,
	PROFILE_PAGE_UNLOADED,
	APPLY_TAG_FILTER,
} from "constants/actionTypes"
import { Pagination, TabList, Loader } from "components/UI"
import style from "./Profile.module.scss"
import PropTypes from "prop-types"
import { article, user } from "constants/types"

const mapStateToProps = (state) => ({
	...state.articleList,
	profile: state.profile,
})

const mapDispatchToProps = (dispatch) => ({
	onFollow: (username) =>
		dispatch({
			type: FOLLOW_USER,
			payload: agent.Profile.follow(username),
		}),
	onLoad: (payload) => dispatch({ type: PROFILE_PAGE_LOADED, payload }),
	onUnfollow: (username) =>
		dispatch({
			type: UNFOLLOW_USER,
			payload: agent.Profile.unfollow(username),
		}),
	onUnload: () => dispatch({ type: PROFILE_PAGE_UNLOADED }),
	onClickTag: (tag, pager, payload) => dispatch({ type: APPLY_TAG_FILTER, tag, pager, payload }),
})

const Profile = ({ onLoad, onUnload, profile, articles, articlesCount, currentPage, match, pager }) => {
	useEffect(() => {
		onLoad(
			Promise.all([
				agent.Profile.get(match.params.username),
				agent.Articles.byAuthor(match.params.username),
				agent.Tags.getAll(),
			]),
		)
		return () => {
			onUnload()
		}
	}, [])

	const tabs = [
		{
			title: "Ваши посты",
			route: `/@${profile.username}`,
		},
		{
			title: "Любимые посты",
			route: `/@${profile.username}/favorites`,
		},
	]

	const getPaginationRequestByAuthor = (username) => (page) => agent.Articles.byAuthor(username, page)

	if (profile.username) {
		return (
			<div className={style.wrapper}>
				<Banner variant="user" />
				<div className={style.main}>
					<TabList tabs={tabs} tagsOff />
					<ArticleList pager={pager} articles={articles} articlesCount={articlesCount} currentPage={currentPage} />
				</div>
				{articlesCount > 5 && <Pagination request={getPaginationRequestByAuthor(profile.username)} />}
			</div>
		)
	}
	return <Loader />
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile)

Profile.propTypes = {
	onLoad: PropTypes.func.isRequired,
	onUnload: PropTypes.func.isRequired,
	onClickTag: PropTypes.func.isRequired,
	articles: PropTypes.arrayOf(article),
	currentPage: PropTypes.number,
	articlesCount: PropTypes.number,
	pager: PropTypes.func,
	match: PropTypes.object.isRequired,
	profile: user,
}
