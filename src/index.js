require('dotenv').config()
import './assets/styles/style.scss';
import 'regenerator-runtime/runtime';
import {
  fetchFromCloudVisionAPI,
  fetchFromTranslateAPI,
  fetchFromTranslateApiSupportedLang
} from './js-modules/fetch-functions.js'
import {
  renderResults,
  renderDetectedObjectRect,
  renderSupportedLanguages,
  renderHistoricResults
} from './js-modules/render-functions'
import {
  getHistoryFromLocalStorage,
  saveHistoryToLocalStorage
} from './js-modules/local-storage-functions';
import './js-modules/sidenav'

//console.log(process.env)


const mainLoaderIcon = document.querySelector('.lds-dual-ring-wrapper')

const doMagic = async (lang1, lang2, url) => {

  const resultCV = await fetchFromCloudVisionAPI(url, 10, 'OBJECT_LOCALIZATION')
  const objectName = resultCV.responses[0].localizedObjectAnnotations[0].name;
  const objectCords = resultCV.responses[0].localizedObjectAnnotations[0].boundingPoly.normalizedVertices;
  console.log('OBJECT', objectName)
  const resultTR = await fetchFromTranslateAPI(objectName, lang1, lang2);
  const objectNameTranslated = resultTR.text[0];
  console.log('TRANSLATED', objectNameTranslated)

  const resultImageElement = renderResults(url, objectName, objectNameTranslated, objectCords);

  let historicDataArr = getHistoryFromLocalStorage()
  historicDataArr.push({
    imgSrc: url,
    title: objectName,
    titleTranslated: objectNameTranslated
  });
  saveHistoryToLocalStorage(historicDataArr);
  renderHistoricResults();

  resultImageElement.addEventListener('load', event => {
    console.log('paveikslelis ready');
    mainLoaderIcon.classList.add("hidden");
  })
}

const languageSelectorForm = document.getElementById('language-selector-form');

languageSelectorForm.addEventListener('submit', event => {
  event.preventDefault();
  mainLoaderIcon.classList.remove('hidden')
  //mainLoaderIcon.classList.add("visible");
  // console.log(event.target[0].value);
  // console.log(event.target[1].value);
  // console.log(event.target[2].value);
  doMagic(event.target[0].value, event.target[1].value, event.target[2].value)
    .then(response => {
      // mainLoaderIcon.classList.add("hidden");
    })
    .catch(err => {
      console.log('visu promisu erroras', err)
      document.querySelector('.error-message').classList.add('error-message-visible')
    })

  // fetchFromTranslateApiSupportedLang()

})

fetchFromTranslateApiSupportedLang()
  .then(response => {
    renderSupportedLanguages(response.langs)
    //mainLoaderIcon.style.visibility = "hidden" ;
    //mainLoaderIcon.classList.remove('visible')
    mainLoaderIcon.classList.add('hidden');
    //console.log('response', response);
    // return response.json()
  })

  .catch(err => {
    console.log(err)
  })

renderHistoricResults()

//doMagic();
// const something = [{name:'John', surename:'McMacon'}, {name:'Marry', surename:'James'}]
// saveHistoryToLocalStorage(something)
// console.log(getHistoryFromLocalStorage());