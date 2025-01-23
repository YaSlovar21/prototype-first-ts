import React from 'react';
import { Button } from '@headlessui/react'

import cn from './AppAside.module.css';
import { List, ListItem, ListItemButton, ListItemDecorator } from '@mui/joy';
import { NavLink } from 'react-router-dom';
import { ROUTES } from '../../utils/constants';

function classNameActive(isActive) {
    return `${ !isActive ?  cn.aside__menubutton : `${cn.aside__menubutton} ${cn.aside__menubutton_active}`}`;
}

function AppAside() {
    return (
        <aside className={cn.aside}>
            <nav>
                <NavLink to={ROUTES.home}  className={({isActive})=> classNameActive(isActive) } >
                    <span className={cn.aside__buttondec}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                        </svg>
                    </span>
                    Главная
                </NavLink>
                <NavLink to={ROUTES.catalog} className={({isActive})=> classNameActive(isActive) } >
                    <span className={cn.aside__buttondec}></span>
                    Каталог
                </NavLink>
            </nav>
            <Button className={cn.aside__menubutton}> 
                <span className={cn.aside__buttondec}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>
                </span>
                Добавить узел
            </Button>
        </aside>
    )
};

export default AppAside;
