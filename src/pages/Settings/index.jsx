import React, { useEffect, useState } from "react"
import agent from "services/agent"
import { connect } from "react-redux"
import { SETTINGS_SAVED, SETTINGS_PAGE_UNLOADED, LOGOUT } from "constants/actionTypes"
import { Input } from "components/UI"
import { Button } from "components/UI"
import style from "./Settings.module.scss"
import FormWrapper from "components/FormWrapper"
import Form from "components/Form"
import { AvatarChanger } from "components/UI"
import PropTypes from "prop-types"
import { user } from "constants/types"
import { ROUTES } from "constants/routes"

const mapStateToProps = (state) => ({
	...state.settings,
	currentUser: state.common.currentUser,
})

const mapDispatchToProps = (dispatch) => ({
	onClickLogout: () => dispatch({ type: LOGOUT }),
	onSubmitForm: (user) => dispatch({ type: SETTINGS_SAVED, payload: agent.Auth.save(user) }),
	onUnload: () => dispatch({ type: SETTINGS_PAGE_UNLOADED }),
})

const Settings = ({ onSubmitForm, inProgress, currentUser, errors, onClickLogout, onUnload }) => {
	const [values, setValues] = useState({
		image: "",
		username: "",
		bio: "",
		email: "",
		password: "",
	})

	useEffect(() => {
		return () => {
			onUnload()
		}
	})

	useEffect(() => {
		if (!currentUser) window.location.pathname = ROUTES.LOGIN
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
	const setAvatar = (avatar) => {
		setValues({ ...values, image: avatar })
	}

	const submitFormHandler = (e) => {
		e.preventDefault()
		const user = { ...values }
		if (!user.password) delete user.password
		onSubmitForm(user)
	}
	return (
		<div className={style.wrapper}>
			<FormWrapper title="Ваши настройки">
				<Form button="Сохранить" onSubmit={submitFormHandler} disabled={inProgress} errors={errors}>
					<AvatarChanger avatar={values.image} setAvatar={setAvatar} />
					<Input
						name="username"
						label="Имя пользователя"
						placeholder="Введите ваше имя"
						value={values.username}
						onChange={changeHandler}
						isRequired
					/>
					<Input
						name="bio"
						label="Информация о вас"
						placeholder="Расскажите немного о себе"
						type="textarea"
						value={values.bio}
						onChange={changeHandler}
					/>
					<Input
						name="email"
						label="E-mail"
						type="email"
						placeholder="Введите почту"
						value={values.email}
						onChange={changeHandler}
						isRequired
					/>
					<Input
						name="password"
						label="Новый пароль"
						type="password"
						placeholder="Введите ваш новый пароль"
						value={values.password}
						onChange={changeHandler}
						isRequired
					/>
				</Form>
			</FormWrapper>
			<div className={style.logout}>
				<Button type="delete" onClick={onClickLogout}>
					Выйти из аккаунта
				</Button>
			</div>
		</div>
	)
}

export default connect(mapStateToProps, mapDispatchToProps)(Settings)

Settings.propTypes = {
	onSubmitForm: PropTypes.func.isRequired,
	onUnload: PropTypes.func.isRequired,
	onClickLogout: PropTypes.func.isRequired,
	currentUser: user,
	inProgress: PropTypes.bool,
	errors: PropTypes.object,
}
