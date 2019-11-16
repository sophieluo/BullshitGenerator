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
let topic = "should everyone vote for grade non-disclosure"

let argument = [
    'It is pressing to consider topic. ',
    'How should we achieve topic. ',
    'With some questions, let us reconsider topic. ',
    'Why does topic happen? ',
    'What are the consequences of topic happening? ',
    'It is important to understand topic before we proceed. ',
    'We all heard about topic. ',
    'It is important to solve topic. ',
    'The key to topic is that. ',
    'Personally, topic is very important to me. ',
    'As we all know, topic raises an important question to us. ',
    'Above all, we need to solve the most important issue first. ',
    'After seeing this evidence. ',
    'Alternatively, what is the other argument about topic? ',
    'Another possibility to topic is presented by the following example. ',
    'Another way of viewing the argument about topic is that, ',
    'As far as I know, everyone has to face this issue. ',
    'As in the following example, ',
    'Besides, the above-mentioned examples, it is equally important to consider another possibility. ',
    'But these are not the most urgent issue compared to topic. ',
    'For instance, topic let us think about another argument. ',
    'Let us think about topic from a different point of view. ',
    'In that case, we need to consider topic seriously. ',
    'It is important to note that another possibility. ',
    'The evidence presented about topic has shown us a strong relationship. ',
    'Under this inevitable circumstance situation. ',
    'After thoroughly research about topic, I found an interesting fact. ',
    'This was another part we need to consider. ',
    'This fact is important to me. And I believe it is also important to the world. ',
    'As we all know, if it is important, we should seriously consider it. ',
    'It is a hard choice to make. ',
    'The more important question to consider is the following. ',
    'With these questions, let us look at it in-depth. ',
    'What is the key to this problem? ',
]

