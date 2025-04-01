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
import Catalog from '../Catalog/Catalog';
import Home from '../Home/Home';
import Home2025 from '../Home2025/Home2025';
import Raschet from '../Raschet/Raschet';
import { ROUTES } from '../../utils/constants';

function App() {
  const [selectedIngreds, setSelectedIngreds] = React.useState([]); 
  const [viewedIngr, setViewedIngr] = React.useState(null);
  const [ingreds, setIngreds] = React.useState([]);

  const ingredsSo = useMemo(()=> ingreds?.filter(i => i.type === 'so'), [ingreds]);
  const ingredsGvs = useMemo(()=> ingreds?.filter(i => i.type === 'gvs'), [ingreds]);
  const ingredsUvuu = useMemo(()=> ingreds?.filter(i => i.type === 'uv'), [ingreds]);

  const [nodeSvg, setNodeSvg] = React.useState(null)
/*
  React.useEffect(()=> {
    fetch('https://functions.yandexcloud.net/d4ebl4hgnv1ngv9959o4').
      then(resp => {
        if (resp.ok) {
          return resp.json()
        } else {
          Promise.reject(`При запросе основных схем&спецификаций произошла ошибка: ${resp.status}`)
        }
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
      }).catch(err=> console.log(err))
  }, [])*/

  return (
   
    <div className={styles.App}>
    <AppAside />
      <div className={`${styles.content}`}>
        <Routes>
          <Route path="/" element={<Home2025 />} />
          <Route path={ROUTES.ptoRaschet} element={<Raschet />} />
          <Route path={ROUTES.catalog} element={<Catalog />} />
          <Route path="/home"  element={<Home />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
