import React from "react"
import style from "./ListErrors.module.scss"
import PropTypes from "prop-types"

const ListErrors = ({ errors }) => {
	return (
		<ul className={style.list}>
			{Object.keys(errors).map((key) => (
				<li key={key}>
					{key} {errors[key]}
				</li>
			))}
		</ul>
	)
}

export default ListErrors

ListErrors.propTypes = {
	errors: PropTypes.array,
}
