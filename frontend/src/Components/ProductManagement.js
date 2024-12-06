import React, { useState } from 'react'
import ProductUploadForm from './ProductUploadForm';

export default function ProductManagement() {

    const options = ["View Products", "Add new Products", "Update Product", "Delete Product"];
    const [selectedOption, setSelectedOption] = useState(options[0]);

  return (
    <div className='flex flex-col justify-center items-center'>
      <div className='flex flex-row justify-between gap-5 w-3/4 sticky top-16'>
        {
            options.map(option => (
                <button onClick={() => setSelectedOption(option)} className={`w-28 h-10 shadow-md hover:-translate-y-1 ease-in-out duration-300 flex-grow rounded-xl ${selectedOption === option ? "bg-[#FF7104]":"bg-[#c9c8c7]"}`}>{option}</button>
            ))
        }
      </div>
      <div className='w-full mt-4'>
        {
            selectedOption === "Add new Products" ? <ProductUploadForm /> : <></>
        }
      </div>
    </div>
  )
}
