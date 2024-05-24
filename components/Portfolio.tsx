import Image from "next/image";
import Link from "next/link";

export default function Portfolio() {
  return (
    <Link href="/profile">
      <div className=" pr-4 border border-gray flex gap-4 items-center rounded-xl overflow-hidden h-[160px]">
        <div className="w-[600px] h-full">
          <Image
            src="https://firebasestorage.googleapis.com/v0/b/beasiswakita-3e322.appspot.com/o/img%2F20220118190946_IMG_8897%201.png?alt=media&token=d9550a4e-cdbf-4300-a38c-366aaeabb85c"
            alt="profile picture"
            width={200}
            height={200}
            className="object-cover w-full h-full"
          />
        </div>
        <div>
          <h3 className="font-semibold text-lg">Scube center</h3>
          <p className="text-sm">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit.
            Praesentium blanditiis eum harum magnam fugit quo!
          </p>
        </div>
      </div>
    </Link>
  );
}
