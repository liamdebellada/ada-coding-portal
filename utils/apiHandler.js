import axios from 'axios'
const getDataFromUrl = async (url) => {
    if (typeof(url) !== 'string') {
        let data = []
        for (let item in url) {
            data.push(await axios.get(url[item]).then(r => r.data).catch(() => false))
        }
        return data
    } else {
        let data = await axios.get(url).then(d => d.data).catch(() => false)
        return data
    }
}

export default getDataFromUrl