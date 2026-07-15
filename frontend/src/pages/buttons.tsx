import { Button } from '@/components/ui/button'
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from '@/components/ui/combobox'

import { ChevronDownIcon, Search } from 'lucide-react'
import React from 'react'

export function Buttons() {
  const frameworks = [
    'Next.js',
    'SvelteKit',
    'Nuxt.js',
    'Remix',
    'Astro',
  ] as const
  const variants = [
    'default',
    'outline',
    'secondary',
    'ghost',
    'destructive',
    'link',
  ] as const
  const sizes = [
    'default',
    'xs',
    'sm',
    'lg',
    'icon',
    'icon-xs',
    'icon-sm',
    'icon-lg',
  ] as const
  return (
    <div className='flex flex-col items-center'>
      <div className='grid grid-cols-[auto_repeat(8,1fr)] justify-items-start gap-2'>
        <span />
        {sizes.map(size => (
          <span
            key={size}
            className='text-muted-foreground text-center text-sm'
          >
            {size}
          </span>
        ))}
        {variants.map(variant => (
          <React.Fragment key={variant}>
            <span className='text-muted-foreground text-sm'>{variant}</span>
            {sizes.map(size => (
              <Button key={size} variant={variant} size={size}>
                {size.startsWith('icon') ? <ChevronDownIcon /> : 'Botón'}
              </Button>
            ))}
          </React.Fragment>
        ))}
        {variants.map(variant => (
          <React.Fragment key={`iconlabel-${variant}`}>
            <span className='text-muted-foreground text-sm'>
              {variant} (icon+label)
            </span>
            {sizes.map(size =>
              size.startsWith('icon') ? (
                <span key={size} />
              ) : (
                <Button key={size} variant={variant} size={size}>
                  <Search data-icon='inline-start' />
                  Buscar
                </Button>
              )
            )}
          </React.Fragment>
        ))}
      </div>
      <div className='w-fit'>
        <Combobox items={frameworks}>
          <ComboboxInput placeholder='Select a framework' showClear={true} />
          <ComboboxContent >
            <ComboboxEmpty>No items found.</ComboboxEmpty>
            <ComboboxList>
              {item => (
                <ComboboxItem key={item} value={item}>
                  {item}
                </ComboboxItem>
              )}
            </ComboboxList>
          </ComboboxContent>
        </Combobox>
      </div>
    </div>
  )
}
