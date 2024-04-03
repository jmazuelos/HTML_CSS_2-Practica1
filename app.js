/**
 * Dependencia externa para el procesamiento de imagen.
 * El objetivo es convertir los archivos .jpg en .webp para optimizar la web
 */

const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const directoryPath = path.join(__dirname, "src/assets/images");

const convertImages = (filePath) => {
  sharp(filePath)
    .webp()
    .toFile(filePath + ".webp", (err, info) => {
      if (err) console.log(`Error: ${err}`);
      else console.log(`File processed successfully: ${info}`);
    });
};

const walkDirectory = (dir, done) => {
  fs.readdir(dir, (error, list) => {
    if (error) return done(error);

    let i = 0;

    (function next() {
      let file = list[i++];

      if (!file) return done(null);

      file = dir + "/" + file;

      fs.stat(file, (error, stat) => {
        if (stat && stat.isDirectory()) {
          walkDirectory(file, (error) => {
            next();
          });
        } else {
          // Check if file is .jpg.webp or .png
          if (
            path.extname(file) === ".jpg.webp" ||
            path.extname(file) === ".png"
          ) {
            convertImages(file);
          }
          next();
        }
      });
    })();
  });
};

walkDirectory(directoryPath, (error) => {
  if (error) {
    console.log("Error: ", error);
  } else {
    console.log("Images processed successfully");
  }
});
