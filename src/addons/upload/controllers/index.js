const { ErrorHandler } = require("../../../helpers/errors");

const uploadImage = async (req, res, next) => {
  try {
    const uploadImage = req.file;
    if (uploadImage) {
      res.send({
        status: true,
        logo_url: process.env.PHOTO_URL + req.file.filename,
      });
    } else {
      throw new ErrorHandler("Something went wrong with file upload", 404);
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  uploadImage,
};
