// const imagemin = require("imagemin");
// const imageminJpegtran = require("imagemin-jpegtran");
// const imageminMozjpeg = require("imagemin-mozjpeg");
// const imageminPngquant = require("imagemin-pngquant");

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
