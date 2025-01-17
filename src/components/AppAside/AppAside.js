import React from 'react';
import { Button } from '@headlessui/react'
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
import cn from './AppAside.module.css';

import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import ListItemDecorator from '@mui/joy/ListItemDecorator';
import ListItemButton from '@mui/joy/ListItemButton';
const ExampleSvg = () => (
    <Svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="-100 -100 200 250">
      <Polygon points="0,0 80,120 -80,120" fill="#234236" />
      <Polygon points="0,-40 60,60 -60,60" fill="#0C5C4C" />
      <Polygon points="0,-80 40,0 -40,0" fill="#38755B" />
      <Rect x="-20" y="120" width="40" height="30" fill="#A32B2D" />
    </Svg>
  );
function AppAside() {
    return (
        <aside className={cn.aside}>
          
            <p children="234234" />
            <Button className={cn.aside__button}>
                Добавить узел
            </Button>
        </aside>
    )
};

export default AppAside;
