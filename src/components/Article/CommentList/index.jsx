import { Comment } from "components"
import React from "react"
import style from "./CommentList.module.scss"
import PropTypes from "prop-types"
import { comment, user } from "constants/types"

const CommentList = ({ comments, currentUser, slug }) => {
	return (
		<div className={style.list}>
			{comments.map((comment) => (
				<Comment comment={comment} currentUser={currentUser} slug={slug} key={comment.id} />
			))}
		</div>
	)
}

export default CommentList

CommentList.propTypes = {
	currentUser: user,
	slug: PropTypes.string,
	comments: PropTypes.arrayOf(comment),
}
