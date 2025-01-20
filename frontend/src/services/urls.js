import http from "./service";


class URLS {
    getAll() {
        return http.get("");
    }

    getById(id) {
        return http.get(`/${id}`);
    }

    create(data) {
        return http.post("", data);
    }

    update(id, data) {
        return http.put(`/${id}`, data);
    }

    delete(id) {
        return http.delete(`/${id}`);
    }
}
export default new URLS();