import { PropertyIdentifierFragment } from "@/generated/graphql";
import { ContactFormInner } from "./_components/ContactFormInner";

interface ContactFormProps {
  initialPropertyId?: Promise<string | undefined>;
  propertyIdentifiers: PropertyIdentifierFragment[];
}

export const ContactForm: React.FC<ContactFormProps> = async ({
  initialPropertyId,
  propertyIdentifiers,
}) => {
  const initialPropertyIdValue = await initialPropertyId;
  return (
    <ContactFormInner
      initialPropertyId={initialPropertyIdValue}
      propertyIdentifiers={propertyIdentifiers}
    />
  );
};
