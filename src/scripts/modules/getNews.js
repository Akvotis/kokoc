import { ajax } from "../utils/ajax.js";

const url = 'https://dev.mykgproxy.webprofy.ru/upload/frontend/data.json';
const headers = new Headers({'Content-type': 'application/x-www-form-urlencoded'});
const noImage = '../img/noimage.png';

/**
 * Получение нужного узла в DOM, для вывода новостей. Получение списка новостей запросом на API.
 * Перебор новостей и создание для каждой HTML шаблона с последующим выводом в DOM.
*/
export const getNews = async () => {
    const newsRoot = document.querySelector('.js-news-root');
    const news = await ajax(url, 'POST', headers);

    if(!newsRoot) return;

    news.forEach(element => {
        const newsElement = template(element, noImage);

        newsRoot.insertAdjacentHTML("beforeend", newsElement);
    });

    checkImageSrcValid(noImage);
}

/**
 * HTML шаблон для карточки новостей.
 * @param {Object} obj 
 * @returns HtmlElement
*/
function template(obj) {
    return `
        <a href="javascript:void(0);" class="news-card-item">
            <div class="news-card-item__preview">
                <img src=${obj.imgUrl} alt="${obj.name}" class="js-image" />
            </div>
            <div class="news-card-item-content">
                <h3 class="news-card-item__title">${obj.name}</h3>
                <span class="news-card-item__date">${obj.date || ''}</span>
                <div class="news-card-item__desc">${obj.text}</div>
                <div class="news-card-item__bottom">
                    <div class="news-card-item__author">${obj.author}</div>
                    <div class="news-card-item__favorite"></div>
                </div>
            </div>
        </a>
    `;
}

// проверка картинок на предмет остутствия (битые ссылки, не пришёл урл с апи и т.д)
// если картинки нет, то вставляется дефолтная картинка-заглушка
/**
 * Функция проверки изображений у карточек новостей на предмет отсутствия (битые ссылки, нет картинки на сервере и т.д.).
 * Если изображения нет, то подставляется картинка-заглушка.
 * @param {String} noImage 
*/
function checkImageSrcValid(noImage) {
    const images = document.querySelectorAll('.js-image');

    for (const image of images) {
        image.onerror = function () {
            image.src = noImage;
        };
    }
}