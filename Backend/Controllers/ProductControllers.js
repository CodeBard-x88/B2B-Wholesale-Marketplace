const fs = require('fs').promises;
const path = require('path');
const multer = require("multer");
const productModel = require("../Schemas/Prodcuts");
const userModel =  require("../Schemas/users");
const storeModel = require("../Schemas/Store");
const sellerModel = require("../Schemas/Seller");
const { error } = require('console');

module.exports = {
    GetAllProducts: async (req, res) => {
        try {
            // Fetch all products from the database
            const products = await productModel.find({});

            // Map through the products and load the images
            const enhancedProducts = await Promise.all(products.map(async (product) => {
                const enhancedProduct = { ...product._doc }; // Spread to create a copy of product document
                
                // Load Thumbnail Image
                if (product.ThumbnailURL) {
                    const thumbnailPath = path.resolve(__dirname, '..', product.ThumbnailURL);
                    try {
                        const thumbnail = await fs.readFile(thumbnailPath);
                        enhancedProduct.ThumbnailImage = thumbnail.toString('base64'); // Encode image to Base64
                    } catch (error) {
                        console.error(`Error loading thumbnail for product ${product.Name}:`, error.message);
                        enhancedProduct.ThumbnailImage = null;
                    }
                }

                // Load Images from ImagesURL
                if (product.ImagesURL && product.ImagesURL.length > 0) {
                    enhancedProduct.Images = await Promise.all(
                        product.ImagesURL.map(async (imgPath) => {
                            try {
                                const imagePath = path.resolve(__dirname, '..', imgPath);
                                const image = await fs.readFile(imagePath);
                                return image.toString('base64'); // Encode image to Base64
                            } catch (error) {
                                console.error(`Error loading image:`, error.message);
                                return null;
                            }
                        })
                    ).then(images => images.filter(img => img !== null)); // Filter out failed loads
                } else {
                    enhancedProduct.Images = [];
                }

                return enhancedProduct;
            }));

            // Send the enhanced product list to the client
            res.status(200).json(enhancedProducts);
        } catch (error) {
            console.error("Error fetching products:", error.message);
            res.status(500).json({ error: "Failed to fetch products" });
        }
    },

    CreateProduct: async (req, res) => {
        try {
            // Initialize Formidable
            const form = formidable({
                multiples: true, // Support multiple file uploads
                uploadDir: path.join(__dirname, '../public/uploads'), // Temporary upload directory
                keepExtensions: true, // Keep file extensions
            });
    
            // Parse the form data
            form.parse(req, async (err, fields, files) => {
                if (err) {
                    console.error(err);
                    return res.status(400).json({ error: 'Error parsing the form data' });
                }
    
                // Validate seller
                const seller = await storeModel.findOne({ AssociatedBuyerAccountEmail: req.user.userEmail });
                if (!seller) {
                    return res.status(404).json({ error: 'Seller not found' });
                }
    
                // Validate store
                const store = await storeModel.findOne({ StoreOwner: seller });
                if (!store) {
                    return res.status(404).json({ error: 'Store not found' });
                }
    
                // Extract required fields
                const {
                    productName,
                    productDescription,
                    productPrice,
                    minOrderQuantity,
                    productCategory,
                    Stock,
                    keyFeatures,
                    productDimensions,
                    legalDisclaimers,
                    Warranty,
                    sku,
                    tags,
                    faqs,
                    freeShipping,
                } = fields;
    
                if (!productName || !productDescription || !productPrice || !minOrderQuantity || !productCategory || !Stock) {
                    return res.status(400).json({ error: 'Missing required fields' });
                }
    
                // Validate Stock and other numeric fields
                const price = parseFloat(productPrice);
                const minOrder = parseInt(minOrderQuantity, 10);
                const stock = parseInt(Stock, 10);
                if (isNaN(price) || price <= 0) return res.status(400).json({ error: 'Invalid price' });
                if (isNaN(minOrder) || minOrder <= 0) return res.status(400).json({ error: 'Invalid minimum order quantity' });
                if (isNaN(stock) || stock <= 0) return res.status(400).json({ error: 'Invalid stock quantity' });
    
                // Define file handling logic
                const processFile = (file, type, productName, storeName, index = null) => {
                    const baseName = `${productName}_${storeName}_${type}`;
                    const newFileName =
                        type === 'Thumbnail'
                            ? `${baseName}.png`
                            : type === 'Video'
                            ? `${baseName}.mp4`
                            : `${baseName}_Image_${index}.png`;
                    const newFilePath = path.join(__dirname, '../public/uploads', newFileName);
                    fs.renameSync(file.filepath, newFilePath);
                    return `/uploads/${newFileName}`;
                };
    
                // Process thumbnail
                const storeName = store.StoreName; // Assuming StoreName exists in the store model
                const thumbnailFile = files.thumbnail;
                if (!thumbnailFile) return res.status(400).json({ error: 'Thumbnail is required' });
                const thumbnailURL = processFile(thumbnailFile, 'Thumbnail', productName, storeName);
    
                // Process images
                const imageFiles = Array.isArray(files.productImages) ? files.productImages : [files.productImages];
                if (imageFiles.length === 0) return res.status(400).json({ error: 'At least one product image is required' });
                const imagesURL = imageFiles.map((img, index) =>
                    processFile(img, 'Image', productName, storeName, index + 1)
                );
    
                // Process video
                let videoURL = null;
                if (files.video) {
                    videoURL = processFile(files.video, 'Video', productName, storeName);
                }
    
                // Construct product data
                const newProduct = {
                    ThumbnailURL: thumbnailURL,
                    ImagesURL: imagesURL,
                    Video: videoURL,
                    Name: productName,
                    Description: productDescription,
                    KeyFeatures: keyFeatures || '',
                    Store: store._id,
                    Seller: seller._id,
                    Price: price,
                    MinimumOrder: minOrder,
                    Stock: stock,
                    variations: fields.productVariants ? JSON.parse(fields.productVariants) : [],
                    category: productCategory,
                    Dimensions: productDimensions ? JSON.parse(productDimensions) : [],
                    Keywords: fields.keywords ? JSON.parse(fields.keywords) : [],
                    LegalDisclaimers: legalDisclaimers ? JSON.parse(legalDisclaimers) : [],
                    Warranty: Warranty || 'No Warranty',
                    SKU: sku || null,
                    Tags: tags ? JSON.parse(tags) : [],
                    FAQs: faqs ? JSON.parse(faqs) : [],
                    WishlistCount: 0,
                    HasFreeShipping: freeShipping === 'true',
                    IsTopRated: false,
                    AverageRating: 0,
                    TotalReviews: 0,
                    TotalSold: 0,
                };
    
                // Save product to database
                const createdProduct = await productModel.create(newProduct);
                return res.status(201).json({ message: 'Product created successfully', product: createdProduct });
            });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Server error' });
        }
    },


    deleteProduct : async (req, res) => {
        try {
            const { productId } = req.params;
    
            if (!productId) {
                return res.status(400).json({ error: 'Product ID is required' });
            }
    
            // Find the product
            const product = await productModel.findById(productId);
            if (!product) {
                return res.status(404).json({ error: 'Product not found' });
            }
    
            // Delete associated files
            const deleteFile = (filePath) => {
                const absolutePath = path.join(__dirname, '../public', filePath);
                if (fs.existsSync(absolutePath)) {
                    fs.unlinkSync(absolutePath);
                }
            };
    
            // Delete thumbnail
            deleteFile(product.ThumbnailURL);
    
            // Delete images
            product.ImagesURL.forEach((imagePath) => deleteFile(imagePath));
    
            // Delete video (if present)
            if (product.Video) {
                deleteFile(product.Video);
            }
    
            // Delete product from the database
            await productModel.findByIdAndDelete(productId);
    
            return res.status(200).json({ message: 'Product deleted successfully' });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Server error' });
        }
    },

    updateProduct : async (req, res) => {
        try {
            const { productId } = req.params;
                if (!productId) {
                return res.status(400).json({ error: 'Product ID is required' });
            }
    
            // Find the product
            const product = await productModel.findById(productId);
            if (!product) {
                return res.status(404).json({ error: 'Product not found' });
            }
    
            // Initialize Formidable
            const form = formidable({
                multiples: true, // Support multiple file uploads
                uploadDir: path.join(__dirname, '../public/uploads'), // Temporary upload directory
                keepExtensions: true, // Keep file extensions
            });
    
            // Parse the form data
            form.parse(req, async (err, fields, files) => {
                if (err) {
                    console.error(err);
                    return res.status(400).json({ error: 'Error parsing the form data' });
                }
    
                // Update editable fields
                const {
                    productName,
                    productDescription,
                    productPrice,
                    minOrderQuantity,
                    productCategory,
                    Stock,
                    keyFeatures,
                    productDimensions,
                    legalDisclaimers,
                    Warranty,
                    sku,
                    tags,
                    faqs,
                    freeShipping,
                } = fields;
    
                if (productName) product.Name = productName;
                if (productDescription) product.Description = productDescription;
                if (productPrice) product.Price = parseFloat(productPrice);
                if (minOrderQuantity) product.MinimumOrder = parseInt(minOrderQuantity, 10);
                if (productCategory) product.category = productCategory;
                if (Stock) product.Stock = parseInt(Stock, 10);
                if (keyFeatures) product.KeyFeatures = keyFeatures;
                if (productDimensions) product.Dimensions = JSON.parse(productDimensions);
                if (legalDisclaimers) product.LegalDisclaimers = JSON.parse(legalDisclaimers);
                if (Warranty) product.Warranty = Warranty;
                if (sku) product.SKU = sku;
                if (tags) product.Tags = JSON.parse(tags);
                if (faqs) product.FAQs = JSON.parse(faqs);
                if (freeShipping !== undefined) product.HasFreeShipping = freeShipping === 'true';
    
                // Define file handling logic
                const processFile = (file, type, productName, storeName, index = null) => {
                    const baseName = `${productName}_${storeName}_${type}`;
                    const newFileName =
                        type === 'Thumbnail'
                            ? `${baseName}.png`
                            : type === 'Video'
                            ? `${baseName}.mp4`
                            : `${baseName}_Image_${index}.png`;
                    const newFilePath = path.join(__dirname, '../public/uploads', newFileName);
                    fs.renameSync(file.filepath, newFilePath);
                    return `/uploads/${newFileName}`;
                };
    
                // Update thumbnail if provided
                if (files.thumbnail) {
                    const storeName = await storeModel.findById(product.Store).StoreName; // Assuming StoreName exists
                    const newThumbnailURL = processFile(files.thumbnail, 'Thumbnail', product.Name, storeName);
                    // Delete old thumbnail
                    const oldThumbnailPath = path.join(__dirname, '../public', product.ThumbnailURL);
                    if (fs.existsSync(oldThumbnailPath)) fs.unlinkSync(oldThumbnailPath);
                    product.ThumbnailURL = newThumbnailURL;
                }
    
                // Update images if provided
                if (files.productImages) {
                    const imageFiles = Array.isArray(files.productImages) ? files.productImages : [files.productImages];
                    const storeName = await storeModel.findById(product.Store).StoreName;
                    const newImagesURL = imageFiles.map((img, index) =>
                        processFile(img, 'Image', product.Name, storeName, index + 1)
                    );
                    // Delete old images
                    product.ImagesURL.forEach((imagePath) => {
                        const oldImagePath = path.join(__dirname, '../public', imagePath);
                        if (fs.existsSync(oldImagePath)) fs.unlinkSync(oldImagePath);
                    });
                    product.ImagesURL = newImagesURL;
                }
    
                // Update video if provided
                if (files.video) {
                    const storeName = await storeModel.findById(product.Store).StoreName;
                    const newVideoURL = processFile(files.video, 'Video', product.Name, storeName);
                    // Delete old video if present
                    if (product.Video) {
                        const oldVideoPath = path.join(__dirname, '../public', product.Video);
                        if (fs.existsSync(oldVideoPath)) fs.unlinkSync(oldVideoPath);
                    }
                    product.Video = newVideoURL;
                }
    
                // Save updated product
                await product.save();
    
                return res.status(200).json({ message: 'Product updated successfully', product });
            });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Server error' });
        }
    }
};
