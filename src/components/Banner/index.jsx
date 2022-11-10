import { Title } from "components/UI"
import { FollowUserButton } from "components/UI"
import { connect } from "react-redux"
import PropTypes from "prop-types"
import React from "react"
import style from "./Banner.module.scss"
import { ArticleMeta } from "components/UI"
import ArticleActions from "components/Article/ArticleActions"
import { Avatar } from "components/Icons/Avatar"
import { article, user } from "constants/types"

const mapStateToProps = (state) => {
	return {
		appName: state.common.appName,
		currentUser: state.common.currentUser,
		profile: state.profile,
		article: state.article.article,
	}
}

const Article = connect(mapStateToProps)(({ article, currentUser }) => {
	const canModify = currentUser && currentUser.username === article.author.username
	return (
		<div className={style.articleWrapper}>
			<ArticleMeta image={article.author.image} username={article.author.username} createdAt={article.createdAt} />
			{canModify && <ArticleActions />}
		</div>
	)
})

const User = connect(mapStateToProps)(({ profile, currentUser }) => {
	return (
		<div className={style.userWrapper}>
			<figure>
				<Avatar size="large" type={profile.image} />
				<figcaption>
					<Title type={3}>{profile.username}</Title>
				</figcaption>
			</figure>
			{currentUser && profile.username !== currentUser.username && (
				<div className={style.button}>
					<FollowUserButton />
				</div>
			)}
		</div>
	)
})

const App = connect(mapStateToProps)(({ appName }) => {
	return (
		<div className={style.titleWrapper}>
			<Title type={1} shadow>
				{appName}
			</Title>
			<Title type={3}>Место, где готовится новый опыт</Title>
		</div>
	)
})

const Banner = ({ variant }) => {
	const bannerVariants = {
		app: App,
		user: User,
		article: Article,
	}

	return <div className={style.banner}>{React.createElement(bannerVariants[variant])}</div>
}

export default connect(mapStateToProps)(Banner)

Banner.propTypes = {
	variant: PropTypes.oneOf(["app", "user", "article"]).isRequired,
}

App.propTypes = {
	appName: PropTypes.string,
}

User.propTypes = {
	profile: user,
	currentUser: user,
}

Article.propTypes = {
	article: article,
}
