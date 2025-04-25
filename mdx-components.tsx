import type { MDXComponents } from 'mdx/types'
 
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: ({ children }) => <h1 className="text-3xl font-bold my-4">{children}</h1>,
    h2: ({ children }) => <h2 className="text-xl font-semibold my-3">{children}</h2>,
    p: ({ children }) => <p className="my-2">{children}</p>,
    // Add more component styles as needed
    ...components,
  }
}