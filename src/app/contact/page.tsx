import { getAllPropertyIdentifiers } from "@/services/properties";
import { ContactForm } from "./_components/ContactForm";
import styles from "./styles.module.scss";
import { getContactInformation } from "@/services/contactInformation";
import { Suspense } from "react";
import { ContactFormInner } from "./_components/ContactForm/_components/ContactFormInner";

interface Props {
  searchParams?: Promise<{ [key: string]: string | undefined }>;
}

const ContactPage: React.FC<Props> = async (props) => {
  const initialPropertyId = props.searchParams?.then((sp) => sp.propertyId);
  const propertyIdentifiersPromise = getAllPropertyIdentifiers();
  const contactInformationPromise = getContactInformation();
  const [propertyIdentifiers, contactInformation] = await Promise.all([
    propertyIdentifiersPromise,
    contactInformationPromise,
  ]);
  return (
    <section className={styles.contactContainer}>
      <div className={styles.contactInfoContainer}>
        <h1 className={styles.title}>Contacto</h1>
        <ul className={styles.contactInfoFields}>
          {!!contactInformation.email && (
            <li className={styles.contactInfoField}>
              <i className="ic ic-envelope" />
              {contactInformation.email}
            </li>
          )}
          {!!contactInformation.phone && (
            <li className={styles.contactInfoField}>
              <i className="ic ic-phone" />
              {contactInformation.phone}
            </li>
          )}
          {!!contactInformation.address && (
            <li className={styles.contactInfoField}>
              <i className=" ic ic-location" />
              {contactInformation.address}
            </li>
          )}
        </ul>
      </div>
      <Suspense
        fallback={
          <ContactFormInner isDisabled={true} propertyIdentifiers={[]} />
        }
      >
        <ContactForm
          propertyIdentifiers={propertyIdentifiers}
          initialPropertyId={initialPropertyId}
        />
      </Suspense>
    </section>
  );
};

export default ContactPage;
