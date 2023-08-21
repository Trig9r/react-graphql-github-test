/* eslint-disable import/no-extraneous-dependencies */
import { useNavigate } from 'react-router-dom';

import styles from './styles.module.scss';

export const ErrorPage = () => {
  const navigate = useNavigate();

  return (
    <div id='error-page'>
      <div className={styles.flex_container}>
        <div className={styles.text_center}>
          <h1>
            <span className={styles.fade_in} id='digit1'>
              4
            </span>
            <span className={styles.fade_in} id='digit2'>
              0
            </span>
            <span className={styles.fade_in} id='digit3'>
              4
            </span>
          </h1>
          <h3 className={styles.fadeIn}>Страница не найдена</h3>
          <button type='button' name='button' onClick={() => navigate('/')}>
            Вернутся обратно
          </button>
        </div>
      </div>
    </div>
  );
};
