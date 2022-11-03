import React, { useEffect } from "react"
import agent from "../../agent"
import { connect } from "react-redux"
import { HOME_PAGE_LOADED, HOME_PAGE_UNLOADED, APPLY_TAG_FILTER } from "../../constants/actionTypes"
import { TagsList, Sidebar, Pagination } from "components/UI"
import { Banner } from "components/Banner"
import MainView from "components/MainView"
import style from "./Home.module.scss"

const mapStateToProps = (state) => ({
	...state.home,
	appName: state.common.appName,
	token: state.common.token,
})

const mapDispatchToProps = (dispatch) => ({
	onClickTag: (tag, pager, payload) => dispatch({ type: APPLY_TAG_FILTER, tag, pager, payload }),
	onLoad: (tab, pager, payload) => dispatch({ type: HOME_PAGE_LOADED, tab, pager, payload }),
	onUnload: () => dispatch({ type: HOME_PAGE_UNLOADED }),
})

const Home = ({ token, onLoad, onUnload, tags, onClickTag }) => {
	useEffect(() => {
		const tab = token ? "feed" : "all"
		const articlesPromise = token ? agent.Articles.feed : agent.Articles.all
		onLoad(tab, articlesPromise, Promise.all([agent.Tags.getAll(), articlesPromise()]))

		return onUnload()
	}, [])

	return (
		<>
			<Banner variant="app" />
			<div className={style.main}>
				<MainView />
				<Sidebar>
					<TagsList tags={tags} onClickTag={onClickTag} />
				</Sidebar>
			</div>
			<Pagination />
		</>
	)
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
