import {useState } from "react";

  const cloudName = 'hzxyensd5';
  const uploadPreset = 'aoh4fpwm';
  const maxImageFileSize = 10000000;
  const maxVideoFileSize = 100000000;
  const clientAllowedFormats = ["jpg","jpeg","png"];
  const multiple = false;
  export const [, setPublicId] = useState<string>('');
  export const [imageUploaded, setImageUploaded] = useState<boolean>(false);

  export const uwConfig = {
    cloudName,
    uploadPreset,
    maxImageFileSize,
    maxVideoFileSize,
    clientAllowedFormats,
    multiple
  };