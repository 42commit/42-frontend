import ArticleList from "../ArticleList"
import React from "react"
import agent from "../../agent"
import { connect } from "react-redux"
import { CHANGE_TAB } from "../../constants/actionTypes"
import Tab from "components/Tab/tab"
import TabList from "components/Tab/tab-list"

export const TagFilterTab = (props) => {
	if (!props.tag) return null

	return (
		<li className="nav-item">
			<a href="" className="nav-link active">
				<i className="ion-pound"></i> {props.tag}
			</a>
		</li>
	)
}

const mapStateToProps = (state) => ({
	...state.articleList,
	tags: state.home.tags,
	token: state.common.token,
})

const mapDispatchToProps = (dispatch) => ({
	onTabClick: (tab, pager, payload) => dispatch({ type: CHANGE_TAB, tab, pager, payload }),
})

const MainView = (props) => {
	const tabs = [{
		name: "Your Feed",
		tabName: "feed"
	},
	{
		name: "Global Feed",
		tabName: "all"
	},
	]
	return (
		<div className="col-md-9">
			<TabList onTabClick={props.onTabClick} tag={props.tag} tabs={tabs} tab={props.tab} />
			<ArticleList
				pager={props.pager}
				articles={props.articles}
				loading={props.loading}
				articlesCount={props.articlesCount}
				currentPage={props.currentPage}
			/>
		</div>
	)
}

export default connect(mapStateToProps, mapDispatchToProps)(MainView)
