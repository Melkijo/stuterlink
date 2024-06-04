import Image from "next/image";
import Link from "next/link";

type LinkProps = {
  url: string;
  title: string;
  image: string;
};
export default function OtherLink({ url, title, image }: LinkProps) {
  return (
    <Link href={url}>
      <div className=" pr-4 border border-gray flex gap-4 items-center rounded-xl overflow-hidden h-[160px]">
        <div className="min-w-[150px] max-w-[150px] h-full">
          <Image
            src={image}
            alt="profile picture"
            width={200}
            height={200}
            className="object-cover w-full h-full"
          />
        </div>
        <div>
          <h3 className="font-semibold text-lg">{title}</h3>
          <small>{url}</small>
        </div>
      </div>
    </Link>
  );
}
