import {
    getHistoryFromLocalStorage, 
    saveHistoryToLocalStorage
  } from './local-storage-functions';

const renderResults = (imageSource, name1, name2, cords) => {

    const outputContainer = document.getElementById('output');
    outputContainer.textContent = null;

    //console.log(arr.responses);

    const resultImage = document.createElement('img');
    resultImage.src = imageSource;

    // arr.responses.forEach((element, index) => {
    //     const resultRectangle = document.createElement('a');
    //     const resultName = document.createElement('p');
    //     const resultNameTranslated = document.createElement('p');

    //     //clases
    //     resultRectangle.classList.add('result-rect')

    //     //content
    //     resultName.textContent = name1;
    //     resultNameTranslated.textContent = name2;

    //     //rectangle position of top left point
    //     resultRectangle.style.top = `${cords[0].y * 100}%`
    //     resultRectangle.style.left = `${cords[0].x * 100}%`;

    //     //rectangle dimensions
    //     resultRectangle.style.height = `${cords[3].y * 100 - cords[0].y * 100}%`;
    //     resultRectangle.style.width = `${cords[1].x * 100 - cords[0].x * 100}%`;
    // });

    const resultRectangle = document.createElement('a');
    const resultName = document.createElement('p');
    const resultNameTranslated = document.createElement('p');

    //clases
    resultRectangle.classList.add('result-rect')

    //content
    resultName.textContent = name1;
    resultNameTranslated.textContent = name2;

    //rectangle position of top left point
    resultRectangle.style.top = `${cords[0].y * 100}%`
    resultRectangle.style.left = `${cords[0].x * 100}%`;

    //rectangle dimensions
    resultRectangle.style.height = `${cords[3].y * 100 - cords[0].y * 100}%`;
    resultRectangle.style.width = `${cords[1].x * 100 - cords[0].x * 100}%`;
   
    //appends
    resultRectangle.appendChild(resultName);
    resultRectangle.appendChild(resultNameTranslated);
    outputContainer.appendChild(resultRectangle)
    outputContainer.appendChild(resultImage);
    //console.log('kordinates', cords)

    return resultImage
}

const renderHistoricResults = () => {

    const dataArr = getHistoryFromLocalStorage();
    const sideNav = document.getElementById('sidenav-items');
    sideNav.textContent = null;

    dataArr.forEach(object => {
        const card = document.createElement('div');
        const cardImage = document.createElement('img');
        const cardTitle = document.createElement('p');
        const cardTitleTranslated = document.createElement('p');

        cardImage.src = object.imgSrc;
        cardTitle.textContent = object.title;
        cardTitleTranslated.textContent = object.titleTranslated;
        
        card.appendChild(cardImage);
        card.appendChild(cardTitle);
        card.appendChild(cardTitleTranslated);
        sideNav.appendChild(card);

    });






}

const renderDetectedObjectRect = () => {





}


const renderSupportedLanguages = (languagesObject) => {
    const primaryLanguageSelector = document.getElementById('primary-language-selector');
    const secondaryLanguageSelector = document.getElementById('secondary-language-selector');
    //console.log(languagesObject);

    for (let [key, value] of Object.entries(languagesObject)) {
        //console.log(`${key}: ${value}`);
        const primaryLanguageSelectorOption = document.createElement('option');
        primaryLanguageSelectorOption.textContent = value;
        primaryLanguageSelectorOption.value = key;
        primaryLanguageSelector.appendChild(primaryLanguageSelectorOption);

        const secondaryLanguageSelectorOption = document.createElement('option');
        secondaryLanguageSelectorOption.textContent = value;
        secondaryLanguageSelectorOption.value = key;
        secondaryLanguageSelector.appendChild(secondaryLanguageSelectorOption);

        if (key === 'en') {
            primaryLanguageSelectorOption.selected = true;
        }

        if (key === 'lt') {
            secondaryLanguageSelectorOption.selected = true;
        }
    }
}


export {
    renderResults,
    renderDetectedObjectRect,
    renderSupportedLanguages,
    renderHistoricResults
}