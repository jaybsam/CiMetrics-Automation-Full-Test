#! /bin/bash
cd ..
npm run test-edit-grant-reports
d=`date +%m-%d-%Y_%H-%M-%S`
mv ./output ./output_test_edit_grant_reports_$d
start chrome $PWD/output_test_edit_grant_reports_$d/report.html

read
