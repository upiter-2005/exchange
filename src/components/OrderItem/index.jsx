import styles from "./OrderItem.module.scss";

export default function OrderItem() {
  return (
    <div className={styles.orderItem}>
      <span className={styles.orderItemColumn}>BTCUSDT</span>
      <span className={styles.orderItemColumn}>21500</span>
      <span className={styles.orderItemColumn}>0.12</span>
      <span className={styles.orderItemColumn}>buy</span>
      <span className={styles.orderItemColumn}>pending</span>
      <span className={styles.orderItemColumn}>20:20:33</span>
    </div>
  );
}
