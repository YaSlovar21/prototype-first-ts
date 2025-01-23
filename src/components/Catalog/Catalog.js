import React from 'react';
import { API_LINKS } from '../../utils/constants';
import DetailsCollapsedTable from '../DetailsCollapsedTable/DetailsCollapsedTable';

import styles from './Catalog.module.css';



function Catalog() {

    const [fittings, setFittings] = React.useState([]);

    React.useEffect(()=> {
        const detailsFetch = fetch('https://functions.yandexcloud.net/d4ebl4hgnv1ngv9959o4?base=details&dir=equip')
            .then((resp)=> {
                if (resp.ok) {
                    return resp.json()
                } else {
                    return Promise.reject(`Случилась ошибка: ${resp.status}`);
                }
            });
        const fittingsFetch = fetch('https://functions.yandexcloud.net/d4ebl4hgnv1ngv9959o4?base=fittingsPrice&dir=equip')
            .then((resp) => {
                if (resp.ok) {
                    return resp.json()
                } else {
                    return Promise.reject(`При запросе к прайсу фитингов случилась ошибка: ${resp.status}`);
                }
            });
            
        Promise.all([detailsFetch, fittingsFetch])
            .then((data)=> {
                const detailsList = data[0].filter(i => i.categoryTextId === 'fittings').map((item) => {
                        return ({
                            ...item,
                            imageView: `${API_LINKS.detailsMiniviews}/${item.imageView}`,
                            items: data[1].filter(i => i.detailsId === item.id)
                        })
                    }
                );
                setFittings(detailsList);
            })
            .catch(err => console.log(err));
            
    }, [])

    return (
        <DetailsCollapsedTable rows={fittings} />
    );
}

export default Catalog;