# Alur Kerja LINE Login
1. Aplikasi yang kita buat harus mengarahkan pengguna ke URL Auth LINE Login
2. Dialog LINE Login dibuka dibrowser dan Pengguna masuk melalui browser
3. LINE memberikan validasi melalui Platform(Aplikasi) LINE
4. Saat proses validasi pengguna harus setuju untuk memberikan ijin yang diminta
5. Platform LINE mengarahkan kita kembali ke aplikasi yang kita buat melalalui _redirect_uri_ dengan kode otorasi yang diberikan oleh LINE (dalam bentuk query)
6. Aplikasi yang kita buat memberikan kode akses dari https://api.line.me/oauth2/v2.1/token dengan kode otorisasi tadi
7. Platform LINE memvalidasi permintaan aplikasi yang kita buat dan mengembalikan token akses

# Membuat Aplikasi LIFF Login
1. Buat Chanel Terlebih Dahulu (Service yang dipilih adalah Login)
2. Setting Chanel (ChanelName > LINE Login)
3. Nyalakan Web App
4. Setting Callback URL
> Callback URL digunakan untuk mengarahkan kemana user setelah melakukan login
5. Setting Email Fermesion (ChanelName > Basic Setting)
> Cari OpenIDConect, pada "Email address permesion" klik "Apply"
6. Membuat Auth pengguna
> Arahkah pengguna ke https://access.line.me/oauth2/v2.1/authorize dengan parameter yang diperlukan (Dapat menggunakan line button atau URL langsung)
> Parameter dapat dilihat di folder gambar
7. Selanjutnya lihat di https://developers.line.biz/en/docs/line-login/web/integrate-line-login/ bagian scope
