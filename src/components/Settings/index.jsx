import ListErrors from "../ListErrors"
import React, { useEffect, useState } from "react"
import agent from "../../agent"
import { connect } from "react-redux"
import { SETTINGS_SAVED, SETTINGS_PAGE_UNLOADED, LOGOUT } from "../../constants/actionTypes"
import { Input } from "../UI/Input"
import { Button, Title } from "../UI"

import styles from "./Settings.module.scss"

const mapStateToProps = (state) => ({
	...state.settings,
	currentUser: state.common.currentUser,
})

const mapDispatchToProps = (dispatch) => ({
	onClickLogout: () => dispatch({ type: LOGOUT }),
	onSubmitForm: (user) => dispatch({ type: SETTINGS_SAVED, payload: agent.Auth.save(user) }),
	onUnload: () => dispatch({ type: SETTINGS_PAGE_UNLOADED }),
})

const Settings = ({ onSubmitForm, inProgress, currentUser, errors, onClickLogout }) => {
	const [values, setValues] = useState({
		image: "",
		username: "",
		bio: "",
		email: "",
		password: "",
	})

	useEffect(() => {
		const { image = "", username = "", bio = "", email = "", password = "" } = currentUser
		setValues({
			image,
			username,
			bio,
			email,
			password,
		})
	}, [currentUser])

	const changeHandler = (e) => {
		setValues({ ...values, [e.currentTarget.name]: e.currentTarget.value })
	}

	const submitFormHandler = (e) => {
		e.preventDefault()

		const user = { ...values }
		if (!user.password) delete user.password
		onSubmitForm(user)
	}
	return (
		<div className={styles.wrapper}>
			<Title type={2}>Your Settings</Title>

			<ListErrors errors={errors}></ListErrors>

			<form className={styles.form} onSubmit={submitFormHandler}>
				{/* <Input
					name="image"
					label="Изображение профиля"
					type="file"
					placeholder="Изображение (опционально)"
					value={this.state.image}
					onChange={this.updateState("image")}
				/> */}
				<Input
					name="username"
					label="Имя пользователя"
					placeholder="Имя пользователя"
					value={values.username}
					onChange={changeHandler}
				/>
				<Input
					name="bio"
					label="Информация о вас"
					placeholder="Информация о вас"
					type="textarea"
					value={values.bio}
					onChange={changeHandler}
				/>
				<Input
					name="email"
					label="E-mail"
					type="email"
					placeholder="E-mail"
					value={values.email}
					onChange={changeHandler}
				/>
				<Input
					name="password"
					label="Новый пароль"
					type="password"
					placeholder="Новый пароль"
					value={values.password}
					onChange={changeHandler}
				/>
				<section className={styles.button}>
					<Button disabled={!inProgress}>Update Settings</Button>
				</section>
			</form>
			<Button type="delete" onClick={onClickLogout}>
				Выйти из аккаунта
			</Button>
		</div>
	)
}

export default connect(mapStateToProps, mapDispatchToProps)(Settings)
