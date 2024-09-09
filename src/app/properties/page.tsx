import { getAllProperties } from "@/services/properties";
import { notFound } from "next/navigation";
import { PropertyCard } from "./_components/PropertyCard";

interface Props {}

const Properties: React.FC<Props> = async () => {
  const properties = await getAllProperties();

  if (!properties) {
    return notFound();
  }

  return (
    <div className="wrapper">
      {properties.map((property) => (
        <PropertyCard key={property.id} propertySummary={property} />
      ))}
    </div>
  );
};

export default Properties;
