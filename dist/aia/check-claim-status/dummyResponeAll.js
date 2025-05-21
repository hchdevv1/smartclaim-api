"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DummyDataRespone2 = exports.DummyDataRespone1 = void 0;
class DummyDataRespone1 {
    constructor() {
        this.res = {
            "HTTPStatus": {
                "statusCode": 200,
                "message": "success",
                "error": ""
            },
            "Result": {
                "InsuranceResult": {
                    "Code": "S",
                    "Message": "success",
                    "MessageTh": "ทำรายการสำเร็จ"
                },
                "InsuranceData": [
                    {
                        "RefId": "ccXwZWYmukJdvzFrWaccN8bNr83caECQjC+vvuEaIKY=",
                        "TransactionNo": "7c3f0072-5675-40d9-be4f-537870987b67",
                        "Result": {
                            "Code": "S",
                            "Message": "success",
                            "MessageTh": "ทำรายการสำเร็จ"
                        },
                        "StatusInfo": {
                            "InsurerCode": "13",
                            "BatchNumber": "025-241007-01",
                            "ClaimStatus": "Cancelled",
                            "ClaimStatusCode": "06",
                            "ClaimStatusDesc": "ยกเลิกรายการ",
                            "ClaimStatusDesc_EN": "Cancelled",
                            "ClaimStatusDesc_TH": "ยกเลิกรายการ",
                            "TotalApproveAmount": "",
                            "PaymentDate": "",
                            "InvoiceNumber": "INV-OPD-AAAA12345",
                            "AttachDocList": []
                        }
                    },
                    {
                        "RefId": "MTd0ky7jD4NGna959nTCKMbNr83caECQjC+vvuEaIKY=",
                        "TransactionNo": "ce2ed029-2e4d-4d09-89d4-5296e543f69a",
                        "Result": {
                            "Code": "S",
                            "Message": "success",
                            "MessageTh": "ทำรายการสำเร็จ"
                        },
                        "StatusInfo": {
                            "InsurerCode": "13",
                            "BatchNumber": "025-241007-01",
                            "ClaimStatus": "Cancelled",
                            "ClaimStatusCode": "06",
                            "ClaimStatusDesc": "ยกเลิกรายการ",
                            "ClaimStatusDesc_EN": "Cancelled",
                            "ClaimStatusDesc_TH": "ยกเลิกรายการ",
                            "TotalApproveAmount": "",
                            "PaymentDate": "",
                            "InvoiceNumber": "INV-OPD-AAAA12345",
                            "AttachDocList": []
                        }
                    },
                    {
                        "RefId": "BW18AhwBItqgr62MF7tM/sbNr83caECQjC+vvuEaIKY==",
                        "TransactionNo": "f0628ac4-4197-4571-804d-ff67c38e04ba",
                        "Result": {
                            "Code": "S",
                            "Message": "success",
                            "MessageTh": "ทำรายการสำเร็จ"
                        },
                        "StatusInfo": {
                            "InsurerCode": "13",
                            "BatchNumber": "025-241007-01",
                            "ClaimStatus": "Cancelled",
                            "ClaimStatusCode": "06",
                            "ClaimStatusDesc": "ยกเลิกรายการ",
                            "ClaimStatusDesc_EN": "Cancelled",
                            "ClaimStatusDesc_TH": "ยกเลิกรายการ",
                            "TotalApproveAmount": "",
                            "PaymentDate": "",
                            "InvoiceNumber": "INV-OPD-AAAA12345",
                            "AttachDocList": []
                        }
                    }
                ]
            }
        };
    }
}
exports.DummyDataRespone1 = DummyDataRespone1;
class DummyDataRespone2 {
    constructor() {
        this.PatientInfo = [
            {
                Result: {
                    Code: 'validate.status.cannot.process',
                    Message: 'Claim status cannot process your request',
                    MessageTh: 'ไม่สามารถตรวจสอบสถานะการพิจารณาสินไหมได้'
                },
                Data: null
            },
            {
                Result: { Code: 'S', Message: 'success', MessageTh: 'ทำรายการสำเร็จ' },
                Data: {
                    RefId: 'MTd0ky7jD4NGna959nTCKMbNr83caECQjC+vvuEaIKa=',
                    TransactionNo: 'ce2ed029-2e4d-4d09-89d4-5296e543f69a',
                    InsurerCode: '13',
                    BatchNumber: '',
                    ClaimStatus: 'Approve',
                    ClaimStatusDesc: 'อนุมัติการเรียกร้องสินไหม',
                    TotalApproveAmount: null,
                    PaymentDate: null,
                    InvoiceNumber: null,
                    AttachDocList: []
                }
            },
            {
                Result: { Code: 'S', Message: 'success', MessageTh: 'ทำรายการสำเร็จ' },
                Data: {
                    RefId: 'MTd0ky7jD4NGna959nTCKMbNr83caECQjC+vvuEaIKY=',
                    TransactionNo: '0dacff4a-ab96-4aa2-a254-fe9ad08e52d8',
                    InsurerCode: '13',
                    BatchNumber: '025-241022-01',
                    ClaimStatus: 'Received',
                    ClaimStatusDesc: 'ได้รับเอกสารแล้ว ',
                    TotalApproveAmount: null,
                    PaymentDate: null,
                    InvoiceNumber: '',
                    AttachDocList: []
                }
            },
            {
                Result: { Code: 'S', Message: 'success', MessageTh: 'ทำรายการสำเร็จ' },
                Data: {
                    RefId: 'pEKhwJse+NHAEc0sSghKp8bNr83caECQjC+vvuEaIKY=',
                    TransactionNo: 'bffd9b31-8882-478b-be1d-460150f11492',
                    InsurerCode: '13',
                    BatchNumber: '',
                    ClaimStatus: 'Received',
                    ClaimStatusDesc: 'ได้รับเอกสารแล้ว ',
                    TotalApproveAmount: null,
                    PaymentDate: null,
                    InvoiceNumber: null,
                    AttachDocList: []
                }
            },
            {
                Result: { Code: 'S', Message: 'success', MessageTh: 'ทำรายการสำเร็จ' },
                Data: {
                    RefId: 'pEKhwJse+NHAEc0sSghKp8bNr83caECQjC+vvuEaIKY=',
                    TransactionNo: '38e5bf99-b427-4366-bf79-7e3204c8c369',
                    InsurerCode: '13',
                    BatchNumber: '',
                    ClaimStatus: 'Cancelled',
                    ClaimStatusDesc: 'ยกเลิกรายการ',
                    TotalApproveAmount: null,
                    PaymentDate: null,
                    InvoiceNumber: null,
                    AttachDocList: []
                }
            },
            {
                Result: { Code: 'S', Message: 'success', MessageTh: 'ทำรายการสำเร็จ' },
                Data: {
                    RefId: 'pEKhwJse+NHAEc0sSghKp8bNr83caECQjC+vvuEaIKY=',
                    TransactionNo: 'ab06bd45-4971-4371-b778-5c6188696a7e',
                    InsurerCode: '13',
                    BatchNumber: '025-241015-01',
                    ClaimStatus: 'Settle',
                    ClaimStatusDesc: 'จ่ายเงินสินไหมทดแทนแล้ว',
                    TotalApproveAmount: null,
                    PaymentDate: null,
                    InvoiceNumber: null,
                    AttachDocList: []
                }
            }
        ];
    }
}
exports.DummyDataRespone2 = DummyDataRespone2;
//# sourceMappingURL=dummyResponeAll.js.map