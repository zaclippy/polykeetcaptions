// Basic Devanagari to Latin transliteration
const vowels = {
  'अ': 'a', 'आ': 'aa', 'इ': 'i', 'ई': 'ee', 'उ': 'u', 'ऊ': 'oo',
  'ए': 'e', 'ऐ': 'ai', 'ओ': 'o', 'औ': 'au', 'ऋ': 'ri'
};
const consonants = {
  'क': 'k', 'ख': 'kh', 'ग': 'g', 'घ': 'gh', 'ङ': 'n',
  'च': 'ch', 'छ': 'chh', 'ज': 'j', 'झ': 'jh', 'ञ': 'ny',
  'ट': 't', 'ठ': 'th', 'ड': 'd', 'ढ': 'dh', 'ण': 'n',
  'त': 't', 'थ': 'th', 'द': 'd', 'ध': 'dh', 'न': 'n',
  'प': 'p', 'फ': 'ph', 'ब': 'b', 'भ': 'bh', 'म': 'm',
  'य': 'y', 'र': 'r', 'ल': 'l', 'व': 'v',
  'श': 'sh', 'ष': 'sh', 'स': 's', 'ह': 'h',
  'ड़': 'r', 'ढ़': 'rh', 'ग़': 'g', 'ज़': 'z', 'फ़': 'f'
};
const diacritics = {
  'ा': 'aa', 'ि': 'i', 'ी': 'ee', 'ु': 'u', 'ू': 'oo',
  'े': 'e', 'ै': 'ai', 'ो': 'o', 'ौ': 'au', 'ृ': 'ri'
};

function toHinglish(text) {
  let result = '';
  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    if (vowels[ch]) {
      result += vowels[ch];
      continue;
    }
    if (consonants[ch]) {
      let translit = consonants[ch];
      const next = text[i + 1];
      if (diacritics[next]) {
        translit += diacritics[next];
        i++;
      } else if (next === '्') {
        i++;
      } else {
        translit += 'a';
      }
      result += translit;
      continue;
    }
    if (ch === 'ं' || ch === 'ँ') {
      result += 'n';
      continue;
    }
    if (ch === '्') {
      continue;
    }
    result += ch;
  }
  return result;
}

if (typeof module !== 'undefined') {
  module.exports = {toHinglish};
}
