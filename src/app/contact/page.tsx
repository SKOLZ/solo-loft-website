import { getAllPropertyIdentifiers } from "@/services/properties";
import { ContactForm } from "./_components/ContactForm";
import styles from "./styles.module.scss";

interface Props {
  searchParams?: { [key: string]: string | undefined };
}

const ContactPage: React.FC<Props> = async ({ searchParams }) => {
  const propertyIdentifiers = await getAllPropertyIdentifiers();
  const initialPropertyId = searchParams?.propertyId;
  return (
    <section className={styles.contactContainer}>
      <div className={styles.contactInfoContainer}>
        <h1 className={styles.title}>Contacto</h1>
        <ul className={styles.contactInfoFields}>
          <li className={styles.contactInfoField}>
            <i className="ic ic-envelope" />
            solo-loft@gmail.com
          </li>
          <li className={styles.contactInfoField}>
            <i className="ic ic-phone" />
            4713-2567
          </li>
          <li className={styles.contactInfoField}>
            <i className=" ic ic-location" />
            Dorrego 1940, Cap. Fed.
          </li>
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
