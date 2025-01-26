"use client"

import { Content } from "@prismicio/client";
import { PrismicRichText, PrismicText, SliceComponentProps } from "@prismicio/react";
import { JSX, useEffect, useState } from "react";

import { Bounded } from "@/components/Bounded";
import { Heading } from "@/components/Heading";
import { ButtonLink } from "@/components/ButtonLink";
import { WideLogo } from "./WideLogo";
import { TallLogo } from "./TallLogo";
import { InteractiveSkateboard } from "./InteractiveSkateboard";

const DEFAULT_DECK_TEXTURE = "/skateboard/Deck.webp"
const DEFAULT_WHEEL_TEXTURE = "/skateboard/SkateWheel1.png"
const DEFAULT_TRUCK_COLOR = "#6F6E6A"
const DEFAULT_BOLT_COLOR = "#6F6E6A"

/**
 * Props for `Hero`.
 */
export type HeroProps = SliceComponentProps<Content.HeroSlice>;

/**
 * Component for "Hero" Slices.
 */
const Hero = ({ slice }: HeroProps): JSX.Element => {

  const [wheel, setWheel] = useState<any>(null);
  const [deck, setDeck] = useState<any>(null);
  const [truck, setTruck] = useState<any>(null);
  const [bolt, setBolt] = useState<any>(null);

  useEffect(() => {
    const boardConfig = localStorage.getItem("boardConfig");

    if (boardConfig) {
      const { wheel, deck, truck, bolt } = JSON.parse(boardConfig);

      // Set the state based on the localStorage data
      setWheel(wheel);
      setDeck(deck);
      setTruck(truck);
      setBolt(bolt);
    }
  }, []);

  const deckTextureURL = deck?.texture?.url || DEFAULT_DECK_TEXTURE
  const wheelTextureURL = wheel?.texture?.url || DEFAULT_WHEEL_TEXTURE
  const truckColor = truck?.color || DEFAULT_TRUCK_COLOR
  const boltColor = bolt?.color || DEFAULT_BOLT_COLOR

  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="bg-brand-pink relative h-dvh overflow-hidden text-zinc-800 bg-texture"
    >
      <div className="absolute inset-0 flex items-center pt-20">
        <WideLogo className="w-full text-brand-purple hidden opacity-20 mix-blend-multiply lg:block" />
        <TallLogo className="w-full text-brand-purple opacity-20 mix-blend-multiply lg:hidden" />
      </div>
      <div className="grid absolute inset-0 mx-auto mt-24 max-w-6xl grid-rows-[1fr,auto] place-items-end px-6 ~py-10/16">
        <Heading size="lg" className="relative max-w-2xl place-self-start">
          <PrismicText field={slice.primary.heading} />
        </Heading>
        <div className="flex relative w-full flex-col items-center justify-between ~gap-2/4 lg:flex-row">
          <div className="max-w-[45ch] font-semibold ~text-lg/xl">
            <PrismicRichText field={slice.primary.body} />
          </div>
          <ButtonLink field={slice.primary.button} icon="skateboard" size="lg" className="z-20 mt-2 block">
            {slice.primary.button.text}
          </ButtonLink>
        </div>
      </div>
      <InteractiveSkateboard
        deckTextureURL={deckTextureURL}
        wheelTextureURL={wheelTextureURL}
        truckColor={truckColor}
        boltColor={boltColor}
      />
    </Bounded>
  );
};

export default Hero;
