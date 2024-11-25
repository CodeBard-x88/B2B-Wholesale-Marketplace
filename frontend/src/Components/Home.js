import React from 'react'
import ProductCards from './ProductCards';

export default function Home() {
  return (
    
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 justify-items-center">
  <ProductCards />
  <ProductCards />
  <ProductCards />
  <ProductCards />
  <ProductCards />
  <ProductCards />
  <ProductCards />
  <ProductCards />
  <ProductCards />
  <ProductCards />
  <ProductCards />
  <ProductCards />
</div>
  )
}
