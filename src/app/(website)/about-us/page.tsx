import { getAboutUs } from "@/services/aboutUs";
import styles from "./styles.module.scss";
import { RichText } from "@graphcms/rich-text-react-renderer";
import Image from "next/image";
import { buildMetadata } from "@/utils/buildMetadata";

export const generateMetadata = async () => {
  return await buildMetadata(
    {
      title: "Nosotros",
      description: "Conoce más sobre nuestra empresa y equipo en Solo Loft.",
    },
    `/about-us`,
  );
};

const AboutUsPage: React.FC = async () => {
  const { description } = await getAboutUs();
  return (
    <section className={styles.aboutUsContainer}>
      <h1 className={styles.title}>Sobre nosotros</h1>
      <article className={styles.propertyDescription}>
        <RichText
          content={description.raw}
          renderers={{
            img: ({ src, altText }) => (
              <Image
                src={src!}
                alt={altText || ""}
                className={styles.aboutDescriptionImage}
                width={533}
                height={300}
              />
            ),
          }}
        />
      </article>
    </section>
  );
};

export default AboutUsPage;
