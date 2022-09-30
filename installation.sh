#! /bin/bash
npm install -g protractor
webdriver-manager update
npm install
npm run webdriver-manager-update
echo "Note: if shows any signs of error, please re-run the script."

read