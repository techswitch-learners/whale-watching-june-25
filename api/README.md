# WhaleSpotting API
The WhaleSpotting API is a controller-based ASP.NET api.
# Getting Started
First, navigate to the ./api directory in the project repo.
## Installing dependencies
To install dependencies, run:
```
$ dotnet restore
```
## Setting up the database
First, create a new role in pgAdmin called `whale_spotting` with password `whale_spotting` and the following priveleges:
- Can login
- Create databases
- Inherit rights from the parent roles

Then run:
```
$ dotnet ef database update
```

You can check that this has worked by right clicking on 'Databases' in pgAdmin and then clicking 'refresh'.

# Running the code
You can run the code using `dotnet run`.

You can run the linter using `dotnet format`.

You can ensure it makes no changes using `dotnet format --verify-no-changes`.

 
