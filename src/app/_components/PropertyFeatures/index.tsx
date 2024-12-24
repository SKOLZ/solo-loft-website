import { FeatureFragment } from "@/generated/graphql";
import { PropertyFeature } from "./_components/PropertyFeature";

interface Props {
  features: Array<FeatureFragment>;
  meters: number;
}

export const PropertyFeatures: React.FC<Props> = ({ features, meters }) => {
  console.log("features", features);
  return (
    <>
      <PropertyFeature
        propertyFeature={{
          type: "meters",
          amount: meters,
        }}
      />
      {features.map((feature) => (
        <PropertyFeature key={feature.type} propertyFeature={feature} />
      ))}
    </>
  );
};
