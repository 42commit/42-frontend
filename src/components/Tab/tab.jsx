import { useState } from 'react';
import style from './tab.module.css';

export default function Tab({ isActive = false, name }) {
    const [active, setActive] = useState(isActive)
    const className = `${style.tab} ${active ? style.active : style.inactive}`
    const handleClick = (e) => {
        e.preventDefault();
        setActive(true)
    }
    return (
        <a href="#" className={className} onClick={handleClick}>
            {name}
        </a>
    );
}