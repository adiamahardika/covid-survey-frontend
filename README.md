# Frontend

## Deskripsi

Proyek ini adalah aplikasi survei COVID-19 yang dibangun menggunakan React Native dan Expo.

## Prasyarat

Pastikan Anda telah menginstal perangkat lunak berikut:

- Node.js
- Expo CLI (`npm install -g expo-cli`)

## Instalasi

1. Clone repositori ini:

   ```sh
   git clone <URL_REPOSITORY>
   cd covid-survey-frontend
   ```

2. Instal dependensi:

   ```sh
   npm install
   ```

3. Buka file `.env` di direktori root proyek dan ganti URL API sesuai dengan ip address anda. Contoh:
   ```env
   API_URL=http://192.168.1.102:5000
   ```

## Menjalankan Proyek

Untuk menjalankan proyek, gunakan perintah berikut:

```sh
npx expo start
```

## Navigasi

Aplikasi ini menggunakan `@react-navigation` untuk navigasi. Berikut adalah struktur navigasi:

- `Survey Covid` - Halaman utama yang menampilkan daftar survei.
- `Detail` - Halaman detail untuk setiap survei.
- `Form` - Halaman untuk menambahkan atau mengedit data survei baru.

## Dependensi

- `@react-navigation/native`
- `@react-navigation/stack`
- `axios`
- `expo`
- `react`
- `react-native`
- `react-native-dotenv`
- `react-native-paper`
- `react-native-safe-area-context`
- `react-native-screens`

## Lisensi

Proyek ini dilisensikan di bawah [MIT License](LICENSE).
