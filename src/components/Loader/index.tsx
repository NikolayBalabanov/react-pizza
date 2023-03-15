import styles from './Loader.module.scss';

function Loader() {
  return (
    <div className={styles['loading-pane']}>
      <h2 className={styles.loader}>🍕</h2>
    </div>
  );
}

export default Loader;
