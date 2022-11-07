import superagentPromise from "superagent-promise"
import _superagent from "superagent"
import { API_CONSTS, API_QUERIES } from "constants/apiConsts"

const superagent = superagentPromise(_superagent, Promise)

const API_ROOT = "http://194.67.67.50:3000/api"

const encode = encodeURIComponent
const responseBody = (res) => res.body

let token = null
const tokenPlugin = (req) => {
	if (token) req.set("authorization", `Token ${token}`)
}

const requests = {
	del: (url) => superagent.del(`${API_ROOT}${url}`).use(tokenPlugin).then(responseBody),
	get: (url) => superagent.get(`${API_ROOT}${url}`).use(tokenPlugin).then(responseBody),
	put: (url, body) => superagent.put(`${API_ROOT}${url}`, body).use(tokenPlugin).then(responseBody),
	post: (url, body) => superagent.post(`${API_ROOT}${url}`, body).use(tokenPlugin).then(responseBody),
}

const Auth = {
	current: () => requests.get(API_CONSTS.USER),
	login: (email, password) => requests.post(`${API_CONSTS.USERS}${API_CONSTS.LOGIN}`, { user: { email, password } }),
	register: (username, email, password) => requests.post(API_CONSTS.USERS, { user: { username, email, password } }),
	save: (user) => requests.put(API_CONSTS.USER, { user }),
}

const Tags = {
	getAll: () => requests.get(API_CONSTS.TAGS),
}

const limit = (count, p) => `${API_QUERIES.LIMIT}${count}&${API_QUERIES.OFFSET}${p ? p * count : 0}`
const omitSlug = (article) => Object.assign({}, article, { slug: undefined })
const Articles = {
	all: (page) => requests.get(`${API_CONSTS.ARTICLES}?${limit(10, page)}`),
	byAuthor: (author, page) => requests.get(`${API_CONSTS.ARTICLES}?${API_QUERIES.AUTHOR}${encode(author)}&${limit(5, page)}`),
	byTag: (tag, page) => requests.get(`${API_CONSTS.ARTICLES}?${API_QUERIES.TAG}${encode(tag)}&${limit(10, page)}`),
	del: (slug) => requests.del(`${API_CONSTS.ARTICLES}/${slug}`),
	favorite: (slug) => requests.post(`${API_CONSTS.ARTICLES}/${slug}${API_CONSTS.FAVORITE}`),
	favoritedBy: (author, page) => requests.get(`${API_CONSTS.ARTICLES}?${API_QUERIES.FAVORITED}${encode(author)}&${limit(5, page)}`),
	feed: () => requests.get(`${API_CONSTS.ARTICLES}${API_CONSTS.FEED}?${API_QUERIES.LIMIT}10&${API_QUERIES.OFFSET}0`),
	get: (slug) => requests.get(`${API_CONSTS.ARTICLES}/${slug}`),
	unfavorite: (slug) => requests.del(`${API_CONSTS.ARTICLES}/${slug}${API_CONSTS.FAVORITE}`),
	update: (article) => requests.put(`${API_CONSTS.ARTICLES}/${article.slug}`, { article: omitSlug(article) }),
	create: (article) => requests.post(API_CONSTS.ARTICLES, { article }),
}

const Comments = {
	create: (slug, comment) => requests.post(`${API_CONSTS.ARTICLES}/${slug}${API_CONSTS.COMMENTS}`, { comment }),
	delete: (slug, commentId) => requests.del(`${API_CONSTS.ARTICLES}/${slug}${API_CONSTS.COMMENTS}/${commentId}`),
	forArticle: (slug) => requests.get(`${API_CONSTS.ARTICLES}/${slug}${API_CONSTS.COMMENTS}`),
}

const Profile = {
	follow: (username) => requests.post(`${API_CONSTS.PROFILES}/${username}${API_CONSTS.FOLLOW}`),
	get: (username) => requests.get(`${API_CONSTS.PROFILES}/${username}`),
	unfollow: (username) => requests.del(`${API_CONSTS.PROFILES}/${username}${API_CONSTS.FOLLOW}`),
}

export default {
	Articles,
	Auth,
	Comments,
	Profile,
	Tags,
	setToken: (_token) => {
		token = _token
	},
}
