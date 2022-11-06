import Comment from "components/UI/Comment"
import React from "react"
import style from "./Article.module.scss"
import PropTypes from "prop-types"
import { comment, user } from "constants/types"

const CommentList = ({ comments, currentUser, slug }) => {
	return (
		<div className={style.list}>
			{comments.map((comment) => {
				return <Comment comment={comment} currentUser={currentUser} slug={slug} key={comment.id} />
			})}
		</div>
	)
}

export default CommentList

CommentList.propTypes = {
	currentUser: user,
	slug: PropTypes.string.isRequired,
	comments: PropTypes.arrayOf(comment.isRequired)
}

