import {useState } from "react";

  const cloudName = 'hzxyensd5';
  const uploadPreset = 'aoh4fpwm';
  const maxImageFileSize = 10000000;
  const maxVideoFileSize = 100000000;
  const clientAllowedFormats = ["jpg","jpeg","png"];
  const multiple = false;

export function useCloudinaryUpload() {
    const [publicId, setPublicId] = useState<string>('');
    const [imageUploaded, setImageUploaded] = useState<boolean>(false);

    return {
        publicId,
        setPublicId,
        imageUploaded,
        setImageUploaded,
    };
}

export const uwConfig = {
    cloudName,
    uploadPreset,
    maxImageFileSize,
    maxVideoFileSize,
    clientAllowedFormats,
    multiple
};