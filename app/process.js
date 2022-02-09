let $ = require('jquery');
let SpellCheck = require("simple-spellchecker")
var config = require('../package.json');

// Context
let errors = 0;

// Load dictionary.
let dict = null;
SpellCheck.getDictionary("en-US", "node_modules/simple-spellchecker/dict", function (err, result) {
    if (!err) {
        dict = result
    } else {
        alert(err);
    }
})


// Spell Check Event Handler
let spell_check_handler = function () {
    // Ensure we've loaded a dictionary
    if (dict === null) {
        alert("No dictionary loaded, couldn't spell check content");
    }

    // Declare doms we interact with
    var i = $("#post_input");
    var il = $("#spelling_error_input_label")

    // Capture input content, clear input dom html
    let content = String(i.text())

    // Create an array of input lines
    let lines = content.split(/\r?\n/);

    // State
    let result = '';
    errors = 0;
    hadContractions = false;

    // Iterate over each line of input
    lineCount = 0;
    lines.forEach(line => {
        lineCount++;
        let words = line.split(/(\s+)/);
        // Iterate over each word from the text input
        var firstWord = true;
        words.forEach(word => {

            // Skip any whitespace - this will normalize multiple spaces to a single
            if (!/\S/.test(word)) { return }

            // Add back single whitespace character
            if (!firstWord) { result += ' '; } else { firstWord = false }

            // Skip any numbers, but do append to output
            if (/[0-9]+$/g.test(word)) { result += word; return; }

            // Replace ’ with '
            word = word.replace('’','\'');

            // Replace contractions
            if (word in contractions) {
                word = contractions[word];
                hadContractions = true;
            }

            // Preform spell check, result is bool. False == word not in dict, True == word in dict
            if (!dict.spellCheck(word.replace(/[^a-zA-Z]/g, ""))) {
                // If not in dict, wrap in underline span
                result += '<span class="error_outer_span"><span class="error_inner_span">'
                result += word;
                result += '</span></span>';
                errors++;
            } else {
                // If in dict, just output
                result += word;
            }
        });
        // Add back linebreak
        if (lineCount != lines.length) {
            result += "\n";
        }
    })
   
    // Render result back to input div
    i.html(result);

     // Recurse if there were contractions replaced to re-process the result
    if (hadContractions){
        spell_check_handler();
    }

    // If there are errors, enforce they're resolved
    if (errors) {
        i.addClass('invalid');
        il.removeClass('visually-hidden');
        return false
    } else {
        i.removeClass('invalid');
        il.addClass('visually-hidden');
        return true
    }
}

let translation_handler = async function (input, srcLang, dstLang) {
    const res = await fetch(config.LIBRE_TRANSLATE_ENDPOINT + "/translate", {
        method: "POST",
        body: JSON.stringify({
            q: input,
            source: srcLang,
            target: dstLang,
        }),
        headers: { "Content-Type": "application/json" }
    });

    return await res.json();
}

let text_process_handler = async function () {
    // Ensure spell checking has executed
    if (spell_check_handler()) {
        var result = await translation_handler($("#post_input").text(), "en", "es");
        result = await translation_handler(result.translatedText, "es", "fr");
        result = await translation_handler(result.translatedText, "fr", "en");
        $("#post_output").html(result.translatedText);
    }
}

/* Event delegation */
$("#spell_check").on('click', spell_check_handler)
$("#process").on('click', text_process_handler)

/* Event Overrides */

// Override copy behavior on the input else we get dom errors
$("#post_input").on('copy', (event) => {
    const selection = document.getSelection();
    event.originalEvent.clipboardData.setData('text/plain', selection.toString());
    event.preventDefault();
});

