import React from "react"
import style from "./ListErrors.module.scss"
import PropTypes from "prop-types"

const ListErrors = ({ errors }) => {
	if (errors)
		return (
			<ul className={style.list}>
				{Object.keys(errors).map((key) => {
					return (
						<li key={key}>
							{key} {errors[key]}
						</li>
					)
				})}
			</ul>
		)
	else return null
}

export default ListErrors

ListErrors.propTypes = {
	errors: PropTypes.array,
}
