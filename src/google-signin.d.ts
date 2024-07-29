// google-signin.d.ts
declare namespace google {
    namespace accounts {
        namespace id {
            interface ResponseObject {
                credential: string;
                clientId: string;
                select_by: string;
                // Add more properties as needed based on the Google Sign-In response object
            }

            function initialize(params: { client_id: string, callback: (response: ResponseObject) => void }): void;
            function prompt(): void;
        }
    }
}
