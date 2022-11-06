import React, { useEffect, useState } from "react"
import agent from "agent"
import { connect } from "react-redux"
import { UPDATE_FIELD_AUTH, LOGIN, LOGIN_PAGE_UNLOADED } from "constants/actionTypes"
import { Input } from "../UI/Input"
import FormWrapper from "components/UI/FormWrapper"
import Form from "components/UI/Form"
import PropTypes from "prop-types"

const mapStateToProps = (state) => ({ ...state.auth })

const mapDispatchToProps = (dispatch) => ({
	onChangeEmail: (value) => dispatch({ type: UPDATE_FIELD_AUTH, key: "email", value }),
	onChangePassword: (value) => dispatch({ type: UPDATE_FIELD_AUTH, key: "password", value }),
	onSubmit: (email, password) => dispatch({ type: LOGIN, payload: agent.Auth.login(email, password) }),
	onUnload: () => dispatch({ type: LOGIN_PAGE_UNLOADED }),
})

const Login = ({ onSubmit, onUnload, errors, inProgress }) => {
	const [values, setValues] = useState({
		email: "",
		password: "",
	})

	const onChange = (e) => {
		setValues({ ...values, [e.currentTarget.name]: e.currentTarget.value })
	}

	const submitForm = (email, password) => (ev) => {
		ev.preventDefault()
		onSubmit(email, password)
	}

	useEffect(() => {
		return () => {
			onUnload()
		}
	}, [])
	return (
		<FormWrapper title='Войти' link='/register' linkName='Хотите создать аккаунт?'>
			<Form button='Войти' onSubmit={submitForm(values.email, values.password)} disabled={inProgress} errors={errors}>
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

export default connect(mapStateToProps, mapDispatchToProps)(Login)

Login.propTypes = {
	onSubmit: PropTypes.func.isRequired,
	onUnload: PropTypes.func.isRequired,
	errors: PropTypes.object,
	inProgress: PropTypes.bool,
}