import React from 'react';

import {Card, CardOverflow, CardActions} from '@mui/joy';
import CardContent from '@mui/joy/CardContent';
import Badge from '@mui/joy/Badge';
import AspectRatio from '@mui/joy/AspectRatio';
import Button from '@mui/joy/Button';
import IconButton from '@mui/joy/IconButton';
import Typography from '@mui/joy/Typography';

function Ingred({name, imageView, desc, specification, schemeUrl, price, id, onButtonSpecClick, viewing}) {

    const handleSpecButtonClick = () => {
        return onButtonSpecClick({
            id: id,
            specification: specification,
            schemeUrl: schemeUrl,
        });
    }

    return (
        <Badge badgeContent={Math.ceil(Math.random()*10)}>
            <Card className='max-w-xs w-full' color='neutral'   variant="soft" >
                <CardOverflow>
                    <AspectRatio ratio="2">
                        <img src={imageView}
                            loading="lazy"
                            alt=""
                        />
                    </AspectRatio>
                </CardOverflow>
                <CardContent>
                    <Typography level="title-lg">{name}</Typography>
                    <Typography level="body-sm">
                        {desc}
                    </Typography>
                </CardContent>
                <CardActions buttonFlex="0 1 120px">
                    <Button variant={viewing?.id===id ? 'solid' : 'outlined'} color={viewing?.id===id ? 'primary' : 'neutral'} onClick={handleSpecButtonClick} > 
                        Спецификация
                    </Button>
                    <IconButton variant="outlined" color="neutral" sx={{ mr: 'auto' }}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                        </svg>
                    </IconButton>
                </CardActions>    
            </Card>
        </Badge>
    );
};

export default Ingred;