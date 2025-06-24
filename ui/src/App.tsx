import { useState } from 'react';
import { Cloudinary } from '@cloudinary/url-gen';
import { AdvancedImage, responsive, placeholder } from '@cloudinary/react';

import CloudinaryUploadWidget from './components/CloudinaryUploadWidget';
import './App.scss';

const App = () => {
  // Configuration
  const cloudName = 'hzxyensd5';
  const uploadPreset = 'aoh4fpwm';

  // State
  const [publicId, setPublicId] = useState('');

  // Cloudinary configuration
  const cld = new Cloudinary({
    cloud: {
      cloudName,
    },
  });

  // Upload Widget Configuration
  const uwConfig = {
    cloudName,
    uploadPreset,
    // Uncomment and modify as needed:
    // cropping: true,
    // showAdvancedOptions: true,
    // sources: ['local', 'url'],
    // multiple: false,
    // folder: 'user_images',
    // tags: ['users', 'profile'],
    // context: { alt: 'user_uploaded' },
    // clientAllowedFormats: ['images'],
    // maxImageFileSize: 2000000,
    // maxImageWidth: 2000,
    // theme: 'purple',
  };

  return (
    
    <div className="App">
      <h3>Cloudinary Upload Widget Example</h3>

      <CloudinaryUploadWidget uwConfig={uwConfig} setPublicId={setPublicId} />

      <div className="documentation-links">
        <p>
          <a
            href="https://cloudinary.com/documentation/upload_widget"
            target="_blank"
            rel="noopener noreferrer"
          >
            Upload Widget User Guide
          </a>
        </p>
        <p>
          <a
            href="https://cloudinary.com/documentation/upload_widget_reference"
            target="_blank"
            rel="noopener noreferrer"
          >
            Upload Widget Reference
          </a>
        </p>
      </div>

      {publicId && (
        <div className="image-preview" style={{ width: '800px', margin: '20px auto' }}>
          <AdvancedImage
            style={{ maxWidth: '100%' }}
            cldImg={cld.image(publicId)}
            
            plugins={[responsive(), placeholder()]}
          />
        </div>
      )}
    </div>
  );

};

export default App;
