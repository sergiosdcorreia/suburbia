"use client"

import { Content } from "@prismicio/client"
import { createContext, ReactNode, useContext, useMemo, useState } from "react"

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

  const value = useMemo<CustomizerControlsContext>(() => {
    return {selectedWheel, selectedDeck, selectedTruck, selectedBolt, setWheel, setDeck, setTruck, setBolt}
  }, [selectedWheel, selectedDeck, selectedTruck, selectedBolt])

  return (
    <CustomizerControlsContext.Provider value={value}>
      {children}
    </CustomizerControlsContext.Provider>
  )
}

export function useCustomizerControls() {
  return useContext(CustomizerControlsContext)
}