export declare class DummyDataRequest2 {
    PatientInfo: {
        RefId: string;
        Username: string;
        HospitalCode: string;
        InsurerCode: string;
        ElectronicSignature: string;
        DataJsonType: number;
        DataJson: {
            IdType: string;
            Id: string;
            PolicyType: string;
            ServiceSetting: string;
            IllnessType: string;
            SurgeryType: string;
            Patient: {
                FirstName: string;
                LastName: string;
                Dob: string;
            };
            Visit: {
                VisitDateTime: string;
                AccidentDate: string;
            };
        };
    };
}
