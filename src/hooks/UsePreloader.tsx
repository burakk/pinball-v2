import { useEffect, useState } from "react";

const preloadImage = (src: string) => {
  return new Promise<boolean>((resolve, reject) => {
    const img = new Image();

    img.onload = () => {
      resolve(true);
    };

    img.onerror = img.onabort = () => {
      reject(false);
    };

    img.src = src;
  });
};

export const useImagePreloader = (images: string[]) => {
  const [isAllPreloaded, setPreloadedImages] = useState<boolean>(false);

  useEffect(() => {
    let isCancelled = false;

    const preloadAll = async () => {
      if (isCancelled) return;
      const promiseList: Promise<boolean>[] = images.map((src) =>
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

  return isAllPreloaded;
};
