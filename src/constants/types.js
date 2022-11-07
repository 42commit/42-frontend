import PropTypes from "prop-types"

export const user = PropTypes.shape({
  username: PropTypes.string,
  bio: PropTypes.string,
  image: PropTypes.string,
  following: PropTypes.bool,
  tags: PropTypes.arrayOf(PropTypes.string.isRequired)
});

export const article = PropTypes.shape({
  slug: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  updatedAt: PropTypes.string.isRequired,
  favorited: PropTypes.bool.isRequired,
  favoritesCount: PropTypes.number.isRequired,
  author: user.isRequired,
  tagList: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired
});

export const comment = PropTypes.shape({
  author: user.isRequired,
  bio: PropTypes.string,
  body: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
});