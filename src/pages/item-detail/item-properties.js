import React from "react"
import {
  Accordion,
  AccordionItem,
  AccordionPanel,
} from "../../components/accordion"

export function ItemPropertiesPanel({ items }) {
  return (
    <div className="grid grid-cols-3 md:grid-cols-2 lg:grid-cols-3 gap-2 mt-2">
      {items &&
        items.length &&
        items.map((item, i) => (
          <div
            key={i}
            className="flex flex-col justify-between gap-1.5 bg-gray-100 rounded-lg border p-2 text-center"
          >
            <span className="text-xs font-semibold truncate">{item.trait}</span>
            <span className="text-sm font-bold truncate">{item.value}</span>
            <span className="text-xs font-medium capitalize text-gray-500 truncate">
              {item.rarity}
            </span>
          </div>
        ))}
    </div>
  )
}

export default function ItemProperties(props) {
  return (
    <div className="hidden md:block md:pt-2">
      <Accordion>
        <AccordionItem toggle="properties">Properties</AccordionItem>
        <AccordionPanel id="properties">
          <ItemPropertiesPanel items={props.items} />
        </AccordionPanel>
      </Accordion>
    </div>
  )
}
