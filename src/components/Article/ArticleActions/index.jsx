import { Link } from "react-router-dom"
import React from "react"
import { connect } from "react-redux"
import styles from './ArticleActions.module.scss'
import { Button } from "components/UI"
import { EditIcon, TrashIcon } from "components/Icons"
import { DELETE_ARTICLE } from "constants/actionTypes"
import agent from "agent"
import { ROUTES } from "constants/routes"


const mapStateToProps = (state) => {
	return {
		article: state.article.article,
		currentUser: state.common.currentUser,
	}
}

const mapDispatchToProps = (dispatch) => ({
	onClickDelete: (payload) => dispatch({ type: DELETE_ARTICLE, payload }),
})

const ArticleActions = ({ article, onClickDelete, currentUser }) => {
	const canModify = currentUser && currentUser.username === article.author.username
	const del = () => {
		onClickDelete(agent.Articles.del(article.slug))
	}
	if (canModify)
		return (
			<div className={styles.actions}>
				<Link to={`${ROUTES.EDITOR}/${article.slug}`}>
					<Button >
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

	return <span></span>
}

export default connect(mapStateToProps, mapDispatchToProps)(ArticleActions)
