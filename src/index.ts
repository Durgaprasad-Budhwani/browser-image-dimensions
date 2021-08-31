const getBrowserImageDimensions = async (image: File | Blob | string) =>
    new Promise((resolve, reject) => {
      const url = typeof image === "string" ? image : URL.createObjectURL(image);
      if (!url) {
        reject(new Error("incorrect image"));

        return;
      }
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

export default getBrowserImageDimensions;
