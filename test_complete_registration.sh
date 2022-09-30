#! /bin/bash
cd ..
npm run test-register
npm run test-verification
npm run test-login
d=`date +%m-%d-%Y_%H-%M-%S`
mv ./output ./output_test_complete_registration_$d
start chrome $PWD/output_test_complete_registration_$d/report.html

read