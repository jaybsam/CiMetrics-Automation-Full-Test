#! /bin/bash
npm run test
# npm run test-admin-manage-user
# npm run test-admin-reset-user-password
# npm run test-reset-password
d=`date +%m-%d-%Y_%H-%M-%S`
mv ./output ./output_run_all_scripts_$d
start chrome $PWD/output_run_all_scripts_$d/report.html