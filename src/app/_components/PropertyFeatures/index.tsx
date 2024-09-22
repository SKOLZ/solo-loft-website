import { FeatureFragment } from "@/generated/graphql";
import { PropertyFeature } from "./_components/PropertyFeature";

interface Props {
  features: Array<FeatureFragment>;
  meters: number;
}

export const PropertyFeatures: React.FC<Props> = ({ features, meters }) => {
  return (
    <>
      <PropertyFeature
        propertyFeature={{
          __typename: "Meters",
          amount: meters,
        }}
      />
      {features.map((feature) => (
        <PropertyFeature key={feature.__typename} propertyFeature={feature} />
      ))}
    </>
  );
};
