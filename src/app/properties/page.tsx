import { getAllProperties } from "@/services/properties";
import { notFound } from "next/navigation";
import { PropertyCard } from "./_components/PropertyCard";
import styles from "./styles.module.scss";
import { Metadata } from "next";

export const revalidate = 3600; // invalidate every hour

export const metadata: Metadata = {
  title: "Solo Loft - Propiedades",
};

interface Props {}

const Properties: React.FC<Props> = async () => {
  const properties = await getAllProperties();

  if (!properties) {
    return notFound();
  }

  return (
    <div className={styles.propertiesWrapper}>
      {properties.map((property) => (
        <PropertyCard key={property.slug} propertySummary={property} />
      ))}
    </div>
  );
};

export default Properties;
