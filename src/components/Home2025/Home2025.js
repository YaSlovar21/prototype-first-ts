import React from 'react';
import styles from './Home2025.module.css';


import SpecTable from '../SpecTable/SpecTable';

import Tabs from '@mui/joy/Tabs';
import TabList from '@mui/joy/TabList';
import Tab from '@mui/joy/Tab';
import PdfToShow from '../PdfToShow/PdfToShow';

import { PDFViewer } from '@react-pdf/renderer';

import SchemeSvg from '../SchemeSvg/SchemeSvg';
import SchemeSvgReal from '../SchemeSvgReal/SchemeSvgReal';
import parse from 'html-react-parser';
import SchemeSvgReal2025 from '../SchemeSvgReal2025/SchemeSvgReal2025';

function Home2025() {

  const [spec, setSpec] = React.useState([]);
  const [shemes, setShemes] = React.useState([]);

  React.useEffect(()=> {
    Promise.all([
      // к примеру получаем узел ввода первый в спецификации 
      fetch('https://d5dqv4dgsf90d6kogi2d.3zvepvee.apigw.yandexcloud.net/sheme-and-spec/2/1').
        then(resp => {
          return resp.json()
        }),
      // и узел гвс второй в специкации
      fetch('https://d5dqv4dgsf90d6kogi2d.3zvepvee.apigw.yandexcloud.net/sheme-and-spec/1/2').
      then(resp => {
        return resp.json()
      }),
    ]).then((data)=>{
      console.log(data[0].specificationTemplate.concat(data[1].specificationTemplate));
      setSpec(data[0].specificationTemplate.concat(data[1].specificationTemplate));
      setShemes([...[], data[0].svgSchemeTemplate, data[1].svgSchemeTemplate ]);
    })
  }, [])

  return (
    <div>
          <main className={`flex`}>
            <div className={styles.uzli}>
              <Tabs  aria-label="Basic tabs" size='lg' defaultValue={0}>
                <TabList>
                  <Tab>Узлы ввода</Tab>
                  <Tab>Узлы отопления</Tab>
                  <Tab>Узлы ГВС</Tab>
                </TabList>
              </Tabs>
            </div>

          </main>
          <div className={`w-full py-12`}>
              {/*<SchemeSvg onSvgRendered={setNodeSvg} />

              <SchemeSvgReal  id={viewedIngr?.id} schemeUrl={viewedIngr?.schemeUrl} />*/}
              {shemes.map(i1 => parse(i1))}
              {spec.length > 0 && <SchemeSvgReal2025 /> }
              <div className='flex'>
                <SpecTable className='basis-1/2' specificationList={spec} />
                {spec.length > 0  && 
                  <PDFViewer className='w-full basis-1/2'>
                      <PdfToShow specData={spec} />             
                  </PDFViewer> 
                }
              </div>
          </div>
        
        
      
    </div>
    
  );
}

export default Home2025;
