import { useEffect, useState } from 'react';
import style from './tab.module.css';
//import { useDispatch } from 'react-redux';
//import { CHANGE_TAB } from 'constants/actionTypes';
import agent from 'agent';

//TODO: менять стиль кнопки в зависимости от статуса (useDispatch)

export default function Tab({ onTabClick, eventKey, title, tab }) {
    //const dispatch = useDispatch();
    const [active, setActive] = useState(eventKey === tab)
    const className = `${style.tab} ${active ? style.active : style.inactive}`

    useEffect(() => {
        setActive(eventKey === tab)
    }, [eventKey, tab])

    //console.log("currentTab", currentTab, "eventKey", eventKey);
    const clickHandler = (ev) => {
        ev.preventDefault()
        onTabClick(eventKey, agent.Articles[eventKey], agent.Articles[eventKey]());
        //dispatch({ type: CHANGE_TAB, tab })
    }
    return (
        <li>
            <a href="#" className={className} onClick={clickHandler}>
                {title}
            </a>
        </li>
    );
}