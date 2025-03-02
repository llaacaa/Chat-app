import { useState, useEffect } from "react";

export const ImageChecker = ({ url }: { url: string }) => {
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    if (!url.match(/\.(png|jpg|jpeg)$/i)) {
      setIsValid(false);
      return;
    }

    const img = new Image();
    img.src = url;
    img.onload = () => setIsValid(true);
    img.onerror = () => setIsValid(false);
  }, [url]);

  return (
    <div>
      {isValid === null && <p>Checking...</p>}
      {isValid === false && <p>Invalid image URL</p>}
      {isValid === true && (
        <img src={url} alt="Valid Image" style={{ maxWidth: "100%" }} />
      )}
    </div>
  );
};
