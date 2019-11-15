/*
 * Copyright 2018-2019 Amazon.com, Inc. or its affiliates. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License").
 * You may not use this file except in compliance with the License.
 * A copy of the License is located at
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * or in the "license" file accompanying this file. This file is distributed
 * on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either
 * express or implied. See the License for the specific language governing
 * permissions and limitations under the License.
 */

//
// Alexa Fact Skill - Sample for Beginners
//

// sets up dependencies
const Alexa = require('ask-sdk-core');
const i18n = require('i18next');

// core functionality for fact skill
const GetNewFactHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    // checks request type
    return request.type === 'LaunchRequest'
      || (request.type === 'IntentRequest'
        && request.intent.name === 'GetNewFactIntent');
  },
  handle(handlerInput) {
    const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
    // gets a random fact by assigning an array to the variable
    // the random item from the array will be selected by the i18next library
    // the i18next library is set up in the Request Interceptor
    const randomFact = requestAttributes.t('FACTS');
    // concatenates a standard message with the random fact
    const speakOutput = requestAttributes.t('GET_FACT_MESSAGE') + randomFact;

    return handlerInput.responseBuilder
      .speak(speakOutput)
      // Uncomment the next line if you want to keep the session open so you can
      // ask for another fact without first re-opening the skill
      // .reprompt(requestAttributes.t('HELP_REPROMPT'))
      .withSimpleCard(requestAttributes.t('SKILL_NAME'), randomFact)
      .getResponse();
  },
};

const HelpHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'IntentRequest'
      && request.intent.name === 'AMAZON.HelpIntent';
  },
  handle(handlerInput) {
    const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
    return handlerInput.responseBuilder
      .speak(requestAttributes.t('HELP_MESSAGE'))
      .reprompt(requestAttributes.t('HELP_REPROMPT'))
      .getResponse();
  },
};

const FallbackHandler = {
  // The FallbackIntent can only be sent in those locales which support it,
  // so this handler will always be skipped in locales where it is not supported.
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'IntentRequest'
      && request.intent.name === 'AMAZON.FallbackIntent';
  },
  handle(handlerInput) {
    const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
    return handlerInput.responseBuilder
      .speak(requestAttributes.t('FALLBACK_MESSAGE'))
      .reprompt(requestAttributes.t('FALLBACK_REPROMPT'))
      .getResponse();
  },
};

const ExitHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'IntentRequest'
      && (request.intent.name === 'AMAZON.CancelIntent'
        || request.intent.name === 'AMAZON.StopIntent');
  },
  handle(handlerInput) {
    const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
    return handlerInput.responseBuilder
      .speak(requestAttributes.t('STOP_MESSAGE'))
      .getResponse();
  },
};

const SessionEndedRequestHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'SessionEndedRequest';
  },
  handle(handlerInput) {
    console.log(`Session ended with reason: ${handlerInput.requestEnvelope.request.reason}`);
    return handlerInput.responseBuilder.getResponse();
  },
};

const ErrorHandler = {
  canHandle() {
    return true;
  },
  handle(handlerInput, error) {
    console.log(`Error handled: ${error.message}`);
    console.log(`Error stack: ${error.stack}`);
    const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
    return handlerInput.responseBuilder
      .speak(requestAttributes.t('ERROR_MESSAGE'))
      .reprompt(requestAttributes.t('ERROR_MESSAGE'))
      .getResponse();
  },
};

const LocalizationInterceptor = {
  process(handlerInput) {
    // Gets the locale from the request and initializes i18next.
    const localizationClient = i18n.init({
      lng: handlerInput.requestEnvelope.request.locale,
      resources: languageStrings,
      returnObjects: true
    });
    // Creates a localize function to support arguments.
    localizationClient.localize = function localize() {
      // gets arguments through and passes them to
      // i18next using sprintf to replace string placeholders
      // with arguments.
      const args = arguments;
      const value = i18n.t(...args);
      // If an array is used then a random value is selected
      if (Array.isArray(value)) {
        return value[Math.floor(Math.random() * value.length)];
      }
      return value;
    };
    // this gets the request attributes and save the localize function inside
    // it to be used in a handler by calling requestAttributes.t(STRING_ID, [args...])
    const attributes = handlerInput.attributesManager.getRequestAttributes();
    attributes.t = function translate(...args) {
      return localizationClient.localize(...args);
    }
  }
};

//start bullshit generator
let topic = "what's the weather today"

