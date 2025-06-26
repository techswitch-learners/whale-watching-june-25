import { useEffect, useRef } from 'react';


interface UploadResult {
  event: string;
  info: {
    public_id: string;
    secure_url: string;
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
  uwConfig: { cloudName: string; [key: string]: string };
  setPublicId: (id: string) => void;
  setUrl: (url: string) => void;
}

const CloudinaryUploadWidget = ({
  uwConfig,
  setPublicId,
  setUrl,
}: CloudinaryUploadWidgetProps) => {
  const uploadWidgetRef = useRef<ReturnType<NonNullable<typeof window.cloudinary>['createUploadWidget']> | null>(null);
  const uploadButtonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (window.cloudinary && uploadButtonRef.current) {
      // Create upload widget
      uploadWidgetRef.current = window.cloudinary.createUploadWidget(
        uwConfig,
        (error: string, result: UploadResult) => {
          if (!error && result && result.event === 'success') {
            console.log('Upload successful:', result.info);
            setPublicId(result.info.public_id);

             const imageUrl = `https://res.cloudinary.com/${uwConfig.cloudName}/image/upload/${result.info.public_id}`;
             setUrl(imageUrl);
          }
        }
      );
    }

    // Add click event to open widget
    const handleUploadClick = () => {
      if (uploadWidgetRef.current) {
        uploadWidgetRef.current.open();
      }
    };

    const buttonElement = uploadButtonRef.current;
    if (buttonElement) {
      buttonElement.addEventListener('click', handleUploadClick);
    }

    // Cleanup
    return () => {
      if (buttonElement) {
        buttonElement.removeEventListener('click', handleUploadClick);
      }
    };
  }, [uwConfig, setPublicId, setUrl]);

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
