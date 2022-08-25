import style from './tab.module.css';
import Tab from './tab';
import { TagFilterTab } from 'components/Home/MainView';

export default function TabList({ onTabClick, tag, tabs, tab }) {

    return (
        <ul className={style.list}>
            {tabs.map(item => <Tab onTabClick={onTabClick} eventKey={item.eventKey} title={item.title} key={item.eventKey} tab={tab} />)}
            <TagFilterTab tag={tag} />
        </ul>
    );
}