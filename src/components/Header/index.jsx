import { Button, Title } from "components/UI"
import React from "react"
import { Link, NavLink } from "react-router-dom"
import styles from "./Header.module.scss"
import { EditIcon, HomeIcon, LoginIcon, SettingsIcon } from "../Icons"
import { connect } from "react-redux"
import { Avatar } from "components/Icons/Avatar"
import { ROUTES } from "constants/routes"

const mapStateToProps = (state) => {
	const currentUser = state.common.currentUser
	const appName = state.common.appName
	const pathname = state.router.location.pathname
	return { currentUser, appName, pathname }
}

const CustomLink = connect(mapStateToProps)(({ to, children, icon, pathname }) => {
	return (
		<NavLink
			className={styles.navLink}
			to={to}
		>
			<Button type="light" active={pathname === to}>
				{icon}
				<span>{children}</span>
			</Button>
		</NavLink>
	)
})

export const LoggedOutView = connect(mapStateToProps)(({ currentUser }) => {
	if (!currentUser)
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

	return null
})

const LoggedInView = connect(mapStateToProps)(({ currentUser }) => {
	if (currentUser)
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

	return null
})

function Header({ appName }) {
	return (
		<header className={styles.header}>
			<div className={styles.container}>
				<Link className={styles.brand} to={ROUTES.HOME}>
					<Title type={3} shadow>
						{appName}
					</Title>
				</Link>
				<div className={styles.navLinks}>
					<LoggedOutView />
					<LoggedInView />
				</div>
			</div>
		</header>
	)
}

export default connect(mapStateToProps)(Header)
