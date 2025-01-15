import React from 'react';
import { Button } from '@headlessui/react'

import cn from './AppAside.module.css';

import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import ListItemDecorator from '@mui/joy/ListItemDecorator';
import ListItemButton from '@mui/joy/ListItemButton';

function AppAside() {
    return (
        <aside className={cn.aside}>
            
            <Button className={cn.aside__button}>
                Добавить узел
            </Button>
        </aside>
    )
};

export default AppAside;
