import React, { useEffect } from "react"
import { connect } from "react-redux"
import { APPLY_TAG_FILTER, PROFILE_PAGE_LOADED, PROFILE_PAGE_UNLOADED } from "constants/actionTypes"
import agent from "services/agent"
import { Banner, ArticleList } from "components"
import { Pagination, TabList, Loader } from "components/UI"
import style from "./ProfileFavorites.module.scss"
import { ROUTES } from "constants/routes"
import PropTypes from "prop-types"
import { article, user } from "constants/types"

const mapStateToProps = (state) => ({
	...state.articleList,
	profile: state.profile,
})

const mapDispatchToProps = (dispatch) => ({
	onLoad: (payload) => dispatch({ type: PROFILE_PAGE_LOADED, payload }),
	onUnload: () => dispatch({ type: PROFILE_PAGE_UNLOADED }),
	onClickTag: (tag, pager, payload) => dispatch({ type: APPLY_TAG_FILTER, tag, pager, payload }),
})

const ProfileFavorites = ({ onLoad, onUnload, match, pager, articles, articlesCount, profile, currentPage }) => {
	useEffect(() => {
		onLoad(
			Promise.all([
				agent.Profile.get(match.params.username),
				agent.Articles.favoritedBy(match.params.username),
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
			route: `/@${profile.username}${ROUTES.FAVORITES_DEFAULT}`,
		},
	]

	const getPaginationRequestFavoritedBy = (username) => (page) => agent.Articles.favoritedBy(username, page)

	if (profile.username) {
		return (
			<div className={style.wrapper}>
				<Banner variant="user" />
				<div className={style.main}>
					<TabList tabs={tabs} tagsOff />
					<ArticleList pager={pager} articles={articles} articlesCount={articlesCount} currentPage={currentPage} />
				</div>
				{articlesCount > 5 && <Pagination request={getPaginationRequestFavoritedBy(profile.username)} />}
			</div>
		)
	}
	return <Loader />
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileFavorites)

ProfileFavorites.propTypes = {
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
