import { useState } from 'react';
import style from './tab.module.css';
//import { useDispatch } from 'react-redux';
//import { CHANGE_TAB } from 'constants/actionTypes';
import agent from 'agent';

//TODO: менять стиль кнопки в зависимости от статуса (useDispatch)

export default function Tab({ onTabClick, tabName, name, tab }) {
    //const dispatch = useDispatch();
    const [active, setActive] = useState(tabName === tab)
    const className = `${style.tab} ${active ? style.active : style.inactive}`
    //console.log("currentTab", currentTab, "tabName", tabName);
    const clickHandler = (ev) => {
        ev.preventDefault()
        onTabClick(tabName, agent.Articles[tabName], agent.Articles[tabName]());
        //dispatch({ type: CHANGE_TAB, tab })
        setActive(tabName === tab)
    }
    return (
        <li>
            <a href="#" className={className} onClick={clickHandler}>
                {name}
            </a>
        </li>
    );
}