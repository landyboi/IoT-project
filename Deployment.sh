pm2 kill
sleep 1
git pull
sleep 1
npm install
sleep 1
cd client
npm install
sleep 1
npm run build
sleep 1
cd ..
npx sequelize db:migrate --env production
sleep 1
pm2 start index.js
echo -e "\e[92m"
echo "DEPLOYMENT COMPLETED"
echo -e "\e[0m"