import React from "react"
import { Link } from "react-router-dom"
import agent from "agent"
import { connect } from "react-redux"
import { ARTICLE_FAVORITED, ARTICLE_UNFAVORITED } from "constants/actionTypes"
import { TagsList, Title, Text, Button } from ".."
import { ArticleMeta } from "../ArticleMeta"
import style from './ArticlePreview.module.scss'
import { LikeUnlikeButton } from "../LikeUnlikeButton"
import { ROUTES } from "constants/routes"

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

const ArticlePreview = (props) => {
    const article = props.article

    const handleClick = (ev) => {
        ev.preventDefault()
        if (article.favorited) props.unfavorite(article.slug)
        else props.favorite(article.slug)
    }

    return (
        <article className={style.wrapper}>
            {props.image && <img className={style.img} alt="" src={props.image} />}
            <div className={style.content__wrapper}>
                <ArticleMeta
                    image={article.author.image}
                    username={article.author.username}
                    createdAt={article.createdAt}
                >
                    <LikeUnlikeButton favorited={article.favorited} onClick={handleClick}>
                        {article.favoritesCount || ""}
                    </LikeUnlikeButton>
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

export default connect(() => ({}), mapDispatchToProps)(ArticlePreview)
