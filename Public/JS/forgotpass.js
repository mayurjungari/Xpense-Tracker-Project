async function forgot (event)
{
    event.preventDefault();
    const obj={
        email:document.getElementById('email').value,
    }
    console.log(obj)
await axios.post('http://localhost:8000/password/forgotpassword', obj)
  .then(response => {
    if(response.status==200) alert('Reset Link sent on Registered Email')
    
    console.log(response);
  })
  .catch(error => {
    alert('used registered Mail')
    console.log(error);
  });
}