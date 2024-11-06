import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';


@Injectable()
export class EmailService {
    constructor(private readonly mailerService: MailerService){}

    sendMail(email: string, name: string, surname: string): void{
        this.mailerService.sendMail({
            to: email,
            from: 'brynechib@gmail.com',
            subject: 'PROFILE CREATED!',
            text: 'welcome',
            html: `<div><b>Welcome</b><br/> <p>Account profile created for <b>${name} ${surname}</b> on Mida app</p></div>`
        })
    }

}
