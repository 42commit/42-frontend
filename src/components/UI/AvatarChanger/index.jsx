import { Avatar } from "components/Icons/Avatar"
import React, { useState } from "react"
import styles from "./AvatarChanger.module.scss"
import PropTypes from 'prop-types'

export const AvatarChanger = ({ avatar = "smile", setAvatar }) => {
	const [visible, setVisible] = useState(false)

	const avatars = ["asterisk", "flower", "human", "cook", "space-invaders", "alien", "smile"]

	const clickHandler = () => {
		setVisible(!visible)
	}

	return (
		<div onClick={clickHandler} className={styles.wrapper}>
			<Avatar type={avatar} size="large" />
			{visible && <ul className={styles.changer}>
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

AvatarChanger.propTypes = {
	avatar: PropTypes.string.isRequired,
	setAvatar: PropTypes.func.isRequired,
}
