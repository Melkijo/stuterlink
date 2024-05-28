import { EducationItem } from "@/types/types";

export default function Education({
  education,
}: Readonly<{ education: EducationItem }>) {
  return (
    <div>
      <div className="mt-4">
        <div>
          <h3 className="text-base font-semibold">{education.degree}</h3>
          <p className="text-sm">{education.school}</p>
          <p className="text-sm">
            {education.startYear} - {education.endYear}
          </p>
        </div>
      </div>
    </div>
  );
}
