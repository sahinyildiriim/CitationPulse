import { useState } from 'react';
import type { FormEvent } from 'react';
import type { BusinessSearchRequest } from '../types';

interface BusinessFormProps {
  onSubmit: (request: BusinessSearchRequest) => void;
  disabled?: boolean;
}

const inputClass =
  'w-full rounded-lg border border-hairline bg-surface px-3.5 py-2.5 text-sm text-primary placeholder:text-muted outline-none transition-colors focus:border-[var(--series-blue)]';

const labelClass = 'text-sm font-medium text-secondary';

export function BusinessForm({ onSubmit, disabled }: BusinessFormProps) {
  const [businessName, setBusinessName] = useState('');
  const [address, setAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [website, setWebsite] = useState('');
  const [error, setError] = useState<string | null>(null);

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
    <form
      onSubmit={handleSubmit}
      className="mx-auto flex w-full max-w-xl flex-col gap-4 rounded-2xl border border-hairline bg-surface p-6 sm:p-8"
    >
      <div className="flex flex-col gap-1.5">
        <label className={labelClass} htmlFor="businessName">
          İşletme adı <span className="text-[var(--status-critical)]">*</span>
        </label>
        <input
          id="businessName"
          className={inputClass}
          placeholder="Örn. Deniz Diş Kliniği"
          value={businessName}
          onChange={(event) => setBusinessName(event.target.value)}
          disabled={disabled}
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label className={labelClass} htmlFor="address">
          Adres
        </label>
        <input
          id="address"
          className={inputClass}
          placeholder="Örn. Kadıköy, İstanbul"
          value={address}
          onChange={(event) => setAddress(event.target.value)}
          disabled={disabled}
        />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <label className={labelClass} htmlFor="phoneNumber">
            Telefon
          </label>
          <input
            id="phoneNumber"
            className={inputClass}
            placeholder="+90 216 555 44 33"
            value={phoneNumber}
            onChange={(event) => setPhoneNumber(event.target.value)}
            disabled={disabled}
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className={labelClass} htmlFor="website">
            Web sitesi
          </label>
          <input
            id="website"
            className={inputClass}
            placeholder="https://..."
            value={website}
            onChange={(event) => setWebsite(event.target.value)}
            disabled={disabled}
          />
        </div>
      </div>

      {error && <p className="text-sm text-[var(--status-critical)]">{error}</p>}

      <button
        type="submit"
        disabled={disabled}
        className="mt-2 rounded-lg bg-[var(--series-blue)] px-4 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-60"
      >
        {disabled ? 'Taranıyor…' : 'Citation Taramasını Başlat'}
      </button>
    </form>
  );
}
