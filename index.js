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
    'Albert Einstein said, A person who never made a mistake never tried anything new.',
    'Socrates said, An unexamined life is not worth living.',
    'Theodore Roosevelt said, Believe you can and you’re halfway there.',
    'Joshua J. Marine said, Challenges are what make life interesting and overcoming them is what makes life meaningful.',
    'Norman Vincent Peale said, Change your thoughts and you change your world.',
    'W. Clement Stone said, Definiteness of purpose is the starting point of all achievement.',
    'Norman Vaughan said, Dream big and dare to fail.',
    'Sir Claus Moser said, Education costs money. But then so does ignorance.',
    'Woody Allen said, Eighty percent of success is showing up.',
    'Benjamin Franklin said, Either write something worth reading or do something worth writing.',
    'Pablo Picasso said, Every child is an artist. The problem is how to remain an artist once he grows up.',
    'Babe Ruth said, Every strike brings me closer to the next home run.',
    'George Addair said, Everything you’ve ever wanted is on the other side of fear.',
    'Japanese Proverb said, Fall seven times and stand up eight.',
    'Henry David Thoreau said, Go confidently in the direction of your dreams. Live the life you have imagined.',
    'Dalai Lama said, Happiness is not something readymade. It comes from your own actions.',
    'Anne Frank said, How wonderful it is that nobody need wait a single moment before starting to improve the world.',
    'Stephen Covey said, I am not a product of my circumstances. I am a product of my decisions.',
    'Florence Nightingale said, I attribute my success to this: I never gave or took any excuse.',
    'Benjamin Franklin said, I didn’t fail the test. I just found 100 ways to do it wrong.',
    'Leonardo da Vinci said, I have been impressed with the urgency of doing. Knowing is not enough; we must apply. Being willing is not enough; we must do.',
    'Vincent van Gogh said, I would rather die of passion than of boredom.',
    'Michael Jordan said, I’ve missed more than 9000 shots in my career. I’ve lost almost 300 games. 26 times I’ve been trusted to take the game winning shot and missed. I’ve failed over and over and over again in my life. And that is why I succeed.',
    'Confucius said, It does not matter how slowly you go as long as you do not stop.',
    'George Eliot said, It is never too late to be what you might have been.',
    'Abraham Lincoln said, It’s not the years in your life that count. It’s the life in your years.',
    'Charles Swindoll said, Life is 10% what happens to me and 90% of how I react to it.',
    'John Lennon said, Life is what happens to you while you’re busy making other plans.',
    'Anais Nin said, Life shrinks or expands in proportion to one’s courage.',
    'Martin Luther King Jr. said, Our lives begin to end the day we become silent about things that matter.',
    'Eleanor Roosevelt said, Remember no one can make you feel inferior without your consent.',
    'Dalai Lama said, Remember that not getting what you want is sometimes a wonderful stroke of luck.',
    'Arthur Ashe said, Start where you are. Use what you have. Do what you can.',
    'Jesse Owens said, The battles that count aren’t the ones for gold medals. The struggles within yourself–the invisible battles inside all of us–that’s where it’s at.',
    'Frank Sinatra said, The best revenge is massive success.',
    'Chinese Proverb said, The best time to plant a tree was 20 years ago. The second best time is now.',
    'Buddha said, The mind is everything. What you think you become.',
    'Alice Walker said, The most common way people give up their power is by thinking they don’t have any.',
    'Ralph Waldo Emerson said, The only person you are destined to become is the person you decide to be.',
    'Steve Jobs said, The only way to do great work is to love what you do.',
    'Chinese Proverb said, The person who says it cannot be done should not interrupt the person who is doing it.',
    'Ayn Rand said, The question isn’t who is going to let me; it’s who is going to stop me.',
    'Mark Twain said, The two most important days in your life are the day you are born and the day you find out why.',
    'Roger Staubach said, There are no traffic jams along the extra mile.',
    'Les Brown said, Too many of us are not living our dreams because we are living our fears.',
    'Earl Nightingale said, We become what we think about.',
    'Plato said, We can easily forgive a child who is afraid of the dark; the real tragedy of life is when men are afraid of the light.',
    'Kevin Kruse said, We must balance conspicuous consumption with conscious capitalism.',
    'Bob Dylan said, What’s money? A man is a success if he gets up in the morning and goes to bed at night and in between does what he wants to do.',
    'Oprah Winfrey said, You become what you believe.',
    'Christopher Columbus said, You can never cross the ocean until you have the courage to lose sight of the shore.',
    'Unknown said, You can’t fall if you don’t climb. But there’s no joy in living your whole life on the ground.',
    'Wayne Gretzky said, You miss 100% of the shots you don’t take.',
    'Mae Jemison said, It’s your place in the world; it’s your life. Go on and do all you can with it, and make it the life you want to live.',
    'Booker T. Washington said, Few things can help an individual more than to place responsibility on him, and to let him know that you trust him.',
    'Jesus said, Ask and it will be given to you; search, and you will find; knock and the door will be opened for you.',
    'Maya Angelou said, Life is not measured by the number of breaths we take, but by the moments that take our breath away.',
    'Confucius said, Everything has beauty, but not everyone can see.',
    ' Ancient Indian Proverb said, Certain things catch your eye, but pursue only those that capture the heart.',
    'Albert Einstein said, Strive not to be a success, but rather to be of value.',
    'Vince Lombardi said, Winning isn’t everything, but wanting to win is.',
    'Beverly Sills said, You may be disappointed if you fail, but you are doomed if you don’t try.',
    'Sheryl Sandberg said, If you’re offered a seat on a rocket ship, don’t ask what seat! Just get on.',
    'Lao Tzu said, When I let go of what I am, I become what I might be.',
    'Napoleon Hill said, Whatever the mind of man can conceive and believe, it can achieve.',
    'Kevin Kruse said, Life isn’t about getting and having, it’s about giving and being.',
    'Booker T. Washington said, If you want to lift yourself up, lift up someone else.',
    'Zig Ziglar said, People often say that motivation doesn’t last. Well, neither does bathing. That’s why we recommend it daily.',
    'Farrah Gray said, Build your own dreams, or someone else will hire you to build theirs.',
    'Jim Rohn said, Either you run the day, or the day runs you.',
    'Jamie Paolinetti said, Limitations live only in our minds. But if we use our imaginations, our possibilities become limitless.',
    'Steve Jobs said, Your time is limited, so don’t waste it living someone else’s life.',
    'Latin Proverb said, If the wind will not serve, take to the oars.',
    'Maya Angelou said, You can’t use up creativity. The more you use, the more you have.',
    'Amelia Earhart said, The most difficult thing is the decision to act, the rest is merely tenacity.',
    'Rosa Parks said, I have learned over the years that when one’s mind is made up, this diminishes fear.',
    'Zig Ziglar said, If you can dream it, you can achieve it.',
    'Tony Robbins said, If you do what you’ve always done, you’ll get what you’ve always gotten.',
    'Henry Ford said, Whether you think you can or you think you can’t, you’re right.',
    'Bill Cosby said, In order to succeed, your desire for success should be greater than your fear of failure.',
    'Vincent Van Gogh said, If you hear a voice within you say “you cannot paint,” then by all means paint and that voice will be silenced.',
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
    let quote = randomSent(quotes)
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

        // let sentence1 = createQuotes();
        // paragraph = paragraph + sentence1;
        // // let sentence2 = createQuotes();
        // // paragraph = paragraph + sentence2;

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

// TODO: 1. write a separate launch intent (welcome message)
// TODO: 2. edit current GetNewFactIntent to incorporate self-defind topic
// TODO: 3. better syntax
// TODO: 4. more variations in "xxx said"
