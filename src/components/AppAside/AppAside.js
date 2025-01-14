import React from 'react';
import { Button } from '@headlessui/react'

import cn from './AppAside.module.css';

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
