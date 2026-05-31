import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const pptxgen = require("pptxgenjs");

const pptx = new pptxgen();
pptx.layout = "LAYOUT_WIDE";
pptx.author = "Codex";
pptx.subject = "Ollama yapay zeka tool sunumu";
pptx.title = "Ollama: Yerel Yapay Zeka Modelleri";
pptx.company = "MEU";
pptx.lang = "tr-TR";
pptx.theme = {
  headFontFace: "Aptos Display",
  bodyFontFace: "Aptos",
  lang: "tr-TR",
};
pptx.defineLayout({ name: "WIDE", width: 13.333, height: 7.5 });

const C = {
  ink: "1B2430",
  muted: "5B677A",
  paper: "F7F9FC",
  white: "FFFFFF",
  teal: "00A896",
  blue: "2563EB",
  yellow: "F4B942",
  red: "D64550",
  line: "D9E1EC",
  dark: "111827",
  softTeal: "DFF7F2",
  softBlue: "E7EFFF",
  softYellow: "FFF3CC",
};

function footer(slide, n) {
  slide.addText("Ollama yapay zeka tool sunumu", {
    x: 0.55, y: 7.08, w: 4.8, h: 0.18,
    fontFace: "Aptos", fontSize: 7.5, color: "7A8699",
  });
  slide.addText(String(n).padStart(2, "0"), {
    x: 12.25, y: 7.04, w: 0.5, h: 0.22,
    fontFace: "Aptos", fontSize: 8.5, bold: true, color: "7A8699",
    align: "right",
  });
}

function title(slide, text, kicker) {
  if (kicker) {
    slide.addText(kicker.toUpperCase(), {
      x: 0.7, y: 0.42, w: 4.8, h: 0.22,
      fontSize: 8.5, bold: true, color: C.teal, charSpace: 1.2,
    });
  }
  slide.addText(text, {
    x: 0.68, y: 0.72, w: 10.7, h: 0.52,
    fontFace: "Aptos Display", fontSize: 25, bold: true, color: C.ink,
    fit: "shrink",
  });
}

function pill(slide, text, x, y, w, color, fill) {
  slide.addShape(pptx.ShapeType.roundRect, {
    x, y, w, h: 0.36,
    rectRadius: 0.06,
    fill: { color: fill },
    line: { color: fill },
  });
  slide.addText(text, {
    x: x + 0.12, y: y + 0.075, w: w - 0.24, h: 0.16,
    fontSize: 8.5, bold: true, color,
    align: "center",
    fit: "shrink",
  });
}

function box(slide, x, y, w, h, heading, body, fill = C.white, accent = C.teal) {
  slide.addShape(pptx.ShapeType.roundRect, {
    x, y, w, h,
    rectRadius: 0.06,
    fill: { color: fill },
    line: { color: C.line, width: 1 },
  });
  slide.addShape(pptx.ShapeType.rect, {
    x, y, w: 0.08, h,
    fill: { color: accent },
    line: { color: accent },
  });
  slide.addText(heading, {
    x: x + 0.25, y: y + 0.22, w: w - 0.45, h: 0.28,
    fontSize: 13, bold: true, color: C.ink,
    fit: "shrink",
  });
  slide.addText(body, {
    x: x + 0.25, y: y + 0.68, w: w - 0.42, h: h - 0.86,
    fontSize: 10.2, color: C.muted, breakLine: false,
    fit: "shrink",
    valign: "top",
  });
}

function bullets(slide, items, x, y, w, h, color = C.ink) {
  slide.addText(items.map(t => ({ text: t, options: { bullet: { indent: 12 }, hanging: 4 } })), {
    x, y, w, h,
    fontSize: 12.3,
    color,
    breakLine: false,
    fit: "shrink",
    paraSpaceAfterPt: 9,
  });
}

function addNotes(slide, notes) {
  if (typeof slide.addNotes === "function") slide.addNotes(notes);
}

