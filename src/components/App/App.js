import React from 'react';

import styles from './App.module.css';

import AppAside from '../AppAside/AppAside';
import Ingred from '../Ingred/Ingred';
import Typography from '@mui/joy/Typography';
import { useMemo } from 'react';
import btpIngreds from '../../utils/data';
import SpecTable from '../SpecTable/SpecTable';

import Tabs from '@mui/joy/Tabs';
import TabList from '@mui/joy/TabList';
import Tab from '@mui/joy/Tab';
import PdfToShow from '../PdfToShow/PdfToShow';


import { PDFDownloadLink, PDFViewer } from '@react-pdf/renderer';
import PdfTableTest from '../PdfTableTest/PdfTableTest';


function App() {
  const [selectedIngreds, setSelectedIngreds] = React.useState([]); 
  const [viewedIngr, setViewedIngr] = React.useState(null);

  const ingredsSo = useMemo(()=> btpIngreds.filter(i => i.type === 'so'));
  const ingredsGvs = useMemo(()=> btpIngreds.filter(i => i.type === 'gvs'));
  const ingredsUvuu = useMemo(()=> btpIngreds.filter(i => i.type === 'uvuu'));


  return (
    <div className={styles.App}>
      <AppAside />
      <main className={`${styles.content} flex`}>
        <div className={styles.uzli}>
          <Tabs  aria-label="Basic tabs" size='lg' defaultValue={0}>
            <TabList>
              <Tab>Узлы ввода</Tab>
              <Tab>Узлы отопления</Tab>
              <Tab>Узлы ГВС</Tab>
            </TabList>
          </Tabs>
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
          <Typography level='h2' textColor="neutral" my={3}>Узлы ГВС</Typography>
          <ul className='grid gap-5 grid-cols-2'>
            {ingredsGvs.map(item => (
              <li>
                <Ingred {...item} onButtonSpecClick={setViewedIngr} viewing={viewedIngr} key={item._id} />
              </li>
            ))} 
          </ul>
          
          
          
        </div>
        
        <div className='basis-1/2 py-12'>
          <div className='svg-container'>
            
          </div>

          <SpecTable specificationList={viewedIngr?.specification} />

          {viewedIngr && 
            <PDFViewer className='w-full h-full'>
                <PdfToShow id={viewedIngr._id} specData={viewedIngr.specification} />             
            </PDFViewer> 
          }
        </div>

        <PDFViewer>
          <PdfTableTest />
      </PDFViewer>
      </main>
     
    </div>
  );
}

export default App;
