import clsx from 'clsx'

export function cn(...classes: (string | undefined | null | false)[]) {
  return clsx(classes)
}
