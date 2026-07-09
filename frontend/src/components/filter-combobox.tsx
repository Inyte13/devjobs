import { Loader2 } from 'lucide-react'
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from './ui/combobox'

export function FilterCombobox<T extends string>({
  selected,
  placeholder,
  setFilterParam,
  items,
  isLoading,
  isError,
}: {
  selected: {
    label: string
    value: T
  } | null
  placeholder: string
  setFilterParam: (value: T | null) => void
  items: {
    label: string
    value: T
  }[]
  isLoading: boolean
  isError: boolean
}) {
  return (
    <Combobox
      value={selected}
      // item puede ser null -> ?. value puede ser undefined
      onValueChange={item => setFilterParam(item?.value ?? null)}
      items={items}
    >
      <ComboboxInput placeholder={placeholder} showClear />
      <ComboboxContent>
        <ComboboxEmpty>
          {isLoading ? (
            <Loader2 className='animate-spin' />
          ) : isError ? (
            'Error al cargar los elementos'
          ) : (
            'No se encontraron elementos'
          )}
        </ComboboxEmpty>
        <ComboboxList>
          {item => (
            <ComboboxItem key={item.value} value={item}>
              {item.label}
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  )
}
