#TUTORIAL INSTALASI

- Clone repository melalui link dibawah ini
```bash
git clone https://github.com/zakialbajili/EduKita_technical_test.git
```
- Masuk kedalam folder dari repository yang telah di clone
- Buat branch baru dan pnidah ke branch tersebut 
```bash
git branch frontend
git chekout frontend
```
- Pull data repository yang ada pada branch tersebut
```bash
git pull origin frontend
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
- Jalankan server dengan perintah langsung atau lakukan build terlebih dahulu
    1. Secara langsung
```bash
npm run dev
``` 
    2. Build terlebih dahulu
```bash
npm run build
``` 
lalu
```bash
npm run start
``` 