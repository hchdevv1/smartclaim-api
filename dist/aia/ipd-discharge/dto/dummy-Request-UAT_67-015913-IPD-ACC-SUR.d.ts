export declare class DummyDataRequest1 {
    PatientInfo: {
        RefId: string;
        TransactionNo: string;
        Username: string;
        HospitalCode: string;
        InsurerCode: string;
        ElectronicSignature: string;
        DataJsonType: string;
        DataJson: {
            Patient: {
                Dob: string;
                Gender: string;
                Hn: string;
            };
            Visit: {
                AccidentDate: string;
                AdditionalNote: string;
                AdmitDateTime: string;
                AlcoholRelated: boolean;
                An: string;
                ChiefComplaint: string;
                ComaScore: string;
                DscDateTime: string;
                DxFreeText: string;
                ExpectedDayOfRecovery: string;
                ExpectedLos: string;
                Height: string;
                IndicationForAdmission: string;
                PhysicalExam: string;
                PlanOfTreatment: string;
                Pregnant: boolean;
                PresentIllness: string;
                PreviousTreatmentDate: string;
                PreviousTreatmentDetail: string;
                PreauthReferClaimNo: string;
                PreauthReferOcc: string;
                PrivateCase: boolean;
                SignSymptomsDate: string;
                UnderlyingCondition: string;
                VisitDateTime: string;
                Vn: string;
                Weight: string;
            };
            VitalSign: {
                DiastolicBp: string;
                HeartRate: string;
                OxygenSaturation: string;
                PainScore: string;
                RespiratoryRate: string;
                SystolicBp: string;
                Temperature: string;
                VitalSignEntryDateTime: string;
            }[];
            Diagnosis: {
                DxName: string;
                DxType: string;
                Icd10: string;
            }[];
            AccidentDetail: {
                AccidentPlace: string;
                AccidentDate: string;
                CauseOfInjuryDetail: {
                    CauseOfInjury: string;
                    CommentOfInjury: string;
                }[];
                InjuryDetail: {
                    WoundType: string;
                    InjurySide: string;
                    InjuryArea: string;
                }[];
            };
            Procedure: {
                Icd9: string;
                ProcedureDate: string;
                ProcedureName: string;
            }[];
            OrderItem: {
                Discount: string;
                Initial: string;
                ItemAmount: string;
                ItemId: string;
                ItemName: string;
                LocalBillingCode: string;
                LocalBillingName: string;
                NetAmount: string;
            }[];
            Doctor: {
                DoctorLicense: string;
                DoctorRole: string;
                DoctorFirstName: string;
                DoctorLastName: string;
            }[];
            Billing: {
                LocalBillingCode: string;
                LocalBillingName: string;
                SimbBillingCode: string;
                PayorBillingCode: string;
                BillingInitial: string;
                BillingDiscount: string;
                BillingNetAmount: string;
            }[];
            TotalBillAmount: string;
            Pss: {
                Exclusion: string;
                FinalScore: string;
                Findings: {
                    Description: string;
                    Exclusion: string;
                    Medical: string;
                    Reference: string;
                }[];
                Id: string;
                Medical: string;
            };
            ConcurrentNote: any[];
        };
        AttachDocList: {
            Base64Data: string;
            DocName: string;
        }[];
    };
}
