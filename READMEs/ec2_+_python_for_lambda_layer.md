# STEPS for successfully creating a Lambda function for calling OpenAI

TLDR: Installing python packages on the same environment that the lambda runs in may be necessary

## Launch an EC2 instance

- ie: al2023-ami-2023.0.20230419.0-kernel-6.1-x86_64
- came preinstalled with Python 3.9 but needed pip so: `sudo yum update && sudo yum install python3-pip`

## Install needed 3rd-party Python Packages from calling OpenAI via Langchain's interface

- pip3 install --target ./package langchain openai

## Compress the `package` and scp to local directory to then upload as a layer

- tar -zcvf package.tar.gz package
- scp -i ai.pem ec2-user@ec2-18-212-10-89.compute-1.amazonaws.com:/home/ec2-user/package.tar.gz ./package.tar.gz

If debugging is needed: `ssh -i "ai.pem" ec2-user@ec2-18-212-10-89.compute-1.amazonaws.com`

## Upload the `layer` to Lambda

- After scp'ing the file from EC2 rename the folder holding all the packages to be `python`
- Zip it and add it as a Lambda layer in your AWS account
- $PROJECT_ROOT/python.zip is the layer that was generated on 4-24-2023