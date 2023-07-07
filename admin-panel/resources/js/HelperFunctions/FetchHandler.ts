const API_HOST = "http://localhost:8000";
export type ResponseTypes = "json" | "text" | "response";

function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(";");
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == " ") {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

export function AppendJwtIfProvidedHeader(header) {
    const access_token = getCookie("XSRF-TOKEN");

    if (access_token) {
        if (!header.hasOwnProperty("Authorization")) {
            header = { ...header, Authorization: `Bearer ${access_token}` };
        }
    }
    return header;
}
export function ResponseHandler(response, _control, as: ResponseTypes) {
    if (response.status === 401) {
        console.log("401 error");
    } else {
        // another status code
        switch (as) {
            case "json":
                return response.json();
            case "text":
                return response.text();
            case "response":
                return response;
        }
    }
}
export function FetchHandler(
    _method: "POST" | "GET",
    _url,
    _control = "FetchHandler",
    body = null,
    as: ResponseTypes = "json",
    headers = null,
    host = API_HOST
) {
    let headerJSON: RequestInit = {
        method: _method,
        body: body,
        headers: {
            Accept: "application/json",
            "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
        },
    };
    headerJSON.headers = AppendJwtIfProvidedHeader(headerJSON.headers);

    host = host.replace(/\/?$/, "/");

    return fetch(_url, headerJSON)
        .then((response) => {
            return ResponseHandler(response, _control, as);
        })
        .catch((err) => {
            console.log(`errored out on ${_url} with body ${body}`, err);
        });
}
