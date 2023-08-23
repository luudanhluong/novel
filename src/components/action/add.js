import { header, POST } from "../Type";

const add = (url, value) => {
    fetch(url, {
        method: POST,
        body: JSON.stringify(value),
        headers: header,
    })
}

export default add;