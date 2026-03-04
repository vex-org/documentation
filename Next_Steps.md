# Vex Platform — Topluluk Oluşturma Yol Haritası

## Platform Durumu

Platform altyapı olarak **%80 hazır** — çoğu yeni programlama dili bu seviyeye aylar/yıllar sonra gelir.

### Mevcut Güçlü Yanlar
- **Paket Registry** — crates.io/npm benzeri ekosistem altyapısı
- **Blog + Zengin Editör** — TipTap tabanlı içerik üretim döngüsü
- **Playground (WASM)** — Sıfır kurulumla tarayıcıda deneme imkanı (en büyük avantaj)
- **Projeler Vitrini** — Topluluk çalışmalarını görünür kılar
- **VitePress Docs** — Profesyonel dokümantasyon
- **OAuth (GitHub/Google)** — Kayıt engeli yok
- **SEO + Performans** — Organik keşfedilebilirlik optimize

---

## Öncelikli Eksikler

### P0 — Launch Öncesi Şart

| Eksik | Neden Önemli |
|-------|-------------|
| Landing page'de "Get Started in 30s" CTA | İlk 10 saniyede kullanıcıyı yakalaman lazım |
| Discord/Telegram bağlantısı (aktif) | Gerçek zamanlı sohbet olmadan topluluk oluşmaz |

### P1 — İlk Ay İçinde

| Eksik | Neden Önemli |
|-------|-------------|
| "Why Vex?" karşılaştırma sayfası (vs Rust/Go/Zig) | İnsanlar neden geçiş yapacaklarını anlamalı |
| GitHub stars badge + activity feed | Sosyal kanıt (social proof) şart |
| Newsletter / email list | Blog yayınlarını push edebilmek |

### P2 — İlk 3 Ay İçinde

| Eksik | Neden Önemli |
|-------|-------------|
| İnteraktif tutorial ("Tour of Vex") | Go'nun "Tour of Go"su — topluluk büyütmenin kanıtlanmış yolu |
| Contributing guide + "good first issue" etiketleri | Katkıcıları çekmek için |

---

## Topluluk Büyütme Formülü

```
Topluluk = Harika Araç × Görünürlük × İçerik Döngüsü × Etkileşim Kanalı
```

| Bileşen | Durum | Aksiyon |
|---------|-------|---------|
| **Harika Araç** | ✅ Hazır | Parallelism-first + Rust safety + Go simplicity |
| **Görünürlük** | ⚠️ Eksik | HN "Show HN", Reddit, Twitter/X launch |
| **İçerik Döngüsü** | ✅ Altyapı hazır | Düzenli blog yazısı üretimi gerekli |
| **Etkileşim Kanalı** | ❌ Eksik | Discord sunucusu aç |

---

## Launch Stratejisi

### Adım 1: Hazırlık
- [ ] Discord sunucusu aç (kanallar: #general, #help, #showcase, #contributing)
- [ ] 2-3 "wow" demo hazırla (örn. "1M goroutine in 200ms" benchmark videosu)
- [ ] "Why Vex?" blog yazısı yaz
- [ ] Landing page'e CTA ekle

### Adım 2: Soft Launch
- [ ] Twitter/X'te teaser paylaş
- [ ] Reddit r/programminglanguages'da tanıt
- [ ] İlk 10-20 kullanıcıyı Discord'a çek

### Adım 3: Public Launch
- [ ] Hacker News "Show HN" paylaş
- [ ] Benchmark karşılaştırma blog yazısı (Vex vs Go vs Rust)
- [ ] Playground üzerinden interaktif demo

---

## Playground Benchmark Arena ("Run & Compare")

Kullanıcı Vex kodu yazar → backend aynı algoritmayı Go/Rust/Zig'e transpile eder → hepsini derler → canlı karşılaştırma gösterir.

**Hiçbir programlama dili bunu yapmıyor.** Çünkü sonuçlarından korkarlar.

### Akış
```
Kullanıcı kodu → Oracle ARM Server → paralel derleme:
  ├─ vex compile + run     → 0.5s
  ├─ AI transpile → go     → go build + run    → 2s
  ├─ AI transpile → rust   → rustc + run       → 3s
  └─ AI transpile → zig    → zig build + run   → 1s
                                    toplam ~4-5s (paralel)
```

### Gösterilecek Metrikler
- ⚡ Execution Time (ms)
- 📦 Binary Size (KB)
- 🧠 Peak Memory Usage (MB)
- 📊 Horizontal bar chart ile görsel karşılaştırma

### Şeffaflık Kuralları
- [x] Generate edilen Go/Rust/Zig kodu "View Generated Code" ile gösterilecek
- [x] Disclaimer: "AI-generated, may not be idiomatic"
- [x] Vex kaybederse de gösterilecek — dürüstlük = güven

### Güvenlik (Sandbox)
- Her derleme cgroups/nsjail/firejail içinde
- CPU timeout: 5s max
- Memory limit: 256MB
- Network/filesystem erişimi yok
- Rate limit: 5 compare/dakika/kullanıcı

### AI Asistan ("Ask Vex AI")
- Model: Qwen3 0.6B (Oracle ARM'da çalışır)
- İlk aşamada sadece: "açıkla" + "Rust/Go'dan Vex'e çevir"
- System prompt: Vex syntax kuralları + 50 örnek kod
- RAG: VitePress docs bağlantılı

---

## Kaynak Kod Stratejisi

Kaynak kodu hemen açmak zorunda değilsin. Başarılılı örnekler:

### Closed-Source Launch → Sonra Açma Modeli
- **Playground** üzerinden dili denettir (kaynak kodu göstermeden)
- **Precompiled binary** dağıt (Linux/macOS/Windows)
- **Docs + Examples** açık tut, compiler source kapalı
- Lisansı oturttuktan sonra kademeli açış yap

### Önerilen Zaman Çizelgesi
1. **Şimdi**: Binary-only dağıtım + Playground + Docs
2. **Lisans hazır olunca**: Standart kütüphane (stdlib) açık kaynak
3. **Topluluk olgunlaşınca**: Compiler source açık kaynak (BSL/SSPL/custom lisans ile)

### Lisans Seçenekleri (korumacı → açık)
| Lisans | Koruma | Örnek |
|--------|--------|-------|
| **BSL (Business Source License)** | Yüksek — N yıl sonra otomatik açılır | MariaDB, CockroachDB, Sentry |
| **SSPL** | Yüksek — SaaS kullanımını kısıtlar | MongoDB |
| **ELv2 (Elastic License)** | Orta — rakip ürün yasağı | Elasticsearch |
| **FSL (Functional Source License)** | Yüksek — 2 yıl sonra Apache/MIT olur | Sentry (yeni) |
| **Apache 2.0 + CLA** | Düşük — ama CLA ile kontrol | Rust, Go |
| **MIT** | Yok — herkes her şeyi yapabilir | Node.js |
