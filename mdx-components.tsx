import type { MDXComponents } from 'mdx/types'
import Image from 'next/image'

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: ({ children }) => <h1 className="text-3xl font-bold my-4">{children}</h1>,
    h2: ({ children }) => <h2 className="text-xl font-semibold my-3">{children}</h2>,
    p: ({ children }) => <p className="my-2">{children}</p>,
    // Override the img element to use Next.js Image
    img: (props) => {
      const { src, alt, width = 800, height = 400 } = props
      return (
        <Image
          src={src}
          alt={alt || ""}
          width={parseInt(width as string, 10)} 
          height={parseInt(height as string, 10)}
          className="rounded-lg my-4"
        />
      )
    },
    ...components,
  }
}