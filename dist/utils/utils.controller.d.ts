import { UtilsService } from './utils.service';
import { QueryCreateClaimDocumentDtoBodyDto, QuerylistDocumentNameDtoBodyDto, QueryDeleteDocumentByDocNameDto } from './dto/claim-documents.dto';
export declare class UtilsController {
    private readonly utilsService;
    constructor(utilsService: UtilsService);
    EncryptAESECB(Secretkey: string, text: string): any;
    DecryptAESECB(Secretkey: string, text: string): any;
    requestAccessToken(): Promise<import("./dto/utils.dto").aia_accessTokenDTO>;
    getIllnessType(Insurercode: string): Promise<import("./dto/utils.dto").IllnessTypeDto>;
    getIllnessSurgery(Insurercode: string): Promise<import("./dto/utils.dto").IllnessSurgeryDto>;
    getpolicyType(InsuranceCode: string): Promise<import("./dto/utils.dto").PolicyTypeDto>;
    getServiceSetting(InsuranceCode: string): Promise<import("./dto/utils.dto").ServiceSettingDto>;
    getServiceSettingIllnesstype(InsuranceCode: string): Promise<import("./dto/utils.dto").ServiceSettingIllnessDto>;
    getClaimStatus(InsuranceCode: string): Promise<import("./dto/utils.dto").ClaimStatusDto>;
    getIdType(InsuranceCode: string): Promise<import("./dto/utils.dto").IdTypeDto>;
    getClaimStatusCodeByDescription(InsuranceCode: string, claimstatusdesc: string): Promise<import("./dto/utils.dto").ClaimStatusDto>;
    getDocumentType(InsuranceCode: string): Promise<import("./dto/utils.dto").DocumentTypeDto>;
    getdocumentTypeforAttachDocList(InsuranceCode: string): Promise<import("./dto/utils.dto").DocumentTypeDto>;
    getAnesthesiaList(InsuranceCode: string): Promise<import("./dto/utils.dto").AnesthesiaListDto>;
    getOpeartionisPackage(InsuranceCode: string): Promise<import("./dto/utils.dto").OpeartionisPackageDto>;
    getIndicationsForAdmission(InsuranceCode: string): Promise<import("./dto/utils.dto").IndicationsForAdmissionDto>;
    getListPackageBundle(): Promise<import("./dto/utils.dto").ListPackageBundleDto>;
    gePackageBundle(PackageCode: string): Promise<import("./dto/utils.dto").PackageBundleDto>;
    getCauseofInjurywoundtype(InsuranceCode: string): Promise<import("./dto/utils.dto").CauseofInjurywoundtypeDto>;
    getCauseofInjurySide(InsuranceCode: string): Promise<import("./dto/utils.dto").CauseofinjurysideDto>;
    getAccidentPlace(InsuranceCode: string): Promise<import("./dto/utils.dto").AccidentplaceDto>;
    getAccidentCauseOver45Day(InsuranceCode: string): Promise<import("./dto/utils.dto").Accidentcauseover45daysDto>;
    getDiagnosisTypeMapping(InsuranceCode: string, DxtypecodeTrakcare: string): Promise<import("./dto/utils.dto").DiagnosisTypeMappingDto>;
    getFile(id: string): Promise<{
        filename: string;
        base64: string;
    }>;
    getFilemany(id: string): Promise<{
        filename: string;
        base64: string;
    }[]>;
    uploadFile(file: Express.Multer.File, body: QueryCreateClaimDocumentDtoBodyDto): Promise<{
        message: string;
        filename: string;
    }>;
    uploadBase64File(base64: string, fileName: string): Promise<{
        message: string;
        path: string;
    }>;
    getlistDocumentName(querylistDocumentNameDtoBodyDto: QuerylistDocumentNameDtoBodyDto): Promise<any>;
    getDocumentByDocname(queryCreateClaimDocumentDtoBodyDto: QueryCreateClaimDocumentDtoBodyDto): Promise<{
        filename: string;
        base64: string;
    }>;
    getListDocumentByRefId(queryCreateClaimDocumentDtoBodyDto: QueryCreateClaimDocumentDtoBodyDto): Promise<import("./dto/claim-documents.dto").ResultAttachDocListInfoDto[]>;
    DeleteDocumentByDocName(queryDeleteDocumentByDocNameDto: QueryDeleteDocumentByDocNameDto): Promise<import("./dto/claim-documents.dto").ResultDeleteDocumentByDocNameDto>;
    isClaimExcludedByDocName(queryDeleteDocumentByDocNameDto: QueryDeleteDocumentByDocNameDto): Promise<import("./dto/claim-documents.dto").ResultDeleteDocumentByDocNameDto>;
    getlistDocumentClaim(querylistDocumentNameDtoBodyDto: QuerylistDocumentNameDtoBodyDto): Promise<{
        filename: string;
        originalname: string;
        documenttypecode: string;
        isClaimExcludedByDocName: boolean;
    }[]>;
    UpdateDocumentTypeCode(querylistDocumentNameDtoBodyDto: QuerylistDocumentNameDtoBodyDto): Promise<import("./dto/claim-documents.dto").ResultUpdateDocumentByDocNameDto>;
}
