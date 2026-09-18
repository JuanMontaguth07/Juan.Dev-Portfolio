"use client";

import { ArrowRight, CircleAlert, CircleCheckBig, Loader } from "lucide-react";
import { useTranslations } from "next-intl";
import { useId, useState, type ChangeEvent, type FormEvent } from "react";
import { cn } from "@/lib/utils";

type FormStatus = "idle" | "submitting" | "success" | "error";

type FormValues = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

type FormErrors = Partial<Record<keyof FormValues, string>>;

const EMPTY_VALUES: FormValues = {
  name: "",
  email: "",
  subject: "",
  message: "",
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

async function submitContactForm(values: FormValues): Promise<void> {
  const res = await fetch("/api/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(values),
  });
  if (!res.ok) throw new Error("Request failed");
}

const fieldClasses =
  "mt-1.5 w-full rounded-xl border bg-white/60 px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 transition-colors outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-white/5 dark:text-white dark:placeholder:text-zinc-500";

export function ContactForm() {
  const t = useTranslations("Contact.form");
  const formId = useId();
  const [values, setValues] = useState<FormValues>(EMPTY_VALUES);
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<FormStatus>("idle");

  function validate(current: FormValues): FormErrors {
    const next: FormErrors = {};
    if (!current.name.trim()) next.name = t("errors.nameRequired");
    if (!current.email.trim()) next.email = t("errors.emailRequired");
    else if (!EMAIL_PATTERN.test(current.email.trim()))
      next.email = t("errors.emailInvalid");
    if (!current.subject.trim()) next.subject = t("errors.subjectRequired");
    if (!current.message.trim()) next.message = t("errors.messageRequired");
    else if (current.message.trim().length < 10)
      next.message = t("errors.messageTooShort");
    return next;
  }

  function handleChange(
    field: keyof FormValues,
  ): (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void {
    return (e) => {
      const nextValue = e.target.value;
      setValues((prev) => ({ ...prev, [field]: nextValue }));
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    };
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const validation = validate(values);
    setErrors(validation);
    if (Object.keys(validation).length > 0) return;

    setStatus("submitting");
    try {
      await submitContactForm(values);
      setStatus("success");
      setValues(EMPTY_VALUES);
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div
        role="status"
        className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-emerald-500/20 bg-emerald-500/5 px-6 py-12 text-center"
      >
        <CircleCheckBig className="h-9 w-9 text-emerald-500" />
        <p className="text-base font-semibold text-slate-900 dark:text-white">
          {t("successTitle")}
        </p>
        <p className="max-w-xs text-sm text-slate-600 dark:text-zinc-400">
          {t("successDescription")}
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-2 rounded-full text-sm font-semibold text-cyan-700 transition-colors hover:text-cyan-600 focus-visible:ring-2 focus-visible:ring-cyan-500/40 focus-visible:outline-none dark:text-cyan-400 dark:hover:text-cyan-300"
        >
          {t("sendAnother")}
        </button>
      </div>
    );
  }

  const isSubmitting = status === "submitting";

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label
            htmlFor={`${formId}-name`}
            className="text-sm font-medium text-slate-700 dark:text-zinc-200"
          >
            {t("nameLabel")}
          </label>
          <input
            id={`${formId}-name`}
            name="name"
            type="text"
            autoComplete="name"
            placeholder={t("namePlaceholder")}
            value={values.name}
            onChange={handleChange("name")}
            disabled={isSubmitting}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? `${formId}-name-error` : undefined}
            className={cn(
              fieldClasses,
              errors.name
                ? "border-red-400 dark:border-red-500/60"
                : "border-black/10 dark:border-white/10",
            )}
          />
          {errors.name && (
            <p
              id={`${formId}-name-error`}
              className="mt-1.5 text-xs text-red-600 dark:text-red-400"
            >
              {errors.name}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor={`${formId}-email`}
            className="text-sm font-medium text-slate-700 dark:text-zinc-200"
          >
            {t("emailLabel")}
          </label>
          <input
            id={`${formId}-email`}
            name="email"
            type="email"
            autoComplete="email"
            placeholder={t("emailPlaceholder")}
            value={values.email}
            onChange={handleChange("email")}
            disabled={isSubmitting}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? `${formId}-email-error` : undefined}
            className={cn(
              fieldClasses,
              errors.email
                ? "border-red-400 dark:border-red-500/60"
                : "border-black/10 dark:border-white/10",
            )}
          />
          {errors.email && (
            <p
              id={`${formId}-email-error`}
              className="mt-1.5 text-xs text-red-600 dark:text-red-400"
            >
              {errors.email}
            </p>
          )}
        </div>
      </div>

      <div>
        <label
          htmlFor={`${formId}-subject`}
          className="text-sm font-medium text-slate-700 dark:text-zinc-200"
        >
          {t("subjectLabel")}
        </label>
        <input
          id={`${formId}-subject`}
          name="subject"
          type="text"
          placeholder={t("subjectPlaceholder")}
          value={values.subject}
          onChange={handleChange("subject")}
          disabled={isSubmitting}
          aria-invalid={Boolean(errors.subject)}
          aria-describedby={errors.subject ? `${formId}-subject-error` : undefined}
          className={cn(
            fieldClasses,
            errors.subject
              ? "border-red-400 dark:border-red-500/60"
              : "border-black/10 dark:border-white/10",
          )}
        />
        {errors.subject && (
          <p
            id={`${formId}-subject-error`}
            className="mt-1.5 text-xs text-red-600 dark:text-red-400"
          >
            {errors.subject}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor={`${formId}-message`}
          className="text-sm font-medium text-slate-700 dark:text-zinc-200"
        >
          {t("messageLabel")}
        </label>
        <textarea
          id={`${formId}-message`}
          name="message"
          rows={5}
          placeholder={t("messagePlaceholder")}
          value={values.message}
          onChange={handleChange("message")}
          disabled={isSubmitting}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? `${formId}-message-error` : undefined}
          className={cn(
            fieldClasses,
            "resize-none",
            errors.message
              ? "border-red-400 dark:border-red-500/60"
              : "border-black/10 dark:border-white/10",
          )}
        />
        {errors.message && (
          <p
            id={`${formId}-message-error`}
            className="mt-1.5 text-xs text-red-600 dark:text-red-400"
          >
            {errors.message}
          </p>
        )}
      </div>

      {status === "error" && (
        <div
          role="alert"
          className="flex items-start gap-2.5 rounded-xl border border-red-400/30 bg-red-500/5 p-3.5 text-sm dark:border-red-500/30"
        >
          <CircleAlert className="mt-0.5 h-4 w-4 shrink-0 text-red-600 dark:text-red-400" />
          <div>
            <p className="font-semibold text-red-700 dark:text-red-300">
              {t("errorTitle")}
            </p>
            <p className="mt-0.5 text-red-600/90 dark:text-red-300/80">
              {t("errorDescription")}
            </p>
          </div>
        </div>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="group flex w-full items-center justify-center gap-2 rounded-full bg-linear-to-r from-cyan-500 to-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-xl shadow-cyan-500/25 transition-transform hover:scale-[1.01] focus-visible:ring-2 focus-visible:ring-cyan-500/40 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:scale-100 sm:w-auto dark:from-cyan-400 dark:to-blue-600 dark:shadow-cyan-400/40"
      >
        {isSubmitting ? (
          <>
            <Loader className="h-4 w-4 animate-spin" />
            {t("submitting")}
          </>
        ) : (
          <>
            {t("submit")}
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </>
        )}
      </button>
    </form>
  );
}
