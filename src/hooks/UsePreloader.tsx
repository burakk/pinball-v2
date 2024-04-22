import { useEffect, useState } from "react";

const preloadImage = (src: string) => {
  return new Promise((resolve, reject) => {
    const img = new Image();

    img.onload = () => {
      resolve(true);
    };

    img.onerror = img.onabort = () => {
      reject();
    };

    img.src = src;
  });
};

export const useImagePreloader = (images: string[]) => {
  const [preloadedImages, setPreloadedImages] = useState<boolean>(false);

  useEffect(() => {
    let isCancelled = false;

    const preloadAll = async () => {
      if (isCancelled) return;
      const promiseList: Promise<any>[] = images.map((src) =>
        preloadImage(src)
      );
      await Promise.all(promiseList);
      if (isCancelled) return;

      setPreloadedImages(true);
    };

    preloadAll();

    return () => {
      isCancelled = true;
    };
  }, [images]);

  return preloadedImages;
};
