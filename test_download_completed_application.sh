#! /bin/bash
cd ..
npm run test-create-grant-reports
npm run test-admin-validate-application
npm run test-submit-due-report
npm run test-download-completed-application
d=`date +%m-%d-%Y_%H-%M-%S`
mv ./output ./output_test_download_completed_reports_$d
start chrome $PWD/output_test_download_completed_reports_$d/report.html

read