let argument = [
    "In theory, ",
    "In summary, ",
    "Therefore, ",
    "However, ",
    'Above all',
    'According to',
    'After seeing this evidence',
    'all Excess is ill: But Drunkenness is of the worst Sort. It spoils Health',
    'all human beings should try to learn before they die what they are running from',
    'Alternatively',
    'an aphorism ought to be entirely isolated from the surrounding world like a little work of art and complete in itself like a hedgehog.',
    'and Immo jeered at her',
    'and to many other people.',
    'and unmans Men: It reveals Secrets',
    'Another possibility is',
    'Another way of viewing this is',
    'argued that',
    'As far as I know',
    'As in the following example',
    'as',
    'attemptted to convince the reader that',
    'Besides',
    'but father held up a hand.',
    'but he',
    'but these are not the most urgent issue',
    'By contrasts',
    'Chiefly',
    'Comte de Lautréamont',
    'concluded that',
    'Dangerous and Mad. In fine',
    'dismounts the Mind',
    'do it yourself.',
    'Eko brushed a tear from her eye',
    'everthing else will be easily solved.',
    'For example',
    'For instance',
    'For many years',
    'For me',
    'From my piont of view',
    'Furthermore',
    'he said.',
    'he that is drunk is not a Man: Because he is so long void of Reason',
    'However',
    'I have forgotten my umbrella.',
    'I rarely slept well.',
    'if a man has his eyes bound',
    'If we think about it from a different point of view',
    'if you want a thing done well',
    'Impudent',
    'In addition',
    'In comparison',
    'In fact',
    'In general',
    'In my opinion',
    'In other words',
    'In particular',
    'In that case',
    'is inevitable.',
    'is Quarrelsome',
    'It is disappointing that',
    'It is important to note that',
    'laughter is the antidote to existential pain.',
    'll never see anything.',
    'melancholy: an appetite no misery satisfies.',
    'mentioned that',
    'Moreover',
    'Namely',
    'necessity is the mother of invention.',
    'Never mock a tender heart',
    'never trust a computer you can',
    'On the contrary',
    'On the one hand',
    'On the other hand',
    'Orson Scott Card',
    'plants are more courageous than almost all human beings: an orange tree would rather die than produce lemons',
    'showed us that',
    'Similarly',
    'Since that is so',
    'smile and the world will laugh at you.',
    'some people talk about other people’s failures with so much pleasure that you would swear they are talking about their own successes.',
    'stated in his book that',
    'Steve Wozniak',
    'Symposium / Phaedrus',
    't throw out a window.',
    'that aroused my imagination.',
    'that distinguishes a Man from a Beast.',
    'that inspired me.',
    'That is to say',
    'that is',
    'that solved my problem.',
    'The evidence presented in this assignment has shown that',
    'the shortest distance between two points is always under construction.',
    'The trouble about man is twofold. He cannot learn truths which are too complicated; he forgets truths which are too simple.',
    'there is music you never hear unless you play it yourself.',
    'there is truth in wine and children.',
    'Therefore',
    'Thus',
    'To a certain extent',
    'To look at another way',
    'Under this inevitable circumstance situation',
    'We generally say',
    'we have to consider its consequence.',
    'we have to face an embarrassing situation',
    'we say sound things when we do not strive to say to say extraordinary ones.',
    'what you choose also chooses you.',
    'when facing these problems',
    'whereas instead of dying the average person would rather be someone they are not.',
    'which brought a new way of thinking it.',
    'which enlighten me.',
    'With these questions',
    'you can encourage him as much as you like to stare through the bandage',
]

let quotes = [
    "Lincoln said, 123",
    "Someone said, 135",
    "Another person said, 365",
]

let after = [
    "I hope you can understand this. ",
    "This is a short but powerful argument. ",
]

let before = [
    "once said, "
]

function randomSent(list){
    let i = Math.floor( Math.random() * list.length );
    return list[i];
}

function randomNum(min = 0, max = 100){
    let num = Math.random()*( max - min ) + min;
    return num;
}

function createQuotes(){
    let quote = (quotes)
    return quote
}

function createArguments(){
    let sentence = randomSent(argument);
    sentence = sentence.replace(RegExp("topic", "g"),topic);
    return sentence;
}

function createParagragh(paragraph){
    if(paragraph[paragraph.length-1] === " "){
        paragraph = paragraph.slice(0,-2)
    }
    return "　　" + paragraph + "。 "
}

function createArticle(){
    let article = []
    for(let empty in topic){
        let paragraph = "";
        let paragraphLength = 0;
        while( paragraphLength < 100 ){
            let random = randomNum();
            if(random < 5 && paragraph.length > 50){
                paragraph = createParagragh(paragraph);
                article.push(paragraph);
                paragraph = "";
            }else if(random < 20){
                let sentence = createQuotes();
                paragraphLength = paragraphLength + sentence.length;
                paragraph = paragraph + sentence;
            }else{
                let sentence = createArguments();
                paragraphLength = paragraphLength + sentence.length;
                paragraph = paragraph + sentence;
            }
        }
        paragraph = createParagragh(paragraph);
        article.push(paragraph);
    }
    return article.join();
}

const articleString = JSON.stringify(createArticle());
console.log(articleString);
//end bullshit generator

const skillBuilder = Alexa.SkillBuilders.custom();

exports.handler = skillBuilder
  .addRequestHandlers(
    GetNewFactHandler,
    HelpHandler,
    ExitHandler,
    FallbackHandler,
    SessionEndedRequestHandler,
  )
  .addRequestInterceptors(LocalizationInterceptor)
  .addErrorHandlers(ErrorHandler)
  .withCustomUserAgent('sample/basic-fact/v2')
  .lambda();

// TODO: Replace this data with your own.
// It is organized by language/locale.  You can safely ignore the locales you aren't using.
// Update the name and messages to align with the theme of your skill


const enData = {
  translation: {
    SKILL_NAME: 'Academic Articles Generator',
    GET_FACT_MESSAGE: 'Here\'s your bullshit: ',
    HELP_MESSAGE: 'You can say tell me a bullshit, or, you can say exit... What can I help you with?',
    HELP_REPROMPT: 'What can I help you with?',
    FALLBACK_MESSAGE: 'The Academic Articles Generator skill can\'t help you with that. What can I help you with?',
    FALLBACK_REPROMPT: 'What can I help you with?',
    ERROR_MESSAGE: 'Sorry, an error occurred.',
    STOP_MESSAGE: 'Goodbye!',
    FACTS: articleString,
  },
};


// constructs i18n and l10n data structure
const languageStrings = {

  'en': enData,

};
