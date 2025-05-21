import { AttachDocListService } from './attach-doc-list.service';
import { QueryAttachBodyDto } from './dto/query-attach-doc-list.dto';
export declare class AttachDocListController {
    private readonly attachDocListService;
    constructor(attachDocListService: AttachDocListService);
    getbillingsubmission(queryAttachBodyDto: QueryAttachBodyDto): Promise<import("./dto/result-attach-doc-list.dto").ResultAttachDocListDto>;
}
