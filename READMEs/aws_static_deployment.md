# Deployment

TLDR - Deploying as a static site and using Cloudfront + a Lambda function to iron out the kinks

## Build as static site...

The following config will cause a static build of the app using the `pnpm build` command

```$PROJECT_ROOT/next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;
```

## Upload files to S3

1. Create a bucket called `emend.ai` ie: your domain name
2. Enable Properties > Static website hosting
3. Disable `Block Public Access`
4. ...
```
{
    "Version": "2008-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Principal": "*",
            "Action": "s3:GetObject",
            "Resource": "arn:aws:s3:::emend.ai/*"
        }
    ]
}
```

## Create a ACM certificate with the SSL certificate details imported

- Because Route53 didn't offer emend.ai domains
- You will need to retrieve the...
    1. PEM-encoded certificate body
        - this is the original .csr file contents found where you generated the certificate
        - I cd'ed into `/etc/ssl/private` and found it there
    2. the PEM-encoded certificate private key
        - cd to /etc/ssl/private/server.key
    3. Certificate Chain
        - This was retrieved from Comodo ie: `https://comodosslstore.com/` via email
        - All the files retrieved from Comodo were concatenated together to produce the chain
        ```.sh
        cat www_emend_ai.crt > www_emend_ai_chain.crt
        echo >> www_emend_ai_chain.crt
        cat www_emend_ai.ca-bundle >> www_emend_ai_chain.crt
        ```

## Create a CloudFront Distribution

CloudFront > Distributions > Create

1. use the SSL cert imported in the previous step
2. use the origin domain of the S3 bucket where the static export of the Next.js app is stored
3. Viewer protocol policy -> Redirect HTTP to HTTPS
4. Create `Alternate domain names` for the distro
  - emend.ai
  - www.emend.ai

After creating distro, test the CloudFront domain and it should work: `https://dw9jyqaa90d9c.cloudfront.net/`

## Create a Lambda function

### Lambda > Functions > Create `emend_ai_page_handler`

```.js
const hasExtension = /(.+)\.[a-zA-Z0-9]{2,5}/;

exports.handler = async (event) => {
    const req = event.Records[0].cf.request;
    const url = req.uri;
    if ( url === "/" ) {} 
    else if (url && !url.match(hasExtension)) {
        req.uri = `${url}.html`
    }
    return req
};
```

### Configure the `Execution Role` of the Lambda function

`emend_ai_page_handler` > Configuration > Execution Role

- ie: the role ARN is something like: `emend_ai_page_handler-role-annq1f0u`

```edit the execution role
{
	"Version": "2012-10-17",
	"Statement": [
		{
			"Effect": "Allow",
			"Principal": {
				"Service": [
				    "lambda.amazonaws.com",
				    "edgelambda.amazonaws.com"
				]
			},
			"Action": "sts:AssumeRole"
		}
	]
}
```

### Finally copy the ARN of the λ into the CloudFront distro

- Distribution > DistroID > Edit behavior 

- Edit `Function associations` > `Origin request`
    - Function type should be Lambda@Edge and Function ARN should be `${λ ARN}:${λ version #}`

## Create an API Gateway + λ for the OPENAI query endpoint


### example curl to the API Gateway

curl -d '{"prompt":"Miami"}' -H "Content-Type: application/json" -X POST https://s1vpd61w24.execute-api.us-east-1.amazonaws.com/queryAI




curl -v -X OPTIONS https://s1vpd61w24.execute-api.us-east-1.amazonaws.com/