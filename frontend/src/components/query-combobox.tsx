import { useQueryFilter } from '@/hooks/useQueryFilter'
import { FilterCombobox } from './filter-combobox'

export function QueryCombobox<T extends { id: string; name: string }>({
  response,
  currentValue,
  placeholder,
  setFilterParam,
}: {
  response: { data: T[] | undefined; isLoading: boolean; isError: boolean }
  currentValue: string | null
  placeholder: string
  setFilterParam: (value: string | null) => void
}) {
  const { items, selected } = useQueryFilter(response.data, currentValue)
  return (
    <FilterCombobox
      selected={selected}
      placeholder={placeholder}
      setFilterParam={setFilterParam}
      items={items}
      isLoading={response.isLoading}
      isError={response.isError}
    />
  )
}
