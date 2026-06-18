// src/services/authService.js

// មុខងារសម្រាប់ Login
export const login = async (email, password) => {
  // នៅទីនេះ អ្នកអាចភ្ជាប់ជាមួយ API ពិតប្រាកដ (ឧ. axios.post)
  // សម្រាប់ការតេស្ត យើងប្រើកូដសាមញ្ញមួយ៖
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (email === 'admin@etec.com' && password === '123456') {
        const user = { name: 'Admin', email: email };
        localStorage.setItem('user', JSON.stringify(user)); // រក្សាទុក User ក្នុង Browser
        resolve(user);
      } else {
        reject('Email ឬ Password មិនត្រឹមត្រូវ!');
      }
    }, 1000);
  });
};

// មុខងារសម្រាប់ Logout
export const logout = () => {
  localStorage.removeItem('user');
};

// មុខងារពិនិត្យថាបាន Login ឬនៅ
export const isAuthenticated = () => {
  return !!localStorage.getItem('user');
};