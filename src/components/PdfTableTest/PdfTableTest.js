import React from 'react';
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

import { Table, TableCell, TableBody,DataTableCell, TableHeader } from '@david.kucsai/react-pdf-table';

const PdfTableTest = ({id}) => (
        <Document>
              <Page>
                  <Table
                      data={[
                          {firstName: "John", lastName: "Smith", dob: new Date(2000, 1, 1), country: "Australia", phoneNumber: "xxx-0000-0000"}
                      ]}
                  >
                      <TableHeader>
                          <TableCell>
                              First Name
                          </TableCell>
                          <TableCell>
                              Last Name
                          </TableCell>
                          <TableCell>
                              DOB
                          </TableCell>
                          <TableCell>
                              Country
                          </TableCell>
                          <TableCell>
                              Phone Number
                          </TableCell>
                      </TableHeader>
                      <TableBody>
                          <DataTableCell getContent={(r) => r.firstName}/>
                          <DataTableCell getContent={(r) => r.lastName}/>
                          <DataTableCell getContent={(r) => r.dob.toLocaleString()}/>
                          <DataTableCell getContent={(r) => r.country}/>
                          <DataTableCell getContent={(r) => r.phoneNumber}/>
                          
                      </TableBody>
                  </Table>
              </Page>
          </Document>
        );

export default PdfTableTest;