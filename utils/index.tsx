export function uri_to_blob(uri: string): Promise<Blob> {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.onload = function () {
            resolve(xhr.response);
        };
        xhr.onerror = function () {
            reject(new TypeError("Network request failed"));
        };
        xhr.responseType = "blob";
        xhr.open("GET", uri, true);
        xhr.send(null);
    });
}

export function optional(prop: any): "unavailable" | any {
    if (!prop) {
        return "unavailable";
    }
    return prop;
}
