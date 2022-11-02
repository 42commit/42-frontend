import ArticleList from "../UI/ArticleList"
import React from "react"
import { Link } from "react-router-dom"
import agent from "../../agent"
import { connect } from "react-redux"
import { FOLLOW_USER, UNFOLLOW_USER, PROFILE_PAGE_LOADED, PROFILE_PAGE_UNLOADED } from "../../constants/actionTypes"
import { Sidebar, TabList, TagsList } from "../UI"
import { Banner } from "../Banner"
import style from "./Profile.module.scss"

const mapStateToProps = (state) => ({
	...state.articleList,
	currentUser: state.common.currentUser,
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
})

class Profile extends React.Component {
	componentDidMount() {
		this.props.onLoad(
			Promise.all([
				agent.Profile.get(this.props.match.params.username),
				agent.Articles.byAuthor(this.props.match.params.username),
				agent.Tags.getAll(),
			]),
		)
	}

	componentWillUnmount() {
		this.props.onUnload()
	}

	render() {
		const tabs = [
			{
				title: "Ваши посты",
				route: `/@${this.props.profile.username}`,
			},
			{
				title: "Любимые посты",
				route: `/@${this.props.profile.username}/favorites`,
			},
		]
		const profile = this.props.profile
		if (!profile) return null

		return (
			<>
				<Banner variant="user" />
				<div className={style.wrapper}>
					<div className={style.articles}>
						<TabList tabs={tabs} />
						<ArticleList
							pager={this.props.pager}
							articles={this.props.articles}
							articlesCount={this.props.articlesCount}
							currentPage={this.props.currentPage}
						/>
					</div>
					<Sidebar>
						<TagsList tags={this.props.profile.tags} />
					</Sidebar>
				</div>
			</>
		)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile)
export { Profile, mapStateToProps }
