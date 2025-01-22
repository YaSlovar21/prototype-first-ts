import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { useMemo } from 'react';

import styles from './App.module.css';

import AppAside from '../AppAside/AppAside';
import Ingred from '../Ingred/Ingred';
import Typography from '@mui/joy/Typography';

import SpecTable from '../SpecTable/SpecTable';

import Tabs from '@mui/joy/Tabs';
import TabList from '@mui/joy/TabList';
import Tab from '@mui/joy/Tab';
import PdfToShow from '../PdfToShow/PdfToShow';


import { PDFDownloadLink, PDFViewer } from '@react-pdf/renderer';

import SchemeSvg from '../SchemeSvg/SchemeSvg';

import { Text, Svg, Rect, G, ClipPath, Defs, Path, Tspan } from '@react-pdf/renderer';
import { getStyleObjectFromString, parseIntAttributes } from '../../utils/funcs';
import SchemeSvgReal from '../SchemeSvgReal/SchemeSvgReal';

function App() {
  const [selectedIngreds, setSelectedIngreds] = React.useState([]); 
  const [viewedIngr, setViewedIngr] = React.useState(null);
  const [ingreds, setIngreds] = React.useState([]);

  const ingredsSo = useMemo(()=> ingreds?.filter(i => i.type === 'so'), [ingreds]);
  const ingredsGvs = useMemo(()=> ingreds?.filter(i => i.type === 'gvs'), [ingreds]);
  const ingredsUvuu = useMemo(()=> ingreds?.filter(i => i.type === 'uv'), [ingreds]);

  const [nodeSvg, setNodeSvg] = React.useState(null)

  React.useEffect(()=> {
    fetch('https://functions.yandexcloud.net/d4ebl4hgnv1ngv9959o4').
      then(resp => {
        return resp.json()
      }).
      then(resp => {
        const ingreds = resp.map(i=> ({
          ...i, 
          specification: JSON.parse(i.specification),
          schemeUrl: `http://postatic.utermo.ru.website.yandexcloud.net/schemesSvg/${i.schemeUrl}`,
          imageView: `http://postatic.utermo.ru.website.yandexcloud.net/miniviews/${i.imageView}`
        }));
        console.log(ingreds);
        setIngreds(ingreds);
      })
  }, [])

  return (
   
    <div className={styles.App}>

    <AppAside />
    <Routes>
      <Route path="/">
        <>
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
                { ingredsSo.map(item => (
                  <li>
                    <Ingred {...item} onButtonSpecClick={setViewedIngr} viewing={viewedIngr} key={item._id} />
                  </li>
                ))} 
              </ul>
              <Typography level='h2' textColor="neutral" my={3}>Узлы ГВС</Typography>
              <ul className='grid gap-5 grid-cols-2'>
                { ingredsGvs.map(item => (
                  <li>
                    <Ingred {...item} onButtonSpecClick={setViewedIngr} viewing={viewedIngr} key={item._id} />
                  </li>
                ))} 
              </ul>

            </div>

          </main>
          <div className={`${styles.content} w-full py-12`}>
              {/*<SchemeSvg onSvgRendered={setNodeSvg} />*/}

              <SchemeSvgReal  id={viewedIngr?.id} schemeUrl={viewedIngr?.schemeUrl} />

              <div className='flex'>
                <SpecTable className='basis-1/2' specificationList={viewedIngr?.specification} />
                {viewedIngr && 
                  <PDFViewer className='w-full basis-1/2'>
                      <PdfToShow id={viewedIngr._id} specData={viewedIngr.specification} />             
                  </PDFViewer> 
                }
              </div>
          </div>
        </>
        </Route>
        <Route path='/catalog'>
          <p>hi</p>
        </Route>
      </Routes>
    </div>
    
  );
}

export default App;
