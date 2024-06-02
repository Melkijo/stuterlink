import { CertificateItem } from "@/types/types";
import Link from "next/link";
import { linkIcon } from "./icons";

export default function Certificate({
  certificate,
}: Readonly<{
  certificate: CertificateItem;
}>) {
  return (
    <Link href={`${certificate.url}`} target="_blank">
      <div className="w-full border border-gray hover:border-black rounded-lg px-4 py-2">
        <div>
          <div className="flex justify-between">
            <small>{certificate.year_published}</small>
            {linkIcon}
          </div>
          <h3 className="font-medium">{certificate.title}</h3>
          <small>{certificate.published_by}</small>
        </div>
      </div>
    </Link>
  );
}
