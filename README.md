# Agora-Social-Platform

## Overview
This Angular web application is designed as a platform for TIU students to share resources and collaborate. 

## Heroku Account
#### Heroku account details:
```
email: agora.social.webapp@gmail.com
password: @goraSocialWebapp1!
```

#### Associated Gmail account details:
```
email: agora.social.webapp@gmail.com
password: @goraSocialWebapp!
```

*Note there is no "1" before the exclamation point in the Gmail account password.*

## Installation 
1. Run ```npm install``` to install all dependencies 
1. For every change made, ```cd``` into the ```client``` directory and run ```ng build --prod```
1. You need the Heroku CLI to deploy this application and view live service logs. Follow the below instructions to get the CLI on your operating system of choice:

**Mac:**

To install the Heroku CLI on Mac, you'll need Homebrew installed. To get Homebrew, run the following:
```
/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
```
To learn more about Homebrew and to see docs, go [here](https://brew.sh/).

To install the Heroku CLI through Homebrew, run the following:
```
brew tap heroku/brew && brew install heroku
```

**Ubuntu 16+:**
```
sudo snap install --classic heroku
```

**Windows:**

See documentation link below for download and installation instructions.

*(See Heroku documentation [here](https://devcenter.heroku.com/articles/heroku-cli))*

## Running Locally
Before running the application, you'll need to sign into Heroku via the Heroku CLI:
```
heroku login
```

To run this application on your local machine, navigate to the root folder of this project and run:
```
heroku local web
```

## Viewing Application and Deployment Logs
All live application logs (including deployment logs) can be viewed by running:
```
heroku logs -a agora-social-webapp --tail
```

## Deployment Instructions
The Heroku service is not linked to a GitHub account/repository. The git CLI, used in conjunction with 
the heroku CLI, should be used for deploying your code changes to the agora-social-webapp pipeline. 

**Below are the deployment instructions detailed on the Heroku dashboard:**

Ensure you are logged into the correct Heroku account:
```
heroku login
```
Deploy your commits:
```
git push heroku master
```
*If you are prompted to add the "heroku remote:"*
```
heroku git:remote -a agora-social-webapp
```