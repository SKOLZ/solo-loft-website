import { getAboutUs } from "@/services/aboutUs";
import styles from "./styles.module.scss";
import { RichText } from "@graphcms/rich-text-react-renderer";

interface Props {}

const AboutUsPage: React.FC<Props> = async () => {
  const { description } = await getAboutUs();
  return (
    <section className={styles.aboutUsContainer}>
      <h1 className={styles.title}>Sobre nosotros</h1>
      <article className={styles.propertyDescription}>
        <RichText content={description.raw} />
      </article>
    </section>
  );
};

export default AboutUsPage;
