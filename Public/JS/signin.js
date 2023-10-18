async function submitSignIn(event) {
    event.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    await axios.post('/signin', { email, password })
        .then(function (response) {
            if (response.status === 200) {
                console.log(response.data.token)
                localStorage.setItem('token',response.data.token)
                alert('Successful Login');
                window.location.href = 'http://localhost:8000/expense';
            }
        })
        .catch(function (error) {
            console.error(error);
            alert('An error occurred. Please try again.');
        });
}