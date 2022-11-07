import React, { useEffect } from "react"
import agent from "services/agent"
import { connect } from "react-redux"
import {
	ADD_TAG,
	EDITOR_PAGE_LOADED,
	REMOVE_TAG,
	ARTICLE_SUBMITTED,
	EDITOR_PAGE_UNLOADED,
	UPDATE_FIELD_EDITOR,
} from "constants/actionTypes"
import { Input } from "components/UI/Input"
import styles from "./Editor.module.scss"
import { Tag } from "components/UI"
import FormWrapper from "components/FormWrapper"
import Form from "components/Form"
import PropTypes from "prop-types"

const mapStateToProps = (state) => ({
	...state.editor,
	appLoaded: state.common.appLoaded,
})

const mapDispatchToProps = (dispatch) => ({
	onAddTag: () => dispatch({ type: ADD_TAG }),
	onLoad: (payload) => dispatch({ type: EDITOR_PAGE_LOADED, payload }),
	onRemoveTag: (tag) => dispatch({ type: REMOVE_TAG, tag }),
	onSubmit: (payload) => dispatch({ type: ARTICLE_SUBMITTED, payload }),
	onUnload: (payload) => dispatch({ type: EDITOR_PAGE_UNLOADED }),
	onUpdateField: (key, value) => dispatch({ type: UPDATE_FIELD_EDITOR, key, value }),
})

const EditorComponent = ({
	onUpdateField,
	onUnload,
	onSubmit,
	onRemoveTag,
	onLoad,
	onAddTag,
	body,
	description,
	tagInput,
	tagList,
	title,
	errors,
	inProgress,
	match,
	articleSlug,
	appLoaded
}) => {
	if (!appLoaded) return null

	const changeHandler = (e) => {
		onUpdateField(e.target.name, e.target.value)
	}

	const watchTags = (e) => {
		if (e.key === "Enter") {
			e.preventDefault()
			if (tagInput && !tagList.find(tag => tag === tagInput)) onAddTag()
		}
	}

	const submitFormHandler = (e) => {
		e.preventDefault()
		const article = {
			title,
			description,
			body,
			tagList,
		}

		const promise = articleSlug
			? agent.Articles.update({ ...article, slug: articleSlug })
			: agent.Articles.create(article)
		onSubmit(promise)
	}

	useEffect(() => {
		onLoad(agent.Articles.get(match.params.slug))
		return () => {
			onUnload()
		}
	}, [])

	useEffect(() => {
		if (match.params.slug) {
			onUnload()
			onLoad(agent.Articles.get(match.params.slug))
		} else {
			onLoad(null)
		}
	}, [match])

	return (
		<FormWrapper title='Новая запись'>
			<Form button='Опубликовать' onClick={submitFormHandler} disabled={inProgress} errors={errors}>
				<Input name="title" label="Заголовок" placeholder="Название статьи" value={title} onChange={changeHandler} />
				<Input
					name="description"
					label="Описание"
					placeholder="О чем статья"
					value={description}
					onChange={changeHandler}
				/>
				{/* <Input
								label="Изображение"
								type="file"
								placeholder="Изображение (опционально)"
							/> */}
				<Input
					name="body"
					label="Содержание"
					placeholder="Текст статьи"
					type="textarea"
					value={body}
					onChange={changeHandler}
				/>
				<Input
					name="tagInput"
					label="Тэги"
					placeholder="Теги (по нажатию Enter)"
					value={tagInput}
					onChange={changeHandler}
					onKeyUp={watchTags}
				/>
				<div className={styles.taglist}>
					{(tagList || []).map((tag) => {
						return <Tag tag={tag} key={tag} handleClick={() => onRemoveTag(tag)} />
					})}
				</div>
			</Form>
		</FormWrapper>
	)
}

export default connect(mapStateToProps, mapDispatchToProps)(EditorComponent)

EditorComponent.propTypes = {
	onUpdateField: PropTypes.func.isRequired,
	onUnload: PropTypes.func.isRequired,
	onSubmit: PropTypes.func.isRequired,
	onRemoveTag: PropTypes.func.isRequired,
	onLoad: PropTypes.func.isRequired,
	onAddTag: PropTypes.func.isRequired,
	body: PropTypes.string,
	description: PropTypes.string,
	tagInput: PropTypes.string,
	tagList: PropTypes.arrayOf(PropTypes.string.isRequired),
	title: PropTypes.string,
	errors: PropTypes.object,
	inProgress: PropTypes.bool,
	match: PropTypes.object.isRequired,
	articleSlug: PropTypes.string,
	appLoaded: PropTypes.bool.isRequired
}