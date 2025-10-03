import { Injectable, Logger } from "@nestjs/common";
import * as nodemailer from 'nodemailer';
import { ConfigService } from "../../config/config.service";

@Injectable()
export class EmailService {
  constructor(
    private readonly configService: ConfigService,
  ) { }

  private getMailTransporter() {
    return nodemailer.createTransport({
      host: this.configService.get('EMAIL_SMTP_HOST'),
      port: this.configService.get('EMAIL_SMTP_PORT'),
      secure: false, // EMAIL_ENABLE_SSL,
      auth: {
        user: this.configService.get('EMAIL_USER_NAME'),
        pass: this.configService.get('EMAIL_PASSWORD'),
      },
      tls: {
        // do not fail on invalid certs
        rejectUnauthorized: false
      }
    });
  }

  public sendMailResetPassword(mailReceiver: string, url: string) {
    const mailOptions = {
      from: this.configService.get('EMAIL_USER_NAME'),
      to: mailReceiver,
      subject: this.configService.get('EMAIL_RESET_PASSWORD_SUBJECT'),
      html: `
        <div style="font-family: Arial, sans-serif; background: #f9f9f9; padding: 32px;">
          <div style="max-width: 480px; margin: 0 auto; background: #fff; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.06); padding: 32px;">
            <h2 style="color: #2d3748; margin-bottom: 16px;">Password Reset Request</h2>
            <p style="color: #4a5568;">Hello,</p>
            <p style="color: #4a5568;">
              We received a request to reset your password. Click the button below to reset it:
            </p>
            <div style="text-align: center; margin: 32px 0;">
              <a href="${url}" style="background: #3182ce; color: #fff; text-decoration: none; padding: 12px 28px; border-radius: 4px; font-weight: bold; display: inline-block;">
                Reset Password
              </a>
            </div>
            <p style="color: #718096; font-size: 14px;">
              If you did not request a password reset, please ignore this email.
            </p>
            <p style="color: #4a5568; margin-top: 32px;">Thank you,<br/>The Support Team</p>
          </div>
        </div>
      `,
    };

    this.getMailTransporter().sendMail(mailOptions, (error, info) => {
      if (error) {
        Logger.error(JSON.stringify(error));
      } else {
        Logger.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
      }
    });
  }

  public sendMail(mailReceiver: string, mailSubject: string, content: string) {
    const mailOptions = {
      from: this.configService.get('EMAIL_USER_NAME'),
      to: mailReceiver,
      subject: mailSubject,
      html: content,
    };

    this.getMailTransporter().sendMail(mailOptions, (error, info) => {
      if (error) {
        Logger.error(JSON.stringify(error));
      } else {
        Logger.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
      }
    });
  }
}