#TUTORIAL INSTALASI

- Clone repository melalui link dibawah ini
```bash
git clone https://github.com/zakialbajili/EduKita_technical_test.git
```
- Masuk kedalam folder dari repository yang telah di clone
- Buat branch baru dan pnidah ke branch tersebut 
```bash
git branch backend
git chekout backend
```
- Pull data repository yang ada pada branch tersebut
```bash
git pull origin backend
```
- Install semua dependensi yang berada pada folder tersebut dengan  ketik command
```bash
npm install
```
atau
```bash
npm run install
``` 
- Buat file .env dan copy file .env.example kedalam file tersebut
- Inisialisasi prisma dengan menuliskan command berikut di terminal
```bash
npx prisma init
``` 
- Generate prisa client dengan perintah 
```bash
npx prisma generate
``` 
- Lakukan migration database dengan perintah 
```bash
npx prisma migrate dev --name init
``` 
- Lakukan prosess sedding untuk menambahkan data awal pada database
```bash
npx prisma db seed
``` 
- Jalankan server dengan perintah
```bash
npm run dev
``` 