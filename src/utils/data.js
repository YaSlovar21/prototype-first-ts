import vvoda from '../images/vvoda-sboku.png';
import so_zav from '../images/so-zav.png';
import so_nezav from '../images/so-nezav.png';

const btpIngreds = [
    {
        "_id":"60666c42cc7b410027a1a9b50",
        "name":"Узел УВУУ с КЗТ",
        "type":"uvuu",
        "price":3000,
        "image": vvoda,
        "scheme": "vvoda.svg",
        "specification": [
            {
                id: 1,
                category: "pump",
                placeholder: "Выберете насос"
            },
            {
                id: 2,
                category: ""
            },
        ],
        "__v":0
     },
     {
        "_id":"60666c42cc7b410027a1a9b51",
        "name":"Узел CО зависимая",
        "type":"so",
        "price":3000,
        "image": so_zav,
        "__v":0
     },
     {
        "_id":"60666c42cc7b410027a1a9b52",
        "name":"Узел CО независимая",
        "type":"so",
        "price":3000,
        "image": so_nezav,
        "__v":0
     },
];

export default btpIngreds;