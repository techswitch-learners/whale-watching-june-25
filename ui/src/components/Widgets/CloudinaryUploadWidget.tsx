import { useEffect, useRef } from 'react';


interface UploadResult {
  event: string;
  info: {
    public_id: string;
    secure_url: string;
    bytes: number;
};
}

declare global {
  interface Window {
    cloudinary?: {
      createUploadWidget: (
        config: object,
        callback: (error: string, result:UploadResult ) => void
      ) => {
        open: () => void;
      };
    };
  }
}

interface CloudinaryUploadWidgetProps {
  uwConfig: { cloudName: string; maxImageFileSize:number; maxVideoFileSize:number; clientAllowedFormats: string[]; multiple:boolean};

  setPublicId: (id: string) => void;
  setUrl: (url: string) => void;
  setImageUploaded: (bool: boolean) => void;
}

const CloudinaryUploadWidget = ({
  uwConfig,
  setPublicId,
  setUrl,
  setImageUploaded,
}: CloudinaryUploadWidgetProps) => {
  const uploadWidgetRef = useRef<ReturnType<NonNullable<typeof window.cloudinary>['createUploadWidget']> | null>(null);
  const uploadButtonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (window.cloudinary && uploadButtonRef.current) {
      uploadWidgetRef.current = window.cloudinary.createUploadWidget(
        uwConfig,
        (error: string, result: UploadResult) => {
          if (!error && result && result.event === 'success') {
            setPublicId(result.info.public_id);
            setUrl(result.info.secure_url);
            setImageUploaded(true);
          }
        }
      );
    }

    const handleUploadClick = () => {
      if (uploadWidgetRef.current) {
        uploadWidgetRef.current.open();
      }
    };

    const buttonElement = uploadButtonRef.current;
    if (buttonElement) {
      buttonElement.addEventListener('click', handleUploadClick);
    }

    return () => {
      if (buttonElement) {
        buttonElement.removeEventListener('click', handleUploadClick);
      }
    };
  }, [uwConfig, setPublicId, setUrl, setImageUploaded]);

  return (
    <button
      ref={uploadButtonRef}
      id="upload_widget"
      className="cloudinary-button"
    >
      Upload Whale Photo
    </button>
  );
};

export default CloudinaryUploadWidget;
