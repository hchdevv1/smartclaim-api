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
            Message: any;
            MessageTh: any;
            ClaimNo: string;
            OccurrenceNo: string;
            TotalApprovedAmount: string;
            TotalExcessAmount: any;
            IsReimbursement: boolean;
            CoverageList: {
                type: string;
                status: boolean;
            }[];
            MessageList: {
                policyNo: string;
                planName: string;
                messageTh: string;
                messageEn: string;
            }[];
        };
    };
}
