import { useSelector } from "react-redux";
import styles from "./Wallet.module.scss";

export default function Wallet() {
  const items = useSelector((state) => state.user.balance);

  return (
    <div className={styles.walletWrapper}>
      {Object.keys(items)?.map((coin) => (
        <div key={coin} className={styles.walletItem}>
          <span>{coin} </span>
          <span>{items[coin]}</span>
        </div>
      ))}
    </div>
  );
}
