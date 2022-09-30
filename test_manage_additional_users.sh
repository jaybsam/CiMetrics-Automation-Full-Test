#! /bin/bash
cd ..
npm run test-admin-manage-user
d=`date +%m-%d-%Y_%H-%M-%S`
mv ./output ./output_test_manage_additional_users_$d
start chrome $PWD/output_test_manage_additional_users_$d/report.html

read