const saveCallback = (filePath) => {
  // Get the DataUrl from the Canvas
  const url = canvas.toDataURL("image/jpg", 0.8);

  // remove Base64 stuff from the Image
  const base64Data = url.replace(/^data:image\/png;base64,/, "");
  fs.writeFile(filePath, base64Data, "base64", function (err) {
    console.log(err);
  });
};

module.exports = saveCallback;
