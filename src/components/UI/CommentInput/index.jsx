import React, { useEffect, useState } from "react"
import { connect } from "react-redux"
import { ADD_COMMENT, PROFILE_PAGE_LOADED, PROFILE_PAGE_UNLOADED } from "constants/actionTypes"
import { Input } from "../Input"
import { ArticleMeta } from "../ArticleMeta"
import style from "./CommentInput.module.scss"
import { Button } from ".."
import agent from "agent"

const mapStateToProps = state => ({
    profile: state.profile,
    currentUser: state.common.currentUser,
    slug: state.article.article.slug
})

const mapDispatchToProps = (dispatch) => ({
    onSubmit: (payload) => dispatch({ type: ADD_COMMENT, payload }),
    onLoad: (payload) => dispatch({ type: PROFILE_PAGE_LOADED, payload }),
    onUnload: () => dispatch({ type: PROFILE_PAGE_UNLOADED }),

})


const CommentInput = (props) => {
    const [body, setBody] = useState('')
    const bodyHandler = (e) => {
        setBody(e.currentTarget.value)
    }
    const createComment = (e) => {
        e.preventDefault()
        props.onSubmit(agent.Comments.create(props.slug, { body }))
        setBody('')
    }
    useEffect(() => {
        props.onLoad(Promise.all([
            agent.Profile.get(props.currentUser.username),
            agent.Articles.byAuthor(props.currentUser.username)
        ]))
        return () => {
            props.onUnload()
        }
    }, [props.onLoad])


    if (!props.profile.image && !props.profile.username) return null
    return (
        <form className={style.card} onSubmit={createComment}>
            <div className={style.top}>
                <Input
                    placeholder="Написать комментарий"
                    type="comment"
                    value={body}
                    onChange={bodyHandler}
                />
            </div>
            <div className={style.footer}>
                <ArticleMeta
                    image={props.profile.image}
                    username={props.profile.username}
                >
                    <Button mark="comment" htmlType="submit">
                        Отправить комментарий
                    </Button>
                </ArticleMeta>
            </div>
        </form>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentInput)
