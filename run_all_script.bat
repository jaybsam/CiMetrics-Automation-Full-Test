cd..
node ./migration/schema_grant_application.js
npm run test
npm run test-admin-manage-user
npm run test-admin-reset-user-password
npm run test-reset-password
set date=%date:~10,4%-%date:~7,2%-%date:~4,2%-%time:~0,2%-%time:~3,2%
rename output output_run_all_scripts_%date%
start chrome %cd%/output_run_all_scripts_%date%/report.html
cmd /k