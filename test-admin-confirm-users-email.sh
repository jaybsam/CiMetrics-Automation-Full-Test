#! /bin/bash
cd ..
npm run test-admin-manage-user
npm run test-admin-confirm-users-email
npm run test-admin-added-partner-user
d=`date +%m-%d-%Y_%H-%M-%S`
mv ./output ./output_test_admin_confirm_users_email_$d
start chrome $PWD/output_test_admin_confirm_users_email_$d/report.html

read