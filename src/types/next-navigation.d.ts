// Declaration for Next.js navigation module (fallback if typings are missing)
declare module 'next/navigation' {
  import { ReadonlyURLSearchParams } from 'next/navigation';
  export function useRouter(): any;
  export function useSearchParams(): ReadonlyURLSearchParams;
  export function usePathname(): string;
  export function useParams<T extends Record<string, string | string[]> = {}>(): T;
}
