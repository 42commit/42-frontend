import ArticlePreview from "../ArticlePreview"
import React from "react"
import style from "./ArticleList.module.scss"
import { Text } from ".."

const ArticleList = (props) => {
	if (!props.articles) return <div>Loading...</div>

	if (props.articles.length === 0) return <div className={style.main}><Text>Здесь пусто... пока что.</Text></div>

	return (
		<div className={style.articles}>
			{props.articles.map((article) => {
				return <ArticlePreview article={article} key={article.slug} />
			})}
		</div>
	)
}

export default ArticleList