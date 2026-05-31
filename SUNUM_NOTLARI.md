# Ollama Sunum Metnim

## Giriş

Benim seçtiğim yapay zeka toolu Ollama. Ollama bir yapay zeka modeli değil; yapay zeka modellerini kendi bilgisayarımızda çalıştırmamızı sağlayan bir araç.

Normalde ChatGPT gibi sistemlerde biz mesajı yazıyoruz, bu mesaj internet üzerinden bir sunucuya gidiyor, cevap orada üretiliyor ve bize geri geliyor. Ollama'da ise mantık biraz farklı. Model bilgisayarımıza indiriliyor ve cevap üretme işlemi yerel olarak bizim bilgisayarımızda yapılıyor.

Bu yüzden Ollama özellikle gizlilik, offline kullanım ve uygulama geliştirme tarafında önemli bir tool. Çünkü burada modeli çalıştıran yer başka bir şirketin sunucusu değil, bizim kendi bilgisayarımız.

Kısaca anlatmam gerekirse:

```text
Ollama, açık kaynaklı büyük dil modellerini kendi bilgisayarımızda çalıştırıp uygulamalarımıza bağlamamızı sağlayan bir yapay zeka aracıdır.
```

Burada özellikle model ve tool ayrımını net yapmak istiyorum. Benim anlattığım tool Ollama. Demo sırasında kullandığım `gemma3:1b` ise Ollama'nın içinde çalıştırdığım örnek model.

```text
Ollama = tool
gemma3:1b = model
```

## Neden Ollama Seçtim?

Tool seçerken birkaç farklı seçenek vardı. Hugging Face zaten daha önce işlendiği için onu seçmedim. n8n de yapay zeka ile kullanılabiliyor ama ana amacı model çalıştırmak değil, daha çok otomasyon ve iş akışı kurmak.

Mesela n8n ile farklı servisleri birbirine bağlayabiliriz. Bir formdan veri alıp e-posta göndermek, bir API'den bilgi çekip başka bir uygulamaya aktarmak veya bir yapay zeka servisini otomasyon akışına eklemek gibi işler yapılabilir. Ama n8n'in ana amacı modeli yerel bilgisayarda çalıştırmak değildir.

Ollama ise doğrudan yapay zeka modelinin nasıl indirildiğini, nasıl çalıştırıldığını ve bir uygulamaya nasıl bağlandığını gösteriyor. Bu yüzden bu ödev için daha uygun olduğunu düşündüm.

Yani benim konum yapay zeka modeli değil, yapay zeka modellerini çalıştırmaya yarayan bir tool. Ollama bu tanıma uyuyor.

Kısa karşılaştırırsam:

- Hugging Face daha geniş bir model ve dataset platformu.
- n8n daha çok otomasyon ve workflow aracı.
- Ollama ise modeli yerel bilgisayarda çalıştırma aracı.

Bu yüzden Ollama ile hem teknik tarafı hem avantaj-dezavantajları hem rakiplerden farkı hem de küçük bir demo uygulamasını göstermek daha rahat oluyor.

## Ollama Nedir?

Ollama, açık kaynaklı veya açık ağırlıklı büyük dil modellerini bilgisayarımıza indirip çalıştırmamızı sağlayan bir araçtır. Burada büyük dil modeli dediğimiz şey, metin anlayabilen ve metin üretebilen yapay zeka modelidir.

Örneğin Gemma, Qwen, DeepSeek veya Llama gibi modeller Ollama ile çalıştırılabilir. Ama tekrar vurgulamak gerekirse Ollama bu modellerin kendisi değildir. Ollama bu modelleri indirip çalıştırmamızı sağlayan tool tarafıdır.

Bunu şöyle düşünebiliriz:

```text
Model cevap üretir.
Ollama modeli çalıştırır.
Uygulama Ollama üzerinden modele bağlanır.
```

Ollama'nın yaptığı şey sadece modeli indirmek değildir. Aynı zamanda modeli yönetir, çalıştırır ve bizim yazdığımız uygulamanın bu modele bağlanmasını sağlar. Yani model ile uygulama arasında bir köprü gibi davranır.

Temel komutlar da oldukça basit:

```bash
ollama pull gemma3:1b
ollama list
ollama run gemma3:1b
```

Burada:

- `ollama pull gemma3:1b` örnek modeli indirir.
- `ollama list` bilgisayardaki modelleri listeler.
- `ollama run gemma3:1b` modeli terminalden çalıştırır.

