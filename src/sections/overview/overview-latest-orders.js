import { format } from 'date-fns';
import PropTypes from 'prop-types';
import ArrowRightIcon from '@heroicons/react/24/solid/ArrowRightIcon';
import * as React from 'react';
import 'react-credit-cards-2/dist/es/styles-compiled.css';
import 'bootstrap/dist/css/bootstrap.css';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardHeader,
  Divider,
  SvgIcon,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Dialog,
  List,
  ListItem,
  DialogTitle,
  Radio,
  RadioGroup,
  Link
} from '@mui/material';
import { Scrollbar } from 'src/components/scrollbar';
import { SeverityPill } from 'src/components/severity-pill';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
const statusMap = {
  pending: 'warning',
  delivered: 'success',
  refunded: 'error'
};
import Cards from 'react-credit-cards-2';
import { Router } from 'next/router';
import { useRouter } from 'next/router';


export const OverviewLatestOrders = (props) => {
  const { orders = [], sx } = props;
  const [open, setOpen] = React.useState(false);
  const [state, setState] = React.useState({
    number: '',
    expiry: '',
    cvc: '',
    name: '',
    focus: '',
  });

  const router = useRouter();

  const handleInputChange = (evt) => {
    const { name, value } = evt.target;

    setState((prev) => ({ ...prev, [name]: value }));
  }

  const handleInputFocus = (evt) => {
    setState((prev) => ({ ...prev, focus: evt.target.name }));
  }
  let [ccpayment, setCcpayment] = React.useState(false);

  function CreditCardUi() {
    const [payment, setPayment] = React.useState({
      number: "",
      name: "",
      expiry: "",
      cvc: "",
      issuer: "",
      focused: "",
      formData: null,
    });
    function handleCallback({ issuer }, isValid) {
      if (isValid) {
        setPayment({ issuer });
      }
    }
    function onInputFocus({ target }) { }
    function onInputUpdate({ target }) {
      console.log({ [target.name]: target.value });
    }
    function handleSubmit(e) { }
    const { name, number, expiry, cvc, focused, issuer } = payment;
    return (
      <div key="Payment">
        <div>
          <Cards
            number={number}
            name={name}
            expiry={expiry}
            cvc={cvc}
            focused={focused}
            callback={handleCallback}
          />
          <form onSubmit={handleSubmit}>
            <div className="form-group mb-3 mt-4">
              <input
                type="tel"
                name="number"
                className="form-control"
                placeholder="Card Number"
                pattern="[\d| ]{16,22}"
                required
                onChange={onInputUpdate}
                onFocus={onInputFocus}
              />
            </div>
            <div className="form-group mb-3">
              <input
                type="text"
                name="name"
                className="form-control"
                placeholder="Name"
                required
                onChange={onInputUpdate}
                onFocus={onInputFocus}
              />
            </div>
            <div className="row mb-3">
              <div className="col-6">
                <input
                  type="tel"
                  name="expiry"
                  className="form-control"
                  placeholder="Valid Thru"
                  pattern="\d\d/\d\d"
                  required
                  onChange={onInputUpdate}
                  onFocus={onInputFocus}
                />
              </div>
              <div className="col-6">
                <input
                  type="tel"
                  name="cvc"
                  className="form-control"
                  placeholder="CVC"
                  pattern="\d{3,4}"
                  required
                  onChange={onInputUpdate}
                  onFocus={onInputFocus}
                />
              </div>
            </div>
            <input type="hidden" name="issuer" value={issuer} />
            <div className="d-grid">
              <Button
                fullWidth
                size="large"
                sx={{ mt: 3 }}
                variant="contained"
                color='success'
                onClick={() => {
                  if (localStorage.getItem('params')) {
                    const params = localStorage.getItem('params').split('&')
                      .reduce(function (map, item) {
                        map[item.split('=')[0]] = item.split('=')[1]
                        return map;
                      }, {});
                    let amount = params['amount'];
                    let balance = localStorage.getItem('balance');
                    localStorage.setItem('balance', balance - amount)
                    router.push(url)

                  }
                }}

              >
                Confirm
              </Button>
            </div>
          </form>
        </div>
      </div>
    );
  }

    
  const Trans_Num = Math.floor(Math.random() * 1000) + 1
  const InvoiceNum = Math.floor(Math.random() * 10000) + 1
let Auction_Id
  const params = localStorage.getItem('params').split('&')
  .reduce(function (map, item) {
    map[item.split('=')[0]] = item.split('=')[1]
    return map;
  },{});

  if (params) {
    Auction_Id = params['Auction_Id'];
  }
  const url = "https://es-dev.infath.sa/EPaymentPOC_CW/Payment_Redirection?Trans_Num=" + Trans_Num + "&InvoiceNum=" + InvoiceNum + "&Auction_Id=" + Auction_Id;
  return (
    <div>
      <Dialog open={open} maxWidth="sm" fullWidth >
        <DialogTitle>طريقة الدفع {ccpayment}</DialogTitle>

        <List sx={{ p: 1 }}
        >
          <ListItem>
            {ccpayment && <CreditCardUi />}
          </ListItem>
          {!ccpayment && <div>
            <ListItem >

              <Button
                fullWidth
                size="large"
                sx={{ mt: 3 }}
                variant="contained"
                color='success'
                onClick={() => {
                  if (params) {
                    let amount = params['amount'];
                    let balance = localStorage.getItem('balance');

                    localStorage.setItem('balance', balance - amount)
                    router.push(url)
                  }
                }}
              >
                تحويل بنكى
              </Button>

            </ListItem>
            <ListItem >
              <Button
                fullWidth
                size="large"
                sx={{ mt: 3 }}
                variant="contained"
                color='success'
                onClick={() => { setCcpayment(true) }}
              >
                مدى
              </Button>
            </ListItem>
          </div>}
        </List>
      </Dialog>


      <Card sx={sx} >
        <CardHeader title="المدفوعات" style={{ textAlign: 'center' , color:'#007A70',fontFamily:'29LT Zarid Serif'}} />
        <Scrollbar sx={{ flexGrow: 1 }}>
          <Box sx={{ minWidth: 800 }}>
            <Table >

              <TableBody >
                {orders.map((order) => {

                  return (
                    <TableRow
                      hover
                      key={order.id}
                      color='#007A70'
                    >
                      <TableCell align='right' style={{ color:'#007A70',fontFamily:'29LT Zarid Serif'}}>
                        {order.ref}
                      </TableCell>
                      <TableCell align='right' style={{ color:'#A69F88',fontFamily:'29LT Zarid Serif'}} >
                        {order.customer.name}
                      </TableCell>
                      <TableCell align='right' style={{ color:'#007A70',fontFamily:'29LT Zarid Serif'}}>
                        {order.createdAt}
                      </TableCell>
                      <TableCell align='right' style={{ color:'#A69F88',fontFamily:'29LT Zarid Serif'}}>
                        <SeverityPill >
                          {order.status}
                        </SeverityPill>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </Box>
        </Scrollbar>
        <Divider />
        <CardActions sx={{
          alignSelf: "stretch",
        }} >
          <Button
            size="large"
            variant="contained"
            sx={{ mt: 3, backgroundColor:'#50738E'}}
            onClick={() => setOpen(true)}
          >
            ادفع
          </Button>
        </CardActions>
      </Card>
    </div>
  );
};

OverviewLatestOrders.prototype = {
  orders: PropTypes.array,
  sx: PropTypes.object
};
