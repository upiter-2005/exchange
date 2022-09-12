import { useDispatch } from "react-redux";
import {
  removeOrder,
  moneyBackBuy,
  moneyBackSell,
} from "../../redux/slices/userSlice";

import styles from "./OrderItem.module.scss";

export default function OrderItem({
  currency,
  exchangeTo,
  price,
  amount,
  type,
  time,
}) {
  const dispatch = useDispatch();

  const moneyBack = () => {
    if (type === "buy") {
      dispatch(
        moneyBackBuy({
          exchangeTo,
          quntity: amount * price,
        })
      );
    } else {
      dispatch(
        moneyBackSell({
          currency,
          quntity: amount,
        })
      );
    }

    dispatch(removeOrder(time));
  };
  console.log(currency);

  return (
    <div className={styles.orderItem}>
      <span
        className={styles.orderItemColumn}
      >{`${currency}${exchangeTo}`}</span>
      <span className={styles.orderItemColumn}>{price}</span>
      <span className={styles.orderItemColumn}>{amount}</span>
      <span className={styles.orderItemColumn}>
        {parseFloat(amount * price).toFixed(3)}
      </span>
      <span
        className={
          type === "buy"
            ? `${styles.orderItemColumnBuy}`
            : `${styles.orderItemColumnSell}`
        }
      >
        {type}
      </span>
      <span className={styles.orderItemColumn}>pending</span>
      <span className={styles.orderItemColumn}>{time}</span>
      <span
        className={`${styles.orderItemColumn} ${styles.cancel}`}
        onClick={moneyBack}
      >
        Cancel
      </span>
    </div>
  );
}
