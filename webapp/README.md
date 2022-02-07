# Marsh Marketplace Data Importer

Importer application to import articles and placement data.
Articles are pulled from RSS feeds and third party websites, parsed and posted as JSON data through to the Marsh Marketplace.

# Running locally

1. Run `npm install`
2. Run `npm start` to run the application OR run `node ./rssImport.js` to only run the importer task.

# Running locally in Docker 

Run `docker compose -f ./docker-compose-dev.yml up app`.
This should build the Dockerfile_dev image and run it.

The docker-compose-dev.yml and Dockerfile_dev files can be used to run app in docker locally and should
not be used to deploy the app to production or staging.