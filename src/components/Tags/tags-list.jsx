import style from './tag.module.css';
import Tag from './tag';

export default function TagsList({ tags }) {
    return (
        tags && (
            <div className={style.tags__list}>
                {tags.map((tag) => {
                    return (
                        <Tag key={tag} tag={tag} />
                    )
                })}
            </div>
        ));
}