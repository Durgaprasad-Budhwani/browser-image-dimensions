const getBrowserImageDimensions = (image: File | Blob | string) => {
  return new Promise((resolve, reject) => {
    const url = typeof image === "string" ? image : URL.createObjectURL(image);
    if (!url) { throw new Error("Must use a valid image"); }
    const img = new Image();
    img.onload = () => {
      resolve({width: img.width, height: img.height});
      URL.revokeObjectURL(img.src);
    };
    img.onerror = err => {
      if (typeof image !== "string") {
        URL.revokeObjectURL(url);
      }
      reject(err);
    };
    img.src = url;
  });
};

export default getBrowserImageDimensions;
