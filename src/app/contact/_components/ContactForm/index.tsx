"use client";

import { PropertyIdentifierFragment } from "@/generated/graphql";
import { useCallback, useMemo, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import {
  GoogleReCaptcha,
  GoogleReCaptchaProvider,
} from "react-google-recaptcha-v3";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import "@/styles/overrides/react-phone-input-2.scss";
import styles from "./styles.module.scss";
import { ContactFormData, contactSchema } from "./types";
import { sendEmail } from "./actions";

interface Props {
  initialPropertyId?: string;
  propertyIdentifiers: PropertyIdentifierFragment[];
}

export const ContactForm: React.FC<Props> = ({
  initialPropertyId,
  propertyIdentifiers,
}) => {
  const [captchaToken, setCaptchaToken] = useState<string>("");
  const [isLoading, setisLoading] = useState(false);
  const defaultValues = useMemo(
    () => ({
      propertyId: initialPropertyId,
      name: "",
      email: "",
      phone: "54",
    }),
    [initialPropertyId]
  );
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues,
  });

  const onSubmit = async (formData: ContactFormData) => {
    console.log("submitting", formData);
    setisLoading(true);
    const response = await sendEmail({ formData, captchaToken });
    setisLoading(false);
    if (response.ok) {
      reset(defaultValues);
      toast.success("Mensaje enviado correctamente");
    } else {
      toast.error("Hubo un error al enviar el mensaje");
    }
  };

  const handleCaptchaChange = useCallback((token: string | null) => {
    if (token) {
      setCaptchaToken(token);
    }
  }, []);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.contactForm}>
      <div className={styles.contactField}>
        <label htmlFor="propertyId" className={styles.contactLabel}>
          Propiedad de interes
        </label>
        <select className={styles.contactInput} {...register("propertyId")}>
          <option value="">--</option>
          {propertyIdentifiers.map((propertyIdentifier) => (
            <option key={propertyIdentifier.id} value={propertyIdentifier.id}>
              {propertyIdentifier.name}
            </option>
          ))}
        </select>
      </div>
      <div className={styles.contactField}>
        <label htmlFor="name" className={styles.contactLabel}>
          Nombre*
        </label>
        <input
          type="text"
          className={styles.contactInput}
          {...register("name")}
        />
        {!!errors.name && (
          <p className={styles.contactError}>{errors.name.message}</p>
        )}
      </div>
      <div className={styles.contactField}>
        <label htmlFor="email" className={styles.contactLabel}>
          Email*
        </label>
        <input
          type="text"
          className={styles.contactInput}
          {...register("email")}
        />
        {!!errors.email && (
          <p className={styles.contactError}>{errors.email.message}</p>
        )}
      </div>
      <div className={styles.contactField}>
        <label htmlFor="phone" className={styles.contactLabel}>
          Teléfono
        </label>
        <Controller
          name="phone"
          control={control}
          render={({ field: { onChange, value } }) => (
            <PhoneInput
              containerClass={styles.phoneContainer}
              inputClass={styles.phoneInput}
              buttonClass={styles.phoneFlagSelector}
              dropdownClass={styles.phoneDropdown}
              country={"ar"}
              value={value}
              onChange={onChange}
              specialLabel=""
              disableDropdown={true}
              placeholder="+54 (11) 1234 5678"
              defaultMask="(..) .... ...."
              alwaysDefaultMask={true}
            />
          )}
        />
        {!!errors.phone && (
          <p className={styles.contactError}>{errors.phone.message}</p>
        )}
      </div>
      <GoogleReCaptchaProvider
        reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
      >
        <GoogleReCaptcha onVerify={handleCaptchaChange} />
      </GoogleReCaptchaProvider>
      <button
        type="submit"
        className={styles.contactButton}
        disabled={isLoading}
      >
        {isLoading ? <div className={styles.loader} /> : "Contactar"}
      </button>
      <p className={styles.captchaNotice}>
        This site is protected by reCAPTCHA and the Google{" "}
        <a
          className={styles.captchaLink}
          href="https://policies.google.com/privacy"
        >
          Privacy Policy
        </a>{" "}
        and{" "}
        <a
          className={styles.captchaLink}
          href="https://policies.google.com/terms"
        >
          Terms of Service
        </a>{" "}
        apply.
      </p>
    </form>
  );
};