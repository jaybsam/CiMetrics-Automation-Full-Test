#! /bin/bash
cd ..
npm run test-admin-download-completed-report
d=`date +%m-%d-%Y_%H-%M-%S`
mv ./output ./output_test_admin_download_completed_report_$d
start chrome $PWD/output_test_admin_download_completed_report_$d/report.html

read