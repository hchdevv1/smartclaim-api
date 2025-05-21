export declare class DummyDataRespone1 {
    PatientInfo: {
        Result: {
            Code: string;
            Message: string;
            MessageTh: string;
        };
        Data: {
            RefId: string;
            TransactionNo: string;
            InsurerCode: string;
            PreAuthTransactionList: {
                ClaimNo: string;
                OccerrenceNo: string;
                ClaimStatus: string;
                ClaimStatusDesc: string;
                ExpectedAdmitDate: string;
                VisitDateTime: string;
                Diagnosis: {
                    DxName: string;
                    Icd10: string;
                }[];
                Procedure: {
                    ProcedureName: string;
                    ProcedureDate: any;
                    Icd9: string;
                }[];
            }[];
        };
    };
}
