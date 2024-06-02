"use client";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";

export function HeroText({ words }: { words: string }) {
  return <TextGenerateEffect words={words} />;
}
