import { useEnumFilter } from '@/hooks/useEnumFilter'
import { FilterCombobox } from './filter-combobox'

export function EnumCombobox<T extends string>({
  options,
  currentValue,
  placeholder,
  setFilterParam,
}: {
  options: { label: string; value: T }[]
  currentValue: T | null
  placeholder: string
  setFilterParam: (value: T | null) => void
}) {
  const { items, isLoading, isError, selected } = useEnumFilter(
    options,
    currentValue
  )
  return (
    <FilterCombobox
      selected={selected}
      placeholder={placeholder}
      setFilterParam={setFilterParam}
      items={items}
      isLoading={isLoading}
      isError={isError}
    />
  )
}
