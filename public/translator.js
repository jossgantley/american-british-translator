import { americanOnly } from "./american-only.js";
import { britishOnly } from "./british-only.js";
import { americanToBritishSpelling } from "./american-to-british-spelling.js";
import { americanToBritishTitles } from "./american-to-british-titles.js";
const localeSelect = document.getElementById("locale-select");
const textInput = document.getElementById("text-input");
const errorMessage = document.getElementById("error-msg");
const translatedSentence = document.getElementById("translated-sentence");
const translateBtn = document.getElementById("translate-btn");
const clearBtn = document.getElementById("clear-btn");

var Translator = function() {
  this.input = textInput;
  this.amercanOnly = americanOnly;
  this.britishOnly = britishOnly;
  this.americanToBritishSpelling = americanToBritishSpelling;
  this.americanToBritishTitles = americanToBritishTitles;
};

Translator.prototype.getKey = function(object, value) {
  return Object.keys(object).find(key => object[key] === value);
};

Translator.prototype.amerToBrit = function(input) {
  let newStr = input;
  let switchBritishArr = Object.entries(britishOnly).map(item => {
    return [item[1], item[0]];
  });
  let americanArr = Object.entries(americanOnly);
  let americanToBritishSpellingArr = Object.entries(americanToBritishSpelling);
  let americanToBritishTitlesArr = Object.entries(americanToBritishTitles);
  let masterArr = [];
  masterArr.push(americanArr, americanToBritishSpellingArr);
  let joinArr = masterArr.toString().split(",");
  let finalArr = [];

  for (let i = 0; i < joinArr.length; i += 2) {
    finalArr.push([joinArr[i], joinArr[i + 1]]);
  }
  finalArr = finalArr.sort((a, b) => {
    return b[0].length - a[0].length;
  });
  americanToBritishTitlesArr.forEach(item => {
    let titlesRegex = new RegExp(`${item[1]}\\.`, "gi");
    if (titlesRegex.test(newStr)) {
      newStr = newStr.replace(
        titlesRegex,
        `<span class="highlight">${item[1]
          .charAt(0)
          .toUpperCase()
          .concat(item[1].slice(1, item[1].length))}</span>`
      );
    }
  });

  finalArr.forEach(item => {
    let regex = new RegExp(item[0], "gi");
    let spaceRegex = new RegExp(item[1] + "\\w", "gi");
    let amerTimeRegex = /\d*:\d\d/g;

    if (amerTimeRegex.test(newStr)) {
      let matchArr = newStr.match(amerTimeRegex);

      let replaceArr = matchArr.map(item => {
        return item.replace(":", ".");
      });
      console.log(matchArr, replaceArr);
      matchArr.forEach(item => {
        newStr = newStr.replace(
          item,
          `<span class="highlight">${replaceArr[matchArr.indexOf(item)]}</span>`
        );
      });
      newStr.replace(matchArr, replaceArr);
    }
    if (regex.test(newStr) && !spaceRegex.test(newStr)) {
      newStr = newStr.replace(
        regex,
        `<span class="highlight">${item[1]}</span>`
      );
    }
  });
  console.log(newStr);
  return newStr;
};

Translator.prototype.britToAmer = function(input) {
  let newStr = input;
  let switchBritishArr = Object.entries(britishOnly).map(item => {
    return [item[1], item[0]];
  });
  let americanArr = Object.entries(americanOnly);
  let americanToBritishSpellingArr = Object.entries(americanToBritishSpelling);
  let americanToBritishTitlesArr = Object.entries(americanToBritishTitles);
  let masterArr = [];
  masterArr.push(switchBritishArr, americanToBritishSpellingArr);
  let joinArr = masterArr.toString().split(",");
  let finalArr = [];

  for (let i = 0; i < joinArr.length; i += 2) {
    finalArr.push([joinArr[i], joinArr[i + 1]]);
  }
  finalArr = finalArr.sort((a, b) => {
    return b[1].length - a[1].length;
  });
  americanToBritishTitlesArr.sort((a, b) => {
    return b[0].length - a[0].length;
  });
  americanToBritishTitlesArr.forEach(item => {
    let titlesRegex = new RegExp(item[1], "gi");
    let spaceRegex = new RegExp(item[1] + "\\w", "gi");
    if (titlesRegex.test(newStr) && !spaceRegex.test(newStr)) {
      newStr = newStr.replace(
        titlesRegex,
        `<span class="highlight">${item[0]
          .charAt(0)
          .toUpperCase()
          .concat(item[0].slice(1, item[0].length))}</span>`
      );
    }
  });

  finalArr.forEach(item => {
    let regex = new RegExp(item[1], "gi");
    let spaceRegex = new RegExp(item[1] + "\\w", "gi");

    let britTimeRegex = /\d*\.\d\d/g;
    if (britTimeRegex.test(newStr)) {
      let matchArr = newStr.match(britTimeRegex);
      console.log(matchArr);
      let replaceArr = matchArr.map(item => {
        return item.replace(".", ":");
      });
      console.log(replaceArr);
      console.log(matchArr, replaceArr);
      matchArr.forEach(item => {
        newStr = newStr.replace(
          item,
          `<span class="highlight">${replaceArr[matchArr.indexOf(item)]}</span>`
        );
      });
      newStr.replace(matchArr, replaceArr);
    }
    if (regex.test(newStr) && !spaceRegex.test(newStr)) {
      console.log(spaceRegex.test(newStr));
      newStr = newStr.replace(
        regex,
        `<span class="highlight">${item[0]}</span>`
      );
    }
  });
  console.log(newStr);
  return newStr;
};
Translator.prototype.handleClick = input => {
  if (!input) {
    errorMessage.innerText = "Error: No text to translate.";
    translatedSentence.innerText = "";
  } else if (
    localeSelect.value == "american-to-british" &&
    input == Translator.prototype.amerToBrit(input)
  ) {
    translatedSentence.innerText = "Everything looks good to me!";
    errorMessage.innerText = "";
  } else if (
    localeSelect.value === "british-to-american" &&
    input == Translator.prototype.britToAmer(input)
  ) {
    translatedSentence.innerText = "Everything looks good to me!";
    errorMessage.innerText = "";
  } else {
    translatedSentence.innerHTML =
      localeSelect.value === "american-to-british"
        ? Translator.prototype.amerToBrit(input)
        : Translator.prototype.britToAmer(input);
    errorMessage.innerText = "";
  }
};
Translator.prototype.clear = () => {
  translatedSentence.innerText = "";
  textInput.value = "";
  errorMessage.innerText = "";
};

translateBtn.addEventListener("click", () => {
  Translator.prototype.handleClick(textInput.value);
});

clearBtn.addEventListener("click", () => {
  Translator.prototype.clear();
});

let translator = new Translator();

/* 
  Export your functions for testing in Node.
  Note: The `try` block is to prevent errors on
  the client side
*/
try {
  module.exports = translator;
} catch (e) {}
