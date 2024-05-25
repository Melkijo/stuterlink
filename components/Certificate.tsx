import { CertificateItem } from "@/types/types";

export default function Certificate({
  certificate,
}: {
  certificate: CertificateItem;
}) {
  return (
    <div className="w-full border border-gray rounded-lg px-4 py-2">
      <div>
        <small>{certificate.yearPublished}</small>
        <h3 className="font-medium">{certificate.title}</h3>
        <small>{certificate.publishedBy}</small>
      </div>
    </div>
  );
}
