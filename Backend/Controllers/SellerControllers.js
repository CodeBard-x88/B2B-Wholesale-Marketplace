const formidable = require("formidable");
const fs = require("fs");
const path = require("path");
const StoreModel = require("../Schemas/Store");
const UserModel = require("../Schemas/users");

const ROLE_ALLOWED = "buyer";

module.exports ={
    StoreRegistrationForm: (req, res) => {
        const userId = "Muhammad Tayyab";  // The value you want to pass to EJS
        res.render("create-store.ejs", { userId: userId }); // Passing as an object
    },

    RegisterStore: async (req, res) => {
        const form = new formidable.IncomingForm();
        form.keepExtensions = true;
        form.uploadDir = path.join(__dirname, "../public/uploads/logos");
        form.maxFileSize = 10 * 1024 * 1024; // 10MB
    
        form.parse(req, async (err, fields, files) => {
            if (err) {
                return res.status(500).json({ error: "Internal Server Error!" });
            }
            console.log("Files:" , files);
    
            if (!files.logo) {
                console.log("Logo not found!");
                return res.status(400).json({ error: "Logo is required!" });
            }
    
            if (!fields.storeName) {
                console.log("storeName not found!");
                return res.status(400).json({ error: "Store name is not provided!" });
            }
    
            const user = await UserModel.findOne({ _id: req.user.userId, role: `${ROLE_ALLOWED}` });
            if (!user) {
                return res.status(500).json({ error: "Internal Server Error!" });
            }
    
            const uploadedFile = files.logo[0];
            const customFilename = `${fields.storeName}-Logo${path.extname(uploadedFile.originalFilename)}`;
            const newPath = path.join(form.uploadDir, customFilename);
    
            fs.rename(uploadedFile.filepath, newPath, async (err) => {
                if (err) {
                    console.log("Error while uploading file: ", err);
                    return res.status(500).json({ error: "Failed to save logo!" });
                }
    
                console.log("File saved permanently!");
                let categories = [];
                if (typeof fields.category[0] === 'string' && fields.category[0].trim()) {
                    console.log("Category is a string.");
                    console.log("category: ", fields.category);
                    categories = fields.category[0].split(",").map(category => category.replace(' ','')).filter(category => /^[a-zA-Z\s]+$/.test(category));;
                }
                else{
                    console.log("category is not a string.");
                    console.log("category: ", fields.category);
                }
    
                // Create the store and save the logo URL
                const store = await StoreModel.create({
                    LogoURL: `/uploads/logos/${customFilename}`,
                    StoreOwner: user._id,
                    StoreName: fields.storeName[0],
                    ProductCategories: categories
                });
    
                return res.status(200).json({ message: "Store created successfully", store });
            });
        });
    }
}