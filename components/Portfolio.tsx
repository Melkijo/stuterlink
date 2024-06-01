import Image from "next/image";
import Link from "next/link";
import { PortfolioItem } from "@/types/types";
export default function Portfolio({ portfolio }: { portfolio: PortfolioItem }) {
  return (
    <Link href={portfolio.url} target="_blank">
      <div className=" pr-4 border border-gray hover:border-black flex gap-4 items-center rounded-xl overflow-hidden h-[160px]">
        <div className="w-[200px] h-full overflow-hidden">
          <Image
            src={portfolio.image}
            alt="portfolio image"
            width={200}
            height={200}
            quality={75}
            className="object-cover w-full h-full"
          />
        </div>
        <div>
          <h3 className="font-semibold text-lg">{portfolio.title}</h3>
          <p className="text-sm">{portfolio.description}</p>
        </div>
      </div>
    </Link>
  );
}
