# Discounting Platform Banner Service

This is the Banner microservice for the Discounting Platform project. This service is responsible for CRUD operations for different advertising banners on the user interface.

## Launching

### Build an image

Dev:

`docker build -t banner-service -f Dockerfile.dev`

Prod:

`docker build -t banner-service Dockerfile`

### Run the container

`docker run -d -p 8080:80 banner-service`

If you want to run the entire project, please go to the [parent repository](https://github.com/vb-ee/discount-platform).
