import { useState } from 'react';
import style from './tag.module.css';

export default function Tag({ isActive = false, children }) {
    const [active, setActive] = useState(isActive)
    const className = `${style.tag} ${active ? style.active : style.default}`
    const handleClick = (e) => {
        e.preventDefault();
        setActive(!active)
    }
    return (
        <a href="#" className={className} onClick={handleClick}>
            {children}
        </a>
    );
}