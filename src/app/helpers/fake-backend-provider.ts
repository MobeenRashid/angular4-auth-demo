import { MockBackend, MockConnection } from "@angular/http/testing";
import { BaseRequestOptions, RequestMethod, Response, ResponseOptions, Http } from "@angular/http";

export function fakeBackendFactory(mock: MockBackend, options: BaseRequestOptions) {
    mock.connections.subscribe((mConnection: MockConnection) => {

        let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6Ik1vYmVlbiBSYXNoaWQiLCJhZG1pbiI6dHJ1ZX0.VTqG0BSFNL6ouw-xFqkwnGXnz6lU5kP8isrSmu5bZic";
        setTimeout(() => {
            if (mConnection.request.url.endsWith("/api/authenticate") && mConnection.request.method === RequestMethod.Post) {
                let body = JSON.parse(mConnection.request.getBody())
                if (body.email === "mobeen@live.com" && body.password === "123") {
                    mConnection.mockRespond(new Response(new ResponseOptions({
                        status: 200,
                        body: {
                            token: token
                        }
                    })))
                } else {
                    mConnection.mockRespond(new Response(new ResponseOptions({
                        status: 401
                    })))
                }
            }
        }, 2000)
        return new Http(mock, options);
    });
}

export let fakeBackenedProvider = {
    provide: Http,
    useFactory: fakeBackendFactory,
    deps: [
        MockBackend, BaseRequestOptions
    ]
}