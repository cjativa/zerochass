# Zerochass

This is the code repository for [Zerochass](http://zerochass.io] — an online learning platform for Web Development and Software Engineering.

It is built with these technologies
- React TypeScript
- Next.js
- Craft CMS
- Docker
- Nginx
- Make

and deployed on AWS Elastic Beanstalk.

## Development

You must have Docker installed as the development environment is containerized into three separate Docker containers
1. A PHP container for running Craft CMS
2. An Nginx container for directing requests to the CMS and to the Next.js application
3. The Next.js application (a NodeJS container)

And you can run 
```
docker-compose build node
docker-compose build php
docker-compose build nginx
```

to build the containers.

__You can then start the containers using__
`docker-compose up node`
`docker-compose up php`

and you're ready to go for local development.

## Deploying to Elastic Beanstalk

You can run

```
export IMAGE=<image name: node, nginx, php>
make push
```

to build each image and have it deployed to AWS ECR. 

Then run `make zippy` to generate the needed ZIP file for deploying to Elastic Beanstalk.
