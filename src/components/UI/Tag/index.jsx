import style from "./Tag.module.scss"
import { connect } from "react-redux"
import PropTypes from "prop-types"
import { Text } from ".."

const mapStateToProps = (state) => ({ currentTag: state.articleList.tag })

function TagComponent({ tag, handleClick, currentTag }) {
	let className = currentTag === tag ? style.active : style.default

	return (
		<li className={className} onClick={handleClick}>
			<Text type="caption">{tag}</Text>
		</li>
	)
}

export const Tag = connect(mapStateToProps)(TagComponent)

TagComponent.propTypes = {
	tag: PropTypes.string.isRequired,
	handleClick: PropTypes.func,
	currentTag: PropTypes.string,
}
