import { ButtonHTMLAttributes, forwardRef, useState } from "react"
import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/Button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/Command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/Popover"


interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  boxPlaceholder: string;
  emptyPlaceholder: string;
  searchPlaceholder: string;
  defaultPlaceHolder: string;
  itemset: {
    value: string;
    label: string;
  }[];
  value: string;
  // eslint-disable-next-line no-unused-vars
  onUpdate: (newValue: string) => void;
}

export const ComboBox = forwardRef<HTMLButtonElement, Props>(({
  value, 
  itemset, 
  boxPlaceholder, 
  emptyPlaceholder,
  searchPlaceholder, 
  defaultPlaceHolder,
  onUpdate,
  className,
  ...props
}, ref) => {

  const [open, setOpen] = useState(false)
  const [selectedValue, setSelectedValue] = useState(value);

  const handleValueChange = (newValue: string) => {
    const valueHolder = newValue === selectedValue ? "" : newValue
    setSelectedValue(valueHolder)
    onUpdate(valueHolder);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          ref={ref}
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn("w-[200px] justify-between", className)}
          {...props}
        >
          {selectedValue
            ? itemset.find((item) => item.value === selectedValue)?.label || 'No label'
            : defaultPlaceHolder || boxPlaceholder }
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder={searchPlaceholder} />
          <CommandEmpty>{emptyPlaceholder}</CommandEmpty>
          <CommandGroup>
            {itemset.map((item) => (
              <CommandItem
                key={item.value}
                onSelect={() => {
                  handleValueChange(item.value)
                  setOpen(false)
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    value === item.value ? "opacity-100" : "opacity-0"
                  )}
                />
                {item.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  )
})

ComboBox.displayName = 'ComboBox'




