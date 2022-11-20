import { Link } from "react-router-dom"
import React from "react"
import { connect } from "react-redux"
import style from "./ArticleActions.module.scss"
import { Button } from "components/UI"
import { EditIcon, TrashIcon } from "components/Icons"
import { DELETE_ARTICLE } from "constants/actionTypes"
import agent from "services/agent"
import { ROUTES } from "constants/routes"
import PropTypes from "prop-types"
import { article } from "constants/types"

const mapStateToProps = (state) => {
	return {
		article: state.article.article,
	}
}

const mapDispatchToProps = (dispatch) => ({
	onClickDelete: (payload) => dispatch({ type: DELETE_ARTICLE, payload }),
})

const ArticleActions = ({ article, onClickDelete }) => {
	const del = () => {
		onClickDelete(agent.Articles.del(article.slug))
	}
	return (
		<div className={style.actions}>
			<Link to={`${ROUTES.EDITOR}/${article.slug}`}>
				<Button>
					<EditIcon />
					<span>Редактировать запись</span>
				</Button>
			</Link>
			<Button type="delete" onClick={del}>
				<TrashIcon />
				<span>Удалить запись</span>
			</Button>
		</div>
	)
}

export default connect(mapStateToProps, mapDispatchToProps)(ArticleActions)

ArticleActions.propTypes = {
	article: article.isRequired,
	onClickDelete: PropTypes.func.isRequired,
}
