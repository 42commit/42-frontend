import style from "./Sidebar.module.scss"
import PropTypes from "prop-types"
import { Text } from ".."

export const Sidebar = ({ children }) => {
	return (
		<div className={style.sidebar}>
			<Text>Популярные теги</Text>
			{children}
		</div>
	)
}

Sidebar.propTypes = {
	children: PropTypes.any,
}
