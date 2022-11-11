import React from "react"
import PropTypes from "prop-types"
import style from "../Typography.module.scss"

export const Text = ({ type = "text", color = "primary", children }) => {
	return <p className={`${style[type]} ${style[color]}`}>{children}</p>
}

Text.propTypes = {
	type: PropTypes.oneOf(["text", "caption", "text_link"]),
	color: PropTypes.oneOf(["primary", "secondary"]),
	children: PropTypes.string,
}