let quotes = [
    'Benjamin Franklin concluded that, I didn’t fail the test. I just found 100 ways to do it wrong. ',
    'Bob Dylan argued that, What’s money? A man is a success if he gets up in the morning and goes to bed at night and in between does what he wants to do. ',
    'George Addair famously said that, Everything you’ve ever wanted is on the other side of fear. ',
    'John Lennon concluded that, Life is what happens to you while you’re busy making other plans. ',
    'Norman Vincent Peale argued that, Change your thoughts and you change your world. ',
    'Pablo Picasso famously said that, Every child is an artist. The problem is how to remain an artist once he grows up. ',
    'Anne Frank once said, How wonderful it is that nobody need wait a single moment before starting to improve the world. ',
    'Buddha once said, The mind is everything. What you think you become. ',
    'Jim Rohn once said, Either you run the day, or the day runs you. ',
    'Socrates once said, An unexamined life is not worth living. ',
    'Theodore Roosevelt once said, Believe you can and you’re halfway there. ',
    'Albert Einstein once said that, Strive not to be a success, but rather to be of value. ',
    'Alice Walker once said that, The most common way people give up their power is by thinking they don’t have any. ',
    'Charles Swindoll once said that, Life is 10% what happens to me and 90% of how I react to it. ',
    'Earl Nightingale once said that, We become what we think about. ',
    'Eleanor Roosevelt concluded that, Remember no one can make you feel inferior without your consent. ',
    'Jesse Owens once said that, The battles that count aren’t the ones for gold medals. The struggles within yourself–the invisible battles inside all of us–that’s where it’s at. ',
    'Mae Jemison once said that, It’s your place in the world; it’s your life. Go on and do all you can with it, and make it the life you want to live. ',
    'Mark Twain once said that, The two most important days in your life are the day you are born and the day you find out why. ',
    'Ralph Waldo Emerson once said that, The only person you are destined to become is the person you decide to be. ',
    'Sheryl Sandberg once said that, If you’re offered a seat on a rocket ship, don’t ask what seat! Just get on. ',
    'Vince Lombardi once said that, Winning isn’t everything, but wanting to win is. ',
    'W. Clement Stone once said that, Definiteness of purpose is the starting point of all achievement. ',
    'Anais Nin said, Life shrinks or expands in proportion to one’s courage. ',
    'Babe Ruth said, Every strike brings me closer to the next home run. ',
    'Benjamin Franklin mentioned that, Either write something worth reading or do something worth writing. ',
    'George Eliot said, It is never too late to be what you might have been. ',
    'Henry Ford said, Whether you think you can or you think you can’t, you’re right. ',
    'Joshua J. Marine said, Challenges are what make life interesting and overcoming them is what makes life meaningful. ',
    'Kevin Kruse concluded that, We must balance conspicuous consumption with conscious capitalism. ',
    'Maya Angelou said, Life is not measured by the number of breaths we take, but by the moments that take our breath away. ',
    'Roger Staubach said, There are no traffic jams along the extra mile. ',
    'Sir Claus Moser said, Education costs money. But then so does ignorance. ',
    'Tony Robbins said, If you do what you’ve always done, you’ll get what you’ve always gotten. ',
    'Zig Ziglar said, If you can dream it, you can achieve it. ',
    'Zig Ziglar said, People often say that motivation doesn’t last. Well, neither does bathing. That’s why we recommend it daily. ',
    'Bill Cosby said in a speech, In order to succeed, your desire for success should be greater than your fear of failure. ',
    'Booker T. Washington mentioned that, Few things can help an individual more than to place responsibility on him, and to let him know that you trust him. ',
    'Dalai Lama said in a speech, Happiness is not something readymade. It comes from your own actions. ',
    'Jamie Paolinetti mentioned that, Limitations live only in our minds. But if we use our imaginations, our possibilities become limitless. ',
    'Japanese Proverb said in a speech, Fall seven times and stand up eight. ',
    'Lao Tzu said in a speech, When I let go of what I am, I become what I might be. ',
    'Les Brown argued that, Too many of us are not living our dreams because we are living our fears. ',
    'Steve Jobs said in a speech, Your time is limited, so don’t waste it living someone else’s life. ',
    'Wayne Gretzky argued that, You miss 100% of the shots you don’t take. ',
    'Amelia Earhart said in his book, The most difficult thing is the decision to act, the rest is merely tenacity. ',
    'Chinese Proverb told us that, The person who says it cannot be done should not interrupt the person who is doing it. ',
    'Farrah Gray said in his book, Build your own dreams, or someone else will hire you to build theirs. ',
    'Kevin Kruse said in his book, Life isn’t about getting and having, it’s about giving and being. ',
    'Latin Proverb argued that, If the wind will not serve, take to the oars. ',
    'Leonardo da Vinci argued that, I have been impressed with the urgency of doing. Knowing is not enough; we must apply. Being willing is not enough; we must do. ',
    'Steve Jobs said in his book, The only way to do great work is to love what you do. ',
    'Abraham Lincoln said that, It’s not the years in your life that count. It’s the life in your years. ',
    'Albert Einstein said that, A person who never made a mistake never tried anything new. ',
    'Ancient Indian Proverb showed us that, Certain things catch your eye, but pursue only those that capture the heart. ',
    'Arthur Ashe said that, Start where you are. Use what you have. Do what you can. ',
    'Ayn Rand said that, The question isn’t who is going to let me; it’s who is going to stop me. ',
    'Christopher Columbus said that, You can never cross the ocean until you have the courage to lose sight of the shore. ',
    'Florence Nightingale argued that, I attribute my success to this: I never gave or took any excuse. ',
    'Frank Sinatra said that, The best revenge is massive success. ',
    'Jesus said that, Ask and it will be given to you; search, and you will find; knock and the door will be opened for you. ',
    'Martin Luther King Jr. argued that, Our lives begin to end the day we become silent about things that matter. ',
    'Maya Angelou said that, You can’t use up creativity. The more you use, the more you have. ',
    'Norman Vaughan said that, Dream big and dare to fail. ',
    'Plato said that, We can easily forgive a child who is afraid of the dark; the real tragedy of life is when men are afraid of the light. ',
    'Stephen Covey showed us that, I am not a product of my circumstances. I am a product of my decisions. ',
    'Woody Allen said that, Eighty percent of success is showing up. ',
    'Beverly Sills told us that, You may be disappointed if you fail, but you are doomed if you don’t try. ',
    'Booker T. Washington told us that, If you want to lift yourself up, lift up someone else. ',
    'Chinese Proverb told us that, The best time to plant a tree was 20 years ago. The second best time is now. ',
    'Confucius mentioned that, Everything has beauty, but not everyone can see. ',
    'Confucius told us that, It does not matter how slowly you go as long as you do not stop. ',
    'Dalai Lama told us that, Remember that not getting what you want is sometimes a wonderful stroke of luck. ',
    'Henry David Thoreau argued that, Go confidently in the direction of your dreams. Live the life you have imagined. ',
    'Michael Jordan told us that, I’ve missed more than 9000 shots in my career. I’ve lost almost 300 games. 26 times I’ve been trusted to take the game winning shot and missed. I’ve failed over and over and over again in my life. And that is why I succeed. ',
    'Napoleon Hill showed us that, Whatever the mind of man can conceive and believe, it can achieve. ',
    'Oprah Winfrey told us that, You become what you believe. ',
    'Rosa Parks told us that, I have learned over the years that when one’s mind is made up, this diminishes fear. ',
]

let after = [
    "This is a short but powerful argument. ",
    "This inspired me. ",
    "With the understanding developed from this, we need to look at this problem in more depth. ",
    "I totally agree with this. ",
    "This leads to my other argument. ",
    "This examplifies my following argument. ",
    'We have to consider its consequence. ',
    'This brings a new way of thinking about topic. ',
    'This enlighten me. ',
]

let before = [
    "once said, I AM IN BEFORE ARGUMENT",
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
    quote = quote.concat(randomSent(after))
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
    // in writing, this creates a new paragraph, but alexa doesn't recognize this
    // return "\n　　" + paragraph + ". "
    return paragraph
}

function createArticle(){
    // topic = $('input').value
    topic = "whether everyone should vote for grade non-disclosure"
    let article = []
    for(let empty in topic){
        let paragraph = "";
        let paragraphLength = 0;
        while( paragraphLength < 80 ){
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
    GET_FACT_MESSAGE: 'I wrote a perfect article for you. ',
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
