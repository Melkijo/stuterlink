import Image from "next/image";
import Link from "next/link";
import { PortfolioItem } from "@/types/types";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
export default function Portfolio({ portfolio }: { portfolio: PortfolioItem }) {
  return (
    <>
      <Dialog>
        <DialogTrigger>
          <div className=" pr-4 border border-gray hover:border-black flex gap-4 items-center rounded-xl overflow-hidden h-[160px]">
            <div className="min-w-[200px] h-full overflow-hidden">
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
              <h3 className="font-semibold text-lg text-left">
                {portfolio.title}
              </h3>
              <p className="text-sm line-clamp-2 text-left">
                {portfolio.description}
              </p>
            </div>
          </div>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{portfolio.title}</DialogTitle>
            <DialogDescription className="h-fit">
              <div className="w-full h-[200px] overflow-hidden">
                <Image
                  src={portfolio.image}
                  alt="portfolio image"
                  width={500}
                  height={500}
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="flex my-2 justify-end items-center">
                <Link
                  href={portfolio.url}
                  target="_blank"
                  className="bg-dark w-fit text-white px-4 py-2 rounded-md  flex justify-end items-center  hover:bg-primary hover:text-primary-foreground"
                >
                  View detail
                </Link>
              </div>
              <div>
                <p className="text-sm">{portfolio.description}</p>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
}
