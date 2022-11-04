import React, { useCallback, useEffect, useMemo, useState } from "react"
import { connect } from "react-redux"
import { APPLY_TAG_FILTER, PROFILE_PAGE_LOADED, PROFILE_PAGE_UNLOADED } from "constants/actionTypes"
import agent from "agent"
import { Banner } from "components/Banner"
import { Sidebar, TabList, TagsList } from "components/UI"
import style from "./Profile.module.scss"
import ArticleList from "components/UI/ArticleList"
import { ROUTES } from "constants/routes"

const mapStateToProps = (state) => ({
	...state.articleList,
	currentUser: state.common.currentUser,
	profile: state.profile,
})

const mapDispatchToProps = (dispatch) => ({
	onLoad: (payload) => dispatch({ type: PROFILE_PAGE_LOADED, payload }),
	onUnload: () => dispatch({ type: PROFILE_PAGE_UNLOADED }),
	onClickTag: (tag, pager, payload) => dispatch({ type: APPLY_TAG_FILTER, tag, pager, payload }),
})

const ProfileFavorites = ({
	onLoad,
	onUnload,
	match,
	pager,
	articles,
	articlesCount,
	onClickTag,
	profile,
	currentPage,
}) => {
	const [selectedTag, setSelectedTag] = useState(null)
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
			route: `/@${profile.username}${ROUTES.FAVORITES_DEFAULT}`,
		},
	]

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
	return (
		<>
			<Banner variant="user" />
			<div className={style.wrapper}>
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
		</>
	)
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileFavorites)
