import style from "./PageLink.module.scss"
import PropTypes from "prop-types"

export const PageLink = ({ isCurrent, onClick, isFirst, isLast, children }) => {
	const className = `${style.page__item}
    ${isCurrent ? style.active : style.default}
    ${isFirst ? style.first : isLast ? style.last : style.default}`

	return (
		<li className={style.li}>
			<button className={className} onClick={onClick}>
				{children}
			</button>
		</li>
	)
}

PageLink.propTypes = {
	children: PropTypes.any.isRequired,
	isCurrent: PropTypes.bool.isRequired,
	isFirst: PropTypes.bool,
	isLast: PropTypes.bool,
	onClick: PropTypes.func,
}
