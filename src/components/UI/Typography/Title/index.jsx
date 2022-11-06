import React from "react"
import PropTypes from "prop-types"
import style from "../Typography.module.scss"

export function Title({ type = 1, color = "primary", shadow = false, children }) {
	const textTypes = {
		1: "header1",
		2: "header2",
		3: "headline",
	}

	const shadowClassName = shadow ? style.shadow : ''

	return <h1 className={`${style[textTypes[type]]} ${style[color]} ${shadowClassName}`}>{children}</h1>
}

Title.propTypes = {
	type: PropTypes.oneOf([1, 2, 3]),
	color: PropTypes.oneOf(["primary", "secondary"]),
	children: PropTypes.string.isRequired,
	shadow: PropTypes.bool,
}
