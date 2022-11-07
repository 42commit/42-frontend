import React from "react"
import PropTypes from "prop-types"
import style from "./Button.module.scss"

export const Button = ({ mark, type = "primary", htmlType = "button", onClick, children, disabled = false, active = false }) => {
	const activeClass = active ? style.active : ''
	return (
		<button data-mark={mark} type={htmlType} className={`${style[type]} ${activeClass}`} onClick={onClick} disabled={disabled}>
			{children}
		</button>
	)
}

Button.propTypes = {
	type: PropTypes.oneOf(['primary', 'light', 'link', "delete"]),
	htmlType: PropTypes.oneOf(['button', 'submit']),
	onClick: PropTypes.func,
	children: PropTypes.any.isRequired,
	disabled: PropTypes.bool,
}
