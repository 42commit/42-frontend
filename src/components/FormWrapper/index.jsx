import React from "react"
import PropTypes from "prop-types"
import style from "./FormWrapper.module.scss"
import { Button, Title } from "../UI"
import { Link } from "react-router-dom"

const FormWrapper = ({ title, children, link, linkName }) => {
  return (
    <div className={style.wrapper}>
      <Title type={2}>{title}</Title>
      {link && linkName && <Button type='link'><Link to={link}>{linkName}</Link></Button>}
      {children}
    </div>
  )
}

export default FormWrapper

FormWrapper.propTypes = {
  children: PropTypes.any.isRequired,
  title: PropTypes.string.isRequired,
  link: PropTypes.string,
  linkName: PropTypes.string,
}
