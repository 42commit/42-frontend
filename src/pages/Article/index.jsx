import CommentContainer from "../../components/Article/CommentContainer"
import React, { useEffect } from "react"
import agent from "services/agent"
import { connect } from "react-redux"
import marked from "marked"
import { ARTICLE_PAGE_LOADED, ARTICLE_PAGE_UNLOADED } from "constants/actionTypes"
import { TagsList, Title } from "components/UI"
import Banner from "components/Banner"
import style from "./Article.module.scss"
import PropTypes from "prop-types"
import { article, comment, user } from "constants/types"
import { Loader } from "components/UI"

const mapStateToProps = (state) => ({
	...state.article,
	currentUser: state.common.currentUser,
})

const mapDispatchToProps = (dispatch) => ({
	onLoad: (payload) => dispatch({ type: ARTICLE_PAGE_LOADED, payload }),
	onUnload: () => dispatch({ type: ARTICLE_PAGE_UNLOADED }),
})

const Article = ({ onLoad, onUnload, article, currentUser, comments, commentErrors, match }) => {
	useEffect(() => {
		onLoad(Promise.all([agent.Articles.get(match.params.id), agent.Comments.forArticle(match.params.id)]))
		return () => {
			onUnload()
		}
	}, [])

	if (!article) return <Loader />

	const markup = { __html: marked(article.body, { sanitize: true }) }
	return (
		<div className={style.wrapper}>
			<Banner variant="article" />
			<div className={style.main}>
				<Title type={2}>{article.title}</Title>
				<div className={style.text} dangerouslySetInnerHTML={markup}></div>
				<div>
					<TagsList tags={article.tagList} />
				</div>
			</div>
			<CommentContainer
				comments={comments || []}
				errors={commentErrors}
				slug={match.params.id}
				currentUser={currentUser}
			/>
		</div>
	)
}

export default connect(mapStateToProps, mapDispatchToProps)(Article)

Article.propTypes = {
	onLoad: PropTypes.func.isRequired,
	onUnload: PropTypes.func.isRequired,
	currentUser: user,
	comments: PropTypes.arrayOf(comment.isRequired),
	article: article,
	commentErrors: PropTypes.object,
}
