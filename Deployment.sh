pm2 kill
sleep 2
git pull
sleep 2
npm install
sleep 2
npx sequelize db:migrate --env production
sleep 2
pm2 start index.js -i 2
echo -e "\e[92m"
echo "DEPLOYMENT COMPLETED"