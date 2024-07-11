import axios from "axios";

const BACKEND_URL = 'https://react-native-course-340b4-default-rtdb.firebaseiocom'
export async function storeExpense(expenseData) {
    const response = await axios.post(BACKEND_URL + '/expenses.json', expenseData);
    const id = response.data.id
    return id;
}

export async function fetchExpense() {
    const response = await axios.get(BACKEND_URL + '/expenses.json')

    const expenses = [];

    console.log(response.data);
    for(const key in response.data) {
        const expenseObj = {
            id: key,
            amount: response.data[key].amount,
            date: new Date(response.data[key].date),
            description: response.data[key].description
        }
        expenses.push(expenseObj);
    }

    return expenses;
}

export async function updateExpense(id, expenseData) {
    axios.put(BACKEND_URL + `/expenses/${id}.json`, expenseData)
}

export function deleteExpense(id) {
    return axios.delete(BACKEND_URL + `/expenses/${id}.json`)
}