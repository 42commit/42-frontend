import React from "react"
import PropTypes from "prop-types"
import style from "./FormWrapper.module.scss"
import { Button, Title } from ".."
import { Link } from "react-router-dom"

export const FormWrapper = ({ title, children, link, linkName }) => {
  return (
    <div className={style.wrapper}>
      <Title type={2}>{title}</Title>
      {link && linkName && <Button type='link'><Link to={link}>{linkName}</Link></Button>}
      {children}
    </div>
  )
}

FormWrapper.propTypes = {
  children: PropTypes.any.isRequired,
  title: PropTypes.string.isRequired,
  link: PropTypes.string,
  linkName: PropTypes.string,
}
