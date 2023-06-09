import styles from './NotFoundBlock.module.scss';

function NotFoundBlock() {
  return (
    <div className={styles.root}>
      <div>
        <span>😕</span>
        <hr />
        <h1>Ничего не найдено</h1>
        <p className={styles.description}>
          К сожалению данная страница отсутствует в нашем интернет-магазине
        </p>
      </div>
    </div>
  );
}

export default NotFoundBlock;
