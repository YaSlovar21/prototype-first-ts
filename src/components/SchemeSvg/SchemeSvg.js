
import React from 'react';
import { ReactSVG } from 'react-svg';
import { Text, Svg, Rect, G, ClipPath, Defs, Path, Tspan, Polyline,Line , Polygon, PDFViewer, Page, Document, Canvas, Image } from '@react-pdf/renderer';
import { getStyleObjectFromString, parseIntAttributes } from '../../utils/funcs';

import html2canvas from 'html2canvas';
import styles from './SchemeSvg.module.css';

function renderNode(node) {
    let Component;
    let componentProps = {};
    switch(node.tagName.toUpperCase()) {
    case "SVG": 
        Component = Svg
        componentProps = {
        height: node.getAttribute('viewBox').split(' ')[3],
        width: node.getAttribute('viewBox').split(' ')[2],
        viewBox: node.getAttribute('viewBox'),
        style: {
            fontSize: '12px'
        }
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
            x: parseIntAttributes(node.getAttribute('x')),
            'text-anchor': node.getAttribute('text-anchor'),
            'data-z-index': node.getAttribute('data-z-index'),
            style: getStyleObjectFromString(node.getAttribute('style')),
            y: parseIntAttributes(node.getAttribute('y'))
        }
        break;
    case "PATH":
        Component = Path
        componentProps = {
        'data-z-index': node.getAttribute('data-z-index'),
        d: node.getAttribute('d'),
        fill: node.getAttribute('fill'),
        opacity: node.getAttribute('opacity')
        }
        break;
    case "TSPAN":
        componentProps = {
        x: parseIntAttributes(node.getAttribute("x")),
        y: parseIntAttributes(node.getAttribute("y")),
        fill: node.getAttribute("fill"),
        stroke: node.getAttribute("stroke"),
        "stroke-width": node.getAttribute("stroke-width"),
        "stroke-linejoin": node.getAttribute("stroke-linejoin"),
        opacity: parseIntAttributes(node.getAttribute('opacity')),
        visibility: node.getAttribute('visibility'),
        fontWeight: node.getAttribute('fontWeight')
        }
        Component = Tspan
        break;
    case "DESC":
        return null;
    case "STYLE": 
        return null;
    case "POLYLINE": 
        componentProps = {

        }
        Component = Polyline
        break;
    case "LINE": 
        componentProps = {
            x1: parseIntAttributes(node.getAttribute('x1')),
            y1: parseIntAttributes(node.getAttribute('y1')),
            x2: parseIntAttributes(node.getAttribute('x2')),
            y2: parseIntAttributes(node.getAttribute('y2')),
            strokeWidth: "1",
        }
        Component = Line
        break;
    case "POLYGON": 
        componentProps = {

        }
        Component = Polygon
        break;
    default:
        throw new Error(`unsupported type ${node.tagName}`)
    }

    console.log(Component);
    if(node.children) {
        console.log('МЫ в дочерних элементах')
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

async function screenshotSvg() {
    return await html2canvas(document.querySelector('.svg-container'));
    /*return (
        <PDFViewer>
            <Document>
                <Page size="A4">
                    <Canvas>
                        
                    </Canvas>
                </Page>
            </Document>
        </PDFViewer>
    );*/
}

function SchemeSvg({onSvgRendered}) {
    
    const [isSvgRendered, setIsSvgRendered] = React.useState(false);
    const [isCanvasReady, setIsCanvasReady] = React.useState(false);
    const [dataImg, setDataImg] = React.useState(null);
    React.useEffect(()=> {
        html2canvas(document.querySelector('.svg-container'))
          .then(canvas => {
            setDataImg(canvas.toDataURL('img/svg'));
            console.log(dataImg);
            setIsCanvasReady(true);
          })
          .catch(e => {
            console.log(e);
          });
      }, [isSvgRendered]);
 
    return (
        <div className='svg-container w-full '>
            <ReactSVG  
                src="http://postatic.utermo.ru.website.yandexcloud.net/gvs-odn-new2001.svg" 
                afterInjection={(svg) => {
                    //console.log(svg.tagName);
                    //onSvgRendered(svg);
                    svg.classList.add('svg-rendered');
                    setIsSvgRendered(true);
                    svg.setAttribute('width', '100%');
                    svg.setAttribute('height', '100%')
                    console.log('afterInjection')
                }}
            />
            
            {isCanvasReady && 
                <PDFViewer>
                    <Document>
                        <Page size="A4" orientation='landscape'>
                            <Image source={dataImg} />
                        </Page>
                    </Document>
                </PDFViewer>
            }
                    
        </div>
    );
}


export default SchemeSvg;