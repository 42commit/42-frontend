import { useEffect, useState } from "react"
import style from "./Tab.module.scss"
import agent from "services/agent"
import { Link } from "react-router-dom"
import { connect } from "react-redux"
import { CHANGE_TAB } from "constants/actionTypes"
import PropTypes from "prop-types"
import { Text } from ".."
import { ROUTES } from "constants/routes"

const mapStateToProps = (state) => ({ tab: state.articleList.tab })

const mapDispatchToProps = (dispatch) => ({
	onTabClick: (tab, pager, payload) => dispatch({ type: CHANGE_TAB, tab, pager, payload }),
})

export const Tab = ({ onTabClick, eventKey, title, tab, route = ROUTES.HOME }) => {
	const [active, setActive] = useState(eventKey === tab)
	const className = `${style.tab} ${active ? style.active : style.inactive}`

	useEffect(() => {
		eventKey ? setActive(eventKey === tab) : setActive(window.location.pathname === route)
	}, [eventKey, tab, route, window.location.pathname])

	const clickHandler = (ev) => {
		ev.preventDefault()
		onTabClick(eventKey, agent.Articles[eventKey], agent.Articles[eventKey]())
	}
	return (
		<li className={style.li}>
			{eventKey ? (
				<button className={className} onClick={clickHandler}>
					<Text color={active ? "primary" : "secondary"}>{title}</Text>
				</button>
			) : (
				<Link className={className} to={route}>
					<Text color={active ? "primary" : "secondary"}>{title}</Text>
				</Link>
			)}
		</li>
	)
}

export default connect(mapStateToProps, mapDispatchToProps)(Tab)

Tab.propTypes = {
	title: PropTypes.string.isRequired,
	route: PropTypes.string,
	onTabClick: PropTypes.func,
	eventKey: PropTypes.string,
	tab: PropTypes.string,
}
