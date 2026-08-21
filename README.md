# TaskFlow API - Görev Yönetim Sistemi

Bu proje, bir yazılım şirketinin ekip içerisindeki görevleri, projeleri ve çalışanların sorumluluklarını takip edebilmesi amacıyla tamamen REST API mantığında tasarlanmış ve Node.js/Express.js altyapısıyla geliştirilmiştir.

## Sistem Özellikleri ve Yetenekleri

* **Görev Yönetimi (CRUD):** Yeni görev oluşturma, listeleme, detay görüntüleme, güncelleme ve silme işlemleri eksiksiz çalışmaktadır.

* **Güvenlik Katmanı (Validation Middleware):** Sisteme eklenecek veya güncellenecek veriler için zorunlu alan (title, description, priority, assignee) kontrolleri yapılmaktadır. Eksik verilerde sistem 400 Bad Request hatası döndürerek veri bütünlüğünü korur.

* **Sistem Günlüğü (Logger Middleware):** API'ye gelen tüm istekler zaman damgası, HTTP metodu ve endpoint bilgisiyle birlikte loglanmaktadır.

* **Gelişmiş API Özellikleri:** Görevler üzerinde duruma ve önceliğe göre filtreleme, kelime bazlı arama, tarihe göre sıralama ve sayfalama özellikleri sisteme entegre edilmiştir.

* **Raporlama Servisi:** Sistemdeki tamamlanan, bekleyen ve işlemde olan görevlerin istatistiksel sayılarını sunan özel bir raporlama modülü geliştirilmiştir.

## 🚀 Kurulum ve Çalıştırma (Kurulum Notu)

Projeyi kendi bilgisayarınızda çalıştırmak için aşağıdaki adımları izleyin:

1. **Gereksinimler:** Bilgisayarınızda [Node.js] kurulu olmalıdır.

2. **Bağımlılıkların Yüklenmesi:** Terminali açın ve proje dizininde şu komutu çalıştırın:
   ```bash
   npm install

3. **Sunucuyu Başlatma:** Geliştirme modunda başlatmak için şu komutu kullanın:
    ```bash
   npm run dev

   Sunucu http://localhost:3000 adresinde çalışmaya başlayacaktır.
   


   🛠️ API Kullanım Kılavuzu ve Endpoint'ler

1. Temel CRUD Operasyonları

GET /tasks - Tüm görevleri listeler.

GET /tasks/:id - Belirtilen ID'ye sahip görevin detaylarını getirir.

POST /tasks - Sisteme yeni bir görev ekler. (title, description, priority, assignee alanları zorunludur).

PUT /tasks/:id - Belirtilen görevi günceller.

DELETE /tasks/:id - Belirtilen görevi sistemden siler.

2. Gelişmiş Filtreleme ve Arama (GET /tasks üzerinden)

Filtreleme: /tasks?status=completed veya /tasks?priority=high

Arama: /tasks?keyword=veritabanı

Sıralama: /tasks?sort=createdAt (En yeniler en üstte)

Sayfalama: /tasks?page=1&limit=5

3. Raporlama Servisleri

GET /reports/completed - Sadece tamamlanan görev sayısını döner.

GET /reports/pending - Sadece bekleyen görev sayısını döner.

GET /reports/summary - Sistemdeki tüm görevlerin durum bazlı istatistiksel özetini döner.