// 1
{
  const s = pptx.addSlide();
  s.background = { color: C.paper };
  s.addShape(pptx.ShapeType.rect, { x: 0, y: 0, w: 13.333, h: 7.5, fill: { color: C.paper }, line: { color: C.paper } });
  s.addShape(pptx.ShapeType.rect, { x: 0, y: 0, w: 13.333, h: 1.05, fill: { color: C.dark }, line: { color: C.dark } });
  s.addText("AI TOOL SUNUMU", { x: 0.72, y: 0.38, w: 2.5, h: 0.18, fontSize: 8.5, bold: true, color: C.yellow, charSpace: 1.2 });
  s.addText("Ollama", { x: 0.72, y: 1.58, w: 7.8, h: 0.8, fontFace: "Aptos Display", fontSize: 48, bold: true, color: C.ink });
  s.addText("Yerel bilgisayarda açık yapay zeka modelleri çalıştırma aracı", { x: 0.78, y: 2.5, w: 7.4, h: 0.6, fontSize: 19, color: C.muted, fit: "shrink" });
  box(s, 0.78, 4.1, 3.75, 1.28, "Ana fikir", "Bulut API yerine modeli bilgisayara indirip yerel API ile uygulamaya bağlamak.", C.white, C.teal);
  box(s, 4.85, 4.1, 3.75, 1.28, "Demo", "Streamlit arayüzü + Ollama Python SDK ile yerel chatbot.", C.white, C.blue);
  box(s, 8.92, 4.1, 3.45, 1.28, "Süre", "20 dakikalık anlatım için teknik + uygulama akışı.", C.white, C.yellow);
  s.addShape(pptx.ShapeType.arc, { x: 9.25, y: 1.42, w: 2.9, h: 2.9, adjustPoint: 0.35, line: { color: C.teal, width: 9, transparency: 12 } });
  s.addShape(pptx.ShapeType.arc, { x: 9.65, y: 1.82, w: 2.1, h: 2.1, adjustPoint: 0.22, line: { color: C.blue, width: 8, transparency: 10 } });
  s.addText("local\nLLM", { x: 9.95, y: 2.25, w: 1.5, h: 0.62, fontSize: 22, bold: true, color: C.ink, align: "center", fit: "shrink" });
  footer(s, 1);
  addNotes(s, "Açılışta Ollama'nın bir model değil, modelleri yerel çalıştırmayı kolaylaştıran bir araç olduğunu söyle.");
}

// 2
{
  const s = pptx.addSlide();
  s.background = { color: C.white };
  title(s, "Neden Ollama seçildi?", "Konu tercihi");
  bullets(s, [
    "Hugging Face sınıfta daha önce işlendiği için konu dışı bırakıldı.",
    "n8n güçlüdür ama ana odağı model çalıştırmak değil, iş akışı otomasyonudur.",
    "Ollama; model indirme, yerel çalıştırma, API ile bağlama ve demo gösterme açısından daha net bir AI tool konusudur.",
  ], 0.9, 1.55, 6.1, 2.4);
  box(s, 7.45, 1.45, 4.7, 1.1, "Sunum cümlesi", "Ollama, yapay zeka modelini kullanıcı bilgisayarında çalıştırıp uygulamalara bağlamayı kolaylaştırır.", C.softTeal, C.teal);
  box(s, 7.45, 2.9, 4.7, 1.1, "Teknik derinlik", "CLI, REST API, Python SDK, model dosyaları, donanım ve quantization anlatılabilir.", C.softBlue, C.blue);
  box(s, 7.45, 4.35, 4.7, 1.1, "Demo kolaylığı", "Elimizdeki Streamlit uygulaması doğrudan Ollama'yı çağırıyor.", C.softYellow, C.yellow);
  footer(s, 2);
  addNotes(s, "Hocanın istediği avantaj, dezavantaj, teknik taraf ve rakip farkı başlıklarının hepsi Ollama ile rahat anlatılabiliyor.");
}