/* Maps */
// Contractions, taken from https://en.wikipedia.org/wiki/Wikipedia:List_of_English_contractions
var contractions = {
    'a\'ight': 'alright',
    'ain\'t': 'am not',
    'amn\'t': 'am not',
    'arencha': 'are not you',
    'aren\'t': 'are not',
    '\'bout': 'about',
    'can\'t': 'cannot',
    'cap\'n': 'captain',
    '\'cause': 'because',
    '\'cept': 'except',
    'could\'ve': 'could have',
    'couldn\'t': 'could not',
    'couldn\'t\'ve': 'could not have',
    'daren\'t': 'dare not',
    'daresn\'t': 'dare not',
    'dasn\'t': 'dare not',
    'didn\'t': 'did not',
    'doesn\'t': 'does not',
    'don\'t': 'do not',
    'd\'ye': 'do you',
    'e\'en': 'even',
    'e\'er': 'ever',
    '\'em': 'them',
    'everybody\'s': 'everybody is',
    'everyone\'s': 'everyone is',
    'fo\'c\'sle': 'forecastle',
    '\'gainst': 'against',
    'g\'day': 'good day',
    'gimme': 'give me',
    'giv\'n': 'given',
    'gi\'z': 'give us',
    'gon\'t': 'go not',
    'hadn\'t': 'had not',
    'had\'ve': 'had have',
    'hasn\'t': 'has not',
    'haven\'t': 'have not',
    'he\'d': 'he had',
    'he\'ll': 'he shall',
    'he\'s': 'he has',
    'here\'s': 'here is',
    'how\'d': 'how did',
    'how\'ll': 'how will',
    'how\'re': 'how are',
    'how\'s': 'how has',
    'I\'d': 'I had',
    'I\'d\'ve': 'I would have',
    'I\'d\'nt': 'I would not',
    'I\'d\'nt\'ve': 'I would not have',
    'I\'ll': 'I shall',
    'I\'m': 'I am',
    'Imma': 'I am about to',
    'I\'m\'o': 'I am going to',
    'innit': 'is not it',
    'Ion:': 'I do not',
    'I\'ve': 'I have',
    'isn\'t': 'is not',
    'it\'d': 'it would',
    'it\'ll': 'it shall',
    'it\'s': 'it has',
    'let\'s': 'let us',
    'ma\'am': 'madam',
    'mayn\'t': 'may not',
    'may\'ve': 'may have',
    'mightn\'t': 'might not',
    'might\'ve': 'might have',
    'mustn\'t': 'must not',
    'mustn\'t\'ve': 'must not have',
    'must\'ve': 'must have',
    '\'neath': 'beneath',
    'needn\'t': 'need not',
    'ne\'er': 'never',
    'o\'clock': 'of the clock',
    'o\'er': 'over',
    'ol\'': 'old',
    'oughtn\'t': 'ought not',
    '\'round': 'around',
    '\'s': 'is',
    'shalln\'t': 'shall not',
    'shan\'t': 'shall not',
    'she\'d': 'she had',
    'she\'ll': 'she shall',
    'she\'s': 'she has',
    'should\'ve': 'should have',
    'shouldn\'t': 'should not',
    'shouldn\'t\'ve': 'should not have',
    'somebody\'s': 'somebody has',
    'someone\'s': 'someone has',
    'something\'s': 'something has',
    'so\'re': 'so are',
    'so\'s': 'so is',
    'so\'ve': 'so have',
    'that\'ll': 'that shall',
    'that\'re': 'that are',
    'that\'s': 'that has',
    'that\'d': 'that would ',
    'there\'d': 'there had',
    'there\'ll': 'there shall',
    'there\'re': 'there are',
    'there\'s': 'there has',
    'these\'re': 'these are',
    'these\'ve': 'these have',
    'they\'d': 'they had',
    'they\'ll': 'they shall',
    'they\'re': 'they are',
    'they\'ve': 'they have',
    'this\'s': 'this has ',
    'those\'re': 'those are',
    'those\'ve': 'those have',
    '\'thout': 'without',
    '\'til': 'until',
    '\'tis': 'it is',
    'to\'ve': 'to have',
    '\'twas': 'it was',
    '\'tween': 'between',
    '\'twere': 'it were',
    'wanna': 'want to',
    'wasn\'t': 'was not',
    'we\'d': 'we had',
    'we\'d\'ve': 'we would have',
    'we\'ll': 'we shall',
    'we\'re': 'we are',
    'we\'ve': 'we have',
    'weren\'t': 'were not',
    'what\'d': 'what did',
    'what\'ll': 'what shall',
    'what\'re': 'what are',
    'what\'s': 'what has ',
    'what\'ve': 'what have',
    'when\'s': 'when has ',
    'where\'d': 'where did',
    'where\'ll': 'where shall',
    'where\'re': 'where are',
    'where\'s': 'where has ',
    'where\'ve': 'where have',
    'which\'d': 'which had ',
    'which\'ll': 'which shall',
    'which\'re': 'which are',
    'which\'s': 'which has',
    'which\'ve': 'which have',
    'who\'d': 'who would ',
    'who\'d\'ve': 'who would have',
    'who\'ll': 'who shall',
    'who\'re': 'who are',
    'who\'s': 'who has',
    'who\'ve': 'who have',
    'why\'d': 'why did',
    'why\'re': 'why are',
    'why\'s': 'why has',
    'willn\'t': 'will not',
    'won\'t': 'will not',
    'would\'ve': 'would have',
    'wouldn\'t': 'would not',
    'wouldn\'t\'ve': 'would not have',
    'y\'all': 'you all',
    'y\'all\'d\'ve ': 'you all would have',
    'y\'all\'d\'n\'t\'ve': 'you all would not have',
    'y\'all\'re': 'you all are',
    'y\'all\'ren\'t ': 'you all are not',
    'y\'at': 'you at',
    'yes\'m': 'yes madam',
    'y\'know': 'you know',
    'yessir': 'yes sir',
    'you\'d': 'you had ',
    'you\'ll': 'you shall ',
    'you\'re': 'you are',
    'you\'ve': 'you have',
    'when\'d': 'when did',
    'willn\'t': 'will not '
};



