import {personalCloudVisionApiKey, personalTranslateApiKey} from '../API-keys/API-keys.js'

const fetchFromCloudVisionAPI = async (imageURL, maxResults, requestType) => {
    const cloudVisionApiKey = personalCloudVisionApiKey;
    const cloudVisionApiUrl = `https://vision.googleapis.com/v1/images:annotate?key=${cloudVisionApiKey}`;
    const cloudVisionRequestBody = {
        "requests": [{
            "features": [{
                "maxResults": maxResults,
                "type": requestType //"OBJECT_LOCALIZATION"
            }],
            "image": {
                "source": {
                    "imageUri": imageURL
                }
            }
        }]
    };

    const response = await fetch(cloudVisionApiUrl, {
        method: 'POST',
        body: JSON.stringify(cloudVisionRequestBody)
    });

    const result = await response.json();
    console.log('result CV', result)
    return result;

}

const fetchFromTranslateAPI = async (translateApiText, translateApiLangFrom, translateApiLangTo) => {
    const translateApiKey = personalTranslateApiKey;
    const translateApiUrl = `https://translate.yandex.net/api/v1.5/tr.json/translate?key=${translateApiKey}&text=${translateApiText}&lang=${translateApiLangFrom}-${translateApiLangTo}`;
    const response = await fetch(translateApiUrl);
    const result = await response.json();
    return result;

}

const fetchFromTranslateApiSupportedLang = async () => {
    const translateApiKey = personalTranslateApiKey;
    const translateApiUrl = `https://translate.yandex.net/api/v1.5/tr.json/getLangs?key=${translateApiKey}&ui=en`;
    // console.log(translateApiUrl)

    const response = await fetch(translateApiUrl);
    const result = await response.json();
    return result;

    // fetch(translateApiUrl)
    //   .then(response => {
    //     //console.log('response', response.json()); 
    //     return response.json()
    //   })
    //   .then(result => {
    //     console.log('result', result);
    //   })
    //   .catch(err => {
    //     console.log(err)
    //   })
}

export {fetchFromCloudVisionAPI, fetchFromTranslateAPI, fetchFromTranslateApiSupportedLang};