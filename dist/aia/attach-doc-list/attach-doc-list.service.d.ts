import { HttpService } from '@nestjs/axios';
import { HttpMessageDto } from '../../utils/dto/http-status-message.dto';
import { UtilsService } from '../../utils/utils.service';
import { QueryAttachBodyDto } from './dto/query-attach-doc-list.dto';
import { ResultAttachDocListDto } from './dto/result-attach-doc-list.dto';
export declare class AttachDocListService {
    private readonly httpService;
    private readonly utilsService;
    constructor(httpService: HttpService, utilsService: UtilsService);
    AttachDocList(queryBillingSubmissionBodyDto: QueryAttachBodyDto): Promise<ResultAttachDocListDto>;
    addFormatHTTPStatus(data: HttpMessageDto, inputstatusCode: number, inputmessage: string, inputerror: string): void;
}
