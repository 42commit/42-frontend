import agent from "agent"
import { TrashIcon } from "components/Icons"
import { DELETE_COMMENT } from "constants/actionTypes"
import React from "react"
import { connect } from "react-redux"
import { Button } from ".."
import PropTypes from 'prop-types'

const mapDispatchToProps = (dispatch) => ({
	onClick: (payload, commentId) => dispatch({ type: DELETE_COMMENT, payload, commentId }),
})

const DeleteButton = ({ onClick, slug, commentId, show }) => {
	const del = () => {
		const payload = agent.Comments.delete(slug, commentId)
		onClick(payload, commentId)
	}

	if (show)
		return (
			<Button onClick={del} type="delete">
				<TrashIcon />
			</Button>
		)

	return null
}

export default connect(() => ({}), mapDispatchToProps)(DeleteButton)

DeleteButton.propTypes = {
	slug: PropTypes.string.isRequired,
	commentId: PropTypes.string.isRequired,
	onClick: PropTypes.func.isRequired,
	show: PropTypes.bool.isRequired
}