Bu komutlarda `gemma3:1b` modeldir. Tool olan kısım Ollama'dır.

## Ollama Nasıl Çalışır?

Ollama bilgisayarda bir servis gibi çalışır. Biz bir uygulama yazdığımızda bu uygulama Ollama'ya istek gönderir. Ollama da seçilen modeli kullanarak cevap üretir ve cevabı uygulamaya geri gönderir.

Demo uygulamamda akış şu şekilde:

```text
Kullanıcı prompt yazar
→ Streamlit arayüzü mesajı alır
→ Python kodu Ollama SDK'yi çağırır
→ Ollama yerel API'ye istek gider
→ Yerel model cevap üretir
→ Cevap arayüzde gösterilir
```

Burada Streamlit sadece arayüz tarafını oluşturuyor. Yani kullanıcı mesaj yazıyor, model seçiyor ve cevabı ekranda görüyor. Yapay zeka cevabını üreten taraf ise Ollama'nın çalıştırdığı yerel model.

Ollama varsayılan olarak bilgisayarda `localhost:11434` adresinde çalışıyor. Localhost dediğimiz şey kendi bilgisayarımız demek. Yani uygulama internetteki uzak bir API'ye gitmek yerine aynı bilgisayarda çalışan Ollama servisine bağlanıyor.

Bu, Ollama'nın en önemli farklarından biri. Bulut tabanlı servislerde istek dışarıdaki sunucuya giderken, Ollama ile aynı bilgisayarda çalışan modele istek gönderebiliyoruz.

Kısaca:

```text
Streamlit arayüzdür.
Ollama modeli çalıştırır.
Model cevabı üretir.
```

## Teknik Tarafında Neler Var?

Ollama'nın teknik tarafında birkaç önemli kavram var. Bunları bilirsek toolun nasıl çalıştığını daha iyi anlayabiliriz.

İlk olarak model dosyaları var. Büyük dil modelleri eğitilmiş ağırlıklardan oluşuyor. Bu ağırlıklar modelin öğrendiği bilgileri ve cevap üretme yeteneğini temsil ediyor. Ollama bu model dosyalarını bilgisayara indiriyor ve çalıştırılabilir hale getiriyor.

İkinci önemli konu yerel API. Ollama arka planda bir API servisi gibi çalışıyor. Uygulamalar bu servise istek gönderiyor. Bu yüzden Python, JavaScript veya REST API ile Ollama'ya bağlanmak mümkün.

Üçüncü kavram quantization. Quantization, modelin daha az bellek kullanması için yapılan bir optimizasyon. Normalde büyük modeller çok fazla RAM veya VRAM isteyebilir. Quantization sayesinde modelin ağırlıkları daha düşük hassasiyetle tutulur. Bu da modeli daha küçük ve daha çalıştırılabilir hale getirir.

Bunu basitçe şöyle söyleyebilirim:

```text
Quantization = Modeli biraz sıkıştırıp daha az donanımla çalıştırmak.
```

Tabii bunun bir dengesi var. Daha az bellek kullanır ve daha hızlı çalışabilir ama bazı durumlarda küçük kalite kaybı olabilir.

Bir diğer kavram context length. Context length, modelin aynı anda ne kadar metni dikkate alabildiğini gösterir. Kısa bir soru soruyorsak bu çok sorun olmaz. Ama uzun bir konuşma geçmişi veya uzun bir doküman verirsek modelin context kapasitesi önemli hale gelir.

Donanım tarafı da önemli. Ollama yerel çalıştığı için performans bilgisayarın donanımına bağlı. Küçük modeller çoğu bilgisayarda çalışabilir ama büyük modeller için daha fazla RAM, VRAM ve işlemci gücü gerekir.

Son olarak streaming var. Streaming, cevabın tek seferde değil parça parça gelmesi demek. ChatGPT'de cevabın yazı yazar gibi akmasını görüyoruz. Bizim demo uygulamasında da `stream=True` kullanıldığı için cevap ekrana parça parça geliyor.

Teknik tarafı özetlersem:

- Model dosyaları bilgisayara indirilir.
- Ollama yerel API gibi çalışır.
- Python veya JavaScript ile bağlanılabilir.
- Quantization daha az donanımla çalışmayı sağlar.
- Context length modelin ne kadar metni dikkate alacağını belirler.
- Streaming cevapların parça parça gelmesini sağlar.
- Performans bilgisayar donanımına bağlıdır.

