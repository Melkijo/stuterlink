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
          <div className="flex gap-4 mb-1">
            <small>
              {experience.start_month} {experience.start_year} -
              {experience.working_here ? (
                <span> Present</span>
              ) : (
                <span>
                  {experience.end_month} {experience.end_year}
                </span>
              )}{" "}
            </small>
            <small>{experience.type}</small>
          </div>
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
