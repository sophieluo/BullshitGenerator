exports.handler = async (event) => {

    //launch request
    const LaunchHandler = {
        canHandle(handlerInput) {
            const request = handlerInput.requestEnvelope.request;

            return request.type === 'LaunchRequest';
        },
        handle(handlerInput) {
            const attributesManager = handlerInput.attributesManager;
            const responseBuilder = handlerInput.responseBuilder;

            const requestAttributes = attributesManager.getRequestAttributes();
            const speechOutput = `${requestAttributes.t('WELCOME')} ${requestAttributes.t('HELP')}`;
            return responseBuilder
                .speak(speechOutput)
                .reprompt(speechOutput)
                .getResponse();

        },
    };

    let topic = "what's the weather today"

    let argument = [
        "In theory, ",
        "In summary, ",
        "Therefore, ",
        "However, ",
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
            while( paragraphLength < 3000 ){
                let random = randomNum();
                if(random < 5 && paragraph.length > 200){
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
        return article.join("\n");
    }

    const articleString = JSON.stringify(createArticle())

    const response = {
      "version": "1.0",
      "sessionAttributes": {
        "supportedHoroscopePeriods": {
          "daily": true,
          "weekly": false,
          "monthly": false
        }
      },
      "response": {
        "outputSpeech": {
          "type": "PlainText",
          "text": articleString
        },
        "card": {
          "type": "Simple",
          "title": "Horoscope",
          "content": articleString
        },
        "reprompt": {
          "outputSpeech": {
            "type": "PlainText",
            "text": "Can I help you with anything else?"
          }
        },
        "shouldEndSession": false
      }
    }

    // return response;
};
