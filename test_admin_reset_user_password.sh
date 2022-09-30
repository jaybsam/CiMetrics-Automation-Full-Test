#! /bin/bash
cd ..
npm run test-admin-reset-user-password
d=`date +%m-%d-%Y_%H-%M-%S`
mv ./output ./output_test_admin_reset_user_password_$d
start chrome $PWD/output_test_admin_reset_user_password_$d/report.html

read