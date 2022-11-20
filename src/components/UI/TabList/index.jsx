import style from "./TabList.module.scss"
import Tab from "../Tab/"
import { connect } from "react-redux"
import PropTypes from "prop-types"

const mapStateToProps = (state) => ({ tag: state.articleList.tag, state: state })

const TabListComponent = ({ tabs, tag, tagsOff = false }) => {
	return (
		<ul className={style.list}>
			{tabs.map((item) => (
				<Tab eventKey={item.eventKey} title={item.title} key={item.title} route={item.route} />
			))}
			{!tagsOff && tag && <Tab title={`#${tag}`} route={"/"} />}
		</ul>
	)
}

export const TabList = connect(mapStateToProps)(TabListComponent)

TabListComponent.propTypes = {
	tabs: PropTypes.array.isRequired,
	tag: PropTypes.string,
	tagsOff: PropTypes.bool,
}
