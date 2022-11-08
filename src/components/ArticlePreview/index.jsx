import React from "react"
import { Link } from "react-router-dom"
import agent from "services/agent"
import { connect } from "react-redux"
import { ARTICLE_FAVORITED, ARTICLE_UNFAVORITED } from "constants/actionTypes"
import { TagsList, Title, Text, Button } from "../UI"
import { ArticleMeta } from "../UI/ArticleMeta"
import style from "./ArticlePreview.module.scss"
import { LikeButton } from "../UI/Buttons/LikeButton"
import { ROUTES } from "constants/routes"
import PropTypes from "prop-types"
import { article, user } from "constants/types"

const mapStateToProps = (state) => ({
	currentUser: state.common.currentUser,
})

const mapDispatchToProps = (dispatch) => ({
	favorite: (slug) =>
		dispatch({
			type: ARTICLE_FAVORITED,
			payload: agent.Articles.favorite(slug),
		}),
	unfavorite: (slug) =>
		dispatch({
			type: ARTICLE_UNFAVORITED,
			payload: agent.Articles.unfavorite(slug),
		}),
})

const ArticlePreview = ({ article, currentUser, image, unfavorite, favorite }) => {
	const handleFavouriteClick = (ev) => {
		ev.preventDefault()
		if (!currentUser) return window.location.replace(ROUTES.LOGIN)
		if (article.favorited) unfavorite(article.slug)
		else favorite(article.slug)
	}

	return (
		<article className={style.wrapper}>
			<div className={style.content__wrapper}>
				<ArticleMeta image={article.author.image} username={article.author.username} createdAt={article.createdAt}>
					<LikeButton favorited={article.favorited} onClick={handleFavouriteClick}>
						{article.favoritesCount || ""}
					</LikeButton>
				</ArticleMeta>
				<div className={style.article}>
					<Title type={3}>{article.title}</Title>
					<Text color="secondary">{article.description}</Text>
				</div>
				<div className={style.footer}>
					<Link to={`${ROUTES.ARTICLE_DEFAULT}${article.slug}`} className={style.link}>
						<Button type="link">Read more</Button>
					</Link>
					<TagsList tags={article.tagList} />
				</div>
			</div>
		</article>
	)
}

export default connect(mapStateToProps, mapDispatchToProps)(ArticlePreview)

ArticlePreview.propTypes = {
	article: article,
	currentUser: user,
	image: PropTypes.string,
	unfavorite: PropTypes.func.isRequired,
	favorite: PropTypes.func.isRequired,
}
