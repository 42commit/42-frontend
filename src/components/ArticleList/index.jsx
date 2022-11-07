import ArticlePreview from "../ArticlePreview"
import React from "react"
import style from "./ArticleList.module.scss"
import { Text } from "../UI"
import PropTypes from "prop-types"
import { article } from "constants/types"

const ArticleList = ({ articles }) => {
	if (!articles) return <div>Loading...</div>

	if (articles.length === 0) return <div className={style.main}><Text>Здесь пусто... пока что.</Text></div>

	return (
		<div className={style.articles}>
			{articles.map((article) => {
				return <ArticlePreview article={article} key={article.slug} />
			})}
		</div>
	)
}

export default ArticleList

ArticleList.propTypes = {
	articles: PropTypes.arrayOf(article.isRequired)
}
