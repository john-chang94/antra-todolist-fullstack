import axios from "axios";

export const getTodos = async () => {
    try {
        const res = await axios.get(`http://localhost:5000/todos`);
        return res.data;
    } catch (err) {
        console.log(err);
    }
}

export const addtodo = async (body) => {
    try {
        const res = await axios.post(`http://localhost:5000/todos`, body);
        return res.data;
    } catch (err) {
        console.log(err);
    }
}

export const deleteTodo = async (t_id) => {
    try {
        const res = await axios.delete(`http://localhost:5000/todos/${t_id}`);
        return res.data;
    } catch (err) {
        console.log(err);
    }
}

export const updateTodo = async (t_id, body) => {
    try {
        const res = await axios.put(`http://localhost:5000/todos/${t_id}`, body);
        return res.data;
    } catch (err) {
        console.log(err);
    }
}
