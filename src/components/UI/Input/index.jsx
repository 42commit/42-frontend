import React, { useState } from "react"
import PropTypes from "prop-types"
import style from "./Input.module.scss"
import { Text } from "../Typography/Text/"
import { AlertIcon, CheckIcon, EyeIcon } from "components/Icons"

export const Input = ({ type = "text", label = "", placeholder, success, error, value, onChange, onKeyUp, name }) => {
	const [isVisible, setVisible] = useState(false)
	const clickEye = (e) => {
		e.preventDefault()
		setVisible(!isVisible)
	}
	const className = `
    ${type === "comment" ? style.comment__wrapper : style.default}
    ${error && style.error}
    ${success && style.success}`
	const textAreaClessName = `${style.input} ${style.textarea}`
	const commentClessName = `${textAreaClessName} ${style.comment}`

	return (
		<div className={style.wrapper}>
			<label className={style.label} htmlFor={label}>
				<Text>{label}</Text>
			</label>
			<div className={className}>
				{type === "textarea" || type === "comment" ? (
					<textarea
						name={name}
						value={value}
						onChange={onChange}
						className={type === "comment" ? commentClessName : textAreaClessName}
						id={label}
						placeholder={placeholder}
						rows={type === "comment" ? 4 : 5}
					/>
				) : (
					<input
						name={name}
						defaultValue={value}
						onChange={onChange}
						onKeyUp={onKeyUp}
						className={style.input}
						id={label}
						type={type === "file" ? "text" : type === "password" ? (isVisible ? "text" : "password") : type}
						placeholder={placeholder}
					/>
				)}
				<div className={style.icon}>{success ? <CheckIcon /> : error ? <AlertIcon /> : ""}</div>
				{type === "password" && (
					<button onClick={clickEye} className={style.icon}>
						<EyeIcon type={isVisible ? "hide" : "show"} />
					</button>
				)}
				<div className={style.label}>
					<Text>{success || error}</Text>
				</div>
			</div>
		</div>
	)
}

Input.propTypes = {
	type: PropTypes.string,
	label: PropTypes.string,
	placeholder: PropTypes.string.isRequired,
	success: PropTypes.string,
	error: PropTypes.string,
	value: PropTypes.string,
	onChange: PropTypes.func.isRequired,
	onKeyUp: PropTypes.func,
	name: PropTypes.string,
}
