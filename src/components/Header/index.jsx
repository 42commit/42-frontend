import { Button, Title } from "components/UI"
import React from "react"
import { Link, NavLink } from "react-router-dom"
import style from "./Header.module.scss"
import { EditIcon, HomeIcon, LoginIcon, SettingsIcon } from "../Icons"
import { connect } from "react-redux"
import { Avatar } from "components/Icons/Avatar"
import { ROUTES } from "constants/routes"
import PropTypes from "prop-types"
import { user } from "constants/types"

const mapStateToProps = (state) => {
	const currentUser = state.common.currentUser
	const appName = state.common.appName
	const pathname = state.router.location.pathname
	return { currentUser, appName, pathname }
}

const CustomLink = connect(mapStateToProps)(({ to, children, icon, pathname }) => {
	return (
		<NavLink className={style.navLink} to={to}>
			<Button type="light" active={pathname === to}>
				{icon}
				<span>{children}</span>
			</Button>
		</NavLink>
	)
})

const LoggedOutView = () => {
	return (
		<>
			<CustomLink to={ROUTES.HOME} icon={<HomeIcon />}>
				Главная
			</CustomLink>
			<CustomLink to={ROUTES.LOGIN} icon={<LoginIcon />}>
				Войти
			</CustomLink>
		</>
	)
}

const LoggedInView = connect(mapStateToProps)(({ currentUser }) => {
	return (
		<>
			<CustomLink to={ROUTES.HOME} icon={<HomeIcon />}>
				Главная
			</CustomLink>

			<CustomLink to={ROUTES.EDITOR} icon={<EditIcon />}>
				Новая запись
			</CustomLink>

			<CustomLink to={ROUTES.SETTINGS} icon={<SettingsIcon />}>
				Настройки
			</CustomLink>

			<CustomLink to={`/@${currentUser.username}`} icon={<Avatar type={currentUser.image} size="small" />}>
				{currentUser.username}
			</CustomLink>
		</>
	)
})

const Header = ({ appName, currentUser }) => {
	return (
		<header className={style.header}>
			<div className={style.container}>
				<Link className={style.brand} to={ROUTES.HOME}>
					<Title type={3} shadow>
						{appName}
					</Title>
				</Link>
				<div className={style.navLinks}>{currentUser ? <LoggedInView /> : <LoggedOutView />}</div>
			</div>
		</header>
	)
}

export default connect(mapStateToProps)(Header)

CustomLink.propTypes = {
	to: PropTypes.string.isRequired,
	pathname: PropTypes.string,
	icon: PropTypes.element.isRequired,
	children: PropTypes.string.isRequired,
}

LoggedInView.propTypes = {
	currentUser: user,
}

Header.propTypes = {
	currentUser: user,
	appName: PropTypes.string.isRequired,
}
