import style from "./TagList.module.scss"
import agent from "services/agent"
import PropTypes from "prop-types"
import { Tag } from "../Tag"
import { Loader } from "../Loader"

export const TagsList = ({ tags, onClickTag }) => {
	if (tags) {
		const handleClick = (ev, tag) => {
			if (onClickTag) {
				ev.preventDefault()
				onClickTag(tag, (page) => agent.Articles.byTag(tag, page), agent.Articles.byTag(tag))
			}
		}
		return (
			<ul className={style.tags__list}>
				{tags.map((tag, index) => (
					<Tag key={index} tag={tag} handleClick={(ev) => handleClick(ev, tag)} />
				))}
			</ul>
		)
	}
	return <Loader />
}

TagsList.propTypes = {
	tags: PropTypes.arrayOf(PropTypes.string.isRequired),
	onClickTag: PropTypes.func,
}
