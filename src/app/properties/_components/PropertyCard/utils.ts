import { District, TransactionType } from "@/generated/graphql";
import styles from "./styles.module.scss";

export const transactionTypeClassMap: Record<TransactionType, string> = {
  sale: styles.sale,
  rent: styles.rent,
};

export const transactionTypeTextMap: Record<TransactionType, string> = {
  sale: "venta",
  rent: "alquiler",
};

export const districtTextMap: Record<District, string> = {
  belgranoChicoCapitalFederal: "Belgrano Chico, Capital Federal",
  colegialesCapitalFederal: "Colegiales, Capital Federal",
  palermoHollywoodCapitalFederal: "Palermo Hollywood, Capital Federal",
  parquePatriciosCapitalFederal: "Parque Patricios, Capital Federal",
};