// 3
{
  const s = pptx.addSlide();
  s.background = { color: C.paper };
  title(s, "Ollama nedir?", "Tanım");
  s.addText("Büyük dil modellerini bilgisayara indirip terminal, API veya uygulama üzerinden çalıştırmayı sağlayan açık kaynaklı bir yerel LLM aracıdır.", {
    x: 0.8, y: 1.45, w: 11.6, h: 0.72, fontSize: 20, color: C.ink, bold: true, fit: "shrink",
  });
  const cards = [
    ["Model yönetimi", "Model indirme, listeleme, çalıştırma ve silme komutları."],
    ["Yerel inference", "Cevap üretimi kullanıcının bilgisayarında gerçekleşir."],
    ["API katmanı", "REST API ve resmi Python/JS kütüphaneleriyle uygulamaya bağlanır."],
  ];
  cards.forEach((c, i) => box(s, 0.85 + i * 4.05, 3.05, 3.55, 1.52, c[0], c[1], C.white, [C.teal, C.blue, C.yellow][i]));
  s.addText("Örnek modeller: Gemma 3, Qwen3, DeepSeek-R1, gpt-oss ve diğer açık modeller", {
    x: 0.9, y: 5.42, w: 10.8, h: 0.3, fontSize: 12.5, color: C.muted,
  });
  footer(s, 3);
  addNotes(s, "Model ile tool ayrımını özellikle vurgula: Ollama model değildir; modelleri çalıştıran araçtır.");
}

// 4
{
  const s = pptx.addSlide();
  s.background = { color: C.white };
  title(s, "Çalışma mantığı", "Mimari");
  const y = 2.0;
  const steps = [
    ["Kullanıcı", "Prompt yazar"],
    ["Streamlit", "Arayüz"],
    ["Python SDK", "ollama.chat()"],
    ["Ollama API", "localhost:11434"],
    ["Yerel model", "Cevap üretir"],
  ];
  steps.forEach((st, i) => {
    const x = 0.55 + i * 2.52;
    s.addShape(pptx.ShapeType.roundRect, {
      x, y, w: 2.05, h: 1.12,
      rectRadius: 0.05,
      fill: { color: i === 4 ? C.softTeal : C.paper },
      line: { color: i === 4 ? C.teal : C.line, width: 1 },
    });
    s.addText(st[0], { x: x + 0.15, y: y + 0.22, w: 1.75, h: 0.2, fontSize: 12.4, bold: true, color: C.ink, align: "center", fit: "shrink" });
    s.addText(st[1], { x: x + 0.15, y: y + 0.58, w: 1.75, h: 0.18, fontSize: 8.8, color: C.muted, align: "center", fit: "shrink" });
    if (i < steps.length - 1) {
      s.addShape(pptx.ShapeType.rightArrow, { x: x + 2.08, y: y + 0.38, w: 0.35, h: 0.32, fill: { color: C.blue }, line: { color: C.blue } });
    }
  });
  box(s, 0.85, 4.36, 3.7, 1.15, "CLI", "`ollama run gemma3` ile terminalden doğrudan sohbet.", C.white, C.teal);
  box(s, 4.85, 4.36, 3.7, 1.15, "REST API", "`POST /api/chat` ile farklı dillerden çağrı.", C.white, C.blue);
  box(s, 8.85, 4.36, 3.7, 1.15, "SDK", "Python/JavaScript kütüphaneleriyle hızlı entegrasyon.", C.white, C.yellow);
  footer(s, 4);
  addNotes(s, "Bu slaytta eldeki app.py dosyasındaki akışı anlat: Streamlit sadece arayüz, cevap Ollama'dan geliyor.");
}

// 5
{
  const s = pptx.addSlide();
  s.background = { color: C.paper };
  title(s, "Teknik tarafında neler var?", "Detay");
  box(s, 0.75, 1.45, 3.7, 1.35, "Model formatı", "Ollama açık ağırlıklı modelleri indirir ve kendi çalışma ortamında yönetir.", C.white, C.teal);
  box(s, 4.82, 1.45, 3.7, 1.35, "Quantization", "Modelin daha az bellek kullanması için ağırlık hassasiyeti düşürülebilir.", C.white, C.yellow);
  box(s, 8.88, 1.45, 3.7, 1.35, "Context length", "Modelin tek seferde dikkate alabildiği metin miktarı model ve ayara bağlıdır.", C.white, C.blue);
  box(s, 0.75, 3.45, 3.7, 1.35, "Donanım", "RAM/VRAM arttıkça daha büyük model ve daha hızlı cevap mümkün olur.", C.white, C.blue);
  box(s, 4.82, 3.45, 3.7, 1.35, "Streaming", "Cevap parça parça gelir; kullanıcı beklerken metin akmaya başlar.", C.white, C.teal);
  box(s, 8.88, 3.45, 3.7, 1.35, "Tool calling", "Bazı modeller ve entegrasyonlarda araç çağırma akışları kurulabilir.", C.white, C.red);
  footer(s, 5);
  addNotes(s, "Teknik bölümde çok derine gömülmeden terimleri açıklamak yeterli: quantization kalite-hız/bellek dengesi, context length hafıza penceresi.");
}

