import style from './tag.module.css';
import Tag from './tag';

export default function TagsList({ tags }) {
    const className = `${style.tag} ${status === "active" ? style.active : status === "default" ? style.default : {}}`
    return (
        tags && (
            <div className={style.tags__list}>
                {tags.map((tag) => {
                    return (
                        <Tag key={tag}>
                            {tag}
                        </Tag>
                    )
                })}
            </div>
        ));
}