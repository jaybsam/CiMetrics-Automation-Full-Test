#! /bin/bash
cd ..
npm run test-admin-login
d=`date +%m-%d-%Y_%H-%M-%S`
mv ./output ./output_test_admin_login_$d
start chrome $PWD/output_test_admin_login_$d/report.html

read