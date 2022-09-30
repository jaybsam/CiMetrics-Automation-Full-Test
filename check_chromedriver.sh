#!/bin/bash

# get existing chromedriver version
EXISTING_CD_VERSION=$(node_modules/.bin/chromedriver -version | egrep -o '(\d+)\.(\d+)\.(\d+)')

# get installed Google Chrome version
CHROME_VERSION=$(/Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome --version | egrep -o '(\d+)\.(\d+)\.(\d+)')

if [ "$EXISTING_CD_VERSION" = "$CHROME_VERSION" ]; then
    echo "ChromeDriver version matches the Google Chrome version"
else
    NEW_CD_VERSION=$(curl https://chromedriver.storage.googleapis.com/LATEST_RELEASE_$CHROME_VERSION)
    node_modules/.bin/webdriver-manager update --versions.chrome $NEW_CD_VERSION
fi

read