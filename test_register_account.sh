#! /bin/bash
cd ..
npm run test-register
d=`date +%m-%d-%Y_%H-%M-%S`
mv ./output ./output_test_register_$d
start chrome $PWD/output_test_register_$d/report.html

read