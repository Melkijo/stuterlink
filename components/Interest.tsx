import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

type InterestProps = {
  interest: string[];
};

export default function Interest({ interest }: InterestProps) {
  return (
    <Dialog>
      <DialogTrigger className=" flex gap-2 flex-wrap items-center">
        {interest
          ? interest.map((item, index) =>
              index < 5 ? (
                <div
                  key={index}
                  className="py-2 px-4 border-dark-2 border w-fit rounded-full"
                >
                  <p className="text-sm">{item}</p>
                </div>
              ) : (
                index === 5 && (
                  <div
                    key="more"
                    className="py-2 px-4 border-dark-2 border w-fit rounded-full bg-dark text-white"
                  >
                    <p className="text-sm">{interest.length - 5}+</p>
                  </div>
                )
              )
            )
          : null}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Interest</DialogTitle>
          <DialogDescription className="pt-4 flex gap-2 flex-wrap items-center">
            {interest
              ? interest.map((item, index) => (
                  <div
                    key={index}
                    className="py-2 px-4 border-dark-2 border w-fit rounded-full"
                  >
                    <p className="text-sm">{item}</p>
                  </div>
                ))
              : null}
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
