import { SITE } from '@/lib/config';

/** Keyless Google Maps embed centered on the farm address. */
export default function MapEmbed({ title }: { title: string }) {
  const query = encodeURIComponent(`${SITE.address.street}, ${SITE.address.locality}`);
  const src = `https://maps.google.com/maps?q=${query}&z=15&output=embed&hl=he`;
  return (
    <div className="overflow-hidden rounded-card shadow-soft">
      <iframe
        title={title}
        src={src}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="h-72 w-full border-0 sm:h-96"
      />
    </div>
  );
}
