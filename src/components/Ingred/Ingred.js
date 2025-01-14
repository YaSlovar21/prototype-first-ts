import React from 'react';

import {Card} from '@mui/joy';
import {CardContent} from '@mui/joy/CardContent';
import Badge from '@mui/joy/Badge';


function Ingred({name, image, price }) {
    return (
        <Badge badgeContent={Math.ceil(Math.random()*10)}>
            <Card className='max-w-xs'>
                <img src={image}
                    loading="lazy"
                    alt=""
                />
            </Card>
        </Badge>
    );
};

export default Ingred;