import { getAllPropertyIdentifiers } from "@/services/properties";
import { ContactForm } from "./_components/ContactForm";

interface Props {}

const ContactPage: React.FC<Props> = async () => {
  const propertyIdentifiers = await getAllPropertyIdentifiers();

  return (
    <section>
      <div>
        <h1>Contact</h1>
        <ul>
          <li>
            <i className="ic ic-envelope" />
            email@gmail.com
          </li>
          <li>
            <i className="ic ic-phone" />
            1234-5678
          </li>
          <li>
            <i className=" ic ic-location" />
            Dorrego 1940, Cap. Fed.
          </li>
        </ul>
      </div>
      <ContactForm propertyIdentifiers={propertyIdentifiers} />
    </section>
  );
};

export default ContactPage;
