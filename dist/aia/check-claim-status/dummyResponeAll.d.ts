export declare class DummyDataRespone1 {
    res: {
        HTTPStatus: {
            statusCode: number;
            message: string;
            error: string;
        };
        Result: {
            InsuranceResult: {
                Code: string;
                Message: string;
                MessageTh: string;
            };
            InsuranceData: {
                RefId: string;
                TransactionNo: string;
                Result: {
                    Code: string;
                    Message: string;
                    MessageTh: string;
                };
                StatusInfo: {
                    InsurerCode: string;
                    BatchNumber: string;
                    ClaimStatus: string;
                    ClaimStatusCode: string;
                    ClaimStatusDesc: string;
                    ClaimStatusDesc_EN: string;
                    ClaimStatusDesc_TH: string;
                    TotalApproveAmount: string;
                    PaymentDate: string;
                    InvoiceNumber: string;
                    AttachDocList: any[];
                };
            }[];
        };
    };
}
export declare class DummyDataRespone2 {
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
            BatchNumber: string;
            ClaimStatus: string;
            ClaimStatusDesc: string;
            TotalApproveAmount: any;
            PaymentDate: any;
            InvoiceNumber: string;
            AttachDocList: any[];
        };
    }[];
}
