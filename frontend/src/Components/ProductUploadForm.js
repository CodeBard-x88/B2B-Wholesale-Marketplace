import React, { useState } from 'react';

export default function ProductUploadForm() {
  const [formData, setFormData] = useState({
    productName: '',
    productDescription: '',
    productPrice: '',
    minOrderQuantity: '',
    productCategory: '',
    Stock: '',
    keyFeatures: '',
    productDimensions: '',
    legalDisclaimers: '',
    Warranty: '',
    sku: '',
    tags: '',
    faqs: '',
    freeShipping: false,
  });

  const [files, setFiles] = useState({
    thumbnail: null,
    productImages: [],
    video: null,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFiles((prev) => ({
      ...prev,
      [name]: name === 'productImages' ? files : files[0],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      data.append(key, value);
    });

    if (files.thumbnail) data.append('thumbnail', files.thumbnail);
    if (files.productImages.length > 0) {
      Array.from(files.productImages).forEach((file) =>
        data.append('productImages', file)
      );
    }
    if (files.video) data.append('video', files.video);

    try {
      const response = await fetch('http://localhost:5000/products/create', {
        method: 'POST',
        body: data,
      });

      if (response.ok) {
        alert('Product uploaded successfully!');
      } else {
        alert('Error uploading product');
      }
    } catch (error) {
      console.error('Upload failed', error);
      alert('Server error occurred');
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-[#ffffff] shadow-md p-6 rounded-lg">
      <h2 className="text-2xl font-bold text-center text-[#34383A] mb-6">Upload Product</h2>
      {/* Scrollable Container */}
      <div className="h-[500px] overflow-y-scroll p-4">
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Text Inputs */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-[#34383A]">Product Name</label>
              <input
                type="text"
                name="productName"
                value={formData.productName}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-[#FF7104]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#34383A]">Category</label>
              <input
                type="text"
                name="productCategory"
                value={formData.productCategory}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-[#FF7104]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#34383A]">Price</label>
              <input
                type="number"
                name="productPrice"
                value={formData.productPrice}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-[#FF7104]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#34383A]">Stock</label>
              <input
                type="number"
                name="Stock"
                value={formData.Stock}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-[#FF7104]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#34383A]">Minimum Order Quantity</label>
              <input
                type="number"
                name="minOrderQuantity"
                value={formData.minOrderQuantity}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-[#FF7104]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#34383A]">Warranty</label>
              <input
                type="text"
                name="Warranty"
                value={formData.Warranty}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-[#FF7104]"
              />
            </div>
          </div>

          {/* Textarea Inputs */}
          <div>
            <label className="block text-sm font-medium text-[#34383A]">Description</label>
            <textarea
              name="productDescription"
              value={formData.productDescription}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-[#FF7104]"
            ></textarea>
          </div>

          {/* File Inputs */}
          <div>
            <label className="block text-sm font-medium text-[#34383A]">Thumbnail</label>
            <input
              type="file"
              name="thumbnail"
              accept="image/*"
              onChange={handleFileChange}
              required
              className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-[#FF7104]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#34383A]">Product Images</label>
            <input
              type="file"
              name="productImages"
              accept="image/*"
              multiple
              onChange={handleFileChange}
              required
              className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-[#FF7104]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#34383A]">Product Video</label>
            <input
              type="file"
              name="video"
              accept="video/*"
              onChange={handleFileChange}
              className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-[#FF7104]"
            />
          </div>

          {/* Checkbox */}
          <div className="flex items-center">
            <input
              type="checkbox"
              name="freeShipping"
              checked={formData.freeShipping}
              onChange={(e) => setFormData((prev) => ({ ...prev, freeShipping: e.target.checked }))}
              className="h-4 w-4 text-[#FF7104] border-gray-300 rounded focus:ring-[#FF7104]"
            />
            <label className="ml-2 text-sm text-[#34383A]">Free Shipping</label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-[#FF7104] text-white py-2 px-4 rounded-md hover:bg-[#e66700] transition duration-300"
          >
            Upload Product
          </button>
        </form>
      </div>
    </div>
  );
}
