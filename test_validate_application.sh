#! /bin/bash
cd ..
# npm run test-create-grant-reports
# npm run test-admin-validate-application
npm run test-submit-due-report
d=`date +%m-%d-%Y_%H-%M-%S`
mv ./output ./output_test_validate_application_$d
start chrome $PWD/output_test_validate_application_$d/report.html

read