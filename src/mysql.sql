SELECT details.name as name, fittingsPrice.DN as DN,  fittingsPrice.price as price, fittingsPrice.currency as currency, fittingsPrice.comment as comment, details.discount as discount
FROM  `equip/fittingsPrice` AS fittingsPrice 
LEFT JOIN `equip/details` AS details
ON fittingsPrice.detailsId = details.id