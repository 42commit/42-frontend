import style from "./ArticleMeta.module.scss"
import PropTypes from "prop-types"
import { Link } from "react-router-dom"
import { AuthorDate } from "../AuthorDate"
import { Avatar } from "components/Icons/Avatar"

export function ArticleMeta({ image, username, createdAt, children }) {
	return (
		<div className={style.meta}>
			<div className={style.left}>
				<Link className={style.img} to={`/@${username}`}>
					<Avatar type={image} />
				</Link>
				<AuthorDate username={username} createdAt={createdAt} />
			</div>
			<div className={style.right}>{children}</div>
		</div>
	)
}

ArticleMeta.propTypes = {
	image: PropTypes.string.isRequired,
	username: PropTypes.string.isRequired,
	createdAt: PropTypes.string,
	children: PropTypes.node,
}
