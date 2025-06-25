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

# .NET Identity
The project is already set up to use DotNet Identity. Key packages for Identity are:
* Microsoft.AspNetCore.Identity.EntityFrameworkCore
* Microsoft.AspNetCore.Identity.UI
Running `dotnet restore` should have installed these dependencies but if not, add these packages.

To add the Identity tables to the database, run this command again:
```
$ dotnet ef database update
```
The `UserModel.cs` inherits from `IdentityUser` and can be modified in the future if new properties are needed.

The project is currently supporting 2 Identity roles: 'User' and 'Admin'. Roles and an initial admin are seeded when the program is run (refer to Helpers/RoleSeeder.cs).

To assign 'admin' role to another user, refer to the 'AssignAdminRole' method (currently in api/Helpers/RoleSeeder.cs)

The [Authorize] attribute is to be used on endpoints where only logged in/authenticated users should have access.
For admin-only endpoints use this attribute: [Authorize(Roles = "Admin")]

# Running the code
You can run the code using `dotnet run`.

You can run the linter using `dotnet format`.

You can ensure it makes no changes using `dotnet format --verify-no-changes`.
