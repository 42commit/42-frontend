import style from './sidebar.module.css';

export default function Sidebar({ children }) {
    const className = `${style.sidebar}`
    return (
        <div className={className}>
            <p>Популярные теги</p>
            {children}
        </div>
    );
}