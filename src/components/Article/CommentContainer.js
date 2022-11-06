import CommentInput from "components/UI/CommentInput"
import CommentList from "./CommentList"
import { Link } from "react-router-dom"
import React from "react"
import style from "./Article.module.scss"
import { Button, Text, Title } from "components/UI"
import ListErrors from "components/UI/ListErrors"
import { ROUTES } from "constants/routes"
import PropTypes from "prop-types"
import { comment, user } from "constants/types"

const CommentContainer = ({ currentUser, comments, slug, errors }) => {
	return (
		<div className={style.comments}>
			<Title type={3}>Комментарии</Title>
			<div>
				<ListErrors errors={errors}></ListErrors>
				{currentUser ? <CommentInput /> : (
					<div className={style.message}>
						<Button type='link'><Link to={ROUTES.LOGIN}>Войдите</Link></Button>
						<Text>&nbsp;или&nbsp;</Text>
						<Button type='link'><Link to={ROUTES.REGISTER}>зарегистрируйтесь</Link></Button>
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
	slug: PropTypes.string.isRequired,
	comments: PropTypes.arrayOf(comment.isRequired)
}
