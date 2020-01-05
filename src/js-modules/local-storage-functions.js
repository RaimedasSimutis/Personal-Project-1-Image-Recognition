const getHistoryFromLocalStorage = () => {
    const dataString = localStorage.getItem('favoriteTranslations');
    return (dataString===null) ? [] : JSON.parse(dataString);
}

const saveHistoryToLocalStorage = (data) => {
    const dataString = JSON.stringify(data);
    localStorage.setItem('favoriteTranslations', dataString);
}

export {getHistoryFromLocalStorage, saveHistoryToLocalStorage};
