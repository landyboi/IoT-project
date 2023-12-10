pm2 kill
sleep 1
git pull
sleep 2
npm install
sleep 2
cd client
sleep 1
npm run build
sleep 10
cd ..
npx sequelize db:migrate --env production
sleep 2
pm2 start index.js
echo -e "\e[92m"
echo "DEPLOYMENT COMPLETED"
echo -e "\e[0m"