## Avantajları

Ollama'nın en büyük avantajı bana göre yerel çalışması. Çünkü model bizim bilgisayarımızda çalıştığı için verilerin dışarı gönderilmesi gerekmez. Bu özellikle gizlilik açısından önemli.

Mesela bir şirketin özel belgeleri varsa, bunları her zaman buluttaki bir API'ye göndermek istemeyebilir. Ollama ile model yerelde çalıştığı için bu belgeler bilgisayar içinde kalabilir.

İkinci avantaj offline kullanım. Model bir kere indirildikten sonra internet olmadan da çalışabilir. Tabii modeli ilk indirmek için internet gerekir ama sonrasında temel kullanım yerel olabilir.

Üçüncü avantaj maliyet tarafı. Bulut API'lerde genelde kullanım başına ücret olur. Ne kadar token kullanırsak ona göre maliyet çıkabilir. Ollama'da doğrudan API kullanım ücreti yoktur. Bu yüzden deneme yaparken ve prototip geliştirirken avantajlı olabilir.

Tabii tamamen maliyetsiz demek doğru olmaz. Çünkü bilgisayar donanımı, elektrik ve disk alanı gibi dolaylı maliyetler vardır. Ama kullanım başına API faturası çıkmaz.

Bir diğer avantaj model seçme özgürlüğüdür. Ollama ile farklı modeller denenebilir. Küçük model hızlı çalışır, büyük model daha kaliteli cevap verebilir. İhtiyaca göre model seçilebilir.

Ayrıca geliştirici dostu bir araçtır. Terminalden kullanılabilir, Python ile bağlanabilir, JavaScript ile kullanılabilir ve REST API üzerinden çağrılabilir.

Özetle Ollama'nın avantajları:

- Gizlilik sağlar.
- Offline çalışabilir.
- API maliyeti olmadan prototip geliştirilebilir.
- Farklı modeller denenebilir.
- Python, JavaScript ve REST API ile uygulamalara bağlanabilir.
- Yerel yapay zeka uygulaması geliştirmeyi kolaylaştırır.

## Dezavantajları

Ollama'nın avantajları var ama her şey için en iyi çözüm demek doğru olmaz. Çünkü yerel çalışmanın bazı sorumlulukları da var.

En büyük dezavantaj donanım ihtiyacı. Model bizim bilgisayarımızda çalıştığı için bilgisayar güçlü değilse cevaplar yavaş gelebilir. Özellikle büyük modeller daha fazla RAM ve VRAM ister.

Bir diğer dezavantaj disk alanı. Model dosyaları büyük olabilir. Bazı modeller birkaç GB yer kaplar. Birden fazla model indirirsek bilgisayarda ciddi disk alanı kullanabilir.

Model kalitesi de önemli bir konu. Yerel açık modeller bazen buluttaki en güçlü kapalı modellere göre daha zayıf cevap verebilir. Özellikle karmaşık akıl yürütme, kod yazma veya uzun metin analizlerinde model kalitesi fark edebilir.

Kurulum ve ayar kısmı da yeni başlayan biri için biraz karışık olabilir. Hangi modeli indireceğiz, bilgisayar kaldırır mı, cevap neden yavaş geliyor gibi sorular çıkabilir.

Bir de güvenlik ve sorumluluk tarafı var. Ollama yerelde çalışınca güvenlik tarafında sorumluluk kullanıcıya geçiyor. Uygulama dışarı açık mı, kim erişebilir, hangi model kullanılıyor gibi konulara dikkat etmek gerekir.

Özetle:

```text
Ollama kontrol ve gizlilik sağlar ama donanım, kurulum ve yönetim sorumluluğu getirir.
```

## Rakiplerden Farkı

Ollama'yı daha iyi anlamak için benzer araçlarla karşılaştırabiliriz. Burada amacım Ollama hepsinden iyi demek değil. Her aracın farklı kullanım alanı var.

LM Studio da yerel modellerle çalışmak için kullanılıyor. Ama LM Studio daha çok masaüstü arayüz tarafında güçlü. Kullanıcı görsel arayüzden model indirip sohbet edebilir. Ollama ise komut satırı ve API tarafında daha geliştirici odaklı.

