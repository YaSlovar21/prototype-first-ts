import React from 'react';
import {
  Svg,
  Polygon,
  Rect,
  Page,
  Text,
  Document,
  StyleSheet,
  View,
  Font, 
} from '@react-pdf/renderer';

import SpecTable from '../SpecTable/SpecTable';



import fontSource from '../../vendor/GOST_type_A.woff';
Font.register({ family: 'GOST_type_A', src: fontSource });



const styles = StyleSheet.create({
    page: { padding: 30, position: 'relative', fontFamily: 'GOST_type_A'},
    section: { position: 'relative', border: '1px solid #1f1f1f', textAlign: 'center', height: '100%' },
    footer: { position: 'absolute', bottom: 0, right:0, width: 100, height:50, border: '2px solid #1f1f1f' },
    row: { display: 'flex'}
  });


const borderColor = '#0f0f0f'
const styles2 = StyleSheet.create({
    row: {
        flexDirection: 'row',
        borderColor: '#0f0f0f',
        borderBottomWidth: 0,//1,
        alignItems: 'center',
        height: 25,
       
    },
    description: {
        width: '60%',
        textAlign: 'left',
        borderRightColor: borderColor,
        borderRightWidth: 0,//1,
        paddingLeft: 8,
        height: '100%',
    },
    qty: {
        width: '10%',
        borderRightColor: borderColor,
        borderRightWidth: 0,//1,
        textAlign: 'right',
        paddingRight: 8,
        height: '100%',
    },
    rate: {
        width: '15%',
        borderRightColor: borderColor,
        borderRightWidth: 0,//1,
        textAlign: 'right',
        paddingRight: 8,
        height: '100%',
    },
    amount: {
        width: '15%',
        textAlign: 'right',
        paddingRight: 8,
        height: '100%',
    },
});

const ExampleSvg = () => (
  <Svg width="200" height="200" viewBox="-100 -100 200 250">
    <Polygon points="0,0 80,120 -80,120" fill="#234236" />
    <Polygon points="0,-40 60,60 -60,60" fill="#0C5C4C" />
    <Polygon points="0,-80 40,0 -40,0" fill="#38755B" />
    <Rect x="-20" y="120" width="40" height="30" fill="#A32B2D" />
  </Svg>
);

const componentProps = {
  x: 200,
  y: 200,

  /*'text-anchor': node.getAttribute('text-anchor'),
  'data-z-index': node.getAttribute('data-z-index'),*/
}

const PdfToShow = ({ specData}) => (
  <Document>
    {<Page size="A2" >
        Здесь будет SVG из DOM
        <Svg width="200" height="200" viewBox="-100 -100 200 250">
          <Text {...componentProps}>123123</Text>
          </Svg>
    </Page>}
    <Page size="A4" style={styles.page}>
        <View style={styles.section}>
            <Text children="23423423" />
            {specData.slice(0,22).map((item, index) => (
                 <View style={index !== 0 ? styles2.row: ({...styles2.row, borderTop:1}) } key={item.idTemplate.toString()}>
                    <Text style={styles2.qty}>{item.idTemplate}</Text>
                    <Text style={styles2.description}>{item.name}</Text>
                    <Text style={styles2.qty}>{item.quantity}</Text>
                    <Text style={styles.rate}>{item.category}</Text>
                </View>
            ))}
            <View style={styles.footer}>
            </View>
        </View>
    </Page>
    {specData.length > 22 &&
      <Page size="A4" style={styles.page}>
      <View style={styles.section}>
          <Text children="23423423" />
          {specData.slice(22,44).map((item, index) => (
               <View style={index !== 0 ? styles2.row: ({...styles2.row, borderTop:1}) } key={item.idTemplate.toString()}>
                  <Text style={styles2.qty}>{item.idTemplate}</Text>
                  <Text style={styles2.description}>{item.name}</Text>
                  <Text style={styles2.qty}>{item.quantity}</Text>
                  <Text style={styles.rate}>{item.category}</Text>
              </View>
          ))}
          <View style={styles.footer}>
          </View>
      </View>
    </Page>
    }
  </Document>
);

export default PdfToShow;