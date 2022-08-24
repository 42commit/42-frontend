import Banner from "./Banner"
import MainView from "./MainView"
import React from "react"
import Tags from "./Tags"
import agent from "../../agent"
import { connect } from "react-redux"
import { HOME_PAGE_LOADED, HOME_PAGE_UNLOADED, APPLY_TAG_FILTER } from "../../constants/actionTypes"
import TagsList from "components/Tags/tags-list"
import Sidebar from "components/Sidebar/sidebar"

const Promise = global.Promise

const tags = ["tag1", "tag2", "tag3", "tag4", "tag5", "Tag", "420", "dev"]

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

class Home extends React.Component {
	componentWillMount() {
		const tab = this.props.token ? "feed" : "all"
		const articlesPromise = this.props.token ? agent.Articles.feed : agent.Articles.all
		this.props.onLoad(tab, articlesPromise, Promise.all([agent.Tags.getAll(), articlesPromise()]))
	}

	componentWillUnmount() {
		this.props.onUnload()
	}

	render() {
		return (
			<div className="home-page">
				<Banner token={this.props.token} appName={this.props.appName} />
				<div className="container page">
					<div className="row">
						<MainView />

						<div className="col-md-3">
							<Sidebar>
								<TagsList tags={tags} />
							</Sidebar>
						</div>
					</div>
				</div>
			</div>
		)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
