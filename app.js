/**
 * Dependencia externa para el procesamiento de imagen.
 * El objetivo es convertir los archivos .jpg en .webp para optimizar la web
 */

const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const directoryPath = path.join(__dirname, "src/assets/images");

const resizeConvertedImage = (filePath, width) => {
  sharp(filePath)
    .resize(width)
    .toFile(filePath + ".webp", (err, info) => {
      err
        ? console.log(`Error: ${err}`)
        : console.log(`File resized successfully: ${info}`);
    });
};

const convertImage = (filePath) => {
  sharp(filePath)
    .webp()
    .toFile(filePath + ".webp", (err, info) => {
      err
        ? console.log(`Error: ${err}`)
        : console.log(`File processed successfully: ${info}`);
    });
};

const deleteWebpImages = (dir) => {
  fs.readdir(dir, (error, files) => {
    if (error) console.log(`Error: ${err}`);

    for (let file of files) {
      if (path.extname(file) === ".webp") {
        fs.unlink(path.join(dir, file), (error) => {
          error
            ? console.log(`Error: ${err}`)
            : console.log(`Deleted file: ${file}`);
        });
      }
    }
  });
};

const walkDirectory = (dir, done) => {
  fs.readdir(dir, (error, list) => {
    if (error) return done(error);

    deleteWebpImages(dir); //Se eliminan previamente los archivos para evitar acumulacion

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
            convertImage(file);
          }
          next();
        }
      });
    })();
  });
};

walkDirectory(directoryPath, (error) => {
  error
    ? console.log("Error: ", error)
    : console.log("Images processed successfully");
});
