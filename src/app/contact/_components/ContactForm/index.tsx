import { PropertyIdentifierFragment } from "@/generated/graphql";
import { useRef } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { useForm } from "react-hook-form";
import { z, ZodType } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

type ContactFormData = {
  propertyId: string;
  name: string;
  email: string;
  phone?: string;
};

const PHONE_REGEX = /^\d{4}-\d{4}$/;

const contactSchema: ZodType<ContactFormData> = z.object({
  propertyId: z.string(),
  name: z.string().min(3).max(60),
  email: z.string().email(),
  phone: z.string().regex(PHONE_REGEX).optional(),
});

interface Props {
  propertyIdentifiers: PropertyIdentifierFragment[];
}

export const ContactForm: React.FC<Props> = ({ propertyIdentifiers }) => {
  const captchaRef = useRef<ReCAPTCHA>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = (data: any) => {
    sendContactEmail(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="propertyId">Propiedad de interes</label>
        <select name="propertyId">
          <option value="">Ninguna</option>
          {propertyIdentifiers.map((propertyIdentifier) => (
            <option key={propertyIdentifier.id} value={propertyIdentifier.name}>
              {propertyIdentifier.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label
          htmlFor="name"
          {...register("name", { required: true, maxLength: 60 })}
        >
          Nombre*
        </label>
        <input type="text" name="name" />
        {errors.name?.type === "required" && <p>El nombre es requerido.</p>}
        {errors.name?.type === "maxLength" && <p>El nombre es muy largo.</p>}
      </div>
      <div>
        <label
          htmlFor="email"
          {...register("email", {
            required: true,
            pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
          })}
        >
          Email*
        </label>
        <input type="text" name="email" />
        {errors.email?.type === "required" && (
          <p className="contact-error">El email es requerido.</p>
        )}
        {errors.email?.type === "pattern" && (
          <p className="contact-error">El formato de email es incorrecto.</p>
        )}
      </div>
      <div>
        <label htmlFor="phone">Teléfono</label>
        <input type="text" name="phone" />
      </div>
      <ReCAPTCHA
        sitekey={"6LcjulgqAAAAANwNwRDEOgMRbR5LLXftNmM_ZNyB"}
        ref={captchaRef}
      />
      <button type="submit">Enviar</button>
    </form>
  );
};
