
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
 * Prisma Client JS version: 5.22.0
 * Query Engine version: 605197351a3c8bdd595af2d2a9bc3025bca48ea2
 */
Prisma.prismaVersion = {
  client: "5.22.0",
  engine: "605197351a3c8bdd595af2d2a9bc3025bca48ea2"
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

exports.Prisma.CauseofinjurydetailScalarFieldEnum = {
  id: 'id',
  accidentid: 'accidentid',
  causeofinjury: 'causeofinjury',
  commentofinjury: 'commentofinjury'
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
  insurerid: 'insurerid',
  policynumber: 'policynumber',
  membershipid: 'membershipid',
  customerid: 'customerid'
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
  originalname: 'originalname',
  runningdocument: 'runningdocument'
};

exports.Prisma.ClaimstatusScalarFieldEnum = {
  id: 'id',
  claimstatuscode: 'claimstatuscode',
  claimstatusdesc_th: 'claimstatusdesc_th',
  claimstatusdesc_en: 'claimstatusdesc_en',
  insurerid: 'insurerid',
  sort: 'sort'
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

exports.Prisma.IdtypeScalarFieldEnum = {
  id: 'id',
  idtypecode: 'idtypecode',
  idtypedesc_th: 'idtypedesc_th',
  idtypedesc_en: 'idtypedesc_en',
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

exports.Prisma.InjurydetailScalarFieldEnum = {
  id: 'id',
  accidentid: 'accidentid',
  woundtype: 'woundtype',
  injuryside: 'injuryside',
  injuryarea: 'injuryarea'
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
  privatecase: 'privatecase',
  visitdatetime: 'visitdatetime',
  height: 'height',
  weight: 'weight',
  expectedadmitdate: 'expectedadmitdate',
  dscdatetime: 'dscdatetime',
  previoustreatmentdate: 'previoustreatmentdate',
  previoustreatmentdetail: 'previoustreatmentdetail',
  preauthreferclaimno: 'preauthreferclaimno',
  preauthreferocc: 'preauthreferocc',
  ispackage: 'ispackage',
  anesthesialist: 'anesthesialist',
  indicationforadmission: 'indicationforadmission',
  accidentdate: 'accidentdate',
  havediagnosis: 'havediagnosis',
  haveprebilling: 'haveprebilling',
  havepreauthnote: 'havepreauthnote',
  haveconcurrentnote: 'haveconcurrentnote',
  totalestimatedcost: 'totalestimatedcost',
  admitdatetime: 'admitdatetime',
  isipddischarge: 'isipddischarge'
};

exports.Prisma.PolicytypeScalarFieldEnum = {
  id: 'id',
  policytypecode: 'policytypecode',
  policytypedesc: 'policytypedesc',
  insurerid: 'insurerid'
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

exports.Prisma.ServicesettingScalarFieldEnum = {
  id: 'id',
  servicesettingcode: 'servicesettingcode',
  servicesettingdesc: 'servicesettingdesc',
  insurerid: 'insurerid',
  abbreviation: 'abbreviation'
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
  claimstatusdesc_en: 'claimstatusdesc_en',
  policytypecode: 'policytypecode',
  idtype: 'idtype',
  illnesstypecode: 'illnesstypecode',
  servicesettingcode: 'servicesettingcode',
  surgerytypecode: 'surgerytypecode',
  visitdatetime: 'visitdatetime',
  runningdocument: 'runningdocument',
  policynumber: 'policynumber',
  membershipid: 'membershipid',
  furtherclaimvn: 'furtherclaimvn',
  customerid: 'customerid',
  totalbillamount: 'totalbillamount',
  visitlocation: 'visitlocation',
  paymentdate: 'paymentdate',
  preauthreferclaimno: 'preauthreferclaimno',
  preauthreferocc: 'preauthreferocc',
  reservedate: 'reservedate',
  isipddischarge: 'isipddischarge',
  servicesettingabbr: 'servicesettingabbr',
  referencevn: 'referencevn'
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

exports.Prisma.AnesthesialistScalarFieldEnum = {
  id: 'id',
  aneslistcode: 'aneslistcode',
  aneslistname: 'aneslistname',
  insurerid: 'insurerid'
};

exports.Prisma.IndicationsforadmissionScalarFieldEnum = {
  id: 'id',
  ifacode: 'ifacode',
  ifaname: 'ifaname',
  insurerid: 'insurerid'
};

exports.Prisma.OpeartionispackageScalarFieldEnum = {
  id: 'id',
  oiscode: 'oiscode',
  oisname: 'oisname',
  insurerid: 'insurerid'
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

exports.Prisma.ConcurrentnotetransactionsScalarFieldEnum = {
  id: 'id',
  insurerid: 'insurerid',
  refid: 'refid',
  transactionno: 'transactionno',
  hn: 'hn',
  vn: 'vn',
  concurrentdatetime: 'concurrentdatetime',
  concurrentdetail: 'concurrentdetail'
};

exports.Prisma.DiagnosistransactionsScalarFieldEnum = {
  id: 'id',
  insurerid: 'insurerid',
  refid: 'refid',
  transactionno: 'transactionno',
  hn: 'hn',
  vn: 'vn',
  dxname: 'dxname',
  dxtype: 'dxtype',
  icd10: 'icd10'
};

exports.Prisma.PreauthnotetransactionsScalarFieldEnum = {
  id: 'id',
  insurerid: 'insurerid',
  refid: 'refid',
  transactionno: 'transactionno',
  hn: 'hn',
  vn: 'vn',
  preauthdatetime: 'preauthdatetime',
  preauthdetail: 'preauthdetail'
};

exports.Prisma.PrebillingtransactionsScalarFieldEnum = {
  id: 'id',
  insurerid: 'insurerid',
  refid: 'refid',
  transactionno: 'transactionno',
  hn: 'hn',
  vn: 'vn',
  localbillingcode: 'localbillingcode',
  localbillingname: 'localbillingname',
  simbbillingcode: 'simbbillingcode',
  payorbillingcode: 'payorbillingcode',
  billinginitial: 'billinginitial',
  billingdiscount: 'billingdiscount',
  billingnetamount: 'billingnetamount',
  totalbillamount: 'totalbillamount'
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
  accidenttransactions: 'accidenttransactions',
  causeofinjurydetail: 'causeofinjurydetail',
  causeofinjuryside: 'causeofinjuryside',
  causeofinjurywoundtype: 'causeofinjurywoundtype',
  claimants: 'claimants',
  claimdocuments: 'claimdocuments',
  claimstatus: 'claimstatus',
  diagnosistypemapping: 'diagnosistypemapping',
  documenttype: 'documenttype',
  idtype: 'idtype',
  illnesssurgery: 'illnesssurgery',
  illnesstype: 'illnesstype',
  injurydetail: 'injurydetail',
  insurers: 'insurers',
  medicaltransactions: 'medicaltransactions',
  policytype: 'policytype',
  proceduretransactions: 'proceduretransactions',
  servicesetting: 'servicesetting',
  transactionclaim: 'transactionclaim',
  transactionclaimstatus: 'transactionclaimstatus',
  anesthesialist: 'anesthesialist',
  indicationsforadmission: 'indicationsforadmission',
  opeartionispackage: 'opeartionispackage',
  accidenttransactions22: 'accidenttransactions22',
  concurrentnotetransactions: 'concurrentnotetransactions',
  diagnosistransactions: 'diagnosistransactions',
  preauthnotetransactions: 'preauthnotetransactions',
  prebillingtransactions: 'prebillingtransactions'
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
