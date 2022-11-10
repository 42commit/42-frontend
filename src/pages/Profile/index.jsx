import ArticleList from "components/ArticleList"
import React, { useCallback, useEffect, useMemo, useState } from "react"
import agent from "services/agent"
import { connect } from "react-redux"
import {
	FOLLOW_USER,
	UNFOLLOW_USER,
	PROFILE_PAGE_LOADED,
	PROFILE_PAGE_UNLOADED,
	APPLY_TAG_FILTER,
} from "constants/actionTypes"
import { Pagination, Sidebar, TabList, TagsList } from "components/UI"
import Banner from "components/Banner"
import style from "./Profile.module.scss"
import PropTypes from "prop-types"
import { article, user } from "constants/types"
import { Loader } from "components/UI"

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

const Profile = ({ onLoad, onUnload, profile, articles, articlesCount, currentPage, match, pager, onClickTag }) => {
	const [selectedTag, setSelectedTag] = useState()
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
	const getUserTag = useMemo(() => {
		if (!profile.tags) return []
		return profile.tags.filter((t) => {
			return articles.find((a) => a.tagList.find((at) => at === t))
		})
	}, [articles])

	const filteredArticles = useCallback(
		(selectedTag) => {
			if (!articles) return []
			if (!selectedTag) return articles
			return articles.filter((article) => article.tagList.find((articleTag) => articleTag === selectedTag))
		},
		[articles],
	)

	const clickTagHandler = (tag) => {
		if (selectedTag === tag) {
			setSelectedTag(null)
			onClickTag(null, pager, { articles, articlesCount })
		} else {
			setSelectedTag(tag)
			onClickTag(tag, pager, { articles, articlesCount })
		}
	}

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
					<div className={style.articles}>
						<TabList tabs={tabs} tagsOff />
						<ArticleList
							pager={pager}
							articles={filteredArticles(selectedTag)}
							articlesCount={articlesCount}
							currentPage={currentPage}
						/>
					</div>
					<Sidebar>
						<TagsList tags={getUserTag} onClickTag={clickTagHandler} />
					</Sidebar>
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
