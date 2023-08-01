import Head from 'next/head';
import { subDays, subHours } from 'date-fns';
import { Box, Container, Unstable_Grid2 as Grid } from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { OverviewBudget } from 'src/sections/overview/overview-budget';
import { OverviewLatestOrders } from 'src/sections/overview/overview-latest-orders';
import { OverviewLatestProducts } from 'src/sections/overview/overview-latest-products';
import { OverviewSales } from 'src/sections/overview/overview-sales';
import { OverviewTasksProgress } from 'src/sections/overview/overview-tasks-progress';
import { OverviewTotalCustomers } from 'src/sections/overview/overview-total-customers';
import { OverviewTotalProfit } from 'src/sections/overview/overview-total-profit';
import { OverviewTraffic } from 'src/sections/overview/overview-traffic';
import React, { useState } from 'react'
const now = new Date();



const Page = () => {
  let balance = localStorage.getItem('balance')
  if (!balance || isNaN(balance)) {
    localStorage.setItem('balance', 100000)
    balance = 100000
  }

  const params = localStorage.getItem('params').split('&')
    .reduce(function (map, item) {
      map[item.split('=')[0]] = item.split('=')[1]
      return map;
    },{});

  const Trans_Num = Math.floor(Math.random() * 1000) + 1
  const InvoiceNum = Math.floor(Math.random() * 10000) + 1
  return (

    <>
      <Head>
        <title>
          Sejel
        </title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8
        }}
      >
        <Container maxWidth="xl">
          <Grid
            container
            spacing={3}
          >
            <Grid
              xs={12}
              sm={6}
              lg={3}
            >
              <OverviewBudget
                difference={12}
                positive
                sx={{ height: '100%' }}
                value={"$" + balance}
              />
            </Grid>
            <Grid
              xs={12}
              sm={6}
              lg={3}
            >
              <OverviewTotalCustomers
                difference={16}
                positive={false}
                sx={{ height: '100%', width: '140%' }}
                value="SA0380000000608010167519"
              />
            </Grid>




            <Grid
              xs={12}
              md={12}
              lg={8}

            >
              <OverviewLatestOrders
                orders={[
                  {
                    id: 'f69f88012978187a6c12897f',
                    ref: 'رقم الهوية',
                    amount: 30.5,
                    customer: {
                      name: '1011844207'
                    },
                    createdAt: 'اسم المستخدم',
                    status: 'محمد الخالد'
                  },
                  {
                    id: '9eaa1c7dd4433f413c308ce2',
                    ref: 'الوصف',
                    amount: 25.1,
                    customer: {
                      name: 'مزاد الخزامى, الأصل رقم 63397'
                    },
                    createdAt: 'البريد الالكتروني',
                    status: 'Hala.Aly@envnt.co'
                  },
                  {
                    id: '01a5230c811bd04996ce7c13',
                    ref: 'الرسالة النصية',
                    amount: 10.99,
                    customer: {
                      name: '0509184255'
                    },
                    createdAt: '',
                    status: ''
                  },
                  {
                    id: '1f4e1bd0a87cea23cdb83d18',
                    ref: 'القيمة',
                    amount: 96.43,
                    customer: {
                      name: !params ? 0 : params['amount']
                    },
                    createdAt: 'اسم المزاد',
                    status: !params ? 0 : params['Auction_Name']
                  },
                  {
                    id: '9f974f239d29ede969367103',
                    ref: 'رقم الحوالة',
                    amount: 32.54,
                    customer: {
                      name: Trans_Num
                    },
                    createdAt: 'رقم الفاتورة',
                    status: InvoiceNum
                  }
                ]}
                sx={{ height: '100%', width: '150%' }}
              />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  )
};

Page.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Page;
