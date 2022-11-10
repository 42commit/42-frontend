import { ArticleList } from "components"
import { TabList } from "components/UI"
import React from "react"
import { connect } from "react-redux"
import style from "./MainView.module.scss"
import PropTypes from "prop-types"
import { article, user } from "constants/types"

const mapStateToProps = (state) => ({
	...state.articleList,
	tags: state.home.tags,
	token: state.common.token,
	currentUser: state.common.currentUser,
	selectedTag: state.articleList.tag || (state.articleList.tags && state.articleList.tags[0]),
})

const MainView = ({ currentUser, pager, articles, articlesCount, currentPage }) => {
	const userTabs = [
		{
			title: "Ваша лента",
			eventKey: "feed",
		},
		{
			title: "Лента",
			eventKey: "all",
		},
	]
	const anonymousTabs = [
		{
			title: "Лента",
			eventKey: "all",
		},
	]

	return (
		<div className={style.main}>
			<TabList tabs={currentUser ? userTabs : anonymousTabs} />
			<ArticleList pager={pager} articles={articles} articlesCount={articlesCount} currentPage={currentPage} />
		</div>
	)
}

export default connect(mapStateToProps)(MainView)

MainView.propTypes = {
	currentUser: user,
	articles: PropTypes.arrayOf(article),
	currentPage: PropTypes.number,
	articlesCount: PropTypes.number,
	pager: PropTypes.func,
}
