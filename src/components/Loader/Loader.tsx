import styles from './Loader.module.css';
const Loader = () => {
  return (
    <>
      <div className={styles['sk-chase']}>
        <div className={styles['sk-chase-dot']}></div>
        <div className={styles['sk-chase-dot']}></div>
        <div className={styles['sk-chase-dot']}></div>
        <div className={styles['sk-chase-dot']}></div>
        <div className={styles['sk-chase-dot']}></div>
        <div className={styles['sk-chase-dot']}></div>
      </div>
    </>
  );
};

export default Loader;
