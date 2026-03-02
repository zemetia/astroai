export const WELCOME_CONTENT = {
  headline: "Bukan Ramalan. Ini tentang Purpose.",
  
  subheadline: `AstroAI menggunakan Natal Chart lengkap — bukan zodiak bulanan. 
Dengan data tanggal, waktu, lokasi, ditambah konteks sosial & budayamu.`,

  comparison: [
    {
      label: "Zodiak Biasa",
      icon: "📅",
      points: [
        "Hanya butuh bulan lahir",
        "12 tipe untuk 8 miliar orang", 
        "Fokus: Ramalan besok",
        "Akurasi: ~20-30%"
      ]
    },
    {
      label: "AstroAI",
      icon: "🌟",
      points: [
        "Tanggal + Waktu + Lokasi",
        "Unik untuk setiap individu",
        "Fokus: Purpose & Pattern",
        "Akurasi: ~70-95%"
      ],
      highlight: true
    }
  ],

  analogy: {
    title: "Kamu adalah Gitar 🎸",
    traditional: `Ramalan: "Gitar ini akan patah bulan depan." 
(Tebakan tanpa data)`,
    astroai: `AstroAI: "Gitar ini diciptakan untuk dimainkan orang lain. 
Suara bass-nya kuat, cocok jazz, kurang pas metal."
(Memahami purpose, bukan menebak waktu patah)`
  },

  whyAccurate: {
    title: "Kenapa Lebih Akurat?",
    description: "Seperti data analyst, kami pakai data kompleks untuk insight yang valid:",
    layers: [
      { icon: "🪐", label: "Natal Chart", desc: "Posisi planet saat lahir" },
      { icon: "🌍", label: "Geodetic", desc: "Lokasi & relocation" },
      { icon: "🏛️", label: "Mundane", desc: "Konteks budaya & sosial" },
      { icon: "👤", label: "Personal Context", desc: "Suku, agama, keluarga" }
    ]
  },

  creator: {
    title: "Dibuat oleh Polymath",
    description: "Bukan dukun digital, tapi peneliti yang mendalami:",
    fields: ["Matematika & Fisika", "Psikologi", "Computer Science", "Musik & Desain", "Filsafat", "Antropologi"]
  },

  useCases: [
    { emoji: "🪞", title: "Mengenal Diri", desc: "Mengapa saya merasa berbeda?" },
    { emoji: "❤️", title: "Hubungan", desc: "Cara komunikasi saya vs partner" },
    { emoji: "💼", title: "Bisnis/Karir", desc: "Leadership style & kekuatan" },
    { emoji: "🌏", title: "Relocation", desc: "Jakarta vs Bali mana cocok?" },
    { emoji: "🎉", title: "Have Fun", desc: "Baca buat seru-seruan aja 🤷" }
  ],

  disclaimer: {
    title: "⚠️ Catatan Penting",
    text: `Astrologi bukan ilmu pasti. Ini adalah framework interpretasi — cara melihat pola dan makna.

Kalau percaya → gunakan sebagai cermin refleksi
Kalau ragu → baca sebagai perspektif alternatif  
Kalau tidak percaya → **have fun aje!** 🎉

Chart menunjukkan kecenderungan, bukan takdir.`
  },

  cta: {
    primary: "Buat Chart Pertamamu",
    secondary: "Pelajari Lebih Lanjut"
  },

  quote: {
    text: "The stars incline, they do not compel.",
    translation: "Bintang-bintang membimbing, tidak memaksa."
  },

  blueprint: {
    title: "🗺️ Chart = Blueprint, Bukan Takdir",
    description: "Natal Chart adalah peta potensi — bukan penjara.",
    points: [
      {
        icon: "✋",
        title: "Kamu Bisa Menolak",
        desc: "Blueprint menunjukkan kecenderungan, tapi kamu punya free will untuk memilih arah lain."
      },
      {
        icon: "⚡",
        title: "Kamu Bisa Mempercepat",
        desc: "Melihat pattern berarti kamu bisa work smarter, bukan cuma harder."
      },
      {
        icon: "🛤️",
        title: "Kamu Bisa Mengikuti",
        desc: "Flow dengan energi alamimu — bukan melawan, tapi juga bukan pasrah."
      }
    ],
    closing: "Setiap decision membawa dampak. Chart membantu kamu membuat decision yang lebih aware."
  }
};

export const SHORT_PITCH = `
🌟 **AstroAI: Bukan Ramalan, Ini tentang Purpose**

Bedanya dengan zodiak biasa?
• Zodiak: hanya bulan lahir, 12 tipe untuk 8 miliar orang, fokus ramalan
• AstroAI: tanggal+waktu+lokasi+latar belakang, unik untukmu, fokus purpose

Akurasi: 70-95% (data-driven) vs 20-40% (horoskop biasa)

Analognya: Kamu adalah gitar.
• Ramalan: "Gitar ini patah bulan depan" (tebakan)
• AstroAI: "Gitar ini untuk jazz, bass-nya kuat" (memahami purpose)

Chart = Blueprint, bukan takdir.
• ✋ Bisa menolak kecenderungan
• ⚡ Bisa mempercepat dengan aware
• 🛤️ Bisa mengikuti flow dengan lebih baik

Dibuat oleh polymath (math, fisika, CS, psikologi, musik, filsafat) — bukan dukun digital.

Gunakan untuk: mengenal diri, hubungan, bisnis, relocation, atau **have fun aje!** 🎉

"The stars incline, they do not compel." ⭐
`;
