import React from 'react';

import styles from './App.module.css';

import AppAside from '../AppAside/AppAside';
import Ingred from '../Ingred/Ingred';
import Typography from '@mui/joy/Typography';
import { useMemo } from 'react';
import btpIngreds from '../../utils/data';
import SpecTable from '../SpecTable/SpecTable';


function App() {
  const [selectedIngreds, setSelectedIngreds] = React.useState([]); 
  const [viewedIngr, setViewedIngr] = React.useState(null);
  const ingredsSo = useMemo(()=> btpIngreds.filter(i => i.type === 'so'));
  const ingredsUvuu = useMemo(()=> btpIngreds.filter(i => i.type === 'uvuu'));


  return (
    <div className={styles.App}>
      <AppAside />
      <main className={`${styles.content} flex`}>
        <div className={styles.uzli}>
          <Typography level='h2' textColor="neutral" my={3}>Узлы ввода и учета</Typography>
          { ingredsUvuu.map(item => (
              <Ingred {...item} onButtonSpecClick={setViewedIngr} viewing={viewedIngr} key={item._id} />
          ))}
          <Typography level='h2' textColor="neutral" my={3}>Узлы отопления</Typography>
          <ul className='grid gap-5 grid-cols-2'>
            {ingredsSo.map(item => (
              <li>
                <Ingred {...item} onButtonSpecClick={setViewedIngr} viewing={viewedIngr} key={item._id} />
              </li>
            ))} 
          </ul>
        </div>
        
        <div className='basis-1/2 py-12'>
          {viewedIngr?.specification?.map(i => 
            (i.id)
          )}
          <SpecTable specificationList={viewedIngr?.specification} />
        </div>

      </main>
    </div>
  );
}

export default App;
