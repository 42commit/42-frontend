import React from "react"
import { Text } from "../UI"
import { ArticleMeta } from "../UI"
import { DeleteButton } from "../UI"
import style from "./Comment.module.scss"
import PropTypes from "prop-types"
import { comment, user } from "constants/types"

const Comment = ({ comment, currentUser, slug, type, children }) => {
	const show = currentUser?.username === comment.author.username
	return (
		<div className={style.card}>
			<div className={style.top}>{type === "input" ? children : <Text color="secondary">{comment.body}</Text>}</div>
			<div className={style.footer}>
				<ArticleMeta image={comment.author.image} username={comment.author.username} createdAt={comment.createdAt}>
					{show && <DeleteButton slug={slug} commentId={comment.id} />}
				</ArticleMeta>
			</div>
		</div>
	)
}

export default Comment

Comment.propTypes = {
	comment: comment.isRequired,
	currentUser: user,
	slug: PropTypes.string.isRequired,
	type: PropTypes.string,
	children: PropTypes.element,
}
