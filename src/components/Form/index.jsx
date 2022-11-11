import React from "react"
import PropTypes, { element } from "prop-types"
import style from "./Form.module.scss"
import { Button } from "../UI"
import ListErrors from "../ListErrors"

const Form = ({ button = "OK", onSubmit, onClick, children, disabled, errors }) => {
	return (
		<form className={style.form} onSubmit={onSubmit}>
			<div className={style.inputs}>{children}</div>
			<div className={style.errors}>{errors && <ListErrors errors={errors} />}</div>
			<div className={style.btn}>
				<Button onClick={onClick} type="primary" htmlType={onSubmit ? "submit" : "button"} disabled={disabled}>
					{button}
				</Button>
			</div>
		</form>
	)
}

export default Form

Form.propTypes = {
	errors: PropTypes.object,
	button: PropTypes.string,
	onSubmit: PropTypes.func,
	onClick: PropTypes.func,
	children: PropTypes.arrayOf(PropTypes.element.isRequired).isRequired,
	disabled: PropTypes.bool,
}
