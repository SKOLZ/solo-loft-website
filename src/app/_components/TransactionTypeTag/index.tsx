import { TransactionType } from "@/generated/graphql";
import styles from "./styles.module.scss";
import { transactionTypeClassMap, transactionTypeTextMap } from "./utils";

interface Props {
  transactionType: TransactionType;
  className?: string;
}

export const TransactionTypeTag: React.FC<Props> = ({
  transactionType,
  className = "",
}) => {
  return (
    <p
      className={`${styles.transactionTypeTag} ${transactionTypeClassMap[transactionType]} ${className}`}
    >
      {transactionTypeTextMap[transactionType]}
    </p>
  );
};