// 6
{
  const s = pptx.addSlide();
  s.background = { color: C.white };
  title(s, "Avantajlar", "Artılar");
  const items = [
    ["Gizlilik", "Veriler bulut API'ye gönderilmeden yerelde işlenebilir."],
    ["Offline kullanım", "Model indirildikten sonra internet olmadan kullanılabilir."],
    ["Maliyet", "Deneme ve prototipte token başına API ücreti yoktur."],
    ["Esneklik", "Farklı açık modeller hızlıca denenebilir."],
    ["Geliştirici deneyimi", "CLI, Python, JS ve REST API ile uygulamaya bağlanır."],
  ];
  items.forEach((it, i) => {
    const x = i < 3 ? 0.82 + i * 4.05 : 2.85 + (i - 3) * 4.05;
    const y2 = i < 3 ? 1.55 : 3.55;
    box(s, x, y2, 3.48, 1.25, it[0], it[1], i % 2 ? C.softBlue : C.softTeal, i % 2 ? C.blue : C.teal);
  });
  footer(s, 6);
  addNotes(s, "Avantajlarda özellikle gizlilik ve offline kullanım hocanın ilgisini çeker; bunlar bulut tabanlı araçlardan net ayrışıyor.");
}

// 7
{
  const s = pptx.addSlide();
  s.background = { color: C.paper };
  title(s, "Dezavantajlar", "Eksiler");
  bullets(s, [
    "Güçlü modeller için yüksek RAM/VRAM ve iyi işlemci/GPU gerekir.",
    "Büyük model dosyaları ciddi disk alanı kaplayabilir.",
    "Buluttaki en güçlü kapalı modeller kadar yüksek kalite vermeyebilir.",
    "Model seçimi, kurulum ve performans ayarı yeni başlayanlar için zor olabilir.",
    "Güvenlik, güncelleme ve erişim kontrolü yerel kurulumda kullanıcının sorumluluğundadır.",
  ], 0.85, 1.5, 6.5, 3.8);
  s.addShape(pptx.ShapeType.roundRect, { x: 8.0, y: 1.75, w: 3.7, h: 3.25, rectRadius: 0.06, fill: { color: C.white }, line: { color: C.line } });
  s.addText("Özet risk", { x: 8.35, y: 2.1, w: 2.9, h: 0.28, fontSize: 15, bold: true, color: C.red, align: "center" });
  s.addText("Ollama ucuz ve gizli çalışır; bunun bedeli performans ve operasyon sorumluluğudur.", {
    x: 8.35, y: 2.75, w: 2.95, h: 1.05, fontSize: 18, bold: true, color: C.ink, align: "center", fit: "shrink",
  });
  footer(s, 7);
  addNotes(s, "Eksileri saklamadan söylemek sunumu daha güvenilir yapar. Özellikle laptop donanımı sınırlıysa demo için küçük model seçildiğini belirt.");
}

