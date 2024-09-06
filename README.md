# Mosaic Image Generator Lambda Function

This is a simple script to generate a mosaic image using a Lambda function. You can pass various arguments to customize the mosaic.

## Usage

The function is currently deployed using **Vercel**, and you can generate the mosaic image by passing the following query parameters to the URL.

### Query Parameters

- **urls**: (Required) A list of image URLs to be used in the mosaic.
- **limit**: (Optional) The maximum number of images in the mosaic. If not provided, the default is the size of the `urls` array.
- **columns**: (Optional) Number of columns in the mosaic. Default is `2`.
- **size**: (Optional) Size (width and height) of each image in the mosaic in pixels. Default is `200`.

### Example

```bash
https://your-vercel-deployment-url/api/mosaic?urls=url1,url2,url3&limit=5&columns=3&size=150
```

## Working Example:

<img src="https://mosaic-lambda.vercel.app/api?size=300&columns=2&limit=4&urls=https://github.com/user-attachments/assets/6717bbe6-1d9a-4738-85af-3b1aea5d2328,https://github.com/user-attachments/assets/c74803d1-187b-4959-8ce6-a3bfee38c073,https://github.com/user-attachments/assets/1ae482bc-c862-4643-a8dd-7f3f02599f80,https://github.com/user-attachments/assets/87014d69-6cc7-49fe-a893-4a75f9fc732d" />

# Docker

```bash
docker compose up -d
```

# AWS Lambda

Set the branch you want to deploy in .github/workflows/deploy.

Also, configure the environments in your repository secrets

![image](https://github.com/user-attachments/assets/bd8bfcb0-404e-48f0-87ee-bde20751a028)

# Azure Functions

Azure Functions is straightforward to install, and you don't need all the steps listed here. Simply check the example folder and deploy ! easy easy papito

![image](https://github.com/user-attachments/assets/836eada5-2593-4620-aa22-5b6363e971e2)
