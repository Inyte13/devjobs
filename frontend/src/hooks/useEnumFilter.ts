export function useEnumFilter<T extends string>(
  options: { label: string; value: T }[],
  currentValue: string | null
) {
  const selected = options.find(opt => opt.value === currentValue) ?? null
  return { items: options, isLoading: false, isError: false, selected }
}
