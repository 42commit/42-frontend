import ArticlePreview from "./ArticlePreview"
import React from "react"
import Pagination from "./Pagination/pagination"

const ArticleList = (props) => {
	if (!props.articles) return <div className="article-preview">Loading...</div>

	if (props.articles.length === 0) return <div className="article-preview">No articles are here... yet.</div>

	return (
		<div>
			{props.articles.map((article) => {
				return <ArticlePreview article={article} key={article.slug} />
			})}
			<Pagination pager={props.pager} articlesCount={props.articlesCount} currentPage={props.currentPage} />
		</div>
	)
}

export default ArticleList
