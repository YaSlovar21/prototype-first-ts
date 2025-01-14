import React from 'react';

import styles from './App.module.css';

import AppAside from '../AppAside/AppAside';
import Ingred from '../Ingred/Ingred';
import Typography from '@mui/joy/Typography';
import { useMemo } from 'react';
import btpIngreds from '../../utils/data';


function App() {

  const ingredsSo = useMemo(()=> btpIngreds.filter(i => i.type === 'so'));
  const ingredsUvuu = useMemo(()=> btpIngreds.filter(i => i.type === 'uvuu'));

  return (
    <div className={styles.App}>

      <AppAside />

      <main className={styles.content}>
        <Typography level='h2' textColor="neutral.100" my={3}>Узлы ввода и учета</Typography>
        { ingredsUvuu.map(item => (
            <Ingred {...item} key={item._id} />
        ))}
        <Typography level='h2' textColor="neutral.100" my={3}>Узлы отопления</Typography>
        { ingredsSo.map(item => (
            <Ingred {...item} key={item._id} />
        ))}
        

      </main>
    </div>
  );
}

export default App;
