/*
 *
 *
 *       FILL IN EACH FUNCTIONAL TEST BELOW COMPLETELY
 *       -----[Keep the tests in the same order!]----
 *       (if additional are added, keep them at the very end!)
 */

const chai = require("chai");
const assert = chai.assert;

let translator;

suite("Functional Tests", () => {
  suiteSetup(() => {
    // DOM already mocked -- load translator then run tests
    translator = require("../public/translator.js");
  });

  suite("Function ____()", () => {
    /* 
      The translated sentence is appended to the `translated-sentence` `div`
      and the translated words or terms are wrapped in 
      `<span class="highlight">...</span>` tags when the "Translate" button is pressed.
    */
    test("Translation appended to the `translated-sentence` `div`", done => {
      let input =
        "Please tell Mr. Jones that his appointment has been moved to 2:00 PM at his condo.";
      let output =
        'Please tell <span class="highlight">Mr</span> Jones that his appointment has been moved to <span class="highlight">2.00</span> PM at his <span class="highlight">flat</span>.';
      document.getElementById("locale-select").value = "american-to-british";
      translator.handleClick(input);
      let result = document.getElementById("translated-sentence").innerHTML;

      assert.equal(output, result);
      done();
    });

    /* 
      If there are no words or terms that need to be translated,
      the message 'Everything looks good to me!' is appended to the
      `translated-sentence` `div` when the "Translate" button is pressed.
    */
    test("'Everything looks good to me!' message appended to the `translated-sentence` `div`", done => {
      let input = "Hello";
      translator.handleClick(input);
      let result = document.getElementById("translated-sentence").innerText;
      console.log(result, "Everything looks good to me!");
      assert.equal(result, "Everything looks good to me!");

      done();
    });

    /* 
      If the text area is empty when the "Translation" button is
      pressed, append the message 'Error: No text to translate.' to 
      the `error-msg` `div`.
    */
    test("'Error: No text to translate.' message appended to the `translated-sentence` `div`", done => {
      let input = "";
      translator.handleClick(input);
      let result = document.getElementById("error-msg").innerText;
      console.log(result, "Error: No text to translate.");
      assert.equal(result, "Error: No text to translate.");

      done();
    });
  });

  suite("Function ____()", () => {
    /* 
      The text area and both the `translated-sentence` and `error-msg`
      `divs` are cleared when the "Clear" button is pressed.
    */
    test("Text area, `translated-sentence`, and `error-msg` are cleared", done => {
      translator.clear();
      let textArea = document.getElementById("text-input").value;
      let resultSentence = document.getElementById("translated-sentence")
        .innerText;
      let errMessage = document.getElementById("error-msg").innerText;
      

      assert.equal(textArea, "");
      assert.equal(resultSentence, "");
      assert.equal(errMessage, "");

      done();
    });
  });
});
