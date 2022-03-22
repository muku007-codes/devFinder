// Using GitHub API https://api.github.com/

const gitHubApi = "https://api.github.com";

const searchUrl = "https://api.github.com/users/";

let searchBtn = document.getElementById('search-btn');
let inputField = document.getElementById('input');
let profile = document.getElementById('profile');


function getProfile(url){
	fetch(url).then(res => res.json()).then(data => {
		console.log(typeof(data.created_at));
        showProfile(data);
	});
}

searchBtn.addEventListener('click',(e) => {
    e.preventDefault();
   
    const search = inputField.value;
    console.log(searchUrl + search);

    if(search)
    {
        getProfile(searchUrl + search);
    }

    // search = "";

});

function showProfile(data){
    profile.innerHTML = '';

    const profileE1 = document.createElement('div');
    profileE1.classList.add('card');

    const months = ["Jan", "Feb", "Mar", "Apr", "May","Jun", "Jul",  "Aug", "Sept", "Oct", "Nov", "Dec"];
    const d = new Date(data.created_at);
    
    console.log(data.avatar_url);

    profileE1.innerHTML = ` 
    
    <div class="intro">
    <img src="${data.avatar_url}" alt="" />
    <div class="names">
      <div class="full-name">${data.name}</div>
      <div class="username">${data.login}</div>
      <div class="joined">Joined ${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}</div>
    </div>
  </div>
  <div class="bio">${data.bio}</div>
  <div class="social">
    <div class="grid-items">Repo</div>
    <div class="grid-items">Followers</div>
    <div class="grid-items">Following</div>
    <div class="grid-items grid-items-lower">${data.public_repos}</div>
    <div class="grid-items grid-items-lower">${data.followers}</div>
    <div class="grid-items grid-items-lower">${data.following}</div>
  </div>
  <div class="contact">
    <div class="location">
      <i class="fa-solid fa-location-dot"></i>
      <a href="">${data.location}</a>
    </div>
    <div class="link">
      <i class="fa-solid fa-link"></i>
      <a href="${"https://github.com/"+data.login}" target="_blank" >Profile</a>
    </div>
    <div class="twitter">
      <i class="fa-brands fa-twitter"></i>
      <a href="${"https://twitter.com/" + data.twitter_username}" target="_blank">${data.twitter_username}</a>
    </div>
    <div class="work">
      <i class="fa-solid fa-building"></i>
      <a href="">${data.company}</a>
    </div>
  </div>`

  profile.appendChild(profileE1);

}

