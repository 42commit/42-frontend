import { useState } from 'react';
import style from './tab.module.css';

export default function Tab({ isActive = false, name, onClick }) {
    const [active, setActive] = useState(isActive)
    const className = `${style.tab} ${active ? style.active : style.inactive}`
    const handleClick = (e) => {
        onClick(e)
        setActive(true)
    }
    return (
        <a href="#" className={className} onClick={handleClick}>
            {name}
        </a>
    );
}