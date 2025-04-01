
import React from 'react';
import { ReactSVG } from 'react-svg';
import { Text, Svg, Rect, G, ClipPath, Defs, Path, Tspan, Polyline,Line , Polygon, PDFViewer, Page, Document, Canvas, Image, Font, StyleSheet } from '@react-pdf/renderer';
import { getStyleObjectFromString, parseIntAttributes } from '../../utils/funcs';

import cn from './SchemeSvgReal2025.module.css';

import html2canvas from 'html2canvas';

import fontSource from '../../vendor/GOST_type_A.woff';
import { CircularProgress } from '@mui/joy';
Font.register({ family: 'GOST_type_A', src: fontSource });

function renderNode(node) {
    console.log(node);
    let Component;
    let componentProps = {};
    switch(node.tagName.toUpperCase()) {
    case "SVG": 
        Component = Svg
        componentProps = {
        xmlns: 'http://www.w3.org/2000/svg',
        
        fontFamily: 'GOST_type_A',
        
        width: node.getAttribute('width'),
        height: node.getAttribute('height'),
        viewBox: node.getAttribute('viewBox'),
        //width: "100%",
        //height: "auto",
        }
        break;
    case "RECT": 
          Component = Rect
          componentProps = {
          x: parseIntAttributes(node.getAttribute('x')),
          y: parseIntAttributes(node.getAttribute('y')),
          fill: node.getAttribute('fill'),
          width: parseIntAttributes(node.getAttribute('width')),
          height: parseIntAttributes(node.getAttribute('height')),
          rx: parseIntAttributes(node.getAttribute('rx')),
          ry: parseIntAttributes(node.getAttribute('ry'))
        }
        break
    case "CLIPPATH": 
        Component = ClipPath
        componentProps = {
            id: node.getAttribute('id'),
        }
        break;
    case "DEFS":
        Component = Defs
        break;
    case "G":
        Component = G
        componentProps = {
        'data-z-index': node.getAttribute('data-z-index'),
        opacity: node.getAttribute('opacity'),
        transform: node.getAttribute('transform'),
        'clip-path': node.getAttribute('clip-path'),
        visibility: node.getAttribute('visibility')
        }
        break;
    case "TEXT":
      Component = Text
        componentProps = {
          
          'text-anchor': node.getAttribute('text-anchor'),
          'data-z-index': node.getAttribute('data-z-index'),
          
          transform: node.getAttribute('transform'),
          x: "0 30 50 70 90",
          y: "0",
          fontSize: 6,
          opacity: '1',
          
          //fontSize: node.getAttribute('font-size'),
          fill: node.getAttribute("fill"),
          stroke: node.getAttribute("stroke"),
         // letterSpacing: 2,
        }
        //let fs = `${Math.floor(Number(node.getAttribute('font-size'))+5)}`;
    
        //console.log(JSON.stringify(node.textContent).replace(/\r\n|\n\r|\n|\r/g, ''));
        

        return (<Text {...componentProps} style={{letterSpacing: '.125em', fontSize: '2em'}}>{node.textContent}</Text>)
        /*return null;
        //break;
        //console.log(node.textContent, '0--------------------------')*/
    case "PATH":
          Component = Path
          componentProps = {
            'data-z-index': node.getAttribute('data-z-index'),
            d: node.getAttribute('d'),
            fill: node.getAttribute('fill'),
            opacity: node.getAttribute('opacity'),
            transform: node.getAttribute('transform'),
            stroke: node.getAttribute('stroke'),
            strokeWidth: node.getAttribute('stroke-width'),
          }
        break;
    case "TSPAN":
     return null
    case "DESC":
        return null;
    case "STYLE": 
        return null;
    case "TITLE": 
        return null;
    case "POLYLINE": 
        componentProps = {
            fill: node.getAttribute('fill'),
            strokeWidth: parseIntAttributes(node.getAttribute('stroke-width')),
            points: node.getAttribute('points'),
            stroke: node.getAttribute("stroke"),
        }
        Component = Polyline
        break;
    case "LINE": 
        componentProps = {
            stroke: node.getAttribute("stroke"),
            x1: parseIntAttributes(node.getAttribute('x1')),
            y1: parseIntAttributes(node.getAttribute('y1')),
            x2: parseIntAttributes(node.getAttribute('x2')),
            y2: parseIntAttributes(node.getAttribute('y2')),
            strokeWidth: parseIntAttributes(node.getAttribute('stroke-width')),
        }
        Component = Line
        break;
    case "POLYGON": 
        componentProps = {
            points: node.getAttribute('points'),
            stroke: node.getAttribute("stroke"),
            fill: node.getAttribute('fill'),
        }
        Component = Polygon
        break;
    default:
        throw new Error(`unsupported type ${node.tagName}`)
    }

    if(node.children) {
        //console.log('МЫ в дочерних элементах')
        return (
            <Component {...componentProps} >
                {Array.from(node.children).map(renderNode)}
            </Component>
        )
    } 
  
    return (
        <Component {...componentProps} />
    )
}

const styles = StyleSheet.create({
  page: { fontFamily: 'GOST_type_A', letterSpacing: 2, display: 'flex', flexDirection: 'column', alignItems:'flex-start'},
});

function SchemeSvgReal2025({nodes}) {

    return (
      
        <div className={`svg-container max-w-6xl w-full ${cn.svgcontproto}`}>
          
             <PDFViewer className='w-full h-screen'>
                <Document>
                    <Page size="A3"  style={styles.page}> {/*orientation='landscape'*/}
                        {nodes.map(node => renderNode(node))}   
                    </Page>
                </Document>
              </PDFViewer>   
              
        </div>
    );
}


export default SchemeSvgReal2025;