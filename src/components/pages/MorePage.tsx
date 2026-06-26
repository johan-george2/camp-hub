import { useEffect, useState } from 'react';
import { camp } from '../../content/camp';
import { contacts } from '../../content/contacts';
import { prayerWallContent } from '../../content/prayerWall';
import { Card } from '../Card';
import { SectionHeader } from '../SectionHeader';
import { loadPrayerRequests, savePrayerRequests } from '../../lib/storage';
import { formatLongDate } from '../../lib/time';
import type { PrayerRequest } from '../../types';

export const MorePage = () => {
  const [prayerRequests, setPrayerRequests] = useState<PrayerRequest[]>([]);
  const [draftRequest, setDraftRequest] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setPrayerRequests(loadPrayerRequests());
  }, []);

  useEffect(() => {
    savePrayerRequests(prayerRequests);
  }, [prayerRequests]);

  const campAddress = camp.address;
  const mapsLink = camp.mapsLink;

  const submitPrayerRequest = () => {
    const message = draftRequest.trim();
    if (!message) return;

    setPrayerRequests((current) => [
      {
        id: crypto.randomUUID(),
        message,
        createdAt: new Date().toISOString(),
        prayedCount: 0,
      },
      ...current,
    ]);
    setDraftRequest('');
  };

  const incrementPrayerCount = (id: string) => {
    setPrayerRequests((current) =>
      current.map((request) =>
        request.id === id ? { ...request, prayedCount: request.prayedCount + 1 } : request,
      ),
    );
  };

  const copyAddress = async () => {
    if (!campAddress) return;
    await navigator.clipboard.writeText(campAddress);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  };

  return (
    <div className="space-y-6">
      <section className="space-y-3">
        <SectionHeader
          eyebrow="Prayer Wall"
          title={prayerWallContent.introTitle}
          subtitle={prayerWallContent.introSubtitle}
        />
        <Card>
          <div className="space-y-3">
            <textarea
              value={draftRequest}
              onChange={(event) => setDraftRequest(event.target.value)}
              placeholder={prayerWallContent.formPlaceholder}
              rows={4}
              className="w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-500"
            />
            <button
              type="button"
              onClick={submitPrayerRequest}
              className="inline-flex min-h-12 items-center justify-center rounded-2xl bg-[color:var(--color-brand)] px-4 text-sm font-semibold text-white transition hover:bg-[color:var(--color-brand-strong)]"
            >
              {prayerWallContent.submitLabel}
            </button>
          </div>
        </Card>

        <div className="space-y-3">
          {prayerRequests.map((request) => (
            <Card key={request.id}>
              <div className="space-y-4">
                <p className="text-sm leading-6 text-slate-200">{request.message}</p>
                <div className="flex items-center justify-between gap-3">
                  <p className="text-xs text-slate-500">{formatLongDate(request.createdAt)}</p>
                  <button
                    type="button"
                    onClick={() => incrementPrayerCount(request.id)}
                    className="rounded-2xl border border-[color:var(--color-brand-border)] px-3 py-2 text-sm text-white transition hover:bg-[color:var(--color-brand-soft)]"
                  >
                    {prayerWallContent.prayedLabel} · {request.prayedCount}
                  </button>
                </div>
              </div>
            </Card>
          ))}
        </div>
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

      <section className="space-y-3">
        <SectionHeader eyebrow="More" title="Secondary links" subtitle="A few useful extras without crowding the main flow." />
        <Card>
          <div className="space-y-3 text-sm leading-6 text-slate-300">
            <a
              href={mapsLink}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-between rounded-2xl bg-white/5 px-4 py-3 text-white transition hover:bg-white/7"
            >
              <span>Open camp location in Google Maps</span>
              <span className="text-[color:var(--color-brand-text)]">↗</span>
            </a>
            <p className="text-slate-400">
              Prayer requests stay local to this device, and the emergency contacts above are the fastest route if something urgent comes up.
            </p>
          </div>
        </Card>
      </section>
    </div>
  );
};
