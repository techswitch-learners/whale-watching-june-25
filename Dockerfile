# Stage 1: Build React frontend
FROM node:18 AS react-build

WORKDIR /app/ui

COPY ui/package*.json ./
RUN npm install

COPY ui/ ./
RUN npm run build

# Stage 2: Build and publish ASP.NET Core app
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build

WORKDIR /app

# Copy solution and project files
COPY *.sln ./
COPY api/*.csproj ./api/

# Copy backend source code
COPY api/ ./api/
COPY api/Database/Data/SpeciesData.csv ./api/Database/Data/SpeciesData.csv

RUN ls -l /app/api

# Copy React build output into backend wwwroot
COPY --from=react-build /app/ui/dist ./api/wwwroot

RUN dotnet restore "./api/WhaleSpottingBackend.csproj"
RUN dotnet publish "./api/WhaleSpottingBackend.csproj" -c Release -o /app/publish

# Stage 3: Runtime image
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS runtime

WORKDIR /app
COPY --from=build /app/publish .
COPY --from=build /app/api/Database/Data/SpeciesData.csv ./api/Database/Data/SpeciesData.csv


ENV ASPNETCORE_URLS=http://+:5000
EXPOSE 5000

ENTRYPOINT ["dotnet", "WhaleSpottingBackend.dll"]
