import { getAllProperties } from "@/services/properties";
import { notFound } from "next/navigation";
import { PropertyCard } from "./_components/PropertyCard";
import styles from "./styles.module.scss";
import { buildMetadata } from "@/utils/buildMetadata";

export const generateMetadata = async () => {
  return await buildMetadata(
    {
      title: "Propiedades",
      description: "Encuentra las mejores propiedades en Solo Loft",
    },
    `/properties`,
  );
};

const Properties: React.FC = async () => {
  const properties = await getAllProperties();

  if (!properties) {
    return notFound();
  }

  return (
    <section className={styles.propertiesWrapper}>
      {properties.map((property) => (
        <PropertyCard key={property.slug} propertySummary={property} />
      ))}
    </section>
  );
};

export default Properties;
