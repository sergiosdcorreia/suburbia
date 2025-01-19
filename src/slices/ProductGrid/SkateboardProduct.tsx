import { Content, isFilled } from '@prismicio/client'
import { PrismicNextImage } from '@prismicio/next'

import { createClient } from '@/prismicio'
import { FaStar } from 'react-icons/fa6'
import { ButtonLink } from '@/components/ButtonLink'

type Props = {
  id: string
}

export async function SkateboardProduct({ id }: Props) {
  const client = createClient()
  const product = await client.getByID<Content.SkateboardDocument>(id)

  const price = isFilled.number(product.data.price) ? `£${(product.data.price / 100).toFixed(2)}` : "Price Not Available"

  return (
    <div className='group relative mx-auto w-fullmax-w-72 px-8 pt-4'>
      <div className='flex items-center justify-between ~text-sm/2xl'>
        <span>{price}</span>
        <span className="inline-flex items-center gap-1">
          <FaStar className='text-yellow-400' /> 37
        </span>
      </div>
      <div className='-mb-1 overflow-hidden py-4'>
        <PrismicNextImage alt="" field={product.data.image} width={150} className='mx-auto w-[58%] origin-top transform-gpu transition-transform duration-500 ease-in-out group-hover:scale-150' />
      </div>
      <h3 className='my-2 text-center font-sans leading-tight ~text-lg/xl'>
        {product.data.name}
      </h3>
      <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-200 group-hover:opacity-100">
        <ButtonLink field={product.data.customizer_link}>Customize</ButtonLink>
      </div>
    </div>
  )
}