import { Injectable } from '@nestjs/common';
import { createTransport, Transporter } from 'nodemailer';

@Injectable()
export class EmailService {
  transporter: Transporter;

  constructor() {
    this.transporter = createTransport({
      host: 'smtp.163.com',
      port: 25,
      secure: false,
      auth: {
        user: 'xiaokai12077021@163.com',
        pass: 'NEYWVRCGBAGZURVT',
      },
    });
  }

  async sendMail({ to, subject, html }) {
    await this.transporter.sendMail({
      from: {
        name: '会议室预定系统',
        address: 'xiaokai12077021@163.com',
      },
      to,
      subject,
      html,
    });
  }
}
