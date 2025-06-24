import { useEffect, useRef } from 'react';

// Extend the Window interface to include cloudinary
declare global {
  interface Window {
    cloudinary?: {
      createUploadWidget: (
        config: object,
        callback: (error: any, result: any) => void
      ) => {
        open: () => void;
      };
    };
  }
}

interface CloudinaryUploadWidgetProps {
  uwConfig: object;
  setPublicId: (id: string) => void;
}

const CloudinaryUploadWidget = ({
  uwConfig,
  setPublicId,
}: CloudinaryUploadWidgetProps) => {
  const uploadWidgetRef = useRef<ReturnType<NonNullable<typeof window.cloudinary>['createUploadWidget']> | null>(null);
  const uploadButtonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    const initializeUploadWidget = () => {
      if (window.cloudinary && uploadButtonRef.current) {
        // Create upload widget
        uploadWidgetRef.current = window.cloudinary.createUploadWidget(
          uwConfig,
          (error: any, result: any) => {
            if (!error && result && result.event === 'success') {
              console.log('Upload successful:', result.info);
              setPublicId(result.info.public_id);
            }
          }
        );

        // Add click event to open widget
        const handleUploadClick = () => {
          if (uploadWidgetRef.current) {
            uploadWidgetRef.current.open();
          }
        };

        const buttonElement = uploadButtonRef.current;
        buttonElement.addEventListener('click', handleUploadClick);

        // Cleanup
        return () => {
          buttonElement.removeEventListener('click', handleUploadClick);
        };
      }
    };

    return initializeUploadWidget();
  }, [uwConfig, setPublicId]);

  return (
    <button
      ref={uploadButtonRef}
      id="upload_widget"
      className="cloudinary-button"
    >
      Upload
    </button>
  );
};

export default CloudinaryUploadWidget;