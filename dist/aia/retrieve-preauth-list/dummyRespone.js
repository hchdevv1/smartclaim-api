"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DummyDataRespone1 = void 0;
class DummyDataRespone1 {
    constructor() {
        this.PatientInfo = {
            "Result": {
                "Code": "S",
                "Message": "success",
                "MessageTh": "ทำรายการสำเร็จ"
            },
            "Data": {
                "RefId": "TEST_IB_PreAuth_Accident_2025-001",
                "TransactionNo": "c8c55851-ea37-4080-b73f-c10be7a7fde6",
                "InsurerCode": "13",
                "PreAuthTransactionList": [
                    {
                        "ClaimNo": "Q500065513",
                        "OccerrenceNo": "1",
                        "ClaimStatus": "Approve",
                        "ClaimStatusDesc": "อนุมัติการเรียกร้องสินไหม",
                        "ExpectedAdmitDate": "2024-11-15",
                        "VisitDateTime": "2024-11-15",
                        "Diagnosis": [
                            {
                                "DxName": "Motorcyclist [any] injured in unspecified traffic accident: during unspec activity",
                                "Icd10": "V29.99"
                            },
                            {
                                "DxName": "Fracture of upper end of radius: closed",
                                "Icd10": "S52.10"
                            },
                            {
                                "DxName": "Type 2 diabetes mellitus, without complications",
                                "Icd10": "E11.9"
                            },
                            {
                                "DxName": "Driver injured in collision with other and unspecified motor vehicles in nontraffic accident",
                                "Icd10": "V29.0"
                            }
                        ],
                        "Procedure": [
                            {
                                "ProcedureName": "(35%/HD8/45%) Open reduction of fracture with internal fixation, radius and ulna",
                                "ProcedureDate": null,
                                "Icd9": "79.32"
                            }
                        ]
                    },
                    {
                        "ClaimNo": "Q500065520",
                        "OccerrenceNo": "1",
                        "ClaimStatus": "Approve",
                        "ClaimStatusDesc": "อนุมัติการเรียกร้องสินไหม",
                        "ExpectedAdmitDate": "2024-11-15",
                        "VisitDateTime": "2024-11-15",
                        "Diagnosis": [
                            {
                                "DxName": "Fracture of upper end of radius: closed",
                                "Icd10": "S52.10"
                            },
                            {
                                "DxName": "Type 2 diabetes mellitus, without complications",
                                "Icd10": "E11.9"
                            },
                            {
                                "DxName": "Driver injured in collision with other and unspecified motor vehicles in nontraffic accident",
                                "Icd10": "V29.0"
                            },
                            {
                                "DxName": "Motorcyclist [any] injured in unspecified traffic accident: during unspec activity",
                                "Icd10": "V29.99"
                            }
                        ],
                        "Procedure": [
                            {
                                "ProcedureName": "(35%/HD8/45%) Open reduction of fracture with internal fixation, radius and ulna",
                                "ProcedureDate": null,
                                "Icd9": "79.32"
                            }
                        ]
                    }
                ]
            }
        };
    }
}
exports.DummyDataRespone1 = DummyDataRespone1;
//# sourceMappingURL=dummyRespone.js.map