import { FavoritesIcon } from 'components/Icons'
import React from 'react'
import { Button } from '..'
import PropTypes from "prop-types"

export const LikeUnlikeButton = ({ children, onClick, favorited }) => {
  const buttonType = favorited ? "delete" : "light"
  const iconType = favorited ? "default" : "active"
  return (
    <Button onClick={onClick} type={buttonType}>{children}<FavoritesIcon type={iconType} /></Button>
  )
}

LikeUnlikeButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  children: PropTypes.any.isRequired,
  favorited: PropTypes.bool.isRequired
}
