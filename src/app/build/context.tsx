"use client"

import { Content } from "@prismicio/client"
import { createContext, ReactNode, useContext, useEffect, useMemo, useState } from "react"

type CustomizerControlsContext = {
  selectedWheel?: Content.BoardCustomizerDocumentDataWheelsItem
  setWheel: (wheel: Content.BoardCustomizerDocumentDataWheelsItem) => void
  selectedDeck?: Content.BoardCustomizerDocumentDataDecksItem
  setDeck: (deck: Content.BoardCustomizerDocumentDataDecksItem) => void
  selectedTruck?: Content.BoardCustomizerDocumentDataMetalsItem
  setTruck: (trucks: Content.BoardCustomizerDocumentDataMetalsItem) => void
  selectedBolt?: Content.BoardCustomizerDocumentDataMetalsItem
  setBolt: (bolts: Content.BoardCustomizerDocumentDataMetalsItem) => void
}

const defaultContext: CustomizerControlsContext = {
  setWheel: () => {},
  setDeck: () => {},
  setTruck: () => {},
  setBolt: () => {}
}

const CustomizerControlsContext = createContext(defaultContext)

type CustomizerControlsProviderProps = {
  defaultWheel?: Content.BoardCustomizerDocumentDataWheelsItem
  defaultDeck?: Content.BoardCustomizerDocumentDataDecksItem
  defaultTruck?: Content.BoardCustomizerDocumentDataMetalsItem
  defaultBolt?: Content.BoardCustomizerDocumentDataMetalsItem
  children?: ReactNode
}

export function CustomizerControlsProvider({
  defaultWheel,
  defaultDeck,
  defaultTruck,
  defaultBolt,
  children,
}: CustomizerControlsProviderProps) {

  const [selectedWheel, setWheel] = useState(defaultWheel)
  const [selectedDeck, setDeck] = useState(defaultDeck)
  const [selectedTruck, setTruck] = useState(defaultTruck)
  const [selectedBolt, setBolt] = useState(defaultBolt)

  useEffect(() => {
    const savedConfig = localStorage.getItem("boardConfig");
    if (savedConfig) {
      const { wheel, deck, truck, bolt } = JSON.parse(savedConfig);

      setWheel(wheel || undefined);
      setDeck(deck || undefined);
      setTruck(truck || undefined);
      setBolt(bolt || undefined);
    }
  }, []);

  useEffect(() => {
    if (selectedWheel && selectedDeck && selectedTruck && selectedBolt) {
      const boardConfig = {
        wheel: selectedWheel,
        deck: selectedDeck,
        truck: selectedTruck,
        bolt: selectedBolt,
      };
      localStorage.setItem("boardConfig", JSON.stringify(boardConfig));
    }
  }, [selectedWheel, selectedDeck, selectedTruck, selectedBolt]);

  const value = useMemo<CustomizerControlsContext>(() => {
    return {selectedWheel, selectedDeck, selectedTruck, selectedBolt, setWheel, setDeck, setTruck, setBolt}
  }, [selectedWheel, selectedDeck, selectedTruck, selectedBolt, setWheel, setDeck, setTruck, setBolt])

  return (
    <CustomizerControlsContext.Provider value={value}>
      {children}
    </CustomizerControlsContext.Provider>
  )
}

export function useCustomizerControls() {
  return useContext(CustomizerControlsContext)
}