// 8
{
  const s = pptx.addSlide();
  s.background = { color: C.white };
  title(s, "Rakiplerden farkı", "Karşılaştırma");
  const headers = ["Araç", "Ana odak", "Ollama'ya göre fark"];
  const rows = [
    ["LM Studio", "Masaüstü arayüz", "GUI daha güçlü; Ollama API ve CLI tarafında daha yalın."],
    ["llama.cpp", "Düşük seviye inference", "Daha teknik; Ollama kullanımı basitleştirir."],
    ["Hugging Face", "Model/dataset ekosistemi", "Daha geniş platform; Ollama yerel çalıştırmaya odaklanır."],
    ["n8n", "Workflow otomasyonu", "AI agent akışları kurar; model runtime değildir."],
    ["OpenAI API", "Bulut model servisi", "Daha güçlü modeller; veri buluta gider ve maliyet oluşur."],
  ];
  const x = 0.72, y = 1.45;
  const widths = [2.0, 3.05, 6.75];
  let yy = y;
  headers.forEach((h, i) => {
    s.addShape(pptx.ShapeType.rect, { x: x + widths.slice(0, i).reduce((a, b) => a + b, 0), y: yy, w: widths[i], h: 0.42, fill: { color: C.dark }, line: { color: C.dark } });
    s.addText(h, { x: x + widths.slice(0, i).reduce((a, b) => a + b, 0) + 0.12, y: yy + 0.12, w: widths[i] - 0.18, h: 0.1, fontSize: 8.8, bold: true, color: C.white, fit: "shrink" });
  });
  yy += 0.42;
  rows.forEach((r, ri) => {
    r.forEach((cell, i) => {
      const xx = x + widths.slice(0, i).reduce((a, b) => a + b, 0);
      s.addShape(pptx.ShapeType.rect, { x: xx, y: yy, w: widths[i], h: 0.68, fill: { color: ri % 2 ? "F3F6FA" : C.white }, line: { color: C.line, width: 0.6 } });
      s.addText(cell, { x: xx + 0.12, y: yy + 0.15, w: widths[i] - 0.22, h: 0.28, fontSize: i === 0 ? 10.8 : 9.8, bold: i === 0, color: i === 0 ? C.ink : C.muted, fit: "shrink" });
    });
    yy += 0.68;
  });
  footer(s, 8);
  addNotes(s, "Bu karşılaştırmayı ezberlemeden anlat: Her aracın yeri farklı, Ollama'nın güçlü olduğu yer yerel model çalıştırmayı pratikleştirmesi.");
}

// 9
{
  const s = pptx.addSlide();
  s.background = { color: C.paper };
  title(s, "Küçük uygulama demosu", "Uygulama");
  box(s, 0.8, 1.48, 3.45, 1.2, "1. Modeli indir", "`ollama pull gemma3:1b` veya küçük bir Qwen/Gemma modeli.", C.white, C.teal);
  box(s, 4.9, 1.48, 3.45, 1.2, "2. Arayüzü aç", "`streamlit run app.py` komutu ile web arayüzünü başlat.", C.white, C.blue);
  box(s, 9.0, 1.48, 3.45, 1.2, "3. Prompt gönder", "Uygulama `ollama.chat()` ile yerel modele mesaj yollar.", C.white, C.yellow);
  s.addShape(pptx.ShapeType.roundRect, { x: 1.0, y: 3.4, w: 11.3, h: 1.8, rectRadius: 0.06, fill: { color: C.dark }, line: { color: C.dark } });
  s.addText("Demo promptları", { x: 1.32, y: 3.68, w: 2.3, h: 0.2, fontSize: 11.5, bold: true, color: C.yellow });
  s.addText("• Python'da for döngüsünü 5 yaşındaki birine anlat.\n• Bu cümleyi İngilizceye çevir: Yapay zeka araçları yerelde çalışabilir.\n• Ollama'nın 3 avantajını ve 2 dezavantajını kısa yaz.", {
    x: 1.33, y: 4.08, w: 9.8, h: 0.8, fontSize: 12.2, color: C.white, fit: "shrink",
  });
  footer(s, 9);
  addNotes(s, "Demo sırasında cevap süresini göster. Cevabın buluttan değil, yerel bilgisayardaki modelden geldiğini vurgula.");
}

