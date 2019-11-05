REPO?=zerochass/cms
TAG?=production

AWS_ACCOUNT_ID?=116893520615
AWS_ECR_REGION?=us-east-1
AWS_ECR_DOMAIN?=$(AWS_ACCOUNT_ID).dkr.ecr.$(AWS_ECR_REGION).amazonaws.com

sc: build-nginx build-php build-node

build-nginx: 
	docker build -t $(REPO):$(TAG)-nginx -f ./.docker-config/nginx/Dockerfile .

build-php:
	docker build -t $(REPO):$(TAG)-php -f ./.docker-config/php/Dockerfile ./.docker-config/php/

build-node:
	docker build --target production -t $(REPO):$(TAG)-node -f ./.docker-config/node/Dockerfile ./.docker-config/node/

ecr-login:
	aws ecr get-login --no-include-email --region $(AWS_ECR_REGION) | sh -

push: ecr-login
	docker tag $(REPO):$(TAG)-php $(AWS_ECR_DOMAIN)/$(REPO):$(TAG)-php
	docker push $(AWS_ECR_DOMAIN)/$(REPO):$(TAG)-php

	docker tag $(REPO):$(TAG)-nginx $(AWS_ECR_DOMAIN)/$(REPO):$(TAG)-nginx
	docker push $(AWS_ECR_DOMAIN)/$(REPO):$(TAG)-nginx

	docker tag $(REPO):$(TAG)-node $(AWS_ECR_DOMAIN)/$(REPO):$(TAG)-node
	docker push $(AWS_ECR_DOMAIN)/$(REPO):$(TAG)-node
	# docker image rm $(AWS_ECR_DOMAIN)/$(REPO):$(TAG)-$(IMAGE)

zip: zip ebdeploy.zip Dockerrun.aws.json 