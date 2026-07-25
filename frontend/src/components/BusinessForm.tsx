import { useEffect, useState } from 'react';
import type { FormEvent, ReactNode } from 'react';
import type { BusinessSearchRequest } from '../types';
import { ArrowRightIcon, BuildingIcon, GlobeIcon, MapPinIcon, PhoneIcon, SpinnerIcon } from './icons';

export interface BusinessLiveFields {
  businessName: string;
  address: string;
  phoneNumber: string;
  website: string;
}

interface BusinessFormProps {
  onSubmit: (request: BusinessSearchRequest) => void;
  onLiveChange?: (fields: BusinessLiveFields) => void;
  disabled?: boolean;
}

const labelClass = 'text-sm font-medium text-secondary';

interface FieldProps {
  id: string;
  label: string;
  required?: boolean;
  icon: ReactNode;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  error?: string;
}

function Field({ id, label, required, icon, placeholder, value, onChange, disabled, error }: FieldProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className={labelClass} htmlFor={id}>
        {label}
        {required && <span className="ml-1 text-(--status-critical)">*</span>}
      </label>
      <div className="group relative">
        <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-muted transition-colors duration-200 group-focus-within:text-(--series-blue)">
          {icon}
        </span>
        <input
          id={id}
          className="focus-ring w-full rounded-xl border border-hairline bg-surface py-2.5 pl-10 pr-3.5 text-sm text-primary placeholder:text-muted transition-all duration-200 focus:border-(--series-blue) focus:ring-4 focus:ring-(--series-blue)/12"
          placeholder={placeholder}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          disabled={disabled}
          aria-required={required || undefined}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? `${id}-error` : undefined}
        />
      </div>
      {error && (
        <p id={`${id}-error`} role="alert" className="text-sm text-(--status-critical)">
          {error}
        </p>
      )}
    </div>
  );
}

export function BusinessForm({ onSubmit, onLiveChange, disabled }: BusinessFormProps) {
  const [businessName, setBusinessName] = useState('');
  const [address, setAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [website, setWebsite] = useState('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    onLiveChange?.({ businessName, address, phoneNumber, website });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [businessName, address, phoneNumber, website]);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    if (!businessName.trim()) {
      setError('İşletme adı zorunludur.');
      return;
    }

    setError(null);
    onSubmit({
      businessName: businessName.trim(),
      address: address.trim() || undefined,
      phoneNumber: phoneNumber.trim() || undefined,
      website: website.trim() || undefined,
    });
  };

  return (
    <div
      className="relative isolate mx-auto w-full max-w-xl
        before:absolute before:-left-8 before:-top-10 before:-z-10 before:h-40 before:w-40 before:rounded-full
        before:bg-(--series-blue) before:opacity-25 before:blur-3xl before:content-['']
        after:absolute after:-bottom-10 after:-right-10 after:-z-10 after:h-40 after:w-40 after:rounded-full
        after:bg-(--series-violet) after:opacity-20 after:blur-3xl after:content-['']"
    >
      <form
        onSubmit={handleSubmit}
        className="flex w-full flex-col gap-5 rounded-3xl border border-hairline bg-surface p-6
          shadow-[0_35px_70px_-30px_var(--shadow-color)] transition-transform duration-300 hover:-translate-y-1 sm:p-8"
      >
        <Field
          id="businessName"
          label="İşletme adı"
          required
          icon={<BuildingIcon />}
          placeholder="Örn. Deniz Diş Kliniği"
          value={businessName}
          onChange={setBusinessName}
          disabled={disabled}
          error={error ?? undefined}
        />

        <Field
          id="address"
          label="Adres"
          icon={<MapPinIcon />}
          placeholder="Örn. Kadıköy, İstanbul"
          value={address}
          onChange={setAddress}
          disabled={disabled}
        />

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Field
            id="phoneNumber"
            label="Telefon"
            icon={<PhoneIcon />}
            placeholder="+90 216 555 44 33"
            value={phoneNumber}
            onChange={setPhoneNumber}
            disabled={disabled}
          />

          <Field
            id="website"
            label="Web sitesi"
            icon={<GlobeIcon />}
            placeholder="https://..."
            value={website}
            onChange={setWebsite}
            disabled={disabled}
          />
        </div>

        <button
          type="submit"
          disabled={disabled}
          className="focus-ring group/btn relative mt-1 flex items-center justify-center gap-2 overflow-hidden rounded-xl
            bg-linear-to-r from-(--series-blue) to-(--series-violet) px-4 py-3 text-sm font-semibold text-white
            shadow-[0_12px_24px_-10px_var(--series-blue)] transition-all duration-200
            hover:shadow-[0_16px_28px_-8px_var(--series-blue)] hover:brightness-110
            active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:brightness-100"
        >
          {disabled ? (
            <>
              <SpinnerIcon />
              Taranıyor…
            </>
          ) : (
            <>
              Citation Taramasını Başlat
              <ArrowRightIcon className="h-4 w-4 transition-transform duration-200 group-hover/btn:translate-x-1" />
            </>
          )}
        </button>
      </form>
    </div>
  );
}
