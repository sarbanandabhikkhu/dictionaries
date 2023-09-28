import fetchData from "../utils/fetchData.js";

const dictionaries = {
  config: null,
  dicts: [
    "ati_ped",
    "ati_cped",
    "ati_dppn",
    "tummo_ped",
    "pli2en_pts",
    "pli2en_dppn_place",
    "pli2en_dppn_person",
  ],

  search: (word, cb) => {
    dictionaries.dicts.map((dic) => {
      fetchData(`./data/json/${dic}.json`, (data) => {
        data.map(({ w, m }) => {
          if (word.toLowerCase() === w) cb({ d: dic, m });
        });
      });
    });
  },
  prompt: () => {
    const sw = prompt("Type your search word:");
    if (sw !== null && sw !== "") {
      dictionaries.search(sw, ({ d, m }) => alert(`${sw}\n${d} => ${m}`));
    }
  },
  click: () => {
    const regexp = /[a-zA-Z0-9āīūñṅṇṭḍṃḷঅ-ৰ]/;
    const punctuation = /[\,\;\.\!\?\’\”\{\}\[\]]/g;
    let selection = window.getSelection(),
      text = selection.anchorNode.data,
      index = selection.anchorOffset,
      symbol = "a",
      word = "";
    while (regexp.test(symbol) && symbol !== undefined) symbol = text[index--];
    index += 2;
    symbol = "a";
    while (regexp.test(symbol) && index < text.length) {
      symbol = text[index++];
      word += symbol;
    }
    word = word.replace(punctuation, ``).trim();

    const res = [];

    dictionaries.search(word, ({ d, m }) => alert(`${word}\n${d} => ${m}`));
  },
  clickable: (e) => {
    const t = e.target,
      tt = t.parentNode,
      ttt = tt.parentNode,
      tttt = ttt.parentNode,
      b = dictionaries.config.boundary;
    return b === t || b === tt || b === ttt || b === tttt;
  },
  listener: () => {
    document.addEventListener("click", (e) => {
      if (dictionaries.clickable(e)) dictionaries.click();
      if (e.target === dictionaries.config.dict_prompt) dictionaries.prompt();
    });
  },
  init: () => {
    dictionaries.config = {
      boundary: document.querySelector("div[clickable]"),
      dict_input: document.querySelector("input[input]"),
      dict_search: document.querySelector("button[search]"),
      dict_prompt: document.querySelector("button[prompt]"),
    };
    dictionaries.listener();
  },
};

export default dictionaries;
