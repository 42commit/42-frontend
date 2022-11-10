import CommentList from "../CommentList"
import { Link } from "react-router-dom"
import React from "react"
import style from "./CommentContainer.module.scss"
import { Button, Text, Title, CommentInput } from "components/UI"
import { ListErrors } from "components"
import { ROUTES } from "constants/routes"
import PropTypes from "prop-types"
import { comment, user } from "constants/types"

const CommentContainer = ({ currentUser, comments, slug, errors }) => {
	return (
		<div className={style.comments}>
			<Title type={3}>Комментарии</Title>
			<div>
				{errors && <ListErrors errors={errors}></ListErrors>}
				{currentUser ? (
					<CommentInput />
				) : (
					<div className={style.message}>
						<Button type="link">
							<Link to={ROUTES.LOGIN}>Войдите</Link>
						</Button>
						<Text>&nbsp;или&nbsp;</Text>
						<Button type="link">
							<Link to={ROUTES.REGISTER}>зарегистрируйтесь</Link>
						</Button>
						<Text>, чтобы оставить комментарий.</Text>
					</div>
				)}
			</div>
			<CommentList comments={comments} slug={slug} currentUser={currentUser} />
		</div>
	)
}

export default CommentContainer

CommentContainer.propTypes = {
	currentUser: user,
	slug: PropTypes.string,
	comments: PropTypes.arrayOf(comment.isRequired),
}
