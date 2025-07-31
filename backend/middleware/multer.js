import fs from 'fs'
import multer from 'multer'

// Ensure uploads directory exists
const uploadDir = 'uploads'
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir)
}

// Make sure you define 'storage' before using it in multer({ storage })
// Example diskStorage setup:
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname)
  }
})

let upload = multer({ storage })

// If you upload images to Cloudinary, you do not need to check for local file existence.
// You can remove the requireAllImages middleware if your controller already checks for images in req.files and uploads to Cloudinary.

export default upload
