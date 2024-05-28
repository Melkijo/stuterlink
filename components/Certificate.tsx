import { CertificateItem } from "@/types/types";
import Link from "next/link";
import { linkIcon } from "./icons";

export default function Certificate({
  certificate,
}: Readonly<{
  certificate: CertificateItem;
}>) {
  return (
    <Link href={`${certificate.url}`}>
      <div className="w-full border border-gray rounded-lg px-4 py-2">
        <div>
          <div className="flex justify-between">
            <small>{certificate.yearPublished}</small>
            {linkIcon}
          </div>
          <h3 className="font-medium">{certificate.title}</h3>
          <small>{certificate.publishedBy}</small>
        </div>
      </div>
    </Link>
  );
}
