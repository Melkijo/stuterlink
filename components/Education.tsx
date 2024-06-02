import { EducationItem } from "@/types/types";

export default function Education({
  education,
}: Readonly<{ education: EducationItem }>) {
  return (
    <div className="flex gap-4">
      <div className="flex flex-col justify-center items-center">
        <div className="w-0.5 h-4 bg-dark "></div>

        <div className="w-4 h-4 bg-dark rounded-full"></div>
        <div className="w-0.5 h-20 bg-dark "></div>
      </div>
      <div>
        <h3 className="text-base font-semibold">{education.degree}</h3>
        <p className="text-sm">{education.school}</p>
        <p className="text-sm">
          {education.start_year} - {education.end_year}
        </p>
      </div>
    </div>
  );
}
