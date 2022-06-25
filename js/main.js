const APIURL ="https://api.themoviedb.org/3/discover/movie?api_key=0646712466eeb817bc8626f04f2f9532";
const IMGPATH= "https://image.tmdb.org/t/p/w1280";
const SEARCHAPI="https://api.themoviedb.org/3/search/movie?&api_key=0646712466eeb817bc8626f04f2f9532";
const main = document.getElementById("content");
const form = document.getElementById("form");
const search = document.getElementById("search");

getMovies(APIURL);

async function getMovies(url){
    const response = await fetch(url);
    const data = await response.json();
    console.log(data.results);
    showMovies(data.results);
}

function showMovies(movies)
{
    main.innerHTML="";
    movies.forEach(movie => {
        const { poster_path, title, overview, vote_average } = movie ;
        const movieEl = document.createElement("div");
        movieEl.classList.add("movie");
        movieEl.innerHTML = `
                <img src = "${IMGPATH}${poster_path}" alt="${title}">
                <div class="movie-info">
                    <h3>${title}</h3>
                    <span class="${getClassByRate(vote_average)}">${vote_average}</span>
                </div>

                <div class="overview">
                    <h3>Overview:</h3>
                    ${overview}

                </div>
                `;
                
                main.appendChild(movieEl);

            });
}



function getClassByRate(vote){
    if(vote >= 8){
        return "green";
    }
    else if (vote >=5){
        return "orange";
    }
    else
    {
        return "red";
    }
    
}


form.addEventListener("submit" , e => {
    e.preventDefault();
    const searchTerm = search.value;
    if(searchTerm){
        getMovies(SEARCHAPI + '&query=' +searchTerm);
        search.value = "";
    }
})


// registrey javascript //

let userName = document.getElementById("name");
let userEmail = document.getElementById("email");
let userPhone = document.getElementById("phone");
let userAge = document.getElementById("age");
let userPassword = document.getElementById("password");
let userRePassword = document.getElementById("rePassword");
let userNameAlert = document.getElementById("namealert");
let userEmailAlert = document.getElementById("emailalert");
let userPhoneAlert = document.getElementById("phonealert");
let userAgeAlert = document.getElementById("agealert");
let userpasswordAlert = document.getElementById("passwordalert");
let userRepasswordAlert = document.getElementById("repasswordalert");
let submitBtn = document.getElementById("submitBtn");
let myRegexMail = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/ ;
let myRegexPass = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/ ;  //Minimum eight characters, at least one letter and one number://
let myRegexName = /^[a-z ,.'-]+$/i ;
let myRegexPhone = /^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$ / ;
let myRegexAge = /^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|200)$/ ;



if( localStorage.getItem("booker") == null  )
{
    var signUpArray = [];
}
else
{
    var signUpArray = JSON.parse(  localStorage.getItem("booker")  );
}



function signUp()
{
   if ( myRegexMail.test( userEmail.value ) && myRegexPass.test (userPassword.value)  && myRegexName.test(userName.value) && myRegexPass.test(userPassword.value) && myRegexPass.test(userRePassword.value) == myRegexPass.test(userPassword.value) && myRegexAge.test(userAge.value) )
   {
       let oneUser =
       {
            userName :  userName.value,
            userEmail : userEmail.value,
            userPhone : userPhone.value,
            userPassword : userPassword.value,
            userRePassword : userRePassword.value,
            userAge : userAge.value,

       };

        signUpArray.push(oneUser);
        localStorage.setItem("booker" , JSON.stringify(signUpArray));
        clearInputs();
        signupConfirm();
    
    }
   else if (myRegexMail.test(userEmail.value) == false)
   {
        document.getElementById("emailalert").classList.replace("d-none" , "d-block");
   }
   else if (myRegexPass.test(userPassword.value) == false)
   {
        document.getElementById("passwordalert").classList.replace("d-none" , "d-block");
   }
   else if (myRegexName.test(userName.value) == false)
   {
        document.getElementById("namealert").classList.replace("d-none" , "d-block");
   }
   else if (myRegexAge.test(userAge.value) == false )
   {
         document.getElementById("agealert").classList.replace("d-none" , "d-block");
   }
   else if (myRegexPass.test(userRePassword.value) == false)
   {
        document.getElementById("repasswordalert").classList.replace("d-none" , "d-block");
   }
   else if (myRegexPhone.test(userPhone.value) == false)
   {
        document.getElementById("phonealert").classList.replace("d-none" , "d-block");
   }
   else 
   {
    document.getElementById("myAlert").classList.replace("d-none" , "d-block");
    document.getElementById("myAlert").innerHTML = "";

   }
}

function clearInputs()
{
    userName.value = "";
    userEmail.value = "";
    userPhone.value = "";
    userPassword.value = "";
    userRePassword.value = "";
    userAge.value = "" ;
}

function signupConfirm()
{
    document.getElementById("myAlert").classList.replace("d-none" , "d-block");
    document.getElementById("myAlert").classList.replace("alert-danger" , "alert-success");
    document.getElementById("myAlert").innerHTML = "Thank You for Contacting Us";

}


