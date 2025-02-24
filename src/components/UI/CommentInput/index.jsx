import React, { useEffect, useState } from "react"
import { connect } from "react-redux"
import { ADD_COMMENT, PROFILE_PAGE_LOADED, PROFILE_PAGE_UNLOADED } from "constants/actionTypes"
import { Input } from "../Input"
import { ArticleMeta } from "../ArticleMeta"
import style from "./CommentInput.module.scss"
import { Button } from ".."
import agent from "services/agent"
import PropTypes from "prop-types"
import { user } from "constants/types"

const mapStateToProps = (state) => ({
	profile: state.profile,
	currentUser: state.common.currentUser,
	slug: state.article.article.slug,
})

const mapDispatchToProps = (dispatch) => ({
	onSubmit: (payload) => dispatch({ type: ADD_COMMENT, payload }),
	onLoad: (payload) => dispatch({ type: PROFILE_PAGE_LOADED, payload }),
	onUnload: () => dispatch({ type: PROFILE_PAGE_UNLOADED }),
})

export const CommentInput = connect(
	mapStateToProps,
	mapDispatchToProps,
)(({ onSubmit, onLoad, onUnload, slug, currentUser, profile }) => {
	const [body, setBody] = useState("")
	const bodyHandler = (e) => {
		setBody(e.currentTarget.value)
	}
	const createComment = (e) => {
		e.preventDefault()
		onSubmit(agent.Comments.create(slug, { body }))
		setBody("")
	}
	useEffect(() => {
		onLoad(Promise.all([agent.Profile.get(currentUser.username), agent.Articles.byAuthor(currentUser.username)]))
		return () => {
			onUnload()
		}
	}, [onLoad])

	return (
		<form className={style.card} onSubmit={createComment}>
			<div className={style.top}>
				<Input placeholder="Написать комментарий" type="comment" value={body} onChange={bodyHandler} isRequired />
			</div>
			<div className={style.footer}>
				<ArticleMeta image={profile.image} username={profile.username}>
					<div>
						<Button htmlType="submit">Отправить комментарий</Button>
					</div>
				</ArticleMeta>
			</div>
		</form>
	)
})

CommentInput.propTypes = {
	currentUser: user,
	profile: user,
	slug: PropTypes.string,
	onSubmit: PropTypes.func,
	onLoad: PropTypes.func,
	onUnload: PropTypes.func,
}
