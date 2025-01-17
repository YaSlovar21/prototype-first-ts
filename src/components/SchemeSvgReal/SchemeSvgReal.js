
import React from 'react';
import { ReactSVG } from 'react-svg';
import { Text, Svg, Rect, G, ClipPath, Defs, Path, Tspan, Polyline,Line , Polygon, PDFViewer, Page, Document, Canvas, Image } from '@react-pdf/renderer';
import { getStyleObjectFromString, parseIntAttributes } from '../../utils/funcs';

import html2canvas from 'html2canvas';

function renderNode(node) {
    let Component;
    let componentProps = {};
    switch(node.tagName.toUpperCase()) {
    case "SVG": 
        Component = Svg
        componentProps = {
        xmlns: 'http://www.w3.org/2000/svg',
    
        width: node.getAttribute('width'),
        height: node.getAttribute('height'),
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
        //Component = Text
        /*componentProps = {
            x: 200,
            y: 200,
            children: JSON.parse(JSON.stringify(node.textContent)),
            /*'text-anchor': node.getAttribute('text-anchor'),
            'data-z-index': node.getAttribute('data-z-index'),
            style: getStyleObjectFromString(node.getAttribute('style')),
            fontSize: node.getAttribute('font-size'),
            transform: node.getAttribute('transform'),
        }*/
        //return null;
        //break;
        //console.log(node.textContent, '0--------------------------')
        return <Text>iii</Text>;
    case "PATH":
        Component = Path
        componentProps = {
        'data-z-index': node.getAttribute('data-z-index'),
        d: node.getAttribute('d'),
        fill: node.getAttribute('fill'),
        opacity: node.getAttribute('opacity'),
        stroke: node.getAttribute("stroke"),
        }
        break;
    case "TSPAN":
        return null;
       /* componentProps = {
            x: parseIntAttributes(node.getAttribute("x")),
            y: parseIntAttributes(node.getAttribute("y")),
            fill: node.getAttribute("fill"),
            stroke: node.getAttribute("stroke"),
            "stroke-width": node.getAttribute("stroke-width"),
            "stroke-linejoin": node.getAttribute("stroke-linejoin"),
            opacity: parseIntAttributes(node.getAttribute('opacity')),
            visibility: node.getAttribute('visibility'),
            fontWeight: node.getAttribute('fontWeight'),
            children: node.textContent,
        }
        Component = React.Fragment*/
        break;
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

function SchemeSvgReal({onSvgRendered}) {
    
    const [isSvgRendered, setIsSvgRendered] = React.useState(false);
    const [isCanvasReady, setIsCanvasReady] = React.useState(false);

 
    return (
        <>
        
        <div className='svg-container max-w-6xl'>
            
            <ReactSVG  
                src="http://postatic.utermo.ru.website.yandexcloud.net/gvs-odn.svg" 
                afterInjection={(svg) => {
                    //console.log(svg.tagName);
                    //onSvgRendered(svg);
                    svg.classList.add('svg-rendered');
                    setIsSvgRendered(true)
                }}
            />
            <div className='flex flex-col p-[0.02%]'>
            {isSvgRendered &&  
            <>
                <PDFViewer>
                    <Document>
                        <Page size="A4">
                            {renderNode(document.querySelector('.svg-container svg'))}    
                        </Page>
                    </Document>
                </PDFViewer>
                    <div className='my-20'>
               
                </div>
                </>
            }
            </div>        
        </div>
        <div className='svg-static'>
        {/*<svg xmlns="http://www.w3.org/2000/svg"width="296.97mm" height="209.97mm" viewBox="0 0 841.8 595.19" class="injected-svg svg-rendered"  role="img">
  <defs>
    <clipPath id="a-3">
      <polyline points="0.01 595.19 841.8 595.19 841.8 0 0.01 0 0.01 595.19" fill="none"></polyline>
    </clipPath>
  </defs>
  <title>Монтажная область 1</title>
  <g clip-path="url(#a-3)">
    <g>
      <line x1="331.44" y1="235.44" x2="331.44" y2="228.48" fill="none" stroke="red" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.68"></line>
      <line x1="331.44" y1="218.28" x2="331.44" y2="212.04" fill="none" stroke="red" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.68"></line>
      <polygon points="331.44 206.88 334.08 212.04 328.92 212.04 331.44 206.88" fill="red"></polygon>
      <polygon points="331.44 206.88 334.08 212.04 328.92 212.04 331.44 206.88" fill="none"></polygon>
      <polyline points="328.92 212.04 331.44 206.88 334.08 212.04 328.92 212.04" fill="none" stroke="red" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.68"></polyline>
      <line x1="761.04" y1="235.56" x2="761.04" y2="235.56" fill="none" stroke="red" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.68"></line>
      <line x1="756" y1="235.56" x2="305.52" y2="235.56" fill="none" stroke="red" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.68"></line>
      <line x1="90.37" y1="235.68" x2="127.57" y2="235.68" fill="none" stroke="red" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.68"></line>
      <line x1="130.69" y1="235.68" x2="135.01" y2="235.68" fill="none" stroke="red" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.68"></line>
      <line x1="145.33" y1="235.68" x2="149.65" y2="235.68" fill="none" stroke="red" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.68"></line>
      <line x1="152.77" y1="235.68" x2="252.37" y2="235.68" fill="none" stroke="red" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.68"></line>
      <line x1="233.89" y1="235.68" x2="233.89" y2="228.72" fill="none" stroke="red" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.68"></line>
      <line x1="233.89" y1="218.52" x2="233.89" y2="212.16" fill="none" stroke="red" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.68"></line>
      <polygon points="233.88 207.12 236.41 212.16 231.25 212.16 233.88 207.12" fill="red"></polygon>
      <polygon points="233.88 207.12 236.41 212.16 231.25 212.16 233.88 207.12" fill="none"></polygon>
      <polyline points="236.41 212.16 233.88 207.12 231.25 212.16 236.41 212.16" fill="none" stroke="red" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.68"></polyline>
      <line x1="510.36" y1="282.48" x2="510.36" y2="287.4" fill="none" stroke="blue" stroke-linecap="round" stroke-linejoin="round" stroke-width="0.84"></line>
      <line x1="510.36" y1="294.6" x2="510.36" y2="300" fill="none" stroke="blue" stroke-linecap="round" stroke-linejoin="round" stroke-width="0.84"></line>
      <polygon points="508.56 298.44 512.04 298.44 510.36 302.04 508.56 298.44" fill="blue"></polygon>
      <polygon points="508.56 298.44 512.04 298.44 510.36 302.04 508.56 298.44" fill="none"></polygon>
      <polyline points="508.56 298.44 510.36 302.04 512.04 298.44 508.56 298.44" fill="none" stroke="blue" stroke-linecap="round" stroke-linejoin="round" stroke-width="0.84"></polyline>
      <line x1="510.36" y1="324.95" x2="510.36" y2="329.99" fill="none" stroke="blue" stroke-linecap="round" stroke-linejoin="round" stroke-width="0.84"></line>
      <line x1="510.36" y1="337.07" x2="510.36" y2="342.47" fill="none" stroke="blue" stroke-linecap="round" stroke-linejoin="round" stroke-width="0.84"></line>
      <polygon points="508.56 341.04 512.04 341.04 510.36 344.63 508.56 341.04" fill="blue"></polygon>
      <polygon points="508.56 341.04 512.04 341.04 510.36 344.63 508.56 341.04" fill="none"></polygon>
      <polyline points="508.56 341.04 510.36 344.63 512.04 341.04 508.56 341.04" fill="none" stroke="blue" stroke-linecap="round" stroke-linejoin="round" stroke-width="0.84"></polyline>
      <line x1="740.28" y1="303.72" x2="756" y2="303.72" fill="none" stroke="blue" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.68"></line>
      <line x1="560.64" y1="399.47" x2="564.72" y2="399.47" fill="none" stroke="blue" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.68"></line>
      <line x1="567.96" y1="399.47" x2="709.2" y2="399.47" fill="none" stroke="blue" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.68"></line>
      <line x1="416.88" y1="303.72" x2="416.88" y2="399.47" fill="none" stroke="blue" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.68"></line>
    </g>
  </g>
  <g clip-path="url(#a-3)">
    <g>
      <text transform="translate(695.28 363.47)" font-size="8.21" font-family="GOSTTypeB, GOST type B">3.11,12</text>
    </g>
  </g>
  <g clip-path="url(#a-3)">
    <g>
      <polyline points="694.2 372.35 694.2 364.67 695.76 364.67 714.36 364.67" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="0.24"></polyline>
      <g>
        <text transform="translate(737.16 363.47)" font-size="8.21" font-family="GOSTTypeB, GOST type B">3.11,12</text>
      </g>
      <polyline points="736.44 372.35 736.44 364.67 737.64 364.67 756.24 364.67" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="0.24"></polyline>
      <line x1="416.88" y1="399.47" x2="478.08" y2="399.47" fill="none" stroke="blue" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.68"></line>
      <line x1="488.28" y1="399.47" x2="542.64" y2="399.47" fill="none" stroke="blue" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.68"></line>
      <line x1="545.76" y1="399.47" x2="549.96" y2="399.47" fill="none" stroke="blue" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.68"></line>
      <line x1="719.4" y1="399.47" x2="755.28" y2="399.47" fill="none" stroke="blue" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.68"></line>
      <g>
        <text transform="translate(761.4 389.39)" font-size="8.21" font-family="GOSTTypeB, GOST type B">3.9</text>
      </g>
      <polyline points="760.32 399.47 760.32 390.47 761.88 390.47 770.4 390.47" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="0.24"></polyline>
      <g>
        <text transform="translate(715.2 418.19)" font-size="8.21" font-family="GOSTTypeB, GOST type B">3.7</text>
      </g>
      <polyline points="714.24 403.91 714.24 419.27 715.8 419.27 724.2 419.27" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="0.24"></polyline>
      <g>
        <text transform="translate(486.12 384.23)" font-size="8.21" font-family="GOSTTypeB, GOST type B">3.8</text>
      </g>
      <polyline points="483.12 399.47 483.12 385.31 486.6 385.31 495.72 385.31" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="0.24"></polyline>
      <g>
        <text transform="translate(557.76 383.75)" font-size="8.21" font-family="GOSTTypeB, GOST type B">3.13</text>
      </g>
      <polyline points="555.24 394.19 555.36 384.95 558.24 384.95 569.52 384.95" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="0.24"></polyline>
      <line x1="90.37" y1="303.72" x2="252.37" y2="303.72" fill="none" stroke="blue" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.68"></line>
      <line x1="233.89" y1="303.72" x2="233.89" y2="310.68" fill="none" stroke="blue" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.68"></line>
      <line x1="233.89" y1="320.87" x2="233.89" y2="327.11" fill="none" stroke="blue" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.68"></line>
      <polygon points="231.25 327.12 236.41 327.12 233.88 332.27 231.25 327.12" fill="blue"></polygon>
      <polygon points="231.25 327.12 236.41 327.12 233.88 332.27 231.25 327.12" fill="none"></polygon>
      <polyline points="231.25 327.12 233.88 332.27 236.41 327.12 231.25 327.12" fill="none" stroke="blue" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.68"></polyline>
      <line x1="328.56" y1="303.72" x2="328.56" y2="310.68" fill="none" stroke="blue" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.68"></line>
      <line x1="328.56" y1="320.87" x2="328.56" y2="327.11" fill="none" stroke="blue" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.68"></line>
      <polygon points="325.92 327.12 331.08 327.12 328.56 332.27 325.92 327.12" fill="blue"></polygon>
      <polygon points="325.92 327.12 331.08 327.12 328.56 332.27 325.92 327.12" fill="none"></polygon>
      <polyline points="325.92 327.12 328.56 332.27 331.08 327.12 325.92 327.12" fill="none" stroke="blue" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.68"></polyline>
      <line x1="446.4" y1="303.72" x2="399.36" y2="303.72" fill="none" stroke="blue" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.68"></line>
      <line x1="389.16" y1="303.72" x2="305.52" y2="303.72" fill="none" stroke="blue" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.68"></line>
      <polyline points="616.68 303.71 627.72 303.71 684 303.71" fill="none" stroke="blue" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.68"></polyline>
      <line x1="694.2" y1="303.72" x2="730.08" y2="303.72" fill="none" stroke="blue" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.68"></line>
      <path d="M416.76,301.56l.72.12H416.4Zm.36,0h-.36l.72.12-.36-.12Z" fill="blue"></path>
      <path d="M416.76,301.56l.72.12H416.4Zm.36,0h-.36l.72.12-.36-.12Z" fill="none"></path>
      <path d="M416.4,301.68l1.44.12H416Zm1.08,0H416.4l1.44.12-.36-.12Z" fill="blue"></path>
      <path d="M416.4,301.68l1.44.12H416Zm1.08,0H416.4l1.44.12-.36-.12Z" fill="none"></path>
      <path d="M416,301.8l2.16.24h-2.52Zm1.8,0H416l2.16.24-.36-.24Z" fill="blue"></path>
      <path d="M416,301.8l2.16.24h-2.52Zm1.8,0H416l2.16.24-.36-.24Z" fill="none"></path>
      <path d="M415.68,302l2.88.24h-3.24Zm2.52,0h-2.52l2.88.24-.36-.24Z" fill="blue"></path>
      <path d="M415.68,302l2.88.24h-3.24Zm2.52,0h-2.52l2.88.24-.36-.24Z" fill="none"></path>
      <path d="M415.32,302.28l3.48.24h-3.72Zm3.24,0h-3.24l3.48.24-.24-.24Z" fill="blue"></path>
      <path d="M415.32,302.28l3.48.24h-3.72Zm3.24,0h-3.24l3.48.24-.24-.24Z" fill="none"></path>
      <path d="M415.08,302.52l3.84.36h-4Zm3.72,0h-3.72l3.84.36Z" fill="blue"></path>
      <path d="M415.08,302.52l3.84.36h-4Zm3.72,0h-3.72l3.84.36Z" fill="none"></path>
      <path d="M415,302.88l4.08.36h-4.2l.12-.36Zm4,0h-4l4.08.36Z" fill="blue"></path>
      <path d="M415,302.88l4.08.36h-4.2l.12-.36Zm4,0h-4l4.08.36Z" fill="none"></path>
      <path d="M414.84,303.24l4.2.48h-4.2Zm4.2,0h-4.2l4.2.48Z" fill="blue"></path>
      <path d="M414.84,303.24l4.2.48h-4.2Zm4.2,0h-4.2l4.2.48Z" fill="none"></path>
      <path d="M416.88,303.72l2.16.36h-2.16Zm2.16,0h-2.16l2.16.36Z" fill="blue"></path>
      <path d="M416.88,303.72l2.16.36h-2.16Zm2.16,0h-2.16l2.16.36Z" fill="none"></path>
      <path d="M414.84,303.72l2,.36h-2Zm2,0h-2l2,.36Z" fill="blue"></path>
      <path d="M414.84,303.72l2,.36h-2Zm2,0h-2l2,.36Z" fill="none"></path>
      <path d="M416.88,304.08l2,.36h-2Zm2.16,0h-2.16l2,.36Z" fill="blue"></path>
      <path d="M416.88,304.08l2,.36h-2Zm2.16,0h-2.16l2,.36Z" fill="none"></path>
      <path d="M414.84,304.08l2,.36H415Zm2,0h-2l2,.36Z" fill="blue"></path>
      <path d="M414.84,304.08l2,.36H415Zm2,0h-2l2,.36Z" fill="none"></path>
      <path d="M416.88,304.44l1.92.36h-1.92Zm2,0h-2l1.92.36Z" fill="blue"></path>
      <path d="M416.88,304.44l1.92.36h-1.92Zm2,0h-2l1.92.36Z" fill="none"></path>
      <path d="M415,304.44l1.92.36h-1.8l-.12-.36Zm1.92,0H415l1.92.36Z" fill="blue"></path>
      <path d="M415,304.44l1.92.36h-1.8l-.12-.36Zm1.92,0H415l1.92.36Z" fill="none"></path>
      <path d="M416.88,304.8l1.68.24h-1.68Zm1.92,0h-1.92l1.68.24.24-.24Z" fill="blue"></path>
      <path d="M416.88,304.8l1.68.24h-1.68Zm1.92,0h-1.92l1.68.24.24-.24Z" fill="none"></path>
      <path d="M415.08,304.8l1.8.24h-1.56Zm1.8,0h-1.8l1.8.24Z" fill="blue"></path>
      <path d="M415.08,304.8l1.8.24h-1.56Zm1.8,0h-1.8l1.8.24Z" fill="none"></path>
      <path d="M416.88,305l1.44.24h-1.44Zm1.68,0h-1.68l1.44.24Z" fill="blue"></path>
      <path d="M416.88,305l1.44.24h-1.44Zm1.68,0h-1.68l1.44.24Z" fill="none"></path>
      <path d="M415.32,305l1.56.24h-1.32Zm1.56,0h-1.56l1.56.24Z" fill="blue"></path>
      <path d="M415.32,305l1.56.24h-1.32Zm1.56,0h-1.56l1.56.24Z" fill="none"></path>
      <path d="M416.88,305.28l1.08.24h-1.08Zm1.44,0h-1.44l1.08.24.36-.24Z" fill="blue"></path>
      <path d="M416.88,305.28l1.08.24h-1.08Zm1.44,0h-1.44l1.08.24.36-.24Z" fill="none"></path>
      <path d="M415.56,305.28l1.32.24h-1l-.36-.24Zm1.32,0h-1.32l1.32.24Z" fill="blue"></path>
      <path d="M415.56,305.28l1.32.24h-1l-.36-.24Zm1.32,0h-1.32l1.32.24Z" fill="none"></path>
      <path d="M416.88,305.52l.84.12h-.84Zm1.08,0h-1.08l.84.12Z" fill="blue"></path>
      <path d="M416.88,305.52l.84.12h-.84Zm1.08,0h-1.08l.84.12Z" fill="none"></path>
      <path d="M415.92,305.52l1,.12h-.72Zm1,0h-1l1,.12Z" fill="blue"></path>
      <path d="M415.92,305.52l1,.12h-.72Zm1,0h-1l1,.12Z" fill="none"></path>
      <path d="M417.36,305.76h-.48v-.12Zm0,0Z" fill="blue"></path>
      <path d="M417.36,305.76h-.48v-.12Zm0,0Z" fill="none"></path>
      <polygon points="416.88 305.63 417.72 305.63 417.36 305.75 416.88 305.63" fill="blue"></polygon>
      <polygon points="416.88 305.63 417.72 305.63 417.36 305.75 416.88 305.63" fill="none"></polygon>
      <path d="M416.16,305.64l.72.12h-.36l-.36-.12Zm.72,0h-.72l.72.12Z" fill="blue"></path>
      <path d="M416.16,305.64l.72.12h-.36l-.36-.12Zm.72,0h-.72l.72.12Z" fill="none"></path>
      <path d="M419,303.66a2.1,2.1,0,1,0-2.1,2.1,2.1,2.1,0,0,0,2.1-2.1" fill="none" stroke="blue" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.68"></path>
      <line x1="140.17" y1="222.96" x2="140.17" y2="217.68" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="0.24"></line>
      <line x1="140.17" y1="214.2" x2="140.17" y2="210.6" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="0.24"></line>
      <line x1="140.17" y1="207.12" x2="140.17" y2="203.52" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="0.24"></line>
      <line x1="140.17" y1="200.04" x2="140.17" y2="196.44" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="0.24"></line>
      <line x1="140.17" y1="192.96" x2="140.17" y2="189.36" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="0.24"></line>
      <line x1="140.17" y1="185.88" x2="140.17" y2="180.6" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="0.24"></line>
      <line x1="468" y1="208.2" x2="468" y2="203.28" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="0.24"></line>
      <line x1="468" y1="199.68" x2="468" y2="196.2" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="0.24"></line>
      <line x1="468" y1="192.6" x2="468" y2="189.12" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="0.24"></line>
      <line x1="468" y1="185.52" x2="468" y2="180.6" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="0.24"></line>
      <g>
        <text transform="translate(87.37 222.36)" font-size="8.21" font-family="GOSTTypeB, GOST type B">3.10</text>
      </g>
      <polyline points="85.21 235.68 85.21 223.56 87.85 223.56 99.13 223.56" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="0.24"></polyline>
      <g>
        <text transform="translate(87.73 290.4)" font-size="8.21" font-family="GOSTTypeB, GOST type B">3.10</text>
      </g>
      <polyline points="85.21 303.71 85.21 291.6 88.33 291.6 99.61 291.6" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="0.24"></polyline>
      <g>
        <text transform="translate(94.33 196.92)" font-size="8.21" font-family="GOSTTypeB, GOST type B">3.11,12</text>
      </g>
      <polyline points="114.49 208.44 114.49 198.12 113.41 198.12 94.93 198.12" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="0.24"></polyline>
      <g>
        <text transform="translate(128.65 249.96)" font-size="8.21" font-family="GOSTTypeB, GOST type B">3.3</text>
      </g>
      <polyline points="140.17 235.68 140.17 251.16 137.53 251.16 129.13 251.16" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="0.24"></polyline>
      <g>
        <text transform="translate(214.69 222.48)" font-size="8.21" font-family="GOSTTypeB, GOST type B">3.18</text>
      </g>
      <polyline points="233.88 223.56 227.04 223.56 215.29 223.56" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="0.24"></polyline>
      <g>
        <text transform="translate(206.05 199.68)" font-size="8.21" font-family="GOSTTypeB, GOST type B">3.11,12</text>
      </g>
      <polyline points="205.21 208.44 205.21 200.76 206.53 200.76 225.13 200.76" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="0.24"></polyline>
      <g>
        <text transform="translate(179.29 200.16)" font-size="8.21" font-family="GOSTTypeB, GOST type B">3.15</text>
      </g>
      <polyline points="178.57 208.44 178.57 201.24 179.89 201.24 191.05 201.24" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="0.24"></polyline>
      <g>
        <text transform="translate(391.44 199.92)" font-size="8.21" font-family="GOSTTypeB, GOST type B">3.15</text>
      </g>
      <polyline points="388.2 208.2 388.2 201 392.04 201 403.2 201" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="0.24"></polyline>
      <g>
        <text transform="translate(386.64 268.08)" font-size="8.21" font-family="GOSTTypeB, GOST type B">3.15</text>
      </g>
      <polyline points="383.04 276.48 383.04 269.28 387.24 269.28 398.52 269.28" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="0.24"></polyline>
      <g>
        <text transform="translate(339.48 222.24)" font-size="8.21" font-family="GOSTTypeB, GOST type B">3.18</text>
      </g>
      <polyline points="331.44 223.44 339.96 223.44 351.84 223.44" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="0.24"></polyline>
      <g>
        <text transform="translate(336.36 314.64)" font-size="8.21" font-family="GOSTTypeB, GOST type B">3.19</text>
      </g>
      <polyline points="328.56 315.71 336.96 315.71 348.24 315.71" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="0.24"></polyline>
      <g>
        <text transform="translate(214.45 314.64)" font-size="8.21" font-family="GOSTTypeB, GOST type B">3.19</text>
      </g>
      <polyline points="233.88 315.71 233.41 315.71 226.21 315.71 214.93 315.71" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="0.24"></polyline>
      <g>
        <text transform="translate(669.48 267.6)" font-size="8.21" font-family="GOSTTypeB, GOST type B">3.11,12</text>
      </g>
      <polyline points="668.52 276.48 668.52 268.8 670.08 268.8 688.56 268.8" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="0.24"></polyline>
      <g>
        <text transform="translate(712.8 267.72)" font-size="8.21" font-family="GOSTTypeB, GOST type B">3.11,12</text>
      </g>
      <polyline points="711.24 276.48 711.24 268.8 713.4 268.8 731.88 268.8" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="0.24"></polyline>
      <g>
        <text transform="translate(690.24 317.87)" font-size="8.21" font-family="GOSTTypeB, GOST type B">3.4</text>
      </g>
      <polyline points="689.16 308.75 689.16 318.95 690.72 318.95 699.72 318.95" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="0.24"></polyline>
      <g>
        <text transform="translate(737.64 293.16)" font-size="8.21" font-family="GOSTTypeB, GOST type B">3.21</text>
      </g>
      <polyline points="735.24 303.71 735.24 294.24 738.24 294.24 749.4 294.24" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="0.24"></polyline>
      <g>
        <text transform="translate(268.08 343.19)" font-size="8.21" font-family="GOSTTypeB, GOST type B">3.1</text>
      </g>
      <polyline points="279 322.68 279 344.39 276 344.39 268.69 344.39" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="0.24"></polyline>
      <g>
        <text transform="translate(396.48 288.36)" font-size="8.21" font-family="GOSTTypeB, GOST type B">3.9</text>
      </g>
      <polyline points="394.2 303.71 394.2 289.56 396.96 289.56 405.48 289.56" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="0.24"></polyline>
      <g>
        <text transform="translate(763.2 220.32)" font-size="8.21" font-family="GOSTTypeB, GOST type B">3.9</text>
      </g>
      <polyline points="761.04 235.56 761.04 221.4 763.68 221.4 772.08 221.4" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="0.24"></polyline>
      <g>
        <text transform="translate(621.24 270.96)" font-size="8.21" font-family="GOSTTypeB, GOST type B">3.15</text>
      </g>
      <polyline points="634.8 276.48 634.8 272.04 633 272.04 621.72 272.04" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="0.24"></polyline>
      <g>
        <text transform="translate(206.05 267.6)" font-size="8.21" font-family="GOSTTypeB, GOST type B">3.11,12</text>
      </g>
      <polyline points="205.21 276.48 205.21 268.8 206.53 268.8 225.13 268.8" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="0.24"></polyline>
      <g>
        <text transform="translate(179.29 268.08)" font-size="8.21" font-family="GOSTTypeB, GOST type B">3.15</text>
      </g>
      <polyline points="178.57 276.48 178.57 269.28 179.89 269.28 191.05 269.28" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="0.24"></polyline>
      <g>
        <text transform="translate(341.16 199.44)" font-size="8.21" font-family="GOSTTypeB, GOST type B">3.11,12</text>
      </g>
      <polyline points="361.56 208.2 361.56 200.52 360.24 200.52 341.76 200.52" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="0.24"></polyline>
      <g>
        <text transform="translate(336 267.6)" font-size="8.21" font-family="GOSTTypeB, GOST type B">3.11,12</text>
      </g>
      <polyline points="356.28 276.48 356.28 268.8 355.08 268.8 336.48 268.8" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="0.24"></polyline>
      <polyline points="446.4 324.95 446.4 282.48 457.68 282.48" fill="none" stroke="blue" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.68"></polyline>
      <line x1="467.88" y1="282.48" x2="491.4" y2="282.48" fill="none" stroke="blue" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.68"></line>
      <line x1="501.6" y1="282.48" x2="528" y2="282.48" fill="none" stroke="blue" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.68"></line>
      <line x1="531.24" y1="282.48" x2="533.52" y2="282.48" fill="none" stroke="blue" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.68"></line>
      <line x1="554.76" y1="282.48" x2="557.04" y2="282.48" fill="none" stroke="blue" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.68"></line>
      <polyline points="560.28 282.48 576.36 282.48 592.92 282.48" fill="none" stroke="blue" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.68"></polyline>
      <line x1="603.12" y1="282.48" x2="616.68" y2="282.48" fill="none" stroke="blue" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.68"></line>
      <line x1="446.4" y1="324.95" x2="457.68" y2="324.95" fill="none" stroke="blue" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.68"></line>
      <line x1="467.88" y1="324.95" x2="491.4" y2="324.95" fill="none" stroke="blue" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.68"></line>
      <line x1="501.6" y1="324.95" x2="528" y2="324.95" fill="none" stroke="blue" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.68"></line>
      <line x1="531.24" y1="324.95" x2="533.52" y2="324.95" fill="none" stroke="blue" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.68"></line>
      <line x1="554.76" y1="324.95" x2="557.04" y2="324.95" fill="none" stroke="blue" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.68"></line>
      <polyline points="560.28 324.95 576.36 324.95 592.92 324.95" fill="none" stroke="blue" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.68"></polyline>
      <polyline points="603.12 324.95 616.68 324.95 616.68 282.48" fill="none" stroke="blue" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.68"></polyline>
      <path d="M446.16,301.56l.84.12h-1.2l.36-.12Zm.36,0h-.36l.84.12Z" fill="blue"></path>
      <path d="M446.16,301.56l.84.12h-1.2l.36-.12Zm.36,0h-.36l.84.12Z" fill="none"></path>
      <path d="M445.8,301.68l1.56.12h-1.92l.36-.12Zm1.2,0h-1.2l1.56.12Z" fill="blue"></path>
      <path d="M445.8,301.68l1.56.12h-1.92l.36-.12Zm1.2,0h-1.2l1.56.12Z" fill="none"></path>
      <path d="M445.44,301.8l2.28.24h-2.64l.36-.24Zm1.92,0h-1.92l2.28.24Z" fill="blue"></path>
      <path d="M445.44,301.8l2.28.24h-2.64l.36-.24Zm1.92,0h-1.92l2.28.24Z" fill="none"></path>
      <path d="M445.08,302l2.88.24h-3.12Zm2.64,0h-2.64l2.88.24Z" fill="blue"></path>
      <path d="M445.08,302l2.88.24h-3.12Zm2.64,0h-2.64l2.88.24Z" fill="none"></path>
      <path d="M444.84,302.28l3.36.24h-3.6l.24-.24Zm3.12,0h-3.12l3.36.24Z" fill="blue"></path>
      <path d="M444.84,302.28l3.36.24h-3.6l.24-.24Zm3.12,0h-3.12l3.36.24Z" fill="none"></path>
      <path d="M444.6,302.52l3.72.36h-4Zm3.6,0h-3.6l3.72.36Z" fill="blue"></path>
      <path d="M444.6,302.52l3.72.36h-4Zm3.6,0h-3.6l3.72.36Z" fill="none"></path>
      <path d="M444.36,302.88l4.08.36h-4.2l.12-.36Zm4,0h-4l4.08.36Z" fill="blue"></path>
      <path d="M444.36,302.88l4.08.36h-4.2l.12-.36Zm4,0h-4l4.08.36Z" fill="none"></path>
      <path d="M444.24,303.24l4.32.48h-4.32Zm4.2,0h-4.2l4.32.48Z" fill="blue"></path>
      <path d="M444.24,303.24l4.32.48h-4.32Zm4.2,0h-4.2l4.32.48Z" fill="none"></path>
      <path d="M446.4,303.72l2,.36h-2Zm2.16,0H446.4l2,.36Z" fill="blue"></path>
      <path d="M446.4,303.72l2,.36h-2Zm2.16,0H446.4l2,.36Z" fill="none"></path>
      <path d="M444.24,303.72l2.16.36h-2.16Zm2.16,0h-2.16l2.16.36Z" fill="blue"></path>
      <path d="M444.24,303.72l2.16.36h-2.16Zm2.16,0h-2.16l2.16.36Z" fill="none"></path>
      <path d="M446.4,304.08l1.92.36H446.4Zm2,0h-2l1.92.36Z" fill="blue"></path>
      <path d="M446.4,304.08l1.92.36H446.4Zm2,0h-2l1.92.36Z" fill="none"></path>
      <path d="M444.24,304.08l2.16.36h-2Zm2.16,0h-2.16l2.16.36Z" fill="blue"></path>
      <path d="M444.24,304.08l2.16.36h-2Zm2.16,0h-2.16l2.16.36Z" fill="none"></path>
      <path d="M446.4,304.44l1.8.36h-1.8Zm1.92,0H446.4l1.8.36.12-.36Z" fill="blue"></path>
      <path d="M446.4,304.44l1.8.36h-1.8Zm1.92,0H446.4l1.8.36.12-.36Z" fill="none"></path>
      <path d="M444.36,304.44l2,.36h-1.8l-.24-.36Zm2,0h-2l2,.36Z" fill="blue"></path>
      <path d="M444.36,304.44l2,.36h-1.8l-.24-.36Zm2,0h-2l2,.36Z" fill="none"></path>
      <path d="M446.4,304.8,448,305H446.4Zm1.8,0h-1.8L448,305Z" fill="blue"></path>
      <path d="M446.4,304.8,448,305H446.4Zm1.8,0h-1.8L448,305Z" fill="none"></path>
      <path d="M444.6,304.8l1.8.24h-1.68Zm1.8,0h-1.8l1.8.24Z" fill="blue"></path>
      <path d="M444.6,304.8l1.8.24h-1.68Zm1.8,0h-1.8l1.8.24Z" fill="none"></path>
      <path d="M446.4,305l1.32.24H446.4Zm1.56,0H446.4l1.32.24Z" fill="blue"></path>
      <path d="M446.4,305l1.32.24H446.4Zm1.56,0H446.4l1.32.24Z" fill="none"></path>
      <path d="M444.72,305l1.68.24H445Zm1.68,0h-1.68l1.68.24Z" fill="blue"></path>
      <path d="M444.72,305l1.68.24H445Zm1.68,0h-1.68l1.68.24Z" fill="none"></path>
      <path d="M446.4,305.28l1.08.24H446.4Zm1.32,0H446.4l1.08.24.24-.24Z" fill="blue"></path>
      <path d="M446.4,305.28l1.08.24H446.4Zm1.32,0H446.4l1.08.24.24-.24Z" fill="none"></path>
      <path d="M445,305.28l1.44.24h-1.08l-.36-.24Zm1.44,0H445l1.44.24Z" fill="blue"></path>
      <path d="M445,305.28l1.44.24h-1.08l-.36-.24Zm1.44,0H445l1.44.24Z" fill="none"></path>
      <path d="M446.4,305.52l.72.12h-.72Zm1.08,0H446.4l.72.12Z" fill="blue"></path>
      <path d="M446.4,305.52l.72.12h-.72Zm1.08,0H446.4l.72.12Z" fill="none"></path>
      <path d="M445.32,305.52l1.08.12h-.72Zm1.08,0h-1.08l1.08.12Z" fill="blue"></path>
      <path d="M445.32,305.52l1.08.12h-.72Zm1.08,0h-1.08l1.08.12Z" fill="none"></path>
      <path d="M446.76,305.76h-.36v-.12Zm0,0Z" fill="blue"></path>
      <path d="M446.76,305.76h-.36v-.12Zm0,0Z" fill="none"></path>
      <polygon points="446.4 305.63 447.12 305.63 446.76 305.75 446.4 305.63" fill="blue"></polygon>
      <polygon points="446.4 305.63 447.12 305.63 446.76 305.75 446.4 305.63" fill="none"></polygon>
      <path d="M445.68,305.64l.72.12H446l-.36-.12Zm.72,0h-.72l.72.12Z" fill="blue"></path>
      <path d="M445.68,305.64l.72.12H446l-.36-.12Zm.72,0h-.72l.72.12Z" fill="none"></path>
      <path d="M448.56,303.66a2.1,2.1,0,1,0-2.1,2.1,2.1,2.1,0,0,0,2.1-2.1" fill="none" stroke="blue" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.68"></path>
      <path d="M616.56,301.56l.72.12h-1.2l.48-.12Zm.36,0h-.36l.72.12Z" fill="blue"></path>
      <path d="M616.56,301.56l.72.12h-1.2l.48-.12Zm.36,0h-.36l.72.12Z" fill="none"></path>
      <path d="M616.08,301.68l1.56.12h-1.92Zm1.2,0h-1.2l1.56.12Z" fill="blue"></path>
      <path d="M616.08,301.68l1.56.12h-1.92Zm1.2,0h-1.2l1.56.12Z" fill="none"></path>
      <path d="M615.72,301.8,618,302h-2.52Zm1.92,0h-1.92L618,302l-.36-.24Z" fill="blue"></path>
      <path d="M615.72,301.8,618,302h-2.52Zm1.92,0h-1.92L618,302l-.36-.24Z" fill="none"></path>
      <path d="M615.48,302l2.76.24h-3.12Zm2.52,0h-2.52l2.76.24Z" fill="blue"></path>
      <path d="M615.48,302l2.76.24h-3.12Zm2.52,0h-2.52l2.76.24Z" fill="none"></path>
      <path d="M615.12,302.28l3.36.24h-3.6Zm3.12,0h-3.12l3.36.24Z" fill="blue"></path>
      <path d="M615.12,302.28l3.36.24h-3.6Zm3.12,0h-3.12l3.36.24Z" fill="none"></path>
      <path d="M614.88,302.52l3.84.36h-4Zm3.6,0h-3.6l3.84.36-.24-.36Z" fill="blue"></path>
      <path d="M614.88,302.52l3.84.36h-4Zm3.6,0h-3.6l3.84.36-.24-.36Z" fill="none"></path>
      <path d="M614.76,302.88l4.08.36h-4.2Zm4,0h-4l4.08.36Z" fill="blue"></path>
      <path d="M614.76,302.88l4.08.36h-4.2Zm4,0h-4l4.08.36Z" fill="none"></path>
      <path d="M614.64,303.24l4.2.48h-4.32Zm4.2,0h-4.2l4.2.48Z" fill="blue"></path>
      <path d="M614.64,303.24l4.2.48h-4.32Zm4.2,0h-4.2l4.2.48Z" fill="none"></path>
      <path d="M616.68,303.72l2.16.36h-2.16Zm2.16,0h-2.16l2.16.36Z" fill="blue"></path>
      <path d="M616.68,303.72l2.16.36h-2.16Zm2.16,0h-2.16l2.16.36Z" fill="none"></path>
      <path d="M614.52,303.72l2.16.36h-2Zm2.16,0h-2.16l2.16.36Z" fill="blue"></path>
      <path d="M614.52,303.72l2.16.36h-2Zm2.16,0h-2.16l2.16.36Z" fill="none"></path>
      <path d="M616.68,304.08l2,.36h-2Zm2.16,0h-2.16l2,.36Z" fill="blue"></path>
      <path d="M616.68,304.08l2,.36h-2Zm2.16,0h-2.16l2,.36Z" fill="none"></path>
      <path d="M614.64,304.08l2,.36h-1.92Zm2,0h-2l2,.36Z" fill="blue"></path>
      <path d="M614.64,304.08l2,.36h-1.92Zm2,0h-2l2,.36Z" fill="none"></path>
      <path d="M616.68,304.44l1.92.36h-1.92Zm2,0h-2l1.92.36Z" fill="blue"></path>
      <path d="M616.68,304.44l1.92.36h-1.92Zm2,0h-2l1.92.36Z" fill="none"></path>
      <path d="M614.76,304.44l1.92.36h-1.8Zm1.92,0h-1.92l1.92.36Z" fill="blue"></path>
      <path d="M614.76,304.44l1.92.36h-1.8Zm1.92,0h-1.92l1.92.36Z" fill="none"></path>
      <path d="M616.68,304.8l1.68.24h-1.68Zm1.92,0h-1.92l1.68.24Z" fill="blue"></path>
      <path d="M616.68,304.8l1.68.24h-1.68Zm1.92,0h-1.92l1.68.24Z" fill="none"></path>
      <path d="M614.88,304.8l1.8.24h-1.56Zm1.8,0h-1.8l1.8.24Z" fill="blue"></path>
      <path d="M614.88,304.8l1.8.24h-1.56Zm1.8,0h-1.8l1.8.24Z" fill="none"></path>
      <path d="M616.68,305l1.44.24h-1.44Zm1.68,0h-1.68l1.44.24Z" fill="blue"></path>
      <path d="M616.68,305l1.44.24h-1.44Zm1.68,0h-1.68l1.44.24Z" fill="none"></path>
      <path d="M615.12,305l1.56.24h-1.32Zm1.56,0h-1.56l1.56.24Z" fill="blue"></path>
      <path d="M615.12,305l1.56.24h-1.32Zm1.56,0h-1.56l1.56.24Z" fill="none"></path>
      <path d="M616.68,305.28l1.08.24h-1.08Zm1.44,0h-1.44l1.08.24Z" fill="blue"></path>
      <path d="M616.68,305.28l1.08.24h-1.08Zm1.44,0h-1.44l1.08.24Z" fill="none"></path>
      <path d="M615.36,305.28l1.32.24H615.6Zm1.32,0h-1.32l1.32.24Z" fill="blue"></path>
      <path d="M615.36,305.28l1.32.24H615.6Zm1.32,0h-1.32l1.32.24Z" fill="none"></path>
      <path d="M616.68,305.52l.72.12h-.72Zm1.08,0h-1.08l.72.12.36-.12Z" fill="blue"></path>
      <path d="M616.68,305.52l.72.12h-.72Zm1.08,0h-1.08l.72.12.36-.12Z" fill="none"></path>
      <path d="M615.6,305.52l1.08.12H616l-.36-.12Zm1.08,0H615.6l1.08.12Z" fill="blue"></path>
      <path d="M615.6,305.52l1.08.12H616l-.36-.12Zm1.08,0H615.6l1.08.12Z" fill="none"></path>
      <path d="M617,305.76h-.36v-.12Zm0,0Z" fill="blue"></path>
      <path d="M617,305.76h-.36v-.12Zm0,0Z" fill="none"></path>
      <polygon points="616.68 305.63 617.4 305.63 617.04 305.75 616.68 305.63" fill="blue"></polygon>
      <polygon points="616.68 305.63 617.4 305.63 617.04 305.75 616.68 305.63" fill="none"></polygon>
      <path d="M616,305.64l.72.12h-.36Zm.72,0H616l.72.12Z" fill="blue"></path>
      <path d="M616,305.64l.72.12h-.36Zm.72,0H616l.72.12Z" fill="none"></path>
      <path d="M618.84,303.66a2.1,2.1,0,1,0-2.1,2.1,2.1,2.1,0,0,0,2.1-2.1" fill="none" stroke="blue" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.68"></path>
      <g>
        <text transform="translate(529.92 345.47)" font-size="8.21" font-family="GOSTTypeB, GOST type B">3.2</text>
      </g>
      <polyline points="544.2 335.51 544.32 346.55 538.8 346.55 530.4 346.55" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="0.24"></polyline>
      <g>
        <text transform="translate(451.32 271.44)" font-size="8.21" font-family="GOSTTypeB, GOST type B">3.6</text>
      </g>
      <polyline points="462.84 282.48 462.84 272.52 460.32 272.52 451.92 272.52" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="0.24"></polyline>
      <g>
        <text transform="translate(448.8 314.88)" font-size="8.21" font-family="GOSTTypeB, GOST type B">3.6</text>
      </g>
      <polyline points="462.84 324.95 462.96 315.95 457.8 315.95 449.28 315.95" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="0.24"></polyline>
      <g>
        <text transform="translate(585.48 313.92)" font-size="8.21" font-family="GOSTTypeB, GOST type B">3.6</text>
      </g>
      <polyline points="597.96 324.95 597.96 315.12 594.48 315.12 585.96 315.12" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="0.24"></polyline>
      <g>
        <text transform="translate(483.12 313.79)" font-size="8.21" font-family="GOSTTypeB, GOST type B">3.5</text>
      </g>
      <polyline points="496.56 324.95 496.56 315 492.12 315 483.6 315" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="0.24"></polyline>
      <g>
        <text transform="translate(484.32 271.68)" font-size="8.21" font-family="GOSTTypeB, GOST type B">3.5</text>
      </g>
      <polyline points="496.56 282.48 496.56 272.76 493.32 272.76 484.92 272.76" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="0.24"></polyline>
      <g>
        <text transform="translate(501.48 247.56)" font-size="8.21" font-family="GOSTTypeB, GOST type B">3.11,12</text>
      </g>
      <polyline points="521.4 255.24 521.28 248.76 520.56 248.76 501.96 248.76" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="0.24"></polyline>
      <g>
        <text transform="translate(572.16 247.56)" font-size="8.21" font-family="GOSTTypeB, GOST type B">3.11,12</text>
      </g>
      <polyline points="572.04 255.24 571.92 248.76 572.64 248.76 591.24 248.76" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="0.24"></polyline>
      <g>
        <text transform="translate(572.16 290.16)" font-size="8.21" font-family="GOSTTypeB, GOST type B">3.11,12</text>
      </g>
      <polyline points="572.04 297.71 571.92 291.24 572.64 291.24 591.24 291.24" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="0.24"></polyline>
      <line x1="561.36" y1="301.92" x2="561.36" y2="299.76" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="0.24"></line>
      <line x1="561.36" y1="296.16" x2="561.36" y2="292.56" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="0.24"></line>
      <line x1="561.36" y1="289.08" x2="561.36" y2="285.48" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="0.24"></line>
      <line x1="561.36" y1="282" x2="561.36" y2="278.4" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="0.24"></line>
      <line x1="561.36" y1="274.92" x2="561.36" y2="271.32" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="0.24"></line>
      <line x1="561.36" y1="267.84" x2="561.36" y2="264.24" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="0.24"></line>
      <line x1="561.36" y1="260.76" x2="561.36" y2="257.16" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="0.24"></line>
      <line x1="561.36" y1="253.68" x2="561.36" y2="250.08" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="0.24"></line>
      <line x1="561.36" y1="246.6" x2="561.36" y2="243" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="0.24"></line>
      <line x1="561.36" y1="239.52" x2="561.36" y2="235.92" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="0.24"></line>
      <line x1="561.36" y1="232.44" x2="561.36" y2="228.84" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="0.24"></line>
      <line x1="561.36" y1="225.36" x2="561.36" y2="221.76" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="0.24"></line>
      <line x1="561.36" y1="218.16" x2="561.36" y2="214.68" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="0.24"></line>
      <line x1="561.36" y1="211.08" x2="561.36" y2="207.6" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="0.24"></line>
      <line x1="561.36" y1="204" x2="561.36" y2="200.52" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="0.24"></line>
      <line x1="561.36" y1="196.92" x2="561.36" y2="193.44" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="0.24"></line>
      <line x1="561.36" y1="189.84" x2="561.36" y2="186.36" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="0.24"></line>
      <line x1="561.36" y1="182.76" x2="561.36" y2="180.6" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="0.24"></line>
      <line x1="561.36" y1="301.92" x2="558.84" y2="304.8" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="0.24"></line>
      <line x1="556.56" y1="307.44" x2="554.28" y2="310.2" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="0.24"></line>
      <line x1="552" y1="312.84" x2="549.48" y2="315.83" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="0.24"></line>
      <line x1="561.36" y1="259.44" x2="558.84" y2="262.32" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="0.24"></line>
      <line x1="556.56" y1="264.96" x2="554.28" y2="267.72" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="0.24"></line>
      <line x1="552" y1="270.36" x2="549.48" y2="273.24" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="0.24"></line>
      <g>
        <text transform="translate(585.36 271.68)" font-size="8.21" font-family="GOSTTypeB, GOST type B">3.6</text>
      </g>
      <polyline points="597.84 282.71 597.84 272.88 594.24 272.88 585.84 272.88" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="0.24"></polyline>
      <g>
        <text transform="translate(444.6 197.88)" font-size="8.21" font-family="GOSTTypeB, GOST type B">3.16,17</text>
      </g>
      <polyline points="468 208.32 468 199.08 464.88 199.08 445.2 199.08" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="0.24"></polyline>
      <g>
        <text transform="translate(432.96 370.31)" font-size="8.21" font-family="GOSTTypeB, GOST type B">3.20</text>
      </g>
      <polyline points="431.16 379.67 431.16 371.39 433.44 371.39 445.92 371.39" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="0.24"></polyline>
      <g>
        <text transform="translate(529.92 302.88)" font-size="8.21" font-family="GOSTTypeB, GOST type B">3.2</text>
      </g>
      <polyline points="544.2 293.04 544.32 304.07 538.8 304.07 530.4 304.07" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="0.24"></polyline>
      <path d="M446.16,301.56l.84.12h-1.2l.36-.12Zm.36,0h-.36l.84.12Z" fill="blue"></path>
      <path d="M446.16,301.56l.84.12h-1.2l.36-.12Zm.36,0h-.36l.84.12Z" fill="none"></path>
      <path d="M445.8,301.68l1.56.12h-1.92l.36-.12Zm1.2,0h-1.2l1.56.12Z" fill="blue"></path>
      <path d="M445.8,301.68l1.56.12h-1.92l.36-.12Zm1.2,0h-1.2l1.56.12Z" fill="none"></path>
      <path d="M445.44,301.8l2.28.24h-2.64l.36-.24Zm1.92,0h-1.92l2.28.24Z" fill="blue"></path>
      <path d="M445.44,301.8l2.28.24h-2.64l.36-.24Zm1.92,0h-1.92l2.28.24Z" fill="none"></path>
      <path d="M445.08,302l2.88.24h-3.12Zm2.64,0h-2.64l2.88.24Z" fill="blue"></path>
      <path d="M445.08,302l2.88.24h-3.12Zm2.64,0h-2.64l2.88.24Z" fill="none"></path>
      <path d="M444.84,302.28l3.36.24h-3.6l.24-.24Zm3.12,0h-3.12l3.36.24Z" fill="blue"></path>
      <path d="M444.84,302.28l3.36.24h-3.6l.24-.24Zm3.12,0h-3.12l3.36.24Z" fill="none"></path>
      <path d="M444.6,302.52l3.72.36h-4Zm3.6,0h-3.6l3.72.36Z" fill="blue"></path>
      <path d="M444.6,302.52l3.72.36h-4Zm3.6,0h-3.6l3.72.36Z" fill="none"></path>
      <path d="M444.36,302.88l4.08.36h-4.2l.12-.36Zm4,0h-4l4.08.36Z" fill="blue"></path>
      <path d="M444.36,302.88l4.08.36h-4.2l.12-.36Zm4,0h-4l4.08.36Z" fill="none"></path>
      <path d="M444.24,303.24l4.32.48h-4.32Zm4.2,0h-4.2l4.32.48Z" fill="blue"></path>
      <path d="M444.24,303.24l4.32.48h-4.32Zm4.2,0h-4.2l4.32.48Z" fill="none"></path>
      <path d="M446.4,303.72l2,.36h-2Zm2.16,0H446.4l2,.36Z" fill="blue"></path>
      <path d="M446.4,303.72l2,.36h-2Zm2.16,0H446.4l2,.36Z" fill="none"></path>
      <path d="M444.24,303.72l2.16.36h-2.16Zm2.16,0h-2.16l2.16.36Z" fill="blue"></path>
      <path d="M444.24,303.72l2.16.36h-2.16Zm2.16,0h-2.16l2.16.36Z" fill="none"></path>
      <path d="M446.4,304.08l1.92.36H446.4Zm2,0h-2l1.92.36Z" fill="blue"></path>
      <path d="M446.4,304.08l1.92.36H446.4Zm2,0h-2l1.92.36Z" fill="none"></path>
      <path d="M444.24,304.08l2.16.36h-2Zm2.16,0h-2.16l2.16.36Z" fill="blue"></path>
      <path d="M444.24,304.08l2.16.36h-2Zm2.16,0h-2.16l2.16.36Z" fill="none"></path>
      <path d="M446.4,304.44l1.8.36h-1.8Zm1.92,0H446.4l1.8.36.12-.36Z" fill="blue"></path>
      <path d="M446.4,304.44l1.8.36h-1.8Zm1.92,0H446.4l1.8.36.12-.36Z" fill="none"></path>
      <path d="M444.36,304.44l2,.36h-1.8l-.24-.36Zm2,0h-2l2,.36Z" fill="blue"></path>
      <path d="M444.36,304.44l2,.36h-1.8l-.24-.36Zm2,0h-2l2,.36Z" fill="none"></path>
      <path d="M446.4,304.8,448,305H446.4Zm1.8,0h-1.8L448,305Z" fill="blue"></path>
      <path d="M446.4,304.8,448,305H446.4Zm1.8,0h-1.8L448,305Z" fill="none"></path>
      <path d="M444.6,304.8l1.8.24h-1.68Zm1.8,0h-1.8l1.8.24Z" fill="blue"></path>
      <path d="M444.6,304.8l1.8.24h-1.68Zm1.8,0h-1.8l1.8.24Z" fill="none"></path>
      <path d="M446.4,305l1.32.24H446.4Zm1.56,0H446.4l1.32.24Z" fill="blue"></path>
      <path d="M446.4,305l1.32.24H446.4Zm1.56,0H446.4l1.32.24Z" fill="none"></path>
      <path d="M444.72,305l1.68.24H445Zm1.68,0h-1.68l1.68.24Z" fill="blue"></path>
      <path d="M444.72,305l1.68.24H445Zm1.68,0h-1.68l1.68.24Z" fill="none"></path>
      <path d="M446.4,305.28l1.08.24H446.4Zm1.32,0H446.4l1.08.24.24-.24Z" fill="blue"></path>
      <path d="M446.4,305.28l1.08.24H446.4Zm1.32,0H446.4l1.08.24.24-.24Z" fill="none"></path>
      <path d="M445,305.28l1.44.24h-1.08l-.36-.24Zm1.44,0H445l1.44.24Z" fill="blue"></path>
      <path d="M445,305.28l1.44.24h-1.08l-.36-.24Zm1.44,0H445l1.44.24Z" fill="none"></path>
      <path d="M446.4,305.52l.72.12h-.72Zm1.08,0H446.4l.72.12Z" fill="blue"></path>
      <path d="M446.4,305.52l.72.12h-.72Zm1.08,0H446.4l.72.12Z" fill="none"></path>
      <path d="M445.32,305.52l1.08.12h-.72Zm1.08,0h-1.08l1.08.12Z" fill="blue"></path>
      <path d="M445.32,305.52l1.08.12h-.72Zm1.08,0h-1.08l1.08.12Z" fill="none"></path>
      <path d="M446.76,305.76h-.36v-.12Zm0,0Z" fill="blue"></path>
      <path d="M446.76,305.76h-.36v-.12Zm0,0Z" fill="none"></path>
      <polygon points="446.4 305.63 447.12 305.63 446.76 305.75 446.4 305.63" fill="blue"></polygon>
      <polygon points="446.4 305.63 447.12 305.63 446.76 305.75 446.4 305.63" fill="none"></polygon>
      <path d="M445.68,305.64l.72.12H446l-.36-.12Zm.72,0h-.72l.72.12Z" fill="blue"></path>
      <path d="M445.68,305.64l.72.12H446l-.36-.12Zm.72,0h-.72l.72.12Z" fill="none"></path>
      <path d="M448.56,303.66a2.1,2.1,0,1,0-2.1,2.1,2.1,2.1,0,0,0,2.1-2.1" fill="none" stroke="blue" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.68"></path>
      <line x1="616.68" y1="303.72" x2="627.72" y2="303.72" fill="none" stroke="blue" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.68"></line>
      <path d="M446.16,301.56l.84.12h-1.2l.36-.12Zm.36,0h-.36l.84.12Z" fill="blue"></path>
      <path d="M446.16,301.56l.84.12h-1.2l.36-.12Zm.36,0h-.36l.84.12Z" fill="none"></path>
      <path d="M445.8,301.68l1.56.12h-1.92l.36-.12Zm1.2,0h-1.2l1.56.12Z" fill="blue"></path>
      <path d="M445.8,301.68l1.56.12h-1.92l.36-.12Zm1.2,0h-1.2l1.56.12Z" fill="none"></path>
      <path d="M445.44,301.8l2.28.24h-2.64l.36-.24Zm1.92,0h-1.92l2.28.24Z" fill="blue"></path>
      <path d="M445.44,301.8l2.28.24h-2.64l.36-.24Zm1.92,0h-1.92l2.28.24Z" fill="none"></path>
      <path d="M445.08,302l2.88.24h-3.12Zm2.64,0h-2.64l2.88.24Z" fill="blue"></path>
      <path d="M445.08,302l2.88.24h-3.12Zm2.64,0h-2.64l2.88.24Z" fill="none"></path>
      <path d="M444.84,302.28l3.36.24h-3.6l.24-.24Zm3.12,0h-3.12l3.36.24Z" fill="blue"></path>
      <path d="M444.84,302.28l3.36.24h-3.6l.24-.24Zm3.12,0h-3.12l3.36.24Z" fill="none"></path>
      <path d="M444.6,302.52l3.72.36h-4Zm3.6,0h-3.6l3.72.36Z" fill="blue"></path>
      <path d="M444.6,302.52l3.72.36h-4Zm3.6,0h-3.6l3.72.36Z" fill="none"></path>
      <path d="M444.36,302.88l4.08.36h-4.2l.12-.36Zm4,0h-4l4.08.36Z" fill="blue"></path>
      <path d="M444.36,302.88l4.08.36h-4.2l.12-.36Zm4,0h-4l4.08.36Z" fill="none"></path>
      <path d="M444.24,303.24l4.32.48h-4.32Zm4.2,0h-4.2l4.32.48Z" fill="blue"></path>
      <path d="M444.24,303.24l4.32.48h-4.32Zm4.2,0h-4.2l4.32.48Z" fill="none"></path>
      <path d="M446.4,303.72l2,.36h-2Zm2.16,0H446.4l2,.36Z" fill="blue"></path>
      <path d="M446.4,303.72l2,.36h-2Zm2.16,0H446.4l2,.36Z" fill="none"></path>
      <path d="M444.24,303.72l2.16.36h-2.16Zm2.16,0h-2.16l2.16.36Z" fill="blue"></path>
      <path d="M444.24,303.72l2.16.36h-2.16Zm2.16,0h-2.16l2.16.36Z" fill="none"></path>
      <path d="M446.4,304.08l1.92.36H446.4Zm2,0h-2l1.92.36Z" fill="blue"></path>
      <path d="M446.4,304.08l1.92.36H446.4Zm2,0h-2l1.92.36Z" fill="none"></path>
      <path d="M444.24,304.08l2.16.36h-2Zm2.16,0h-2.16l2.16.36Z" fill="blue"></path>
      <path d="M444.24,304.08l2.16.36h-2Zm2.16,0h-2.16l2.16.36Z" fill="none"></path>
      <path d="M446.4,304.44l1.8.36h-1.8Zm1.92,0H446.4l1.8.36.12-.36Z" fill="blue"></path>
      <path d="M446.4,304.44l1.8.36h-1.8Zm1.92,0H446.4l1.8.36.12-.36Z" fill="none"></path>
      <path d="M444.36,304.44l2,.36h-1.8l-.24-.36Zm2,0h-2l2,.36Z" fill="blue"></path>
      <path d="M444.36,304.44l2,.36h-1.8l-.24-.36Zm2,0h-2l2,.36Z" fill="none"></path>
      <path d="M446.4,304.8,448,305H446.4Zm1.8,0h-1.8L448,305Z" fill="blue"></path>
      <path d="M446.4,304.8,448,305H446.4Zm1.8,0h-1.8L448,305Z" fill="none"></path>
      <path d="M444.6,304.8l1.8.24h-1.68Zm1.8,0h-1.8l1.8.24Z" fill="blue"></path>
      <path d="M444.6,304.8l1.8.24h-1.68Zm1.8,0h-1.8l1.8.24Z" fill="none"></path>
      <path d="M446.4,305l1.32.24H446.4Zm1.56,0H446.4l1.32.24Z" fill="blue"></path>
      <path d="M446.4,305l1.32.24H446.4Zm1.56,0H446.4l1.32.24Z" fill="none"></path>
      <path d="M444.72,305l1.68.24H445Zm1.68,0h-1.68l1.68.24Z" fill="blue"></path>
      <path d="M444.72,305l1.68.24H445Zm1.68,0h-1.68l1.68.24Z" fill="none"></path>
      <path d="M446.4,305.28l1.08.24H446.4Zm1.32,0H446.4l1.08.24.24-.24Z" fill="blue"></path>
      <path d="M446.4,305.28l1.08.24H446.4Zm1.32,0H446.4l1.08.24.24-.24Z" fill="none"></path>
      <path d="M445,305.28l1.44.24h-1.08l-.36-.24Zm1.44,0H445l1.44.24Z" fill="blue"></path>
      <path d="M445,305.28l1.44.24h-1.08l-.36-.24Zm1.44,0H445l1.44.24Z" fill="none"></path>
      <path d="M446.4,305.52l.72.12h-.72Zm1.08,0H446.4l.72.12Z" fill="blue"></path>
      <path d="M446.4,305.52l.72.12h-.72Zm1.08,0H446.4l.72.12Z" fill="none"></path>
      <path d="M445.32,305.52l1.08.12h-.72Zm1.08,0h-1.08l1.08.12Z" fill="blue"></path>
      <path d="M445.32,305.52l1.08.12h-.72Zm1.08,0h-1.08l1.08.12Z" fill="none"></path>
      <path d="M446.76,305.76h-.36v-.12Zm0,0Z" fill="blue"></path>
      <path d="M446.76,305.76h-.36v-.12Zm0,0Z" fill="none"></path>
      <polygon points="446.4 305.63 447.12 305.63 446.76 305.75 446.4 305.63" fill="blue"></polygon>
      <polygon points="446.4 305.63 447.12 305.63 446.76 305.75 446.4 305.63" fill="none"></polygon>
      <path d="M445.68,305.64l.72.12H446l-.36-.12Zm.72,0h-.72l.72.12Z" fill="blue"></path>
      <path d="M445.68,305.64l.72.12H446l-.36-.12Zm.72,0h-.72l.72.12Z" fill="none"></path>
      <path d="M448.56,303.66a2.1,2.1,0,1,0-2.1,2.1,2.1,2.1,0,0,0,2.1-2.1" fill="none" stroke="blue" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.68"></path>
      <path d="M618.84,303.66a2.1,2.1,0,1,0-2.1,2.1,2.1,2.1,0,0,0,2.1-2.1" fill="none" stroke="blue" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.68"></path>
      <g>
        <text transform="translate(497.88 374.75)" font-size="8.21" font-family="GOSTTypeB, GOST type B">3.14</text>
      </g>
      <polyline points="494.64 365.99 494.64 375.83 498.48 375.83 510.24 375.83" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="0.24"></polyline>
      <line x1="437.76" y1="303.72" x2="437.76" y2="311.04" fill="none" stroke="blue" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.68"></line>
      <line x1="627.72" y1="303.72" x2="627.72" y2="311.04" fill="none" stroke="blue" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.68"></line>
      <line x1="437.76" y1="303.72" x2="446.4" y2="303.72" fill="none" stroke="blue" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.68"></line>
      <g>
        <text transform="translate(420.84 315)" font-size="8.21" font-family="GOSTTypeB, GOST type B">3.23</text>
      </g>
      <polyline points="437.76 316.07 435.84 316.19 433.8 316.19 421.44 316.19" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="0.24"></polyline>
      <g>
        <text transform="translate(632.28 315)" font-size="8.21" font-family="GOSTTypeB, GOST type B">3.23</text>
      </g>
      <polyline points="627.72 316.07 630.72 316.19 632.76 316.19 645.12 316.19" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="0.24"></polyline>
      <g>
        <text transform="translate(513.36 292.2)" font-size="8.21" font-family="GOSTTypeB, GOST type B">3.11,12</text>
      </g>
      <polyline points="517.56 297.71 513.12 293.27 513.96 293.27 532.44 293.27" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="0.24"></polyline>
      <g>
        <text transform="translate(492.96 297.72)" font-size="8.21" font-family="GOSTTypeB, GOST type B">3.18</text>
      </g>
      <polyline points="510.36 294.6 505.56 298.92 505.32 298.92 493.56 298.92" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="0.24"></polyline>
      <g>
        <text transform="translate(492.12 341.99)" font-size="8.21" font-family="GOSTTypeB, GOST type B">3.18</text>
      </g>
      <polyline points="510.36 337.07 504.72 343.07 504.48 343.07 492.72 343.07" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="0.24"></polyline>
      <line x1="676.56" y1="354.35" x2="673.44" y2="354.35" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="0.24"></line>
      <line x1="669.84" y1="354.35" x2="666.36" y2="354.35" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="0.24"></line>
      <line x1="662.76" y1="354.35" x2="659.28" y2="354.35" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="0.24"></line>
      <line x1="655.68" y1="354.35" x2="652.2" y2="354.35" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="0.24"></line>
      <line x1="648.6" y1="354.35" x2="645.12" y2="354.35" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="0.24"></line>
      <line x1="641.52" y1="354.35" x2="638.04" y2="354.35" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="0.24"></line>
      <line x1="634.44" y1="354.35" x2="630.96" y2="354.35" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="0.24"></line>
      <line x1="627.36" y1="354.35" x2="623.76" y2="354.35" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="0.24"></line>
      <line x1="620.28" y1="354.35" x2="616.68" y2="354.35" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="0.24"></line>
      <line x1="613.2" y1="354.35" x2="609.6" y2="354.35" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="0.24"></line>
      <line x1="606.12" y1="354.35" x2="602.52" y2="354.35" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="0.24"></line>
      <line x1="599.04" y1="354.35" x2="595.44" y2="354.35" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="0.24"></line>
      <line x1="591.96" y1="354.35" x2="588.36" y2="354.35" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="0.24"></line>
      <line x1="584.88" y1="354.35" x2="581.28" y2="354.35" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="0.24"></line>
      <line x1="577.8" y1="354.35" x2="574.2" y2="354.35" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="0.24"></line>
      <line x1="570.72" y1="354.35" x2="567.12" y2="354.35" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="0.24"></line>
      <line x1="563.64" y1="354.35" x2="560.04" y2="354.35" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="0.24"></line>
      <line x1="556.56" y1="354.35" x2="552.96" y2="354.35" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="0.24"></line>
      <line x1="549.36" y1="354.35" x2="545.88" y2="354.35" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="0.24"></line>
      <line x1="542.28" y1="354.35" x2="538.8" y2="354.35" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="0.24"></line>
      <line x1="535.2" y1="354.35" x2="531.72" y2="354.35" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="0.24"></line>
      <line x1="528.12" y1="354.35" x2="524.64" y2="354.35" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="0.24"></line>
      <line x1="521.04" y1="354.35" x2="517.56" y2="354.35" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="0.24"></line>
      <line x1="513.96" y1="354.35" x2="510.48" y2="354.35" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="0.24"></line>
      <polyline points="506.88 354.35 503.76 354.35 499.56 358.67" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="0.24"></polyline>
      <line x1="676.56" y1="354.35" x2="676.56" y2="350.75" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="0.24"></line>
      <line x1="676.56" y1="347.15" x2="676.56" y2="343.67" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="0.24"></line>
      <line x1="676.56" y1="340.07" x2="676.56" y2="336.59" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="0.24"></line>
      <line x1="676.56" y1="332.99" x2="676.56" y2="329.51" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="0.24"></line>
      <line x1="676.56" y1="325.91" x2="676.56" y2="322.43" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="0.24"></line>
      <line x1="676.56" y1="318.83" x2="676.56" y2="315.35" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="0.24"></line>
      <line x1="676.56" y1="311.76" x2="676.56" y2="308.28" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="0.24"></line>
      <line x1="676.56" y1="304.68" x2="676.56" y2="301.2" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="0.24"></line>
      <line x1="676.56" y1="297.6" x2="676.56" y2="294.12" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="0.24"></line>
      <line x1="676.56" y1="290.52" x2="676.56" y2="287.04" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="0.24"></line>
      <line x1="676.56" y1="283.44" x2="676.56" y2="279.96" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="0.24"></line>
      <line x1="676.56" y1="276.36" x2="676.56" y2="272.76" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="0.24"></line>
      <line x1="676.56" y1="269.28" x2="676.56" y2="265.68" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="0.24"></line>
      <line x1="676.56" y1="262.2" x2="676.56" y2="258.6" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="0.24"></line>
      <line x1="676.56" y1="255.12" x2="676.56" y2="251.52" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="0.24"></line>
      <line x1="676.56" y1="248.04" x2="676.56" y2="244.44" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="0.24"></line>
      <line x1="676.56" y1="240.96" x2="676.56" y2="237.36" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="0.24"></line>
      <line x1="676.56" y1="233.88" x2="676.56" y2="230.28" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="0.24"></line>
      <line x1="676.56" y1="226.8" x2="676.56" y2="223.2" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="0.24"></line>
      <line x1="676.56" y1="219.72" x2="676.56" y2="216.12" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="0.24"></line>
      <line x1="676.56" y1="212.64" x2="676.56" y2="209.04" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="0.24"></line>
      <line x1="676.56" y1="205.56" x2="676.56" y2="201.96" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="0.24"></line>
      <line x1="676.56" y1="198.36" x2="676.56" y2="194.88" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="0.24"></line>
      <line x1="676.56" y1="191.28" x2="676.56" y2="187.8" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="0.24"></line>
      <polyline points="676.56 184.2 676.56 180.6 672.24 180.6" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="0.24"></polyline>
      <line x1="668.76" y1="180.6" x2="665.16" y2="180.6" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="0.24"></line>
      <line x1="661.68" y1="180.6" x2="658.08" y2="180.6" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="0.24"></line>
      <line x1="654.6" y1="180.6" x2="651" y2="180.6" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="0.24"></line>
      <line x1="647.52" y1="180.6" x2="643.92" y2="180.6" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="0.24"></line>
      <line x1="640.44" y1="180.6" x2="636.84" y2="180.6" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="0.24"></line>
      <line x1="633.36" y1="180.6" x2="629.76" y2="180.6" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="0.24"></line>
      <line x1="626.28" y1="180.6" x2="622.68" y2="180.6" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="0.24"></line>
      <line x1="619.2" y1="180.6" x2="615.6" y2="180.6" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="0.24"></line>
      <line x1="612.12" y1="180.6" x2="608.52" y2="180.6" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="0.24"></line>
      <line x1="604.92" y1="180.6" x2="601.44" y2="180.6" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="0.24"></line>
      <line x1="597.84" y1="180.6" x2="594.36" y2="180.6" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="0.24"></line>
      <line x1="590.76" y1="180.6" x2="587.28" y2="180.6" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="0.24"></line>
      <line x1="583.68" y1="180.6" x2="580.2" y2="180.6" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="0.24"></line>
      <line x1="576.6" y1="180.6" x2="573.12" y2="180.6" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="0.24"></line>
      <line x1="569.52" y1="180.6" x2="566.04" y2="180.6" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="0.24"></line>
      <line x1="562.44" y1="180.6" x2="558.96" y2="180.6" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="0.24"></line>
      <line x1="555.36" y1="180.6" x2="551.88" y2="180.6" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="0.24"></line>
      <line x1="548.28" y1="180.6" x2="544.8" y2="180.6" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="0.24"></line>
      <line x1="541.2" y1="180.6" x2="537.72" y2="180.6" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="0.24"></line>
      <line x1="534.12" y1="180.6" x2="530.52" y2="180.6" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="0.24"></line>
      <line x1="527.04" y1="180.6" x2="523.44" y2="180.6" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="0.24"></line>
      <line x1="519.96" y1="180.6" x2="516.36" y2="180.6" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="0.24"></line>
      <line x1="512.88" y1="180.6" x2="509.28" y2="180.6" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="0.24"></line>
      <line x1="505.8" y1="180.6" x2="502.2" y2="180.6" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="0.24"></line>
      <line x1="498.72" y1="180.6" x2="495.12" y2="180.6" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="0.24"></line>
      <line x1="491.64" y1="180.6" x2="488.04" y2="180.6" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="0.24"></line>
      <line x1="484.56" y1="180.6" x2="480.96" y2="180.6" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="0.24"></line>
      <line x1="477.48" y1="180.6" x2="473.88" y2="180.6" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="0.24"></line>
      <line x1="470.4" y1="180.6" x2="466.8" y2="180.6" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="0.24"></line>
      <line x1="463.32" y1="180.6" x2="459.72" y2="180.6" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="0.24"></line>
      <line x1="456.12" y1="180.6" x2="452.64" y2="180.6" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="0.24"></line>
      <line x1="449.04" y1="180.6" x2="445.56" y2="180.6" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="0.24"></line>
      <line x1="441.96" y1="180.6" x2="438.48" y2="180.6" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="0.24"></line>
      <line x1="434.88" y1="180.6" x2="431.4" y2="180.6" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="0.24"></line>
      <line x1="427.8" y1="180.6" x2="424.32" y2="180.6" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="0.24"></line>
      <line x1="420.72" y1="180.6" x2="417.24" y2="180.6" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="0.24"></line>
      <line x1="413.64" y1="180.6" x2="410.16" y2="180.6" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="0.24"></line>
      <line x1="406.56" y1="180.6" x2="403.08" y2="180.6" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="0.24"></line>
      <line x1="399.48" y1="180.6" x2="396" y2="180.6" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="0.24"></line>
      <line x1="392.4" y1="180.6" x2="388.8" y2="180.6" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="0.24"></line>
      <line x1="385.32" y1="180.6" x2="381.72" y2="180.6" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="0.24"></line>
      <line x1="378.24" y1="180.6" x2="374.64" y2="180.6" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="0.24"></line>
      <line x1="371.16" y1="180.6" x2="367.56" y2="180.6" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="0.24"></line>
      <line x1="364.08" y1="180.6" x2="360.48" y2="180.6" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="0.24"></line>
      <line x1="357" y1="180.6" x2="353.4" y2="180.6" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="0.24"></line>
      <line x1="349.92" y1="180.6" x2="346.32" y2="180.6" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="0.24"></line>
      <line x1="342.84" y1="180.6" x2="339.24" y2="180.6" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="0.24"></line>
      <line x1="335.76" y1="180.6" x2="332.16" y2="180.6" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="0.24"></line>
      <line x1="328.68" y1="180.6" x2="325.08" y2="180.6" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="0.24"></line>
      <line x1="321.6" y1="180.6" x2="318" y2="180.6" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="0.24"></line>
      <line x1="314.4" y1="180.6" x2="310.92" y2="180.6" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="0.24"></line>
      <line x1="307.32" y1="180.6" x2="303.84" y2="180.6" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="0.24"></line>
      <line x1="300.24" y1="180.6" x2="296.76" y2="180.6" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="0.24"></line>
      <line x1="293.16" y1="180.6" x2="289.68" y2="180.6" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="0.24"></line>
      <line x1="286.08" y1="180.6" x2="282.6" y2="180.6" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="0.24"></line>
      <line x1="279" y1="180.6" x2="275.52" y2="180.6" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="0.24"></line>
      <line x1="271.92" y1="180.6" x2="268.44" y2="180.6" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="0.24"></line>
      <line x1="264.84" y1="180.6" x2="261.36" y2="180.6" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="0.24"></line>
      <line x1="257.76" y1="180.6" x2="254.28" y2="180.6" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="0.24"></line>
      <line x1="250.69" y1="180.6" x2="247.21" y2="180.6" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="0.24"></line>
      <line x1="243.61" y1="180.6" x2="240.01" y2="180.6" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="0.24"></line>
      <line x1="236.53" y1="180.6" x2="232.93" y2="180.6" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="0.24"></line>
      <line x1="229.45" y1="180.6" x2="225.85" y2="180.6" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="0.24"></line>
      <line x1="222.37" y1="180.6" x2="218.77" y2="180.6" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="0.24"></line>
      <line x1="215.29" y1="180.6" x2="211.69" y2="180.6" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="0.24"></line>
      <line x1="208.21" y1="180.6" x2="204.61" y2="180.6" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="0.24"></line>
      <line x1="201.13" y1="180.6" x2="197.53" y2="180.6" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="0.24"></line>
      <line x1="194.05" y1="180.6" x2="190.45" y2="180.6" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="0.24"></line>
      <line x1="186.97" y1="180.6" x2="183.37" y2="180.6" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="0.24"></line>
      <line x1="179.89" y1="180.6" x2="176.29" y2="180.6" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="0.24"></line>
      <line x1="172.69" y1="180.6" x2="169.21" y2="180.6" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="0.24"></line>
      <line x1="165.61" y1="180.6" x2="162.13" y2="180.6" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="0.24"></line>
      <line x1="158.53" y1="180.6" x2="155.05" y2="180.6" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="0.24"></line>
      <line x1="151.45" y1="180.6" x2="147.97" y2="180.6" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="0.24"></line>
      <line x1="144.37" y1="180.6" x2="140.17" y2="180.6" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="0.24"></line>
      <g>
        <text transform="translate(763.8 292.92)" font-size="8.21" font-family="GOSTTypeB, GOST type B">3.6</text>
      </g>
      <polyline points="760.92 303.95 760.8 294.12 764.4 294.12 772.8 294.12" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="0.24"></polyline>
      <path d="M483.12,399.47h-5v2.64Zm-5-2.52,5,2.52h-5Z"></path>
      <path d="M483.12,399.47h-5v2.64Zm-5-2.52,5,2.52h-5Z" fill="none"></path>
      <polyline points="478.08 396.95 483.12 399.47 478.08 402.11 478.08 396.95" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.08"></polyline>
      <polyline points="488.28 396.95 483.12 399.47 488.28 402.11 488.28 396.95" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.08"></polyline>
      <line x1="693.72" y1="399.47" x2="693.72" y2="394.43" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.08"></line>
      <line x1="693.72" y1="387.95" x2="693.72" y2="382.91" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.08"></line>
      <path d="M699.12,377.57a5.34,5.34,0,1,0-5.34,5.34,5.34,5.34,0,0,0,5.34-5.34" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.08"></path>
      <polyline points="692.04 394.43 693.72 391.19 695.28 394.43 692.04 394.43" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.08"></polyline>
      <polyline points="692.04 387.95 693.72 391.19 695.28 387.95 692.04 387.95" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.08"></polyline>
      <polyline points="690.48 392.75 693.72 391.19 690.48 389.63 690.48 392.75" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.08"></polyline>
      <g>
        <text transform="translate(690.84 379.79)" font-size="6.16" font-family="GOSTTypeB, GOST type B">PG</text>
      </g>
      <line x1="735.84" y1="399.47" x2="735.84" y2="394.43" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.08"></line>
      <line x1="735.84" y1="387.95" x2="735.84" y2="382.91" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.08"></line>
      <path d="M741.24,377.57a5.34,5.34,0,1,0-5.34,5.34,5.34,5.34,0,0,0,5.34-5.34" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.08"></path>
      <polyline points="734.28 394.43 735.84 391.19 737.52 394.43 734.28 394.43" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.08"></polyline>
      <polyline points="734.28 387.95 735.84 391.19 737.52 387.95 734.28 387.95" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.08"></polyline>
      <polyline points="732.72 392.75 735.84 391.19 732.72 389.63 732.72 392.75" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.08"></polyline>
      <g>
        <text transform="translate(733.08 379.79)" font-size="6.16" font-family="GOSTTypeB, GOST type B">PG</text>
      </g>
      <polyline points="755.28 396.95 760.32 399.47 755.28 402.11 755.28 396.95" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.08"></polyline>
      <polyline points="765.48 396.95 760.32 399.47 765.48 402.11 765.48 396.95" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.08"></polyline>
      <path d="M560.64,399.41a5.34,5.34,0,1,0-5.34,5.34,5.34,5.34,0,0,0,5.34-5.34" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.08"></path>
      <polyline points="552 395.39 560.64 399.47 552 403.67" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.08"></polyline>
      <line x1="205.21" y1="235.68" x2="205.21" y2="230.52" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.08"></line>
      <line x1="205.21" y1="224.16" x2="205.21" y2="219" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.08"></line>
      <path d="M210.61,213.66a5.34,5.34,0,1,0-5.34,5.34,5.34,5.34,0,0,0,5.34-5.34" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.08"></path>
      <polyline points="203.65 230.52 205.21 227.4 206.89 230.52 203.65 230.52" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.08"></polyline>
      <polyline points="203.65 224.16 205.21 227.4 206.89 224.16 203.65 224.16" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.08"></polyline>
      <polyline points="202.09 228.96 205.21 227.4 202.09 225.72 202.09 228.96" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.08"></polyline>
      <g>
        <text transform="translate(201.97 216)" font-size="6.16" font-family="GOSTTypeB, GOST type B">PG</text>
      </g>
      <polyline points="305.52 216.48 252.37 216.48 252.37 322.68 305.52 322.68" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.08"></polyline>
      <line x1="252.37" y1="216.48" x2="305.52" y2="322.67" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="0.24"></line>
      <line x1="178.57" y1="235.68" x2="178.57" y2="219" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.08"></line>
      <path d="M184,213.66a5.34,5.34,0,1,0-5.34,5.34,5.34,5.34,0,0,0,5.34-5.34" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.08"></path>
      <g>
        <text transform="translate(175.09 216)" font-size="6.16" font-family="GOSTTypeB, GOST type B" letter-spacing="-0.04em">T<tspan x="3.15" y="0" letter-spacing="0em">G</tspan></text>
      </g>
      <polyline points="80.17 233.16 85.21 235.68 80.17 238.2 80.17 233.16" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.08"></polyline>
      <polyline points="90.37 233.16 85.21 235.68 90.37 238.2 90.37 233.16" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.08"></polyline>
      <line x1="205.21" y1="303.72" x2="205.21" y2="298.56" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.08"></line>
      <line x1="205.21" y1="292.2" x2="205.21" y2="287.04" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.08"></line>
      <path d="M210.61,281.7a5.34,5.34,0,1,0-5.34,5.34,5.34,5.34,0,0,0,5.34-5.34" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.08"></path>
      <polyline points="203.65 298.56 205.21 295.44 206.89 298.56 203.65 298.56" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.08"></polyline>
      <polyline points="203.65 292.19 205.21 295.44 206.89 292.19 203.65 292.19" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.08"></polyline>
      <polyline points="202.09 297 205.21 295.44 202.09 293.75 202.09 297" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.08"></polyline>
      <g>
        <text transform="translate(201.97 284.04)" font-size="6.16" font-family="GOSTTypeB, GOST type B">PG</text>
      </g>
      <line x1="178.57" y1="303.72" x2="178.57" y2="287.04" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.08"></line>
      <path d="M184,281.7a5.34,5.34,0,1,0-5.34,5.34A5.34,5.34,0,0,0,184,281.7" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.08"></path>
      <g>
        <text transform="translate(175.09 284.04)" font-size="6.16" font-family="GOSTTypeB, GOST type B" letter-spacing="-0.04em">T<tspan x="3.15" y="0" letter-spacing="0em">G</tspan></text>
      </g>
      <line x1="140.17" y1="235.68" x2="140.17" y2="230.04" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.08"></line>
      <path d="M143.77,226.38a3.54,3.54,0,1,0-3.54,3.54,3.53,3.53,0,0,0,3.54-3.54" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.08"></path>
      <polyline points="137.53 227.16 138.13 226.2 138.37 225.84 138.73 225.6 139.09 225.6 139.45 225.72 140.17 226.44 140.89 227.04 141.25 227.16 141.61 227.16 141.85 226.92 142.21 226.56 142.69 225.48" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.08"></polyline>
      <line x1="114.49" y1="235.68" x2="114.49" y2="230.52" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.08"></line>
      <line x1="114.49" y1="224.16" x2="114.49" y2="219" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.08"></line>
      <path d="M119.89,213.66a5.34,5.34,0,1,0-5.34,5.34,5.34,5.34,0,0,0,5.34-5.34" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.08"></path>
      <polyline points="112.93 230.52 114.49 227.4 116.05 230.52 112.93 230.52" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.08"></polyline>
      <polyline points="112.93 224.16 114.49 227.4 116.05 224.16 112.93 224.16" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.08"></polyline>
      <polyline points="111.37 228.96 114.49 227.4 111.37 225.72 111.37 228.96" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.08"></polyline>
      <g>
        <text transform="translate(111.25 216)" font-size="6.16" font-family="GOSTTypeB, GOST type B">PG</text>
      </g>
      <line x1="305.52" y1="322.67" x2="305.52" y2="216.48" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.08"></line>
      <polyline points="236.41 218.52 233.88 223.56 231.25 218.52 236.41 218.52" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.08"></polyline>
      <polyline points="236.41 228.72 233.88 223.56 231.25 228.72 236.41 228.72" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.08"></polyline>
      <polyline points="145.33 238.2 140.17 235.68 145.33 233.16 145.33 238.2" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.08"></polyline>
      <polyline points="135.01 238.2 140.17 235.68 135.01 233.16 135.01 238.2" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.08"></polyline>
      <polyline points="80.17 301.07 85.21 303.71 80.17 306.24 80.17 301.07" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.08"></polyline>
      <polyline points="90.37 301.07 85.21 303.71 90.37 306.24 90.37 301.07" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.08"></polyline>
      <polyline points="231.25 320.88 233.88 315.71 236.41 320.88 231.25 320.88" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.08"></polyline>
      <polyline points="231.25 310.68 233.88 315.71 236.41 310.68 231.25 310.68" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.08"></polyline>
      <line x1="361.56" y1="223.92" x2="361.56" y2="218.88" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.08"></line>
      <path d="M367,213.42a5.34,5.34,0,1,0-5.34,5.34,5.34,5.34,0,0,0,5.34-5.34" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.08"></path>
      <polyline points="360 230.4 361.56 227.16 363.12 230.4 360 230.4" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.08"></polyline>
      <polyline points="360 223.92 361.56 227.16 363.12 223.92 360 223.92" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.08"></polyline>
      <polyline points="358.32 228.72 361.56 227.16 358.32 225.6 358.32 228.72" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.08"></polyline>
      <g>
        <text transform="translate(358.68 215.76)" font-size="6.16" font-family="GOSTTypeB, GOST type B">PG</text>
      </g>
      <line x1="388.2" y1="235.44" x2="388.2" y2="218.88" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.08"></line>
      <path d="M393.6,213.42a5.34,5.34,0,1,0-5.34,5.34,5.34,5.34,0,0,0,5.34-5.34" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.08"></path>
      <g>
        <text transform="translate(384.84 215.76)" font-size="6.16" font-family="GOSTTypeB, GOST type B" letter-spacing="-0.04em">T<tspan x="3.15" y="0" letter-spacing="0em">G</tspan></text>
      </g>
      <polyline points="328.92 218.28 331.44 223.44 334.08 218.28 328.92 218.28" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.08"></polyline>
      <polyline points="328.92 228.48 331.44 223.44 334.08 228.48 328.92 228.48" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.08"></polyline>
      <line x1="356.28" y1="292.2" x2="356.28" y2="287.04" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.08"></line>
      <path d="M361.68,281.7a5.34,5.34,0,1,0-5.34,5.34,5.34,5.34,0,0,0,5.34-5.34" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.08"></path>
      <polyline points="354.72 298.56 356.28 295.44 357.96 298.56 354.72 298.56" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.08"></polyline>
      <polyline points="354.72 292.19 356.28 295.44 357.96 292.19 354.72 292.19" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.08"></polyline>
      <polyline points="353.16 297 356.28 295.44 353.16 293.75 353.16 297" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.08"></polyline>
      <g>
        <text transform="translate(353.52 284.04)" font-size="6.16" font-family="GOSTTypeB, GOST type B">PG</text>
      </g>
      <line x1="383.04" y1="303.72" x2="383.04" y2="287.04" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.08"></line>
      <path d="M388.44,281.7A5.34,5.34,0,1,0,383.1,287a5.34,5.34,0,0,0,5.34-5.34" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.08"></path>
      <g>
        <text transform="translate(379.56 284.04)" font-size="6.16" font-family="GOSTTypeB, GOST type B" letter-spacing="-0.04em">T<tspan x="3.15" y="0" letter-spacing="0em">G</tspan></text>
      </g>
      <line x1="305.52" y1="322.67" x2="305.52" y2="216.48" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.08"></line>
      <polyline points="325.92 320.88 328.56 315.71 331.08 320.88 325.92 320.88" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.08"></polyline>
      <polyline points="325.92 310.68 328.56 315.71 331.08 310.68 325.92 310.68" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.08"></polyline>
      <line x1="668.52" y1="303.72" x2="668.52" y2="298.56" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.08"></line>
      <line x1="668.52" y1="292.2" x2="668.52" y2="287.04" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.08"></line>
      <path d="M673.92,281.7a5.34,5.34,0,1,0-5.34,5.34,5.34,5.34,0,0,0,5.34-5.34" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.08"></path>
      <polyline points="666.96 298.56 668.52 295.44 670.08 298.56 666.96 298.56" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.08"></polyline>
      <polyline points="666.96 292.19 668.52 295.44 670.08 292.19 666.96 292.19" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.08"></polyline>
      <polyline points="665.28 297 668.52 295.44 665.28 293.75 665.28 297" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.08"></polyline>
      <g>
        <text transform="translate(665.76 284.04)" font-size="6.16" font-family="GOSTTypeB, GOST type B">PG</text>
      </g>
      <line x1="710.76" y1="303.72" x2="710.76" y2="298.56" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.08"></line>
      <line x1="710.76" y1="292.2" x2="710.76" y2="287.04" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.08"></line>
      <path d="M716.16,281.7a5.34,5.34,0,1,0-5.34,5.34,5.34,5.34,0,0,0,5.34-5.34" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.08"></path>
      <polyline points="709.2 298.56 710.76 295.44 712.32 298.56 709.2 298.56" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.08"></polyline>
      <polyline points="709.2 292.19 710.76 295.44 712.32 292.19 709.2 292.19" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.08"></polyline>
      <polyline points="707.52 297 710.76 295.44 707.52 293.75 707.52 297" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.08"></polyline>
      <g>
        <text transform="translate(707.88 284.04)" font-size="6.16" font-family="GOSTTypeB, GOST type B">PG</text>
      </g>
      <polyline points="730.08 301.07 735.24 303.71 730.08 306.24 730.08 301.07" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.08"></polyline>
      <polyline points="740.28 301.07 735.24 303.71 740.28 306.24 740.28 301.07" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.08"></polyline>
      <polyline points="389.16 301.07 394.2 303.71 389.16 306.24 389.16 301.07" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.08"></polyline>
      <polyline points="399.36 301.07 394.2 303.71 399.36 306.24 399.36 301.07" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.08"></polyline>
      <polyline points="756 233.04 761.04 235.56 756 238.08 756 233.04" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.08"></polyline>
      <polyline points="766.2 233.04 761.04 235.56 766.2 238.08 766.2 233.04" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.08"></polyline>
      <line x1="634.8" y1="303.72" x2="634.8" y2="287.04" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.08"></line>
      <path d="M640.2,281.7a5.34,5.34,0,1,0-5.34,5.34,5.34,5.34,0,0,0,5.34-5.34" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.08"></path>
      <g>
        <text transform="translate(631.32 284.04)" font-size="6.16" font-family="GOSTTypeB, GOST type B" letter-spacing="-0.04em">T<tspan x="3.15" y="0" letter-spacing="0em">G</tspan></text>
      </g>
      <polyline points="457.68 279.84 462.84 282.48 457.68 285 457.68 279.84" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.08"></polyline>
      <polyline points="467.88 279.84 462.84 282.48 467.88 285 467.88 279.84" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.08"></polyline>
      <polyline points="457.68 322.44 462.84 324.95 457.68 327.48 457.68 322.44" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.08"></polyline>
      <polyline points="467.88 322.44 462.84 324.95 467.88 327.48 467.88 322.44" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.08"></polyline>
      <path d="M496.56,282.48H491.4V285Zm-5.16-2.64,5.16,2.64H491.4Z"></path>
      <path d="M496.56,282.48H491.4V285Zm-5.16-2.64,5.16,2.64H491.4Z" fill="none"></path>
      <path d="M496.56,325H491.4v2.52Zm-5.16-2.52,5.16,2.52H491.4Z"></path>
      <path d="M496.56,325H491.4v2.52Zm-5.16-2.52,5.16,2.52H491.4Z" fill="none"></path>
      <polyline points="491.4 279.84 496.56 282.48 491.4 285 491.4 279.84" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.08"></polyline>
      <polyline points="501.6 279.84 496.56 282.48 501.6 285 501.6 279.84" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.08"></polyline>
      <polyline points="491.4 322.44 496.56 324.95 491.4 327.48 491.4 322.44" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.08"></polyline>
      <polyline points="501.6 322.44 496.56 324.95 501.6 327.48 501.6 322.44" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.08"></polyline>
      <line x1="521.4" y1="282.48" x2="521.4" y2="277.32" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.08"></line>
      <line x1="521.4" y1="270.96" x2="521.4" y2="265.8" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.08"></line>
      <path d="M526.8,260.46a5.34,5.34,0,1,0-5.34,5.34,5.34,5.34,0,0,0,5.34-5.34" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.08"></path>
      <polyline points="519.72 277.32 521.4 274.08 522.96 277.32 519.72 277.32" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.08"></polyline>
      <polyline points="519.72 270.96 521.4 274.08 522.96 270.96 519.72 270.96" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.08"></polyline>
      <polyline points="518.16 275.76 521.4 274.08 518.16 272.52 518.16 275.76" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.08"></polyline>
      <g>
        <text transform="translate(518.52 262.68)" font-size="6.16" font-family="GOSTTypeB, GOST type B">PG</text>
      </g>
      <path d="M554.88,282.42A10.62,10.62,0,1,0,544.26,293a10.61,10.61,0,0,0,10.62-10.62" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.08"></path>
      <path d="M554.88,324.89a10.62,10.62,0,1,0-10.62,10.62,10.61,10.61,0,0,0,10.62-10.62" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.08"></path>
      <line x1="572.04" y1="282.48" x2="572.04" y2="277.32" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.08"></line>
      <line x1="572.04" y1="270.96" x2="572.04" y2="265.8" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.08"></line>
      <path d="M577.44,260.46a5.34,5.34,0,1,0-5.34,5.34,5.34,5.34,0,0,0,5.34-5.34" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.08"></path>
      <polyline points="570.48 277.32 572.04 274.08 573.72 277.32 570.48 277.32" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.08"></polyline>
      <polyline points="570.48 270.96 572.04 274.08 573.72 270.96 570.48 270.96" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.08"></polyline>
      <polyline points="568.92 275.76 572.04 274.08 568.92 272.52 568.92 275.76" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.08"></polyline>
      <g>
        <text transform="translate(569.28 262.68)" font-size="6.16" font-family="GOSTTypeB, GOST type B">PG</text>
      </g>
      <line x1="572.04" y1="324.95" x2="572.04" y2="319.79" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.08"></line>
      <line x1="572.04" y1="313.44" x2="572.04" y2="308.28" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.08"></line>
      <path d="M577.44,302.94a5.34,5.34,0,1,0-5.34,5.34,5.34,5.34,0,0,0,5.34-5.34" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.08"></path>
      <polyline points="570.48 319.8 572.04 316.68 573.72 319.8 570.48 319.8" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.08"></polyline>
      <polyline points="570.48 313.44 572.04 316.68 573.72 313.44 570.48 313.44" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.08"></polyline>
      <polyline points="568.92 318.24 572.04 316.68 568.92 315 568.92 318.24" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.08"></polyline>
      <g>
        <text transform="translate(569.28 305.28)" font-size="6.16" font-family="GOSTTypeB, GOST type B">PG</text>
      </g>
      <polyline points="592.92 322.44 597.96 324.95 592.92 327.48 592.92 322.44" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.08"></polyline>
      <polyline points="603.12 322.44 597.96 324.95 603.12 327.48 603.12 322.44" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.08"></polyline>
      <polyline points="592.92 279.84 597.96 282.48 592.92 285 592.92 279.84" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.08"></polyline>
      <polyline points="603.12 279.84 597.96 282.48 603.12 285 603.12 279.84" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.08"></polyline>
      <line x1="468" y1="235.44" x2="468" y2="218.88" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.08"></line>
      <path d="M473.4,213.42a5.34,5.34,0,1,0-5.34,5.34,5.34,5.34,0,0,0,5.34-5.34" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.08"></path>
      <g>
        <text transform="translate(465.36 215.76)" font-size="6.16" font-family="GOSTTypeB, GOST type B">T</text>
      </g>
      <g>
        <text transform="translate(468.72 215.76)" font-size="6.16" font-family="GOSTTypeB, GOST type B">Å</text>
      </g>
      <line x1="431.16" y1="399.47" x2="431.16" y2="394.43" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.08"></line>
      <polyline points="436.2 386.75 431.16 389.27 436.2 391.79 436.2 386.75" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.08"></polyline>
      <polyline points="428.64 394.43 431.16 389.27 433.68 394.43 428.64 394.43" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.08"></polyline>
      <polyline points="431.16 389.27 431.16 386.03 428.76 384.71 432.96 384.71 431.16 383.03 431.16 379.67" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.08"></polyline>
      <polyline points="528 284.04 531.24 282.48 528 280.8 528 284.04" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.08"></polyline>
      <polyline points="560.28 284.04 557.04 282.48 560.28 280.8 560.28 284.04" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.08"></polyline>
      <polyline points="528 326.51 531.24 324.95 528 323.39 528 326.51" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.08"></polyline>
      <polyline points="560.28 326.51 557.04 324.95 560.28 323.39 560.28 326.51" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.08"></polyline>
      <polyline points="127.57 237.24 130.69 235.68 127.57 234.12 127.57 237.24" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.08"></polyline>
      <polyline points="152.77 237.24 149.65 235.68 152.77 234.12 152.77 237.24" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.08"></polyline>
      <polyline points="542.64 401.15 545.76 399.47 542.64 397.91 542.64 401.15" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.08"></polyline>
      <polyline points="567.96 401.15 564.72 399.47 567.96 397.91 567.96 401.15" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.08"></polyline>
      <path d="M500,360.65A5.34,5.34,0,1,0,494.7,366a5.34,5.34,0,0,0,5.34-5.34" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.08"></path>
      <g>
        <text transform="translate(489.72 362.87)" font-size="6.16" font-family="GOSTTypeB, GOST type B">PDS</text>
      </g>
      <polyline points="435.24 311.04 437.76 316.07 440.4 311.04 435.24 311.04" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.08"></polyline>
      <polyline points="435.24 321.24 437.76 316.07 440.4 321.24 435.24 321.24" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.08"></polyline>
      <polyline points="625.2 311.04 627.72 316.07 630.24 311.04 625.2 311.04" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.08"></polyline>
      <polyline points="625.2 321.24 627.72 316.07 630.24 321.24 625.2 321.24" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.08"></polyline>
      <path d="M437.88,354.29a6.3,6.3,0,0,0,6.3,6.3" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="0.24"></path>
      <line x1="437.76" y1="354.35" x2="437.76" y2="321.23" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="0.24"></line>
      <line x1="444.12" y1="360.71" x2="489.36" y2="360.71" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="0.24"></line>
      <path d="M621.42,360.59a6.3,6.3,0,0,0,6.3-6.3" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="0.24"></path>
      <line x1="627.72" y1="354.35" x2="627.72" y2="321.23" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="0.24"></line>
      <line x1="621.36" y1="360.71" x2="499.92" y2="360.71" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="0.24"></line>
      <line x1="517.56" y1="324.95" x2="517.56" y2="319.79" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.08"></line>
      <line x1="517.56" y1="313.44" x2="517.56" y2="308.28" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.08"></line>
      <path d="M523,302.94a5.34,5.34,0,1,0-5.34,5.34,5.34,5.34,0,0,0,5.34-5.34" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.08"></path>
      <polyline points="516 319.8 517.56 316.68 519.12 319.8 516 319.8" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.08"></polyline>
      <polyline points="516 313.44 517.56 316.68 519.12 313.44 516 313.44" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.08"></polyline>
      <polyline points="514.44 318.24 517.56 316.68 514.44 315 514.44 318.24" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.08"></polyline>
      <g>
        <text transform="translate(514.8 305.28)" font-size="6.16" font-family="GOSTTypeB, GOST type B">PG</text>
      </g>
      <polyline points="508.56 294.6 510.36 291 512.04 294.6 508.56 294.6" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.08"></polyline>
      <polyline points="508.56 287.39 510.36 291 512.04 287.39 508.56 287.39" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.08"></polyline>
      <polyline points="508.56 337.07 510.36 333.48 512.04 337.07 508.56 337.07" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.08"></polyline>
      <polyline points="508.56 330 510.36 333.48 512.04 330 508.56 330" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.08"></polyline>
      <polyline points="732.96 300.12 735.24 303.71 735.24 295.92" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.08"></polyline>
      <line x1="735.24" y1="303.72" x2="737.52" y2="300.12" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.08"></line>
      <polyline points="756 301.07 761.04 303.71 756 306.24 756 301.07" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.08"></polyline>
      <polyline points="766.2 301.07 761.04 303.71 766.2 306.24 766.2 301.07" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.08"></polyline>
      <g>
        <text transform="translate(625.8 261.96)" font-size="8.21" font-family="GOSTTypeB, GOST type B">3.22,23</text>
      </g>
      <polyline points="651.24 276.48 651.24 263.16 648.24 263.16 626.28 263.16" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="0.24"></polyline>
      <line x1="651.24" y1="303.72" x2="651.24" y2="298.56" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.08"></line>
      <line x1="651.24" y1="292.2" x2="651.24" y2="287.04" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.08"></line>
      <path d="M656.64,281.7A5.34,5.34,0,1,0,651.3,287a5.34,5.34,0,0,0,5.34-5.34" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.08"></path>
      <polyline points="649.56 298.56 651.24 295.44 652.8 298.56 649.56 298.56" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.08"></polyline>
      <polyline points="649.56 292.19 651.24 295.44 652.8 292.19 649.56 292.19" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.08"></polyline>
      <polyline points="648 297 651.24 295.44 648 293.75 648 297" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.08"></polyline>
      <g>
        <text transform="translate(647.76 284.04)" font-size="6.16" font-family="GOSTTypeB, GOST type B">PS</text>
      </g>
      <line x1="651.24" y1="276.48" x2="651.24" y2="272.76" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="0.24"></line>
      <line x1="651.24" y1="269.28" x2="651.24" y2="265.68" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="0.24"></line>
      <line x1="651.24" y1="262.2" x2="651.24" y2="258.6" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="0.24"></line>
      <line x1="651.24" y1="255.12" x2="651.24" y2="251.52" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="0.24"></line>
      <line x1="651.24" y1="248.04" x2="651.24" y2="244.44" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="0.24"></line>
      <line x1="651.24" y1="240.96" x2="651.24" y2="237.36" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="0.24"></line>
      <line x1="651.24" y1="233.88" x2="651.24" y2="230.28" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="0.24"></line>
      <line x1="651.24" y1="226.8" x2="651.24" y2="223.2" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="0.24"></line>
      <line x1="651.24" y1="219.72" x2="651.24" y2="216.12" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="0.24"></line>
      <line x1="651.24" y1="212.64" x2="651.24" y2="209.04" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="0.24"></line>
      <line x1="651.24" y1="205.44" x2="651.24" y2="201.96" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="0.24"></line>
      <line x1="651.24" y1="198.36" x2="651.24" y2="194.88" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="0.24"></line>
      <line x1="651.24" y1="191.28" x2="651.24" y2="187.8" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="0.24"></line>
      <line x1="651.24" y1="184.2" x2="651.24" y2="180.6" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="0.24"></line>
      <line x1="361.56" y1="230.4" x2="361.56" y2="235.56" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.08"></line>
      <line x1="356.28" y1="298.56" x2="356.28" y2="303.72" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.08"></line>
      <path d="M541.56,282.48h-8l8,4.56Zm0-4.68v4.68h-8Z"></path>
      <path d="M541.56,282.48h-8l8,4.56Zm0-4.68v4.68h-8Z" fill="none"></path>
      <polyline points="533.52 282.48 541.56 277.8 541.56 287.04 533.52 282.48" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.08"></polyline>
      <path d="M541.56,325h-8l8,4.56Zm0-4.56V325h-8Z"></path>
      <path d="M541.56,325h-8l8,4.56Zm0-4.56V325h-8Z" fill="none"></path>
      <polyline points="533.52 324.95 541.56 320.39 541.56 329.51 533.52 324.95" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.08"></polyline>
      <polyline points="709.2 399.47 714.24 394.43 719.4 399.47 714.24 404.63 709.2 399.47" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.08"></polyline>
      <line x1="714.24" y1="394.43" x2="714.24" y2="396.23" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.08"></line>
      <line x1="714.24" y1="404.63" x2="714.24" y2="402.83" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.08"></line>
      <line x1="714.24" y1="397.31" x2="714.24" y2="401.63" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.08"></line>
      <polyline points="684 303.71 689.16 298.56 694.2 303.71 689.16 308.75 684 303.71" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.08"></polyline>
      <line x1="689.16" y1="298.56" x2="689.16" y2="300.36" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.08"></line>
      <line x1="689.16" y1="308.76" x2="689.16" y2="306.96" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.08"></line>
      <line x1="689.16" y1="301.56" x2="689.16" y2="305.88" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.08"></line>
      <line x1="358.92" y1="180.6" x2="358.92" y2="175.68" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="0.24"></line>
      <line x1="358.92" y1="172.08" x2="358.92" y2="167.16" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="0.24"></line>
      <g>
        <text transform="translate(399 157.2)" font-size="8.21" font-family="GOSTTypeB, GOST type B">À</text>
      </g>
      <g>
        <text transform="translate(404.04 157.2)" font-size="8.21" font-family="GOSTTypeB, GOST type B">1</text>
      </g>
      <polyline points="389.64 158.28 389.76 158.28 399.6 158.28 406.32 158.28" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="0.24"></polyline>
      <polyline points="328.32 149.4 389.64 149.4 389.64 167.16 328.32 167.16 328.32 149.4" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.08"></polyline>
      <path d="M74.53,235.5a6.9,6.9,0,1,0-6.9,6.9,6.9,6.9,0,0,0,6.9-6.9" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.08"></path>
      <g>
        <text transform="translate(65.89 239.16)" font-size="10.26" font-family="GOSTTypeB, GOST type B">1</text>
      </g>
      <path d="M74.53,303.78a6.9,6.9,0,1,0-6.9,6.9,6.9,6.9,0,0,0,6.9-6.9" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.08"></path>
      <g>
        <text transform="translate(65.17 307.44)" font-size="10.26" font-family="GOSTTypeB, GOST type B">2</text>
      </g>
      <path d="M784.56,235.5a6.9,6.9,0,1,0-6.9,6.9,6.9,6.9,0,0,0,6.9-6.9" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.08"></path>
      <g>
        <text transform="translate(775.32 239.28)" font-size="10.26" font-family="GOSTTypeB, GOST type B">3</text>
      </g>
      <path d="M784.56,303.66a6.9,6.9,0,1,0-6.9,6.9,6.9,6.9,0,0,0,6.9-6.9" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.08"></path>
      <g>
        <text transform="translate(774.84 307.32)" font-size="10.26" font-family="GOSTTypeB, GOST type B">4</text>
      </g>
      <path d="M783.84,399.41a6.9,6.9,0,1,0-6.9,6.9,6.9,6.9,0,0,0,6.9-6.9" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.08"></path>
      <g>
        <text transform="translate(774.6 403.19)" font-size="10.26" font-family="GOSTTypeB, GOST type B">5</text>
      </g>
    </g>
  </g>
</svg> */}

        </div>
    </>
    );
}


export default SchemeSvgReal;