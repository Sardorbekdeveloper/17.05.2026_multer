const express = require("express")
const multer = require("multer")
const path = require("path")
const fs = require("fs")

const app = express()

// Papka yaratish
if (!fs.existsSync("./uploads")) {
  fs.mkdirSync("./uploads")
}

// Storage
const storage = multer.diskStorage({
  destination: "./uploads",
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname)
    cb(null, Date.now() + ext)
  }
})

// Faqat rasm va video
const upload = multer({
  storage,
  limits: {
    fileSize: 50 * 1024 * 1024
  },
  fileFilter: (req, file, cb) => {

    if (
      file.mimetype.startsWith("image/") ||
      file.mimetype.startsWith("video/")
    ) {
      cb(null, true)
    } else {
      cb(new Error("Faqat rasm va video mumkin"))
    }

  }
})

app.use(express.static("uploads"))

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"))
})

app.post("/upload", upload.array("media", 10), (req, res) => {
  res.redirect("/")
})






app.listen(3000, () => {
  console.log("Server ishladi")
})