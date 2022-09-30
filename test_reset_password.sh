#! /bin/bash
cd ..
npm run test-reset-password
d=`date +%m-%d-%Y_%H-%M-%S`
mv ./output ./output_test_reset_password_$d
start chrome $PWD/output_test_reset_password_$d/report.html

read