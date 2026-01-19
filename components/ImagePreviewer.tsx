"use client";

import { useState } from "react";
import Image from "next/image";

const images = ["/love.png", "/potted.png", "/anna.png", "/cacy.png"];

export default function ImagePreview() {
  const [activeImage, setActiveImage] = useState(images[0]);

  return (
    <div className="flex-[0.5] bg-muted rounded-2xl p-4 space-y-4">
      {/* Main Preview */}
      <div className="rounded-2xl overflow-hidden">
        <Image
          src={activeImage}
          alt="plant preview"
          width={900}
          height={900}
          quality={90}
          className="object-contain bg-center h-112.5 w-full"
        />
      </div>

      {/* Thumbnails */}
      <div className="flex items-center justify-center gap-2 pt-3">
        {images.map((img, index) => (
          <button
            key={index}
            onClick={() => setActiveImage(img)}
            className={`rounded-lg overflow-hidden border-2 transition duration-300
              ${activeImage === img ? "border-green-500" : "border-transparent opacity-30"}`}
          >
            <Image
              src={img}
              alt={`thumbnail-${index}`}
              width={80}
              height={80}
              className="object-contain h-20 w-20"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
