import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Redirect,
  Render,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import * as mercadopago from 'mercadopago';

mercadopago.configure({
  access_token:
    'TEST-5231862993970280-021817-ebe8d3f5801f39434aeb49aa10e2d9e9-251934142',
});

@Controller()
export class AppController {
  @Get()
  @Render('index')
  root() {
    return {
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
      price: '30',
    };
  }

  @Post('/create-preference')
  async checkout(@Body() body: any, @Res() res: Response) {
    // Crea un objeto de preferencia
    mercadopago.preferences
      .create({
        items: [
          {
            title: body.description,
            unit_price: Number(body.price),
            quantity: Number(body.quantity),
          },
        ],
        back_urls: {
          success: 'http://localhost:4000/success',
        },
        auto_return: 'approved',
      })
      .then(function (response) {
        res.json({
          id: response.body.id,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  @Get('/success')
  @Render('success')
  success(@Query() query: any) {
    return { id: query.payment_id };
  }

  @Post('/refund')
  @Redirect('/')
  async refund(@Body() body: any) {
    const refund = await mercadopago.refund.create({
      payment_id: body.payment_id,
    });
    console.log(refund);
  }
}
