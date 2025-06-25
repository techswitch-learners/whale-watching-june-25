import { useState } from 'react';

import CloudinaryUploadWidget from './components/CloudinaryUploadWidget';
import './App.scss';

  const App = () => {
  // Configuration
  const cloudName = 'hzxyensd5';
  const uploadPreset = 'aoh4fpwm';

  // State
  const [, setPublicId] = useState<string|null>('');

  // Cloudinary configuration
  // const cld = new Cloudinary({
  //   cloud: {
  //     cloudName,
  //   },
  // });

  // Upload Widget Configuration
  const uwConfig = {
    cloudName,
    uploadPreset,

  };

  return (
    
    <div className="App">

      <CloudinaryUploadWidget uwConfig={uwConfig} setPublicId={setPublicId} />
    </div>
  );

};

export default App;
