async function forgot (event)
{
    event.preventDefault();
    const obj={
        email:document.getElementById('email').value,
    }
    console.log(obj)
await axios.post('http://localhost:8000/password/forgotpassword', obj)
  .then(response => {
    console.log(response);
  })
  .catch(error => {
    console.log(error);
  });
}