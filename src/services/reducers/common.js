import { ROUTES } from "constants/routes"
import {
	APP_LOAD,
	REDIRECT,
	LOGOUT,
	ARTICLE_SUBMITTED,
	SETTINGS_SAVED,
	LOGIN,
	REGISTER,
	DELETE_ARTICLE,
	ARTICLE_PAGE_UNLOADED,
	EDITOR_PAGE_UNLOADED,
	HOME_PAGE_UNLOADED,
	PROFILE_PAGE_UNLOADED,
	PROFILE_FAVORITES_PAGE_UNLOADED,
	SETTINGS_PAGE_UNLOADED,
	LOGIN_PAGE_UNLOADED,
	REGISTER_PAGE_UNLOADED,
} from "constants/actionTypes"

const defaultState = {
	appName: "Проектная кухня",
	token: null,
	viewChangeCounter: 0,
}

export default (state = defaultState, action) => {
	switch (action.type) {
		case APP_LOAD:
			return {
				...state,
				token: action.token || null,
				appLoaded: true,
				currentUser: action.payload ? action.payload.user : null,
			}
		case REDIRECT:
			return { ...state, redirectTo: null }
		case LOGOUT:
			return { ...state, redirectTo: ROUTES.LOGIN, token: null, currentUser: null }
		case ARTICLE_SUBMITTED:
			return { ...state, redirectTo: `${ROUTES.ARTICLE_DEFAULT}${action.payload.article.slug}` }
		case SETTINGS_SAVED:
			return {
				...state,
				redirectTo: action.error ? null : ROUTES.HOME,
				currentUser: action.error ? null : action.payload.user,
			}
		case LOGIN:
		case REGISTER:
			return {
				...state,
				redirectTo: action.error ? null : ROUTES.HOME,
				token: action.error ? null : action.payload.user.token,
				currentUser: action.error ? null : action.payload.user,
			}
		case DELETE_ARTICLE:
			return { ...state, redirectTo: ROUTES.HOME }
		case ARTICLE_PAGE_UNLOADED:
		case EDITOR_PAGE_UNLOADED:
		case HOME_PAGE_UNLOADED:
		case PROFILE_PAGE_UNLOADED:
		case PROFILE_FAVORITES_PAGE_UNLOADED:
		case SETTINGS_PAGE_UNLOADED:
		case LOGIN_PAGE_UNLOADED:
		case REGISTER_PAGE_UNLOADED:
			return { ...state, viewChangeCounter: state.viewChangeCounter + 1 }
		default:
			return state
	}
}
