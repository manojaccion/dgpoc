import { MessageService } from 'src/app/service/message.service';
import { CommonService } from 'src/app/service/common.service';

export const serviceContainer= [
    MessageService,
    CommonService
];

export { CommonService } from 'src/app/service/common.service';
export { MessageService } from 'src/app/service/message.service';