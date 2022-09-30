cd ..
node ./migration/schema_application_12_months.js
npm run test
npm run test-admin-manage-user
npm run test-admin-reset-user-password
npm run test-reset-password
d=`date +%m-%d-%Y_%H-%M-%S`
mv ./output ./output_run_all_scripts_12_months_$d
start chrome $PWD/output_run_all_scripts_12_months_$d/report.html

read