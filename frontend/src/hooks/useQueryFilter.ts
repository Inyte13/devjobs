export function useQueryFilter<T extends { id: string; name: string }>(
  data: T[] | undefined,
  currentValue: string | null
) {
  const items = data?.map(d => ({ label: d.name, value: d.id })) ?? []
  const selected = items.find(item => item.value === currentValue) ?? null

  return { items, selected }
}