// 10
{
  const s = pptx.addSlide();
  s.background = { color: C.white };
  title(s, "Uygulamaya nasıl eklenir?", "Kod akışı");
  s.addShape(pptx.ShapeType.roundRect, { x: 0.88, y: 1.35, w: 6.0, h: 4.15, rectRadius: 0.06, fill: { color: C.dark }, line: { color: C.dark } });
  s.addText("Python örneği", { x: 1.18, y: 1.68, w: 2.0, h: 0.2, fontSize: 10, bold: true, color: C.yellow });
  s.addText("import ollama\n\nresponse = ollama.chat(\n    model=\"gemma3:1b\",\n    messages=[\n        {\"role\": \"user\", \"content\": \"Merhaba!\"}\n    ],\n    stream=True,\n)\n\nfor chunk in response:\n    print(chunk[\"message\"][\"content\"], end=\"\")", {
    x: 1.17, y: 2.08, w: 5.35, h: 2.72,
    fontFace: "Courier New", fontSize: 11, color: C.white,
    fit: "shrink",
  });
  box(s, 7.35, 1.48, 4.75, 1.18, "Bağlantı", "Ollama arka planda yerel API servisi olarak çalışır.", C.softBlue, C.blue);
  box(s, 7.35, 3.02, 4.75, 1.18, "Model seçimi", "Küçük modeller demo için daha güvenli ve hızlıdır.", C.softTeal, C.teal);
  box(s, 7.35, 4.56, 4.75, 1.18, "Streaming", "Cevap parça parça geldiği için arayüz daha canlı görünür.", C.softYellow, C.yellow);
  footer(s, 10);
  addNotes(s, "Kodda karmaşık görünen tek şey streaming. Aslında her chunk, cevabın bir parçası.");
}

// 11
{
  const s = pptx.addSlide();
  s.background = { color: C.paper };
  title(s, "Nerelerde kullanılır?", "Senaryolar");
  const data = [
    ["Yerel chatbot", "Kişisel veya şirket içi asistan"],
    ["Özetleme", "PDF, not, e-posta taslakları"],
    ["Kod yardımı", "Küçük kod açıklama ve üretim işleri"],
    ["RAG", "Kendi dokümanlarınla soru-cevap"],
    ["Eğitim", "Model davranışını ve API entegrasyonunu öğrenme"],
    ["Prototip", "API maliyeti olmadan hızlı deneme"],
  ];
  data.forEach((d, i) => {
    const col = i % 3, row = Math.floor(i / 3);
    box(s, 0.82 + col * 4.05, 1.48 + row * 2.02, 3.48, 1.25, d[0], d[1], C.white, [C.teal, C.blue, C.yellow][col]);
  });
  footer(s, 11);
  addNotes(s, "Kullanım alanlarında kendi demonu bağla: bizim örnek yerel chatbot kategorisine giriyor.");
}

// 12
{
  const s = pptx.addSlide();
  s.background = { color: C.white };
  title(s, "Sonuç", "Kapanış");
  s.addText("Ollama'nın güçlü tarafı, yapay zeka modelini sadece hazır bir servis gibi kullanmak yerine yerel çalıştırmayı ve uygulamaya bağlamayı öğretmesidir.", {
    x: 0.9, y: 1.55, w: 10.8, h: 0.85, fontSize: 21, bold: true, color: C.ink, fit: "shrink",
  });
  box(s, 0.95, 3.05, 3.45, 1.3, "En büyük artı", "Gizlilik, offline kullanım ve prototipleme özgürlüğü.", C.softTeal, C.teal);
  box(s, 4.95, 3.05, 3.45, 1.3, "En büyük eksi", "Donanım ihtiyacı ve model kalitesi sınırları.", C.softYellow, C.yellow);
  box(s, 8.95, 3.05, 3.45, 1.3, "Demo mesajı", "Streamlit + Ollama ile yerel AI uygulaması kurulabilir.", C.softBlue, C.blue);
  s.addText("Kaynaklar: docs.ollama.com · github.com/ollama/ollama · docs.n8n.io/advanced-ai", {
    x: 0.95, y: 5.75, w: 10.8, h: 0.28, fontSize: 9.5, color: C.muted,
  });
  footer(s, 12);
  addNotes(s, "Kapanışta bir cümlelik özet: Ollama en iyi, gizlilik ve yerel geliştirme isteyen AI prototipleri için kullanılır.");
}

await pptx.writeFile({ fileName: "Ollama_Yerel_Yapay_Zeka_Sunumu.pptx" });
