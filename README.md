# A - BACKEND

1. Create package.json file
   npm init -y
2. Set typescript
   npm instal --save-dev typescript
3. Set tsconfig.json
   npx tsc --init
4. Install Express
   npm install express
   npm i --save-dev @types/express
5. Create an express app
6. npm install --save-dev nodemon
7. npm install -D ts-node
8. Add "scripts": {
   "start": "nodemon src/server.ts"}
   this will let you use npm start dev
9. Change to "main": "dist/server.js",
10. npm i -D eslint, to check for errors
11. npx eslint . --ext .ts , to check for problems in the selected file
12. Add "lint": "eslint . --ext .ts" to scripts so that we can use directly npm run lint
13. install the pluggin ESLInt
