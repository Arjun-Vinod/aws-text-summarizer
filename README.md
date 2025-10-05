
# Text Summarizer using AWS Bedrock

## Project Overview

This project is a cloud-based text summarization web application. Users can paste text or upload text files via a frontend interface. The backend uses Amazon Bedrock (Titan Text Lite) to generate a summarized version, stores it in Amazon S3, and returns the summary to the user.

The app is hosted on Amazon EC2 inside a custom VPC, and permissions are managed using IAM roles for secure access to AWS services.

## Features
- Frontend to input text

- AI-powered text summarization using Amazon Bedrock (Titan Text Lite)

- Summarized text automatically stored in S3 (summaries/ prefix)

- Secure AWS setup with IAM roles

- Fully cloud-based deployment

## Technologies Used
 
- AI Layer:	Amazon Bedrock (Titan Text Lite) 
- Storage:	Amazon S3  
- Hosting / Deployment:	Amazon EC2  
- Network / Security:	VPC, Security Groups, IAM Roles
- Frontend:	HTML, JavaScript  
- Backend:	Node.js, Express

## Architecture

![Text Summarizer Architecture](/textSummarizer.png)

**Explanation:**

1. User inputs text on the frontend.

2. Frontend sends POST request to /summarize route in the backend.

3. Backend sends text to Amazon Bedrock Titan Text Lite.

4. Bedrock returns the summarized text.

5. Backend uploads the summary to S3 and sends it back to the frontend.


## Setup Instructions

1. **AWS Setup**

-  S3 Bucket: Create a bucket to store summaries.

- EC2 Instance:

   - Launch an Ubuntu EC2 instance in a custom VPC.

   - Security Group:

      - `SSH (22) → your IP`

      - `HTTP (80) → 0.0.0.0/0`

      - `Node.js app (3000) → 0.0.0.0/0`

- IAM Role attached with:

   - bedrock:InvokeModel

   - s3:PutObject

- Amazon Bedrock:

   - Enable Bedrock in your region (us-east-1)

   - Choose Titan Text Lite

   - Ensure EC2 IAM role has permission to invoke models

2. **Backend Setup**

- SSH into your EC2 instance:
```bash
   ssh -i <your-key.pem> ubuntu@<EC2-IP>
```

- Clone git repository
```bash
   git clone <repo-url>
```
- Install Node.js dependencies:
```bash
   npm install
```
- Run the backend:
```bash
   node server.js
```

3. **Frontend Usage**

- Open in browser:

```bash
   http://<EC2-PUBLIC-IP>:3000/index.html
```

- Paste text in the textarea → click Summarize

- See the summary instantly, stored in S3 automatically.


## Security & Permissions

- IAM Role: Attached to EC2 instance with minimal permissions.

- S3: Private bucket by default; only EC2 backend can write to it.

- VPC: Ensures secure network environment.

- Security Groups: Only required ports are open (22, 80, 3000).


## Application Output 

![Text Summarizer output1](/textSummarizeroutput1.png)

![Text Summarizer output2](/textSummarizeroutput2.png)


## Summarized Text Stored in S3

![Summarized Text](/stroed-in-S3.png)