llama.cpp daha düşük seviyeli ve teknik bir altyapı. Model çalıştırma tarafında çok önemli bir proje ama kullanımı daha teknik olabilir. Ollama bu tarz işleri daha kolay kullanılabilir hale getiriyor.

Hugging Face çok geniş bir ekosistem. Model, dataset, demo, training ve deployment gibi çok fazla alanı kapsıyor. Ollama ise daha dar bir probleme odaklanıyor: modeli yerel bilgisayarda çalıştırmak.

n8n yapay zeka ile kullanılabilir ama ana amacı model çalıştırmak değil. n8n daha çok otomasyon kurmak için kullanılır. Mesela bir form geldiğinde veriyi al, modele gönder, sonucu e-posta olarak yolla gibi akışlar kurulabilir. Ollama ise modelin yerelde çalışan tarafını sağlar.

OpenAI API gibi servislerde çok güçlü modellere buluttan erişiyoruz. Kalite ve hız açısından avantajlı olabilir. Ama veri dış servise gider ve kullanım başına maliyet oluşur. Ollama'da ise kontrol bizde ama performans ve kalite bilgisayarımıza ve seçtiğimiz modele bağlıdır.

Kısa tablo olarak:

| Araç | Ana amacı | Ollama'dan farkı |
|---|---|---|
| LM Studio | Görsel arayüzle yerel model kullanımı | Daha GUI odaklı |
| llama.cpp | Düşük seviye model çalıştırma altyapısı | Daha teknik |
| Hugging Face | Model ve dataset ekosistemi | Çok daha geniş platform |
| n8n | Otomasyon ve workflow | Model çalıştırma aracı değil |
| OpenAI API | Bulut tabanlı güçlü model servisi | Daha kaliteli olabilir ama bulut ve maliyet var |

Ollama'nın farkını tek cümlede şöyle özetleyebilirim:

```text
Ollama, yerel model çalıştırmayı geliştirici için basit komutlar ve API ile pratik hale getirir.
```

## Demo Uygulaması

Demo kısmında küçük bir Streamlit uygulaması göstereceğim. Bu uygulama basit bir yerel chatbot gibi çalışıyor.

Önce Ollama kurulu olmalı ve en az bir model indirilmiş olmalı. Demo için örnek olarak şu modeli kullanıyorum:

```bash
ollama pull gemma3:1b
```

Uygulamayı çalıştırmak için:

```bash
python3 -m streamlit run app.py
```

Uygulama açıldığında sol tarafta bilgisayarda yüklü olan Ollama modelleri listeleniyor. Kullanıcı bir model seçiyor ve sohbet kutusuna soru yazıyor. Uygulama bu soruyu Ollama'ya gönderiyor ve cevap yerel modelden geliyor.

Buradaki önemli nokta şu: Bu cevap bir web sitesinden hazır alınmıyor. Uygulama bilgisayarda çalışan Ollama servisine bağlanıyor. Ollama da seçtiğimiz yerel modeli kullanarak cevap üretiyor.

Cevap ekrana parça parça geliyor. Bunun sebebi streaming kullanmamız. Böylece kullanıcı cevap bitene kadar boş ekran beklemiyor.

Demo sırasında şu promptları deneyebilirim:

```text
Python'da for döngüsünü 5 yaşındaki birine anlatır gibi açıkla.
```

```text
Bu cümleyi İngilizceye çevir: Yapay zeka araçları yerel bilgisayarda da çalışabilir.
```

```text
Bana Ollama'nın 3 avantajını ve 2 dezavantajını kısa maddelerle yaz.
```

Bu demo küçük bir chatbot gibi görünüyor ama aslında mantığı önemli. Aynı yapı büyütülerek doküman okuyan, şirket içi bilgi veren veya kod açıklayan bir yapay zeka uygulamasına dönüştürülebilir.

## Kod Tarafı

Ollama'yı Python uygulamasına eklemek için temel kullanım şu şekilde:

```python
import ollama

response = ollama.chat(
    model="gemma3:1b",
    messages=[
        {"role": "user", "content": "Merhaba!"}
    ],
    stream=True,
)

for chunk in response:
    print(chunk["message"]["content"], end="")
```

Burada önce Ollama kütüphanesini import ediyoruz. Sonra `ollama.chat()` fonksiyonunu çağırıyoruz. Bu fonksiyona hangi modeli kullanacağımızı ve modele hangi mesajı göndereceğimizi veriyoruz.

