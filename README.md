# WhaleSpotting
## Getting Started
To setup the API, you should follow the instructions in the [API README](api/README.md) and for the UI, the instructions in  the [UI README](ui/README.md).


Setting up Cloudinary:

The following refers to a spike, in the project we would be storing the image url within the sighting report table and displaying the image by accessing the url directly from the database. This widget would need to be incorporated into the report sighting form.

Refer to Cloudinarys documentation: https://cloudinary.com/documentation/react_quick_start

1. Ensure you have a database set up with a table that can receieve a public_id and an image_url and connect the code base to the database. For an example, see:
 - api/Database/WhaleSpottingDbContext.cs 
 - api/Models/DatabaseModels/UploadImages.cs  
 - api/Migrations 
 
2. Refer to the ui/src/App.tsx and ui/src/components/CloudinaryUploadWidget.tsx files in this branch to see an example implementation of Cloudinarys image upload widget.

3. These pages link to an example endpoint in the api controller which saves the image urls to a database, see api/controllers/UploadImageController.cs

4. To test this example, run the api with dotnet run and the ui with npm run dev and upload an image to the browser. 

5. Use Pg admin to check whether the image has been successfully added to the database. 

6. Copy and paste the image url from the database in the browser to see the uploaded image.