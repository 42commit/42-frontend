import style from './pagination.module.css';

export default function PageLink({ isCurrent, onClick, v, length }) {
    const className = `${style.page__item} ${isCurrent ? style.active : style.default} ${v === 0 ? style.first : v === length - 1 ? style.last : {}}`

    return (
        <li className={className} onClick={onClick} key={v.toString()}>
            <a href="" className={style.page__link}>
                {v + 1}
            </a>
        </li>
    );
}