`model="gemma3:1b"` kısmı kullanılacak modeli belirtir. `messages` kısmı modele gönderilen konuşma mesajlarıdır. `role`, mesajın kullanıcıdan mı asistandan mı geldiğini belirtir. `content`, mesajın metin içeriğidir.

`stream=True` dediğimizde cevap tek parça olarak değil, parça parça gelir. `for chunk in response` kısmında da gelen cevap parçaları sırayla işlenir.

Benim demo uygulamamda bu temel yapı Streamlit ile birleşiyor. Kullanıcı arayüzden mesaj yazıyor. Bu mesaj session içinde tutuluyor. Sonra mesaj geçmişi Ollama'ya gönderiliyor. Böylece model sadece son soruyu değil, konuşma geçmişini de görebiliyor.

Özetle:

```text
Streamlit kullanıcı arayüzünü kuruyor.
Ollama SDK Python kodunu yerel modele bağlıyor.
Yerel model cevabı üretiyor.
```

## Kullanım Alanları

Ollama'nın kullanım alanları oldukça geniş. En basit haliyle yerel chatbot yapılabilir. Mesela kişisel asistan gibi çalışabilir.

Bunun dışında metin özetleme, çeviri, kod açıklama ve hata mesajı yorumlama gibi işlerde kullanılabilir. Özellikle dışarı veri göndermek istemediğimiz durumlarda yerel çalışması avantaj sağlar.

Bir de RAG dediğimiz kullanım var. RAG, Retrieval Augmented Generation demek. Basitçe modelin kendi bilgisine ek olarak dış dokümanlardan bilgi alıp cevap vermesidir. Mesela bir PDF dosyasını sisteme ekleyip, modele bu PDF'ye göre soru sorabiliriz. Ollama burada cevabı üreten yerel model tarafını sağlar.

Kullanım alanlarını şöyle sıralayabilirim:

- Yerel chatbot
- Ders notu veya PDF özetleme
- Kısa çeviri işleri
- Kod açıklama
- Hata mesajı yorumlama
- Kendi dokümanlarınla soru-cevap sistemi
- Eğitim ve prototip geliştirme

Benim yaptığım demo yerel chatbotun en temel hali. Eğer buna dosya yükleme, doküman arama veya veritabanı bağlantısı eklenirse daha gelişmiş bir uygulama haline gelir.

## Sonuç

Toparlarsam, Ollama yapay zeka modellerini bulutta değil, kendi bilgisayarımızda çalıştırmamızı sağlayan bir araç. En güçlü tarafları gizlilik, offline kullanım, geliştiriciye kontrol vermesi ve uygulamalara kolay bağlanabilmesi.

Ama her durumda en iyi çözüm demek doğru olmaz. Çünkü yerel çalıştığı için donanım önemli. Büyük modeller daha fazla RAM ve disk alanı istiyor. Ayrıca yerel açık modeller bazen buluttaki en güçlü kapalı modeller kadar kaliteli cevap vermeyebilir.

Kısaca:

```text
Ollama, yerel yapay zeka uygulaması geliştirmek isteyenler için pratik, esnek ve kontrol edilebilir bir araçtır.
```

Özellikle gizlilik önemliyse, internet olmadan çalışmak gerekiyorsa veya API maliyeti olmadan prototip geliştirmek istiyorsak Ollama tercih edilebilir.

## Hocadan Soru Gelirse Verebileceğim Cevaplar

### Ollama ile ChatGPT aynı şey mi?

Hayır, aynı şey değil. ChatGPT son kullanıcıya yönelik bir sohbet ürünü. Ollama ise modelleri yerel bilgisayarda çalıştırmaya yarayan bir araç. Yani Ollama'nın içinde tek bir model yok; farklı açık modelleri indirip çalıştırabiliyoruz.

### Ollama internet olmadan çalışır mı?

Model indirildikten sonra temel kullanımda çalışabilir. Ama modeli ilk indirmek veya güncellemek için internet gerekir.

### Ollama tamamen ücretsiz mi?

Ollama'nın kendisi ücretsiz ve açık kaynaklı. Ama tamamen maliyetsiz demek doğru olmaz. Çünkü yerel bilgisayarın donanımı, elektrik kullanımı ve disk alanı gibi dolaylı maliyetler var.

### Veriler gerçekten dışarı gitmiyor mu?

