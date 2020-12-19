const imagemin = require("imagemin");
const imageminJpegtran = require("imagemin-jpegtran");
const imageminMozjpeg = require("imagemin-mozjpeg");
const imageminPngquant = require("imagemin-pngquant");

const compressPostImg = async (img) => {
  console.log("Original File Size: " + Math.round(img.length / 1024));
  const files = await imagemin.buffer(Buffer.from(img, "binary"), {
    plugins: [imageminJpegtran(), imageminMozjpeg({ quality: [95] }), imageminPngquant({ quality: [0.9, 0.95] })],
  });
  console.log("hello from compressor>buffer");
  return Buffer.from(files).toString("base64");
};

const compressThumbnail = async (img) => {
  console.log("Original File Size: " + Math.round(img.length / 1024));
  const files = await imagemin.buffer(Buffer.from(img, "binary"), {
    plugins: [imageminJpegtran(), imageminMozjpeg({ quality: [20] }), imageminPngquant({ quality: [0.25, 0.3] })],
  });
  return Buffer.from(files).toString("base64");
};

module.exports = { compressPostImg, compressThumbnail };

//

//

//

// const fs = require("fs");
// const myPic = () => {
//   return new Promise((resolve, reject) => {
//     fs.readFile("C:/Users/danub/OneDrive/Área de Trabalho/image2.txt", (err, data) => {
//       if (err) throw err;
//       resolve(Buffer.from(data, "base64"));
//     });
//   });
// };

// const logMyPic = async () => {
//   const picBuff = await myPic();
//   return picBuff;
// };

// logMyPic().then((res) => {
//   console.log("Original File Size: " + Math.round(res.length / 1024));
//
//   const compressImg = async (res) => {
//     const files = await imagemin.buffer(res, {
//       plugins: [
//         imageminJpegtran(),
//         imageminMozjpeg({
//           quality: [10],
//         }),
//         imageminPngquant({ quality: [0.1, 0.12] }),
//       ],
//     });
//     return files;
//   };
//   compressImg(res).then((data) => {
//     console.log("Compressed File Size: " + Math.round(res.length / 1024));
//     fs.writeFile("C:/Users/danub/OneDrive/Área de Trabalho/image.txt", data, (err, data) => {
//       if (err) throw err;
//     });
//   });
// });

//-------------------TESTS ONLY------------------------
//-------------------TESTS ONLY------------------------

// router.route("/tests-only").post((req, res) => {
//   const compressThumbnail = async (img) => {
//     console.log("Original File Size: " + Math.round(img.length / 1024));
//     const files = await imagemin.buffer(Buffer.from(img, "binary"), {
//       plugins: [
//         imageminJpegtran(),
//         imageminMozjpeg({
//           quality: [10],
//         }),
//         imageminPngquant({ quality: [0.1, 0.15] }),
//       ],
//     });
//     return Buffer.from(files).toString("base64");
//   };

//   compressThumbnail(req.body.coverImg)
//     .then((res) => {
//       console.log("Compressed File Size: " + Math.round(res.length / 1024));
//       // console.log(res);
//     })
//     .catch((err) => {
//       if (err) throw err;
//     });
// });

//-------------------TESTS ONLY------------------------
//-------------------TESTS ONLY------------------------
