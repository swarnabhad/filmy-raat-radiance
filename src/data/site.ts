export const siteConfig = {
  name: "FILMI RAAT",
  nameHi: "फ़िल्मी रात",
  station: "RETRO BOLLYWOOD RADIO",
  taglineHi: "पुरानी रातें। पुराने नग़मे। वही जादू।",
  taglineEn: "Press play. Close your eyes. Go back in time.",
  about: [
    "Filmi Raat is a digital radio experience built around the golden feeling of Bollywood nostalgia.",
    "Put on your headphones, turn down the lights and let the songs take you somewhere familiar.",
  ],
  dedication: {
    title: "THIS ONE'S FOR...",
    body: "For everyone who grew up with songs playing from the radio, cassette player, TV, CD player, or a late-night cable channel.",
    closing: "For the songs that became memories.",
  },
  support: {
    heading: "KEEP FILMI RAAT ALIVE",
    modalTitle: "Keep the Radio Playing",
    body: "Filmi Raat is made for nostalgia, late nights and good music. If you enjoy the experience, you can support the project.",
    upiId: "support@filmiraat.example",
  },
  social: [
    { label: "Instagram", href: "#" },
    { label: "YouTube", href: "#" },
    { label: "Contact", href: "#" },
    { label: "Privacy", href: "#" },
    { label: "Terms", href: "#" },
  ],
} as const;

export const quotes = [
  "कुछ गाने सुने नहीं जाते... महसूस किए जाते हैं।",
  "हर रात की अपनी एक फिल्म होती है।",
  "कुछ धुनें वक्त को वापस ले आती हैं।",
  "कहानी पुरानी है। एहसास नया है।",
  "Lights down. Volume up.",
] as const;

export const reelMessages = [
  "Gaana badlega, yaadein nahi.",
  "Arre, volume thoda badhao!",
  "Yeh raat... aur yeh gaane.",
  "Interval ke baad milte hain.",
  "Picture abhi baaki hai.",
] as const;

export const goldenEra = [
  { title: "Raat Aur Radio", year: "1971", note: "A night that never signed off." },
  { title: "Chandni Express", year: "1978", note: "Moonlight on a moving train." },
  { title: "Dil Ki Film", year: "1983", note: "Every heart runs its own reel." },
  { title: "Safar", year: "1986", note: "Long roads, longer songs." },
  { title: "Mehfil", year: "1991", note: "One room, a hundred memories." },
  { title: "Ek Aur Shaam", year: "1994", note: "The evening that stayed." },
] as const;

export const faqs = [
  {
    q: "What is Filmi Raat?",
    a: "A late-night retro Bollywood radio experience: one curated reel of timeless Hindi songs wrapped in a vintage cinema interface.",
  },
  {
    q: "Is Filmi Raat free?",
    a: "Yes. It is free to listen. Support is optional and helps keep the project running.",
  },
  {
    q: "Where does the music come from?",
    a: "All music is played through YouTube's official embedded player from a public YouTube Music playlist. Filmi Raat does not host, download or own any music.",
  },
  {
    q: "Can I listen on my phone?",
    a: "Yes. The player is built for mobile, with a sticky mini-player so the music stays with you as you scroll.",
  },
  {
    q: "Can I suggest songs?",
    a: "Song requests are coming soon. For now, the playlist is curated and updates automatically whenever new songs are added to it.",
  },
  {
    q: "How can I support Filmi Raat?",
    a: "Use the Keep Filmi Raat Alive section to contribute, or simply share the station with someone who loves old Hindi songs.",
  },
] as const;
