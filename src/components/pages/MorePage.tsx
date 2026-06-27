import { useState } from 'react';
import { camp, contacts } from '../../lib/content';
import { Card } from '../Card';
import { SectionHeader } from '../SectionHeader';

export const MorePage = () => {
  const [copied, setCopied] = useState(false);

  const campAddress = camp.address;
  const mapsLink = camp.mapsLink;
  const embeddedMapSrc = `https://maps.google.com/maps?q=${encodeURIComponent(campAddress)}&t=&z=14&ie=UTF8&iwloc=&output=embed`;
  const addressLines = camp.addressLines;

  const copyAddress = async () => {
    if (!campAddress) return;
    await navigator.clipboard.writeText(campAddress);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  };

  return (
    <div className="space-y-6">
      <section className="space-y-3">
        <SectionHeader eyebrow="Camp Location" title="Find your way to camp" />
        <Card className="overflow-hidden border-[color:var(--color-brand-border)] bg-[radial-gradient(circle_at_top_left,rgba(140,121,255,0.18),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(56,189,248,0.10),transparent_30%),linear-gradient(145deg,rgba(73,58,171,0.22),rgba(255,255,255,0.04)_55%,rgba(10,12,20,0.95))] p-0">
          <div className="p-5">
            <div className="space-y-4">
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.24em] text-[color:var(--color-brand-text)]">
                  Camp Location
                </p>
                <h3 className="mt-3 text-2xl font-semibold tracking-tight text-white">{camp.locationName}</h3>
              </div>
              <div className="rounded-2xl border border-white/8 bg-black/20 p-4 text-sm leading-7 text-slate-200">
                {addressLines.map((line) => (
                  <div key={line}>{line}</div>
                ))}
              </div>
            </div>
          </div>

          <div className="px-5 pb-5">
            <div className="overflow-hidden rounded-[24px] border border-white/8 bg-[#101114] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.04)]">
              <iframe
                title="Camp location map preview"
                src={embeddedMapSrc}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="block h-56 w-full bg-[#101114]"
              />
            </div>
          </div>

          <div className="grid gap-3 border-t border-white/10 px-5 pb-5 pt-4 sm:grid-cols-2">
            <a
              href={mapsLink}
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-12 items-center justify-center rounded-2xl bg-[color:var(--color-brand)] px-4 text-sm font-semibold text-white transition hover:bg-[color:var(--color-brand-strong)]"
            >
              Google Maps
            </a>
            <button
              type="button"
              onClick={copyAddress}
              className="inline-flex min-h-12 items-center justify-center rounded-2xl border border-white/10 bg-white/6 px-4 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              {copied ? 'Copied address' : 'Copy address'}
            </button>
          </div>
        </Card>
      </section>

      <section className="space-y-3">
        <SectionHeader eyebrow="Emergency" title="Contacts and help" />
        <div className="space-y-3">
          {contacts.map((contact) => (
            <Card key={contact.id}>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-slate-400">{contact.role}</p>
                  <h3 className="text-lg font-semibold text-white">{contact.name}</h3>
                </div>
                {contact.phone ? (
                  <a
                    href={`tel:${contact.phone}`}
                    className="inline-flex min-h-12 items-center justify-center rounded-2xl bg-[color:var(--color-brand-soft)] px-4 text-sm font-medium text-white transition hover:bg-[color:var(--color-brand-border)]"
                  >
                    Call {contact.phone}
                  </a>
                ) : null}
                {contact.address ? (
                  <div className="flex flex-wrap items-center gap-3">
                    <a
                      href={mapsLink}
                      target="_blank"
                      rel="noreferrer"
                      className="flex-1 text-sm leading-6 text-[color:var(--color-brand-text)] underline decoration-[color:var(--color-brand-border)] underline-offset-4"
                    >
                      {contact.address}
                    </a>
                    <button
                      type="button"
                      onClick={copyAddress}
                      className="rounded-2xl border border-white/10 px-3 py-2 text-sm text-white transition hover:bg-white/6"
                    >
                      {copied ? 'Copied' : 'Copy address'}
                    </button>
                  </div>
                ) : null}
                {contact.notes ? <p className="text-sm leading-6 text-slate-400">{contact.notes}</p> : null}
              </div>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
};
