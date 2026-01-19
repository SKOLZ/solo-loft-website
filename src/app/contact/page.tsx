import { getAllPropertyIdentifiers } from "@/services/properties";
import { ContactForm } from "./_components/ContactForm";
import styles from "./styles.module.scss";
import { getContactInformation } from "@/services/contactInformation";
import { unstable_cache } from "next/cache";

const getCachedContactInformation = unstable_cache(
  async () => {
    return getContactInformation();
  },
  ["contact-information"],
  {
    tags: ["contact-information"],
  }
);

interface Props {
  searchParams?: { [key: string]: string | undefined };
}

const ContactPage: React.FC<Props> = async props => {
  const searchParams = await props.searchParams;
  const propertyIdentifiersPromise = getAllPropertyIdentifiers();
  const contactInformationPromise = getCachedContactInformation();
  const [propertyIdentifiers, contactInformation] = await Promise.all([
    propertyIdentifiersPromise,
    contactInformationPromise,
  ]);
  const initialPropertyId = searchParams?.propertyId;
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
      <ContactForm
        propertyIdentifiers={propertyIdentifiers}
        initialPropertyId={initialPropertyId}
      />
    </section>
  );
};

export default ContactPage;
