



function parseJwt(token) {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error('Error parsing JWT:', error);
    return null;
  }
}
//----------showLeaderBoard fnction







//---------------------------



/// for signup----------------------------------------------------
// function SubmitSignUp(event) {
//     event.preventDefault();
//     const name = document.getElementById('name').value;
//     const email = document.getElementById('email').value;
//     const password = document.getElementById('password').value;

//     axios.post('/signup', {
//         name: name,
//         email: email,
//         password: password
//     })
//     .then( (response) =>{
//         if(response.status===409)
//         alert('email already exhist')
//     else alert('sign Up succesfully')
//        window.localStorage.href='/'
//     })
//     .catch(function (error) {
//         console.log(error);
//         alert('An error occurred. Please try again.');
//     });
// }
//------------------------------------------------------------------

// async function submitSignIn(event) {
//     event.preventDefault();
//     const email = document.getElementById('email').value;
//     const password = document.getElementById('password').value;

//     await axios.post('/signin', { email, password })
//         .then(function (response) {
//             if (response.status === 200) {
//                 console.log(response.data.token)
//                 localStorage.setItem('token',response.data.token)
//                 alert('Successful Login');
//                 window.location.href = 'http://localhost:8000/expense';
//             }
//         })
//         .catch(function (error) {
//             console.error(error);
//             alert('An error occurred. Please try again.');
//         });
// }
//--------------------------------------------------------------------------

function SaveData(event)
{
    
        event.preventDefault();
        const category = document.getElementById('category').value;
        const description = document.getElementById('description').value;
        const amount = document.getElementById('amount').value;
        console.log(category,description,amount)
          const token=localStorage.getItem('token')
        axios.post('/expense/savedata', { category, description, amount }, {
          headers: {
            'Authorization': token
            
          }})
            .then( (response)=> {
                alert('Data saved successfully');
                window.location.reload();
               
            })
            .catch( (error)=> {
                console.error(error);
                alert('An error occurred. Please try again.');
            });
    }

    //----------------------------------------------------------------------------------------------
    document.addEventListener('DOMContentLoaded', function () {
      const token=localStorage.getItem('token')
        fetch('/expense/allData', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': token 
            
          }
        })
          .then(function (response) {
            return response.json();
          })
          .then(function (data) {
            const tableBody = document.getElementById('tbody')
           
            data.forEach(item => {
              const row = document.createElement('tr');
              const categoryCell = document.createElement('td');
              categoryCell.textContent = item.CATEGORY;
              const descriptionCell = document.createElement('td');
              descriptionCell.textContent = item.DESCRIPTION;
              const amountCell = document.createElement('td');
              amountCell.textContent = item.AMOUNT;
              const statusCell = document.createElement('td');
              const deleteButton = document.createElement('button');
              deleteButton.textContent = 'Delete';
      
              //------------------------------------------------------------
              deleteButton.addEventListener('click', function () {
                const itemId = item.ID; // Assuming your item has an ID field
      
                fetch(`/expense/deleteData/${itemId}`, {
                  method: 'DELETE',
                })
                  .then((response) => {
                    alert('Row deleted successfully');
                    row.remove()
                  })
                  .catch((error) => {
                    console.error(error);
                    alert('An error occurred while deleting the row. Please try again.');
                  });
              });
              //------------------------------------------------------------------
              statusCell.appendChild(deleteButton);
      
              row.appendChild(categoryCell);
              row.appendChild(descriptionCell);
              row.appendChild(amountCell);
              row.appendChild(statusCell);
              tableBody.appendChild(row);
            });
            document.getElementById('LB').style.display='none'//----------for hiding showleader button
         //Adding remove premium and display message functionality
         const token=localStorage.getItem('token');
         const tokenobject=parseJwt(token)
         if(tokenobject.isPremium=== true)
         {
          const premButton=document.getElementById('buypremium') // making buttton invisible after payment
            premButton.style.display = 'none';
            const paradiv = document.getElementById('paradiv');
            const para = document.createElement('p');
            para.textContent = 'Premium Membership';
            para.style.color = 'green'; 
            para.style.fontWeight='bold'
            paradiv.appendChild(para);


           document.getElementById('LB').style.display='block'


         }




          })
          .catch(function (error) {
            console.error(error);
            alert('An error occurred while retrieving data');
          });
      });
      

//------------------------------------------------------------------------------------------------ 

if (document.getElementById('buypremium'))

{
  document.getElementById('buypremium').onclick = async (e) => {
        try{
        let token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:8000/purchase/premiummembership', {
          headers: { "Authorization": token }
        });
        //------------------------------------------------------------------------------
        console.log(response);
      
        var options = {
          key: 'rzp_test_l8Qgv3sCDGg8Cr',
          amount: response.data.order.amount, 
          currency: response.data.order.currency, 
          order_id: response.data.order.id,
          name: 'MJ5',
          description: 'Premium Plan',
         handler: async function (response) {
            try {
              console.log(response)
              const resp=await axios.post('http://localhost:8000/purchase/premiummembership/updatestatus', {
                order_id: options.order_id,
                payment_id: response.razorpay_payment_id,
                status:'Success',
              }, {
                headers: {
                  "Authorization": token
                }
              });
               token=resp.data.token;
              localStorage.setItem('token',token)
              alert('You are now a premium member');
              window.location.reload();

          




              
            } catch (error) {
              console.error(error);
            }
          }
        };
      
    
        const rzp1 = new Razorpay(options);

        rzp1.on('payment.failed',async function (response) {
          console.log(response)
          await axios.post('http://localhost:8000/purchase/premiummembership/updatestatus', {
            order_id: options.order_id,
            payment_id: response.error.metadata.payment_id,
            status:'Failed',
          }, {
            headers: {
              "Authorization": token
            }
          });
          alert('Payment Failed: ' + response.error.description);
        });

       

        rzp1.open();  
      } 
      catch (error) {
        console.error(error);
      }
    }

}


 
  
if( document.getElementById('LB'))
{ 
  
  document.getElementById('LB').onclick = async (e) => {
  e.preventDefault();
  
  const token = localStorage.getItem('token');

  try {
       window.location.href='/showLeaderBoard'
      // const response = await axios.get('/purchase/leaderBoard', {
      //     headers: { Authorization: token }
      // });

      // console.log('Response:', response.data);
      // showDataLeaderBoard(response.data.userAgregate);
  } catch (error) {
      console.error('Error:', error);
  }
};


}
 
  