import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ExperienceItem } from "@/types/types";

export default function Experience({
  experience,
}: {
  experience: ExperienceItem;
}) {
  return (
    <div className="mt-6">
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <small>
            {experience.startMonth} {experience.startYear} -{" "}
            {experience.endMonth} {experience.endYear}
          </small>
          <AccordionTrigger>
            {experience.position}, {experience.company}
          </AccordionTrigger>
          <AccordionContent>{experience.description}</AccordionContent>
        </AccordionItem>
      </Accordion>
      <div className="h-[0.2px] w-full bg-gray"></div>
    </div>
  );
}
