const QRCode = require("qrcode");
const multer = require("multer");
const Jimp = require("jimp");
const jsQR = require("jsqr");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

// ✅ Generate QR Code
exports.generateQRCode = catchAsync(async (req, res, next) => {
  const { drugId } = req.params;

  if (!drugId) {
    return next(new AppError("Drug ID is required!", 400));
  }

  const qrData = JSON.stringify({ drugId });
  const qrCode = await QRCode.toDataURL(qrData);

  res.status(200).json({ success: true, qrCode });
});

// ✅ Set up Multer for Image Uploads
const upload = multer({ dest: "uploads/" });
exports.uploadQRCode = upload.single("qrImage");

// ✅ Scan QR Code
exports.scanQRCode = catchAsync(async (req, res, next) => {
  if (!req.file) {
    return next(new AppError("No image uploaded", 400));
  }

  // Read the uploaded image
  const image = await Jimp.read(req.file.path);
  const imageData = new Uint8ClampedArray(image.bitmap.data);

  // Decode the QR Code
  const qrCode = jsQR(imageData, image.bitmap.width, image.bitmap.height);

  if (!qrCode) {
    return next(new AppError("No QR code detected", 400));
  }

  res.status(200).json({ success: true, data: JSON.parse(qrCode.data) });
});
