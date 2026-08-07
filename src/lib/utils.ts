/**
 * cn — Tailwind class-merge helper used by every shadcn primitive.
 *
 * `clsx` resolves conditional classes (`cn('foo', cond && 'bar')` → `'foo bar'`
 * or `'foo'`); `twMerge` collapses conflicting Tailwind utilities so the last
 * one wins (`'p-2 p-4'` → `'p-4'`). Both are required for shadcn ergonomics.
 */
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}