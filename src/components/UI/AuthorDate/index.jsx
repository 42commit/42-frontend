import style from "./AuthorDate.module.scss"
import PropTypes from "prop-types"
import { Link } from "react-router-dom"
import { Text } from "../Typography/Text"

export function AuthorDate({ username, createdAt }) {
	const options = {
		year: "numeric",
		month: "long",
		weekday: "short",
		day: "2-digit",
	}
	const date = new Date(createdAt || Date.now()).toLocaleString("ru", options)
	const finalDate = date.slice(0, date.length - 3)

	return (
		<div className={style.info}>
			<Link to={`/@${username}`}>
				<Text>{username}</Text>
			</Link>
			<Text type="caption" color="secondary">
				{finalDate}
			</Text>
		</div>
	)
}

AuthorDate.propTypes = {
	username: PropTypes.string.isRequired,
	createdAt: PropTypes.string,
}
