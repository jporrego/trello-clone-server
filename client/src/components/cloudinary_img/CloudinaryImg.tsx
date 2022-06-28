import React from "react";
import { AdvancedImage } from "@cloudinary/react";
import { Cloudinary } from "@cloudinary/url-gen";
import { fill } from "@cloudinary/url-gen/actions/resize";

interface Props {
  path: string;
  size: number;
}

const CloudinaryImg: React.FC<Props> = ({ path, size }) => {
  // ---- Connection to Cloudinary ----
  const cld = new Cloudinary({
    cloud: {
      cloudName: "dzk0haoio",
    },
  });
  let image = cld.image("coffee-shop-images/" + path);
  image.resize(fill().width(size));
  return <AdvancedImage cldImg={image} />;
};

export default CloudinaryImg;
