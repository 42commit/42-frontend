import { Avatar } from "components/Icons/Avatar"
import React, { useState } from "react"
import style from "./AvatarChanger.module.scss"
import PropTypes from 'prop-types'

const AvatarChanger = ({ avatar = "smile", setAvatar }) => {
	const [visible, setVisible] = useState(false)

	const avatars = ["asterisk", "flower", "human", "cook", "space-invaders", "alien", "smile"]

	const clickHandler = () => {
		setVisible(!visible)
	}

	return (
		<div onClick={clickHandler} className={style.wrapper}>
			<Avatar type={avatar} size="large" />
			{visible && <ul className={style.changer}>
				{avatars.map((a) => {
					const clickAvatarHandle = () => {
						setAvatar(a)
					}
					return (
						<span key={a} onClick={clickAvatarHandle}>
							<Avatar type={a} />
						</span>
					)
				})}
			</ul>}
		</div>
	)
}

export default AvatarChanger

AvatarChanger.propTypes = {
	avatar: PropTypes.string.isRequired,
	setAvatar: PropTypes.func.isRequired,
}
