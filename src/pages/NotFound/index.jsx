import { Title } from 'components/UI';
import style from './NotFound.module.scss'

const NotFound = () => {
  return (
    <div className={style.wrapper}>
      <p className={style.code}>404</p>
      <Title>Страница не найдена</Title>
    </div>
  )
}

export default NotFound;