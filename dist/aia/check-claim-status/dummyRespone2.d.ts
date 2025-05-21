export declare class DummyDataRespone1 {
    res: {
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
            InvoiceNumber: any;
            AttachDocList: {
                DocName: string;
                Base64Data: string;
            }[];
        };
    };
}
