import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function Experience() {
  return (
    <div className="mt-6">
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <small>October 2023 - Present</small>
          <AccordionTrigger>Tech specialize, Scube Center</AccordionTrigger>
          <AccordionContent>
            Yes. It adheres to the WAI-ARIA design pattern.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      <div className="h-[0.2px] w-full bg-gray"></div>
    </div>
  );
}
