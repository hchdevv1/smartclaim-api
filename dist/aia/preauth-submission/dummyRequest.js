"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DummyDataRequest1 = void 0;
class DummyDataRequest1 {
    constructor() {
        this.PatientInfo = {
            "RefId": "TEST_IB_PreAuth_Accident_2025-001",
            "TransactionNo": "c8c55851-ea37-4080-b73f-c10be7a7fde6",
            "Username": "bhcsi025",
            "HospitalCode": "7IUZR+KTdDTIyiUHvvvAUQ==",
            "InsurerCode": "13",
            "ElectronicSignature": "",
            "DataJsonType": "3",
            "DataJson": {
                "Patient": {
                    "Dob": "",
                    "Gender": "F",
                    "Hn": "K+3DFaotJcY6cDoIAjb5QQ=="
                },
                "Visit": {
                    "PreauthReferClaimNo": "A111235",
                    "PreauthReferOcc": "1",
                    "VisitDate": "2025-01-02",
                    "ExpectedAdmitDate": "2025-01-02",
                    "AccidentPlace": "1",
                    "AccidentDate": "2025-01-02",
                    "AdditionalNote": "",
                    "AdmitDateTime": "2025-01-02 09:00",
                    "AlcoholRelated": true,
                    "An": "S1RqB5wDH5pCBuqO9JcCGw==",
                    "ChiefComplaint": "MCA",
                    "ComaScore": "15",
                    "DscDateTime": "2025-01-02 10:00",
                    "DxFreeText": "MCA",
                    "ExpectedDayOfRecovery": "45",
                    "ExpectedLos": "1",
                    "Height": "160",
                    "IndicationForAdmission": "8",
                    "PhysicalExam": "Tender",
                    "PlanOfTreatment": "Surgery",
                    "Pregnant": true,
                    "PresentIllness": "30 mins MCA",
                    "PreviousTreatmentDate": "2025-01-02",
                    "PreviousTreatmentDetail": "กรุงเทพเชียงใหม่",
                    "PrivateCase": false,
                    "SignSymptomsDate": "2025-01-02",
                    "UnderlyingCondition": "DM",
                    "VisitDateTime": "2025-01-02 08:00",
                    "Vn": "pmD979ps32RN2++Q4yHCMg==",
                    "Weight": "50"
                },
                "VitalSign": [
                    {
                        "DiastolicBp": "80",
                        "HeartRate": "80",
                        "OxygenSaturation": "100",
                        "PainScore": "10",
                        "RespiratoryRate": "20",
                        "SystolicBp": "120",
                        "Temperature": "36",
                        "VitalSignEntryDateTime": "2024-09-15 08:10"
                    }
                ],
                "Diagnosis": [
                    {
                        "DxName": "MCA",
                        "DxType": "PP",
                        "Icd10": "V2999"
                    },
                    {
                        "DxName": "Fracture of upper end of radius: closed",
                        "DxType": "PP",
                        "Icd10": "S5210"
                    },
                    {
                        "DxName": "Type 2 diabetes mellitus Without complications",
                        "DxType": "CM",
                        "Icd10": "E119"
                    }
                ],
                "AccidentDetail": {
                    "AccidentPlace": "3",
                    "AccidentDate": "2024-08-01",
                    "CauseOfInjuryDetail": [
                        {
                            "CauseOfInjury": "V2999",
                            "CommentOfInjury": "MCA"
                        }
                    ],
                    "InjuryDetail": [
                        {
                            "WoundType": "Fracture",
                            "InjurySide": "Left",
                            "InjuryArea": "S5210"
                        }
                    ]
                },
                "Procedure": [
                    {
                        "Icd9": "7932",
                        "ProcedureDate": "2024-09-15",
                        "ProcedureName": "Open reduction of fracture with internal fixation, radius and ulna"
                    }
                ],
                "AnesthesiaList": ["G"],
                "IsPackage": true,
                "OrderItem": [
                    {
                        "Discount": "400",
                        "Initial": "1000",
                        "ItemAmount": "1",
                        "ItemId": "00012345",
                        "ItemName": "Film Leg",
                        "LocalBillingCode": "1.1.5",
                        "LocalBillingName": "Film X-Ray",
                        "NetAmount": "600"
                    },
                    {
                        "ItemId": "1490001",
                        "ItemName": "STERILE WATER FOR INJ 10 ml.",
                        "LocalBillingCode": "1.1.1(1)",
                        "LocalBillingName": "ยาผู้ป่วยใน",
                        "ItemAmount": "2",
                        "Initial": "200",
                        "Discount": "0",
                        "NetAmount": "200"
                    },
                    {
                        "ItemId": "1900185",
                        "ItemName": "NSS 5 ml./amp (Sodium chloride)",
                        "LocalBillingCode": "1.1.1(1)",
                        "LocalBillingName": "ยาผู้ป่วยใน",
                        "ItemAmount": "50",
                        "Initial": "500",
                        "Discount": "0",
                        "NetAmount": "500"
                    },
                    {
                        "ItemId": "84100",
                        "ItemName": "อาหารปกติ (ต่อมื้อ)",
                        "LocalBillingCode": "2.3.1(1)",
                        "LocalBillingName": "ค่าอาหารผู้ป่วยในปกติ",
                        "ItemAmount": "6",
                        "Initial": "1000",
                        "Discount": "0",
                        "NetAmount": "1000"
                    },
                    {
                        "ItemId": "110082415185009401",
                        "ItemName": "ค่าบริการพยาบาล",
                        "LocalBillingCode": "1.1.12",
                        "LocalBillingName": "1.1.12 ค่าบริการทางการพยาบาล",
                        "ItemAmount": "1",
                        "Initial": "500",
                        "Discount": "0",
                        "NetAmount": "500"
                    },
                    {
                        "ItemId": "HE0020",
                        "ItemName": "CBC (Complete Blood Count)",
                        "LocalBillingCode": "1.1.4",
                        "LocalBillingName": "1.1.4 ค่าตรวจ LAB",
                        "ItemAmount": "1",
                        "Initial": "335",
                        "Discount": "33.5",
                        "NetAmount": "301.5"
                    },
                    {
                        "ItemId": "C004",
                        "ItemName": "Electrolyte",
                        "LocalBillingCode": "1.1.4",
                        "LocalBillingName": "1.1.4 ค่าตรวจ LAB",
                        "ItemAmount": "1",
                        "Initial": "335",
                        "Discount": "33.5",
                        "NetAmount": "301.5"
                    },
                    {
                        "ItemId": "CH32",
                        "ItemName": "Glucose ( DTX )",
                        "LocalBillingCode": "1.1.4",
                        "LocalBillingName": "1.1.4 ค่าตรวจ LAB",
                        "ItemAmount": "12",
                        "Initial": "900",
                        "Discount": "200",
                        "NetAmount": "700"
                    },
                    {
                        "ItemId": "MS0201000063",
                        "ItemName": "IV SET FOR INFUSION PUMP",
                        "LocalBillingCode": "1.1.2",
                        "LocalBillingName": "1.1.2 เวชภัณฑ์ 1",
                        "ItemAmount": "1",
                        "Initial": "74",
                        "Discount": "0",
                        "NetAmount": "74"
                    },
                    {
                        "ItemId": "0000001667",
                        "ItemName": "Extension 18 นิ้ว",
                        "LocalBillingCode": "1.1.2",
                        "LocalBillingName": "1.1.2 เวชภัณฑ์ 1",
                        "ItemAmount": "1",
                        "Initial": "26",
                        "Discount": "0",
                        "NetAmount": "26"
                    },
                    {
                        "ItemId": "0000002184",
                        "ItemName": "T-WAY",
                        "LocalBillingCode": "1.1.2",
                        "LocalBillingName": "1.1.2 เวชภัณฑ์ 1",
                        "ItemAmount": "1",
                        "Initial": "84",
                        "Discount": "0",
                        "NetAmount": "84"
                    },
                    {
                        "ItemId": "MS0201000031",
                        "ItemName": "IV CATHETER NO.24 (JELCO)",
                        "LocalBillingCode": "1.1.2",
                        "LocalBillingName": "1.1.2 เวชภัณฑ์ 1",
                        "ItemAmount": "1",
                        "Initial": "91",
                        "Discount": "0",
                        "NetAmount": "91"
                    }
                ],
                "Investigation": [
                    {
                        "InvestigationCode": "C203A",
                        "InvestigationGroup": "",
                        "InvestigationName": "ALT(SGPT)",
                        "InvestigationResult": "13",
                        "ResultDateTime": "2024-01-15 08:22"
                    },
                    {
                        "InvestigationCode": "C201A",
                        "InvestigationGroup": "ALP",
                        "InvestigationName": "ALP",
                        "InvestigationResult": "74",
                        "ResultDateTime": "2024-01-15 08:22"
                    },
                    {
                        "InvestigationCode": "C304A",
                        "InvestigationGroup": "",
                        "InvestigationName": "CO2",
                        "InvestigationResult": "28",
                        "ResultDateTime": "2024-01-15 08:22"
                    },
                    {
                        "InvestigationCode": "C303A",
                        "InvestigationGroup": "",
                        "InvestigationName": "Cl",
                        "InvestigationResult": "105",
                        "ResultDateTime": "2024-01-15 08:22"
                    },
                    {
                        "InvestigationCode": "C302A",
                        "InvestigationGroup": "",
                        "InvestigationName": "K",
                        "InvestigationResult": "3.8",
                        "ResultDateTime": "2024-01-15 08:22"
                    },
                    {
                        "InvestigationCode": "C301A",
                        "InvestigationGroup": "",
                        "InvestigationName": "Na",
                        "InvestigationResult": "143",
                        "ResultDateTime": "2024-01-15 08:22"
                    },
                    {
                        "InvestigationCode": "C210B",
                        "InvestigationGroup": "Creatinine & eGFR",
                        "InvestigationName": "eGFR",
                        "InvestigationResult": "99",
                        "ResultDateTime": "2024-01-15 08:22"
                    },
                    {
                        "InvestigationCode": "C210A",
                        "InvestigationGroup": "Creatinine & eGFR",
                        "InvestigationName": "Creatinine",
                        "InvestigationResult": "0.63",
                        "ResultDateTime": "2024-01-15 08:22"
                    },
                    {
                        "InvestigationCode": "A1R",
                        "InvestigationGroup": "CBC",
                        "InvestigationName": "MCHC",
                        "InvestigationResult": "32.3",
                        "ResultDateTime": "2024-01-15 08:00"
                    },
                    {
                        "InvestigationCode": "A1Q",
                        "InvestigationGroup": "CBC",
                        "InvestigationName": "MCH",
                        "InvestigationResult": "28.7",
                        "ResultDateTime": "2024-01-15 08:00"
                    },
                    {
                        "InvestigationCode": "A1P",
                        "InvestigationGroup": "CBC",
                        "InvestigationName": "MCV",
                        "InvestigationResult": "88.7",
                        "ResultDateTime": "2024-01-15 08:00"
                    }
                ],
                "Doctor": [
                    {
                        "DoctorLicense": "0000039243",
                        "DoctorRole": "OWNER",
                        "DoctorFirstName": "",
                        "DoctorLastName": ""
                    },
                    {
                        "DoctorLicense": "0000039243",
                        "DoctorRole": "SURGEON",
                        "DoctorFirstName": "",
                        "DoctorLastName": ""
                    }
                ],
                "Billing": [
                    {
                        "LocalBillingCode": "1.1.1(1)",
                        "LocalBillingName": "ยาผู้ป่วยใน",
                        "SimbBillingCode": "1.1.1(1)",
                        "PayorBillingCode": "1.1.1(1)",
                        "BillingInitial": "10000",
                        "BillingDiscount": "1000",
                        "BillingNetAmount": "9000"
                    },
                    {
                        "LocalBillingCode": "1.1.12",
                        "LocalBillingName": "ค่าบริการพยาบาล",
                        "SimbBillingCode": "1.1.12(1)",
                        "PayorBillingCode": "1.1.12(1)",
                        "BillingInitial": "3800",
                        "BillingDiscount": "500",
                        "BillingNetAmount": "3300"
                    },
                    {
                        "LocalBillingCode": "1.1.14",
                        "LocalBillingName": "ค่าบริการโรงพยาบาล",
                        "SimbBillingCode": "1.1.14(2.1)",
                        "PayorBillingCode": "1.1.14(2.1)",
                        "BillingInitial": "5100",
                        "BillingDiscount": "300",
                        "BillingNetAmount": "4800"
                    },
                    {
                        "LocalBillingCode": "1.2.1(10)",
                        "LocalBillingName": "ค่าแพทย์ตรวจรักษา",
                        "SimbBillingCode": "1.2.1(10)",
                        "PayorBillingCode": "1.2.1(10)",
                        "BillingInitial": "15000",
                        "BillingDiscount": "0",
                        "BillingNetAmount": "15000"
                    },
                    {
                        "LocalBillingCode": "1.1.5",
                        "LocalBillingName": "X-Ray",
                        "SimbBillingCode": "1.1.5(1)",
                        "PayorBillingCode": "1.1.5(1)",
                        "BillingInitial": "10000",
                        "BillingDiscount": "4000",
                        "BillingNetAmount": "6000"
                    },
                    {
                        "LocalBillingCode": "1.1.8",
                        "LocalBillingName": "ค่าห้องผ่าตัด",
                        "SimbBillingCode": "1.1.8",
                        "PayorBillingCode": "1.1.8",
                        "BillingInitial": "10000",
                        "BillingDiscount": "2000",
                        "BillingNetAmount": "8000"
                    },
                    {
                        "LocalBillingCode": "1.2.2",
                        "LocalBillingName": "ค่าแพทย์ผ่าตัด",
                        "SimbBillingCode": "1.2.2",
                        "PayorBillingCode": "1.2.2",
                        "BillingInitial": "10000",
                        "BillingDiscount": "4000",
                        "BillingNetAmount": "6000"
                    },
                    {
                        "LocalBillingCode": "2.1.1",
                        "LocalBillingName": "ค่าห้องผู้ป่วยใน",
                        "SimbBillingCode": "2.1.1",
                        "PayorBillingCode": "2.1.1",
                        "BillingInitial": "10000",
                        "BillingDiscount": "4000",
                        "BillingNetAmount": "6000"
                    }
                ],
                "TotalEstimatedCost": "58100",
                "TotalBillAmount": "58100",
                "Pss": {
                    "Exclusion": "0",
                    "FinalScore": "0",
                    "Findings": [
                        {
                            "Description": "0",
                            "Exclusion": "0",
                            "Medical": "0",
                            "Reference": "0"
                        }
                    ],
                    "Id": "0",
                    "Medical": "0"
                },
                "PreAuthNote": [
                    {
                        "PreAuthDateTime": "2024-09-15",
                        "PreAuthDetail": "xxxxxxxxxxxxxxxx"
                    }
                ]
            },
            "AttachDocList": []
        };
    }
}
exports.DummyDataRequest1 = DummyDataRequest1;
//# sourceMappingURL=dummyRequest.js.map