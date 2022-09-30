#! /bin/bash
cd ..
npm run test-download-grant-reports
d=`date +%m-%d-%Y_%H-%M-%S`
mv ./output ./output_test_download_grant_reports_$d
start chrome $PWD/output_test_download_grant_reports_$d/report.html

read
