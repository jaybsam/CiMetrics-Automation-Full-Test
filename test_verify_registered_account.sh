#! /bin/bash
cd ..
npm run test-verification
d=`date +%m-%d-%Y_%H-%M-%S`
mv ./output ./output_test_verification_$d
start chrome $PWD/output_test_verification_$d/report.html

read