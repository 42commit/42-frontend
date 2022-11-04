import React, { useState } from "react"
import agent from "../../agent"
import { connect } from "react-redux"
import { UPDATE_FIELD_AUTH, REGISTER, REGISTER_PAGE_UNLOADED } from "../../constants/actionTypes"
import { Input } from "../UI/Input"
import { FormWrapper } from "components/UI/FormWrapper"
import { Form } from "components/UI/Form"
import { ROUTES } from "constants/routes"

const mapStateToProps = (state) => ({ ...state.auth })

const mapDispatchToProps = (dispatch) => ({
	onChangeEmail: (value) => dispatch({ type: UPDATE_FIELD_AUTH, key: "email", value }),
	onChangePassword: (value) => dispatch({ type: UPDATE_FIELD_AUTH, key: "password", value }),
	onChangeUsername: (value) => dispatch({ type: UPDATE_FIELD_AUTH, key: "username", value }),
	onSubmit: (username, email, password) => {
		const payload = agent.Auth.register(username, email, password)
		dispatch({ type: REGISTER, payload })
	},
	onUnload: () => dispatch({ type: REGISTER_PAGE_UNLOADED }),
})

const Register = ({ onSubmit, onUnload, errors, inProgress }) => {
	const [values, setValues] = useState({
		email: "",
		password: "",
		username: "",
	})

	const onChange = (e) => {
		setValues({ ...values, [e.currentTarget.name]: e.currentTarget.value })
	}

	const submitForm = (username, email, password) => (ev) => {
		ev.preventDefault()
		onSubmit(username, email, password)
	}

	return (
		<FormWrapper title='Зарегистрироваться' link={ROUTES.LOGIN} linkName='Уже есть аккаунт?'>
			<Form button='Зарегистрироваться' onSubmit={submitForm(values.username, values.email, values.password)} disabled={inProgress} errors={errors}>
				<Input
					name="username"
					label="Имя пользователя"
					type="text"
					placeholder="Имя пользователя"
					value={values.username}
					onChange={onChange}
				/>
				<Input
					name="email"
					label="E-mail"
					type="email"
					placeholder="E-mail"
					value={values.email}
					onChange={onChange}
				/>
				<Input
					name="password"
					label="Пароль"
					type="password"
					placeholder="Пароль"
					value={values.password}
					onChange={onChange}
				/>
			</Form>
		</FormWrapper>
	)
}

export default connect(mapStateToProps, mapDispatchToProps)(Register)
