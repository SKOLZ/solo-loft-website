import { TransactionType } from "@/generated/graphql";
import styles from "./styles.module.scss";

export const transactionTypeClassMap: Record<TransactionType, string> = {
  sale: styles.sale,
  rent: styles.rent,
};

export const transactionTypeTextMap: Record<TransactionType, string> = {
  sale: "venta",
  rent: "alquiler",
};
