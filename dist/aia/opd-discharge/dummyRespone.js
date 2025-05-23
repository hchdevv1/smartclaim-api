"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DummyDataRespone1 = void 0;
class DummyDataRespone1 {
    constructor() {
        this.res = {
            "Result": {
                "Code": "S",
                "Message": "success",
                "MessageTh": "ทำรายการสำเร็จ"
            },
            "Data": {
                "RefId": "OPD-008-Test-001",
                "TransactionNo": "13675055-0ed9-40f7-bd38-bec0754fe674",
                "InsurerCode": "13",
                "Message": null,
                "MessageTh": null,
                "ClaimNo": "C500061866",
                "OccurrenceNo": "1",
                "TotalApprovedAmount": "760.00",
                "TotalExcessAmount": null,
                "IsReimbursement": false,
                "CoverageList": [
                    {
                        "type": "HS",
                        "status": true
                    },
                    {
                        "type": "HSBypass",
                        "status": false
                    },
                    {
                        "type": "Reimbursement",
                        "status": false
                    }
                ],
                "MessageList": [
                    {
                        "policyNo": "9R1fx4OLW9CVwXkeHi2+/A==",
                        "planName": "ME",
                        "messageTh": "เนื่องจากต้องพิจารณาข้อมูลทางการแพทย์เพิ่มเติม หากต้องการใช้สิทธิ์ กรุณาทำรายการโดยเลือกตรวจสอบสิทธิ์โดยเจ้าหน้าที่",
                        "messageEn": "AI049"
                    },
                    {
                        "policyNo": "CSejmZdkzQORVhJHiWdMEg==",
                        "planName": "H&S Plus gold",
                        "messageTh": "สัญญาเพิ่มเติมมีสิทธิ์ใช้บริการเรียกร้องสินไหม",
                        "messageEn": "PASS"
                    }
                ]
            }
        };
    }
}
exports.DummyDataRespone1 = DummyDataRespone1;
//# sourceMappingURL=dummyRespone.js.map