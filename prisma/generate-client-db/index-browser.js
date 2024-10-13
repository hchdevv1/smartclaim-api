
Object.defineProperty(exports, "__esModule", { value: true });

const {
  Decimal,
  objectEnumValues,
  makeStrictEnum,
  Public,
  getRuntime,
  skip
} = require('./runtime/index-browser.js')


const Prisma = {}

exports.Prisma = Prisma
exports.$Enums = {}

/**
 * Prisma Client JS version: 5.20.0
 * Query Engine version: 06fc58a368dc7be9fbbbe894adf8d445d208c284
 */
Prisma.prismaVersion = {
  client: "5.20.0",
  engine: "06fc58a368dc7be9fbbbe894adf8d445d208c284"
}

Prisma.PrismaClientKnownRequestError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientKnownRequestError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)};
Prisma.PrismaClientUnknownRequestError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientUnknownRequestError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientRustPanicError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientRustPanicError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientInitializationError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientInitializationError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientValidationError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientValidationError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.NotFoundError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`NotFoundError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.Decimal = Decimal

/**
 * Re-export of sql-template-tag
 */
Prisma.sql = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`sqltag is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.empty = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`empty is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.join = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`join is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.raw = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`raw is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.validator = Public.validator

/**
* Extensions
*/
Prisma.getExtensionContext = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`Extensions.getExtensionContext is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.defineExtension = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`Extensions.defineExtension is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}

/**
 * Shorthand utilities for JSON filtering
 */
Prisma.DbNull = objectEnumValues.instances.DbNull
Prisma.JsonNull = objectEnumValues.instances.JsonNull
Prisma.AnyNull = objectEnumValues.instances.AnyNull

Prisma.NullTypes = {
  DbNull: objectEnumValues.classes.DbNull,
  JsonNull: objectEnumValues.classes.JsonNull,
  AnyNull: objectEnumValues.classes.AnyNull
}



/**
 * Enums
 */

exports.Prisma.TransactionIsolationLevel = makeStrictEnum({
  ReadUncommitted: 'ReadUncommitted',
  ReadCommitted: 'ReadCommitted',
  RepeatableRead: 'RepeatableRead',
  Serializable: 'Serializable'
});

exports.Prisma.Accidentcauseover45daysScalarFieldEnum = {
  id: 'id',
  causeovercode: 'causeovercode',
  causeoverdesc: 'causeoverdesc',
  insurerid: 'insurerid'
};

exports.Prisma.AccidentplaceScalarFieldEnum = {
  id: 'id',
  accidentplacecode: 'accidentplacecode',
  accidentplacename: 'accidentplacename',
  insurerid: 'insurerid'
};

exports.Prisma.CauseofinjurysideScalarFieldEnum = {
  id: 'id',
  injurysidename: 'injurysidename',
  injurysidecode: 'injurysidecode',
  insurerid: 'insurerid'
};

exports.Prisma.CauseofinjurywoundtypeScalarFieldEnum = {
  id: 'id',
  woundtypename: 'woundtypename',
  woundtypecode: 'woundtypecode',
  insurerid: 'insurerid'
};

exports.Prisma.ClaimantsScalarFieldEnum = {
  id: 'id',
  national_id: 'national_id',
  passportnumber: 'passportnumber',
  hn: 'hn',
  patientid: 'patientid',
  title_th: 'title_th',
  givenname_th: 'givenname_th',
  surname_th: 'surname_th',
  title_en: 'title_en',
  givenname_en: 'givenname_en',
  surname_en: 'surname_en',
  mobilephone: 'mobilephone',
  statusactive: 'statusactive',
  dateofbirth: 'dateofbirth',
  gender: 'gender',
  registrationdate: 'registrationdate',
  insurerid: 'insurerid'
};

exports.Prisma.ClaimdocumentsScalarFieldEnum = {
  id: 'id',
  insurerid: 'insurerid',
  refid: 'refid',
  transactionno: 'transactionno',
  hn: 'hn',
  vn: 'vn',
  documentname: 'documentname',
  documenttypecode: 'documenttypecode',
  documenttypename: 'documenttypename',
  serverpath: 'serverpath',
  filepath: 'filepath',
  filesize: 'filesize',
  filemimetype: 'filemimetype',
  uploaddate: 'uploaddate',
  uploadedby: 'uploadedby',
  originalname: 'originalname'
};

exports.Prisma.ClaimstatusScalarFieldEnum = {
  id: 'id',
  claimstatuscode: 'claimstatuscode',
  claimstatusdesc_th: 'claimstatusdesc_th',
  claimstatusdesc_en: 'claimstatusdesc_en',
  insurerid: 'insurerid'
};

exports.Prisma.DiagnosistypemappingScalarFieldEnum = {
  id: 'id',
  dxtypecodetrakcare: 'dxtypecodetrakcare',
  dxtypenametrakcare: 'dxtypenametrakcare',
  dxtypecodeinsurance: 'dxtypecodeinsurance',
  dxtypenameinsurance: 'dxtypenameinsurance',
  insurerid: 'insurerid'
};

exports.Prisma.DocumenttypeScalarFieldEnum = {
  id: 'id',
  documenttypecode: 'documenttypecode',
  documenttypename: 'documenttypename',
  insurerid: 'insurerid'
};

exports.Prisma.IllnesssurgeryScalarFieldEnum = {
  id: 'id',
  iscode: 'iscode',
  isdesc: 'isdesc',
  insurerid: 'insurerid'
};

exports.Prisma.IllnesstypeScalarFieldEnum = {
  id: 'id',
  illnesstypecode: 'illnesstypecode',
  illnesstypedesc: 'illnesstypedesc',
  insurerid: 'insurerid'
};

exports.Prisma.InsurersScalarFieldEnum = {
  id: 'id',
  insurerid: 'insurerid',
  insurercode: 'insurercode',
  insurername: 'insurername'
};

exports.Prisma.MedicaltransactionsScalarFieldEnum = {
  id: 'id',
  insurerid: 'insurerid',
  refid: 'refid',
  transactionno: 'transactionno',
  hn: 'hn',
  vn: 'vn',
  dxfreetext: 'dxfreetext',
  presentillness: 'presentillness',
  chiefcomplaint: 'chiefcomplaint',
  accidentcauseover45days: 'accidentcauseover45days',
  underlyingcondition: 'underlyingcondition',
  physicalexam: 'physicalexam',
  planoftreatment: 'planoftreatment',
  procedurefreetext: 'procedurefreetext',
  additionalnote: 'additionalnote',
  signsymptomsdate: 'signsymptomsdate',
  comascore: 'comascore',
  expecteddayofrecovery: 'expecteddayofrecovery',
  pregnant: 'pregnant',
  alcoholrelated: 'alcoholrelated',
  haveaccidentinjurydetail: 'haveaccidentinjurydetail',
  haveaccidentcauseofinjurydetail: 'haveaccidentcauseofinjurydetail',
  haveprocedure: 'haveprocedure',
  privatecase: 'privatecase'
};

exports.Prisma.PolicytypeScalarFieldEnum = {
  id: 'id',
  policytypecode: 'policytypecode',
  policytypedesc: 'policytypedesc',
  insurerid: 'insurerid'
};

exports.Prisma.ServicesettingScalarFieldEnum = {
  id: 'id',
  servicesettingcode: 'servicesettingcode',
  servicesettingdesc: 'servicesettingdesc',
  insurerid: 'insurerid'
};

exports.Prisma.TransactionclaimScalarFieldEnum = {
  id: 'id',
  insurerid: 'insurerid',
  refid: 'refid',
  transactionno: 'transactionno',
  hn: 'hn',
  vn: 'vn',
  visitdate: 'visitdate',
  accidentdate: 'accidentdate',
  messageclaim: 'messageclaim',
  messageth: 'messageth',
  claimno: 'claimno',
  claimstatuscode: 'claimstatuscode',
  status_changed_at: 'status_changed_at',
  occurrenceno: 'occurrenceno',
  totalapprovedamount: 'totalapprovedamount',
  totalexcessamount: 'totalexcessamount',
  isreimbursement: 'isreimbursement',
  batchnumber: 'batchnumber',
  invoicenumber: 'invoicenumber',
  otherinsurer: 'otherinsurer',
  furtherclaimid: 'furtherclaimid',
  furtherclaimno: 'furtherclaimno',
  privatecase: 'privatecase',
  previoustreatmentdate: 'previoustreatmentdate',
  previoustreatmentdetail: 'previoustreatmentdetail',
  claimcancelnote: 'claimcancelnote',
  claimstatusdesc: 'claimstatusdesc',
  claimstatusdesc_th: 'claimstatusdesc_th',
  claimstatusdesc_en: 'claimstatusdesc_en'
};

exports.Prisma.TransactionclaimstatusScalarFieldEnum = {
  id: 'id',
  insurerid: 'insurerid',
  refid: 'refid',
  transactionno: 'transactionno',
  hn: 'hn',
  vn: 'vn',
  batchnumber: 'batchnumber',
  claimno: 'claimno',
  invoicenumber: 'invoicenumber',
  status_changed_at: 'status_changed_at',
  note: 'note',
  totalapproveamount: 'totalapproveamount',
  paymentdate: 'paymentdate',
  claimstatuscode: 'claimstatuscode',
  claimcancelnote: 'claimcancelnote',
  claimstatusdesc: 'claimstatusdesc',
  claimstatusdesc_th: 'claimstatusdesc_th',
  claimstatusdesc_en: 'claimstatusdesc_en'
};

exports.Prisma.AccidenttransactionsScalarFieldEnum = {
  id: 'id',
  insurerid: 'insurerid',
  refid: 'refid',
  transactionno: 'transactionno',
  hn: 'hn',
  vn: 'vn',
  accidentplace: 'accidentplace',
  accidentdate: 'accidentdate'
};

exports.Prisma.ProceduretransactionsScalarFieldEnum = {
  id: 'id',
  insurerid: 'insurerid',
  refid: 'refid',
  transactionno: 'transactionno',
  hn: 'hn',
  vn: 'vn',
  icd9: 'icd9',
  procedurename: 'procedurename',
  proceduredate: 'proceduredate'
};

exports.Prisma.Accidenttransactions22ScalarFieldEnum = {
  id: 'id',
  insurerid: 'insurerid',
  refid: 'refid',
  transactionno: 'transactionno',
  hn: 'hn',
  vn: 'vn',
  accidentplace: 'accidentplace',
  accidentdate: 'accidentdate',
  causeofinjury: 'causeofinjury',
  commentofinjury: 'commentofinjury',
  woundtype: 'woundtype',
  injuryside: 'injuryside',
  injuryarea: 'injuryarea'
};

exports.Prisma.CauseofinjurydetailScalarFieldEnum = {
  id: 'id',
  accidentid: 'accidentid',
  causeofinjury: 'causeofinjury',
  commentofinjury: 'commentofinjury'
};

exports.Prisma.InjurydetailScalarFieldEnum = {
  id: 'id',
  accidentid: 'accidentid',
  woundtype: 'woundtype',
  injuryside: 'injuryside',
  injuryarea: 'injuryarea'
};

exports.Prisma.SortOrder = {
  asc: 'asc',
  desc: 'desc'
};

exports.Prisma.QueryMode = {
  default: 'default',
  insensitive: 'insensitive'
};

exports.Prisma.NullsOrder = {
  first: 'first',
  last: 'last'
};


exports.Prisma.ModelName = {
  accidentcauseover45days: 'accidentcauseover45days',
  accidentplace: 'accidentplace',
  causeofinjuryside: 'causeofinjuryside',
  causeofinjurywoundtype: 'causeofinjurywoundtype',
  claimants: 'claimants',
  claimdocuments: 'claimdocuments',
  claimstatus: 'claimstatus',
  diagnosistypemapping: 'diagnosistypemapping',
  documenttype: 'documenttype',
  illnesssurgery: 'illnesssurgery',
  illnesstype: 'illnesstype',
  insurers: 'insurers',
  medicaltransactions: 'medicaltransactions',
  policytype: 'policytype',
  servicesetting: 'servicesetting',
  transactionclaim: 'transactionclaim',
  transactionclaimstatus: 'transactionclaimstatus',
  accidenttransactions: 'accidenttransactions',
  proceduretransactions: 'proceduretransactions',
  accidenttransactions22: 'accidenttransactions22',
  causeofinjurydetail: 'causeofinjurydetail',
  injurydetail: 'injurydetail'
};

/**
 * This is a stub Prisma Client that will error at runtime if called.
 */
class PrismaClient {
  constructor() {
    return new Proxy(this, {
      get(target, prop) {
        let message
        const runtime = getRuntime()
        if (runtime.isEdge) {
          message = `PrismaClient is not configured to run in ${runtime.prettyName}. In order to run Prisma Client on edge runtime, either:
- Use Prisma Accelerate: https://pris.ly/d/accelerate
- Use Driver Adapters: https://pris.ly/d/driver-adapters
`;
        } else {
          message = 'PrismaClient is unable to run in this browser environment, or has been bundled for the browser (running in `' + runtime.prettyName + '`).'
        }
        
        message += `
If this is unexpected, please open an issue: https://pris.ly/prisma-prisma-bug-report`

        throw new Error(message)
      }
    })
  }
}

exports.PrismaClient = PrismaClient

Object.assign(exports, Prisma)
