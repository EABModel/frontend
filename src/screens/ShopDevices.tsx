import React, { FC, useEffect, useState } from 'react';
import catalogueServices from '../services/catalogueServices';
import { useRowStyles } from '../styles/ShopDevicesStyles';
import {
  Typography,
  Box,
  Collapse,
  Paper,
  IconButton,
  Table,
  TableRow,
  TableHead,
  TableContainer,
  TableCell,
  TableBody,
} from '@material-ui/core';
import '../styles/css/productDetails.scss';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';

const ShopDevices: FC = () => {
  const shopId = window.location.pathname.split('/')[4];
  const [devices, setDevices] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [open, setOpen] = useState(false);
  const classes = useRowStyles();

  useEffect(() => {
    setLoading(true);
    catalogueServices
      .getShopProducts(shopId)
      .then(setDevices)
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <Typography className={classes.title} variant="h4">
        All devices of the shop
      </Typography>
      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>Device name</TableCell>
              <TableCell align="right">Brand</TableCell>
              <TableCell align="right">Os</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {devices.map((device) => (
              <React.Fragment key={device.id}>
                <TableRow className={classes.root}>
                  <TableCell>
                    <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
                      {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {device.name}
                  </TableCell>
                  <TableCell align="right">{device.brand}</TableCell>
                  <TableCell align="right">{device.os}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                      <Box margin={1}>
                        <Typography variant="h6" gutterBottom component="div">
                          Details
                        </Typography>
                        <Table size="small" aria-label="purchases">
                          <TableHead>
                            <TableRow>
                              <TableCell>Color</TableCell>
                              <TableCell>Inches</TableCell>
                              <TableCell>Price</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            <TableRow>
                              <TableCell component="th" scope="row">
                                {device.color}
                              </TableCell>
                              <TableCell>{device.inches}</TableCell>
                              <TableCell>{device.price}</TableCell>
                            </TableRow>
                          </TableBody>
                        </Table>
                      </Box>
                    </Collapse>
                  </TableCell>
                </TableRow>
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default ShopDevices;