Yerel kullanımda prompt ve cevap üretimi bilgisayarda gerçekleşir. Ama uygulamanın içine başka API'ler veya online servisler eklenirse onların veri akışına ayrıca bakmak gerekir.

### En büyük avantajı ne?

Bence en büyük avantajı gizlilik ve kontrol. Model bizim bilgisayarımızda çalıştığı için veriyi dışarı göndermeden yapay zeka kullanabiliyoruz.

### En büyük dezavantajı ne?

Bence en büyük dezavantajı donanım ihtiyacı. Büyük modeller güçlü RAM veya GPU isteyebiliyor. Bilgisayar zayıfsa cevaplar yavaş gelebilir.

### Hangi model kullanılmalı?

Demo için küçük modeller daha mantıklı. Çünkü daha hızlı açılır ve daha az donanım ister. Daha kaliteli cevap için daha büyük modeller seçilebilir ama o zaman bilgisayarın daha güçlü olması gerekir.

### Ollama şirketlerde kullanılabilir mi?

Evet kullanılabilir. Özellikle gizlilik hassasiyeti olan şirket içi denemelerde mantıklı. Ama gerçek üretim ortamında güvenlik, erişim kontrolü, güncelleme ve performans planlaması yapılmalıdır.

### n8n yerine neden Ollama seçtin?

Çünkü n8n daha çok otomasyon ve workflow tarafında güçlü. Benim anlatmak istediğim şey ise modelin nasıl çalıştırıldığı ve uygulamaya nasıl bağlandığıydı. Bu yüzden Ollama bu konuya daha uygun.

### Hugging Face ile farkı ne?

Hugging Face çok daha geniş bir platform. Model paylaşımı, dataset, demo ve deployment gibi birçok şeyi kapsıyor. Ollama ise daha spesifik olarak modeli yerel bilgisayarda çalıştırmaya odaklanıyor.

## Kısa Ezber Cümleleri

- Ollama bir model değil, model çalıştırma aracıdır.
- Benim anlattığım tool Ollama, demo modelim `gemma3:1b`.
- Buradaki temel fark, modelin bulutta değil yerel bilgisayarda çalışmasıdır.
- Streamlit arayüz tarafını, Ollama ise yapay zeka modelini çalıştırma tarafını sağlıyor.
- Quantization modeli daha az donanımla çalıştırmaya yarayan bir optimizasyondur.
- Streaming sayesinde cevaplar ekrana parça parça gelir.
- Ollama gizlilik ve kontrol sağlar ama donanım sorumluluğu getirir.
- n8n otomasyon tarafında, Ollama model çalıştırma tarafında güçlüdür.
- OpenAI API daha güçlü modeller sunabilir ama bulut ve maliyet tarafı vardır.

## Demo Çalışmazsa

Demo çalışmazsa yine de mantığı kod üzerinden anlatabilirim. Streamlit kullanıcıdan mesaj alıyor, Ollama SDK bu mesajı yerel modele gönderiyor ve cevap ekrana basılıyor.

İnternet yoksa ve model önceden indirilmişse demo çalışabilir. Model indirilmemişse modeli indiremeyiz, o zaman kod ve slayt üzerinden anlatırım.

Ollama çalışıyor mu diye kontrol etmek için:

```bash
ollama list
```

Model yoksa küçük model indirmek için:

```bash
ollama pull gemma3:1b
```

Streamlit açılmazsa:

```bash
python3 -m pip install -r requirements.txt
python3 -m streamlit run app.py
```

Cevap çok yavaş gelirse daha küçük model seçerim, promptu kısa tutarım ve cevap süresinin donanıma bağlı olduğunu söylerim.

## Sunuma Girmeden Önce Kontrol Edeceklerim

- Ollama kurulu mu?
- En az bir model indirilmiş mi?
- `ollama list` komutu model gösteriyor mu?
- `python3 -m streamlit run app.py` çalışıyor mu?
- Sunum dosyası açılıyor mu?
- Demo promptları hazır mı?
- İnternet olmasa bile kod üzerinden anlatabilir miyim?

## Kaynaklar

- Ollama dokümantasyonu: https://docs.ollama.com/
- Ollama GitHub deposu: https://github.com/ollama/ollama
- Ollama API dokümantasyonu: https://docs.ollama.com/api
- n8n AI dokümantasyonu: https://docs.n8n.io/advanced-ai/
