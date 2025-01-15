import * as React from 'react';
import Table from '@mui/joy/Table';

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

export default function SpecTable({specificationList}) {
  return (
    <Table borderAxis="both" border>
      <thead>
        <tr>
          <th style={{ width: '50px' }}>Поз. (Id)</th>
          <th style={{ width: '40%' }}>Наименование</th>
          <th>Тип, марка</th>
          <th>Категория(служ.)</th>
        </tr>
      </thead>
      <tbody>
        {specificationList?.map((row) => (
          <tr key={row.id}>
            <td>{row.id}</td>
            <td>{row.name}</td>
            <td>{row.quantity}</td>
            <td>{row.category}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}
